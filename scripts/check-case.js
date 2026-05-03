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

function getAssetCaseMismatch(assetPath) {
  const parts = assetPath.replace(/^\//, '').split('/');
  let currentPath = path.join(process.cwd(), 'public');
  let actualPath = '/';
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!fs.existsSync(currentPath)) return null;
    const stat = fs.statSync(currentPath);
    if (!stat.isDirectory()) return null;
    const items = fs.readdirSync(currentPath);
    const matched = items.find(item => item.toLowerCase() === part.toLowerCase());
    
    if (!matched) return null; // Doesn't exist at all
    
    currentPath = path.join(currentPath, matched);
    actualPath += matched + (i === parts.length - 1 ? '' : '/');
  }
  
  if (actualPath !== assetPath) {
     return actualPath;
  }
  return null;
}

const regex = /\/assets\/[a-zA-Z0-9_/\-\.\s\(\)]+/g;

let mismatches = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    let requestedAsset = match[0].trim();
    if (requestedAsset.endsWith('.') || requestedAsset.endsWith('\"') || requestedAsset.endsWith('\'')) {
       requestedAsset = requestedAsset.slice(0, -1);
    }
    const mismatchedPath = getAssetCaseMismatch(requestedAsset);
    
    if (mismatchedPath) {
      mismatches.push({ file, requestedAsset, actualPathOnDisk: mismatchedPath });
    }
  }
}

console.log('Mismatches:', JSON.stringify(mismatches, null, 2));
