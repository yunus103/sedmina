const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const siteDir = path.join(__dirname, 'src', 'app', '[locale]', '(site)');
const dirsToPatch = ['components', 'sanity', 'lib', 'context', 'data', 'hooks', 'utils'];

walkDir(siteDir, (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    dirsToPatch.forEach(d => {
      const regex = new RegExp(`(["'])((\\.\\.\\/)+)${d}\\/`, 'g');
      content = content.replace(regex, `$1../$2${d}/`);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
