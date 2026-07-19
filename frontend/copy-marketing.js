const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'marketing');
const destDir = path.join(__dirname, 'public');

if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        
        if (fs.lstatSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file} to public/`);
        }
    });
} else {
    console.error('Marketing directory not found!');
}
