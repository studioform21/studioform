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

            if (file.endsWith('.html')) {
                const folderName = file.replace('.html', '');
                const folderPath = path.join(destDir, folderName);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }
                fs.copyFileSync(srcPath, path.join(folderPath, 'index.html'));
                console.log(`Copied ${file} to public/${folderName}/index.html`);
            }
        }
    });
} else {
    console.error('Marketing directory not found!');
}
