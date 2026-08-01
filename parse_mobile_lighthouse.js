const fs = require('fs');
const path = require('path');

const reportFile = path.join('C:', 'Users', 'myPC', '.gemini', 'antigravity', 'brain', '6741fd7d-c9f6-4c66-9ef4-afd5ce9aafc1', 'scratch', 'lighthouse_mobile_report.json');
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

console.log('=== LIGHTHOUSE MOBILE AUDIT RESULTS ===');
console.log('SCORES:', JSON.stringify(scores, null, 2));
console.log('\nCORE WEB VITALS:', JSON.stringify(metrics, null, 2));

console.log('\nMAIN MOBILE BOTTLENECKS:');
Object.values(report.audits)
  .filter(a => a.score !== null && a.score < 0.9 && a.title)
  .forEach(a => {
    console.log(`- ${a.title}: ${a.displayValue || ''}`);
  });
