const fs = require('fs');
const path = require('path');

const srcDir = 'src';
const lucidePattern = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
const lucideAllPattern = /import\s+\*\s+as\s+Icons\s+from\s+['"]lucide-react['"];?/g;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir).filter(f => f.endsWith('.jsx'));

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let modified = false;

    // Handle standard imports
    let match;
    const regex = new RegExp(lucidePattern);
    while ((match = regex.exec(content)) !== null) {
        const components = match[1].split(',').map(c => c.trim());
        content = content.replace(match[0], '');
        components.forEach(comp => {
            if (comp) {
                const compRegex = new RegExp(<\\b[^>]*\\/>, 'g');
                content = content.replace(compRegex, '');
                const compRegex2 = new RegExp(<\\b[^>]*>.*?</>, 'gs');
                content = content.replace(compRegex2, '');
            }
        });
        modified = true;
    }

    // Handle * as Icons imports
    if (lucideAllPattern.test(content)) {
        content = content.replace(lucideAllPattern, '');
        const iconsRegex = /<Icons\.[A-Za-z0-9_]+\b[^>]*\/>/g;
        content = content.replace(iconsRegex, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(Processed );
    }
});
