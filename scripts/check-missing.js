const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
const regex = /\/assets\/[a-zA-Z0-9_/\-\.\s\(\)]+/g;

let notFound = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    let requestedAsset = match[0].trim();
    if (requestedAsset.endsWith('.') || requestedAsset.endsWith('\"') || requestedAsset.endsWith('\'')) {
       requestedAsset = requestedAsset.slice(0, -1);
    }
    const fullPath = path.join(process.cwd(), 'public', requestedAsset.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      notFound.push({ file, requestedAsset });
    }
  }
}

console.log('Not Found:', JSON.stringify(notFound, null, 2));
