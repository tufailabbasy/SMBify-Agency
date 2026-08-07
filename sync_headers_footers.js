const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const headerFile = path.join(baseDir, "includes", "header-template.html");
const footerFile = path.join(baseDir, "includes", "footer-template.html");

if (!fs.existsSync(headerFile) || !fs.existsSync(footerFile)) {
    console.error(`Error: Header or footer template not found in ${path.join(baseDir, 'includes')}`);
    process.exit(1);
}

const headerTemplate = fs.readFileSync(headerFile, 'utf8');
const footerTemplate = fs.readFileSync(footerFile, 'utf8');

function getActiveLink(filename) {
    if (filename === 'index.html') return '/';
    const clean = '/' + filename.replace('.html', '');
    if (clean === '/local-seo' || clean === '/local-citations') {
        return '/services';
    }
    if (clean === '/founder' || clean === '/team') {
        return '/about';
    }
    return clean;
}

const HEAD_REQUIREMENTS = [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="/css/styles.css">',
    '<link rel="icon" type="image/png" href="/assets/favicon.png">'
];

const skipDirs = ['.git', 'node_modules', 'includes', 'assets', 'css', 'js', '.agent', 'temp-repo'];

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (skipDirs.includes(file)) continue;
            walk(filePath, callback);
        } else {
            callback(filePath, file);
        }
    }
}

let totalFiles = 0;
let updatedFiles = 0;

walk(baseDir, (filePath, file) => {
    if (!file.endsWith('.html') || file === '404.html') return;
    totalFiles++;

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // 1. REMOVE EXISTING HEADER AND FOOTER (Clean slate - safe separate replacement)
    content = content.replace(/<!--\s*STANDARD HEADER TEMPLATE\s*-->/g, '');
    content = content.replace(/<header class="header" id="header"[\s\S]*?<\/header>/g, '');

    content = content.replace(/<!--\s*STANDARD FOOTER TEMPLATE\s*-->/g, '');
    content = content.replace(/<footer class="footer"[\s\S]*?<\/footer>/g, '');

    // Remove existing back-to-top buttons to avoid duplication
    content = content.replace(/<button id="back-to-top"[\s\S]*?<\/button>/gi, '');

    // Remove existing WhatsApp floating buttons to avoid duplication
    content = content.replace(/<a[^>]*class="whatsapp-btn"[\s\S]*?<\/a>/gi, '');

    // 2. FIX STRUCTURAL TAGS (Ensure </head> and <body> exist)
    if (!content.includes('</head>') || !content.includes('<body>')) {
        let lastHeadIdx = -1;
        const markers = ['</title>', '</meta>', '<meta', '<link', '</script>'];
        for (const marker of markers) {
            const idx = content.lastIndexOf(marker);
            if (idx !== -1) {
                const endIdx = content.indexOf('>', idx) + 1;
                if (endIdx > lastHeadIdx) {
                    lastHeadIdx = endIdx;
                }
            }
        }
        if (lastHeadIdx !== -1) {
            content = content.slice(0, lastHeadIdx) + "\n</head>\n\n<body>" + content.slice(lastHeadIdx);
        } else {
            const mainIdx = content.indexOf('<main');
            if (mainIdx !== -1) {
                content = content.slice(0, mainIdx) + "</head>\n\n<body>\n    " + content.slice(mainIdx);
            }
        }
    }

    // 3. ENSURE HEAD REQUIREMENTS (CSS, Fonts)
    const headEnd = content.indexOf('</head>');
    if (headEnd !== -1) {
        const headPart = content.slice(0, headEnd);
        const missingTags = [];
        for (const req of HEAD_REQUIREMENTS) {
            const hrefMatch = req.match(/href="([^"]+)"/);
            const reqId = hrefMatch ? hrefMatch[1] : req;
            if (!headPart.includes(reqId)) {
                missingTags.push(req);
            }
        }
        if (missingTags.length > 0) {
            content = content.slice(0, headEnd) + "    " + missingTags.join('\n    ') + "\n" + content.slice(headEnd);
        }
    }

    // 4. PREPARE TEMPLATES
    const activeHref = getActiveLink(file);
    let currentHeader = headerTemplate;
    let currentFooter = footerTemplate;

    // Update active class in header
    currentHeader = currentHeader.replace('class="nav__link active"', 'class="nav__link"');
    if (activeHref) {
        const targetStr = `href="${activeHref}" class="nav__link"`;
        currentHeader = currentHeader.replace(targetStr, `href="${activeHref}" class="nav__link active"`);
    }

    // 5. INJECT HEADER (After <body>)
    const bodyStart = content.indexOf('<body');
    if (bodyStart !== -1) {
        const bodyTagEnd = content.indexOf('>', bodyStart) + 1;
        content = content.slice(0, bodyTagEnd) + "\n    " + currentHeader + content.slice(bodyTagEnd);
    }

    // 6. INJECT FOOTER (Before </body>)
    if (content.includes('<main') && !content.includes('</main>')) {
        let insertionPoint = content.indexOf('<script');
        if (insertionPoint === -1) {
            insertionPoint = content.indexOf('</body>');
        }
        if (insertionPoint !== -1) {
            content = content.slice(0, insertionPoint) + "\n    </main>" + content.slice(insertionPoint);
        }
    }

    const bodyEnd = content.indexOf('</body>');
    if (bodyEnd !== -1) {
        content = content.slice(0, bodyEnd) + "\n    " + currentFooter + content.slice(bodyEnd);
    }

    // 7. SAVE IF CHANGED
    if (content.trim() !== originalContent.trim()) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFiles++;
        console.log(`Updated header/footer in ${filePath}`);
    }
});

console.log(`Scanned ${totalFiles} HTML files.`);
console.log(`Updated header/footer and repaired structure in ${updatedFiles} files.`);
