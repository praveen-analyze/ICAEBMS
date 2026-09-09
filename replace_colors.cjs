const fs = require('fs');

const filepath = 'src/styles/global.css';
let css = fs.readFileSync(filepath, 'utf8');

// The replacements mapping
const replacements = [
    { regex: /#05070d/gi, replace: '#f8fafc' },
    { regex: /#0a0f1c/gi, replace: '#f1f5f9' },
    { regex: /#020305/gi, replace: '#f8fafc' },
    { regex: /#03050a/gi, replace: '#0f172a' },
    { regex: /#0b1020/gi, replace: '#ffffff' },
    { regex: /#0f172a/gi, replace: '#ffffff' },
    // Text colors (white -> dark)
    { regex: /#ffffff/gi, replace: '#0f172a' },
    { regex: /#fff(?=[;,.\}])/gi, replace: '#0f172a' },
    { regex: /#e2e8f0/gi, replace: '#1e293b' },
    { regex: /#f8fafc/gi, replace: '#020617' },
    { regex: /#cbd5e1/gi, replace: '#334155' },
    { regex: /#94a3b8/gi, replace: '#475569' },
    { regex: /#64748b/gi, replace: '#64748b' },
    // Brand colors
    { regex: /#8b5cf6/gi, replace: '#0369a1' },
    { regex: /#ec4899/gi, replace: '#0284c7' },
    { regex: /#06b6d4/gi, replace: '#0891b2' },
    { regex: /#0891b2/gi, replace: '#0e7490' },
    { regex: /#22d3ee/gi, replace: '#06b6d4' },
    // Box shadows / rgba
    { regex: /rgba\(255,255,255,(\.[0-9]+)\)/gi, replace: 'rgba(0,0,0,)' },
    { regex: /rgba\(5,7,13,(\.[0-9]+)\)/gi, replace: 'rgba(248,250,252,)' },
    { regex: /rgba\(15,23,42,(\.[0-9]+)\)/gi, replace: 'rgba(255,255,255,)' }
];

replacements.forEach(r => {
    css = css.replace(r.regex, r.replace);
});

fs.writeFileSync(filepath, css, 'utf8');
console.log('CSS colors replaced.');
