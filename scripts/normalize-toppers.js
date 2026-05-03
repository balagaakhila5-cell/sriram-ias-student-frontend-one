const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'assets', 'ourtoppers');
const BACKUP_DIR = path.join(DIR, '_originals');

// Final canvas — matches aspect ratio expected by OurToppers.tsx display
const CANVAS_W = 500;
const CANVAS_H = 600;

// Subject target box inside canvas. Bottom-aligned so feet/torso sit at
// bottom and heads naturally pop up near the top of the frame.
// A little top padding avoids heads being cut off by the SVG clip.
const SUBJECT_MAX_W = 380;
const SUBJECT_MAX_H = 480;
const TOP_MARGIN = 60; // always leave this much above the head

// Pixel is considered "background" if near-white OR transparent.
// Scanning threshold: channel values at or above this count as white.
const WHITE_THRESHOLD = 240;
const ALPHA_THRESHOLD = 20;

function ensureBackup() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function backupIfNeeded(file) {
  const src = path.join(DIR, file);
  const dst = path.join(BACKUP_DIR, file);
  if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
  return dst; // always work from the pristine original
}

// Require each edge row/column to have at least this fraction of
// subject pixels — otherwise it's stray noise (shadows, JPEG artifacts).
const ROW_FILL_MIN = 0.03;
const COL_FILL_MIN = 0.03;

async function findSubjectBounds(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rowCount = new Uint32Array(height);
  const colCount = new Uint32Array(width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const isBg =
        a < ALPHA_THRESHOLD ||
        (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD);
      if (!isBg) {
        rowCount[y]++;
        colCount[x]++;
      }
    }
  }

  const rowMin = Math.max(1, Math.floor(width * ROW_FILL_MIN));
  const colMin = Math.max(1, Math.floor(height * COL_FILL_MIN));

  let top = 0, bottom = height - 1, left = 0, right = width - 1;
  while (top < height && rowCount[top] < rowMin) top++;
  while (bottom > top && rowCount[bottom] < rowMin) bottom--;
  while (left < width && colCount[left] < colMin) left++;
  while (right > left && colCount[right] < colMin) right--;

  if (right <= left || bottom <= top) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function normalizeOne(file) {
  const source = backupIfNeeded(file);
  const dest = path.join(DIR, file);

  const input = await sharp(source).ensureAlpha().toBuffer();
  const bounds = await findSubjectBounds(input);
  if (!bounds) throw new Error('no subject detected');

  const subject = await sharp(input)
    .extract(bounds)
    .toBuffer();

  const availableH = SUBJECT_MAX_H; // already accounts for bottom anchor
  const resized = await sharp(subject)
    .resize(SUBJECT_MAX_W, availableH, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const rm = await sharp(resized).metadata();

  const leftPad = Math.round((CANVAS_W - rm.width) / 2);
  const rightPad = CANVAS_W - rm.width - leftPad;
  // bottom-align, leave TOP_MARGIN above
  const topPad = CANVAS_H - rm.height;
  const finalTop = Math.max(TOP_MARGIN, topPad);

  await sharp(resized)
    .extend({
      top: finalTop,
      bottom: Math.max(0, CANVAS_H - rm.height - finalTop),
      left: Math.max(0, leftPad),
      right: Math.max(0, rightPad),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .resize(CANVAS_W, CANVAS_H, { fit: 'cover' })
    .png()
    .toFile(dest + '.tmp');

  fs.renameSync(dest + '.tmp', dest);
  return { file, bounds, subjectSize: `${rm.width}x${rm.height}` };
}

async function run() {
  ensureBackup();
  const files = fs.readdirSync(DIR).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  console.log(`Normalizing ${files.length} images -> ${CANVAS_W}x${CANVAS_H}\n`);

  for (const f of files) {
    try {
      const r = await normalizeOne(f);
      console.log(
        `${f}\n  subject bbox ${r.bounds.width}x${r.bounds.height} -> fit ${r.subjectSize}`
      );
    } catch (e) {
      console.error(`${f}: ${e.message}`);
    }
  }
  console.log('\nDone. Originals preserved in _originals/');
}

run().catch(err => { console.error(err); process.exit(1); });
