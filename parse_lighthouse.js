const fs = require('fs');
const path = require('path');

const candidates = [
  path.join('d:', 'Vibe Coding', 'SMBify.Net', 'lighthouse_desktop_report.json'),
  path.join('C:', 'Users', 'myPC', '.gemini', 'antigravity', 'brain', '6741fd7d-c9f6-4c66-9ef4-afd5ce9aafc1', 'scratch', 'lighthouse_desktop_report.json'),
  path.join(process.cwd(), 'lighthouse_desktop_report.json')
];

let reportFile = candidates.find(f => fs.existsSync(f));

if (!reportFile) {
  console.log('Searching for lighthouse_desktop_report.json...');
  process.exit(1);
}

console.log('Found report at:', reportFile);
const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));

const scores = {
  Performance: Math.round(report.categories.performance.score * 100),
  Accessibility: Math.round(report.categories.accessibility.score * 100),
  'Best Practices': Math.round(report.categories['best-practices'].score * 100),
  SEO: Math.round(report.categories.seo.score * 100)
};

const metrics = {
  FCP: report.audits['first-contentful-paint']?.displayValue,
  LCP: report.audits['largest-contentful-paint']?.displayValue,
  TBT: report.audits['total-blocking-time']?.displayValue,
  CLS: report.audits['cumulative-layout-shift']?.displayValue,
  SpeedIndex: report.audits['speed-index']?.displayValue
};

console.log('\n=== GOOGLE LIGHTHOUSE AUDIT RESULTS ===');
console.log('SCORES:', JSON.stringify(scores, null, 2));
console.log('\nCORE WEB VITALS:', JSON.stringify(metrics, null, 2));
