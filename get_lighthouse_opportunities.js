const fs = require('fs');
const path = require('path');

const reportFile = path.join('C:', 'Users', 'myPC', '.gemini', 'antigravity', 'brain', '6741fd7d-c9f6-4c66-9ef4-afd5ce9aafc1', 'scratch', 'lighthouse_desktop_report.json');
const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));

console.log('=== LIGHTHOUSE AUDIT OPPORTUNITIES & DIAGNOSTICS ===\n');

Object.values(report.audits).forEach(a => {
  if (a.score !== null && a.score < 0.9 && a.title) {
    console.log(`[${a.scoreDisplayMode || 'audit'}] ${a.title} (Score: ${a.score})`);
    if (a.displayValue) console.log(`   Savings/Value: ${a.displayValue}`);
    if (a.description) console.log(`   Info: ${a.description.substring(0, 150)}...`);
    console.log('');
  }
});
