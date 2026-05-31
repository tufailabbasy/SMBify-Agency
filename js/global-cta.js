/**
 * Global CTA Injector — SMBify Agency
 * - If .cta div exists: injects standard CTA content into it.
 * - If no .cta div: automatically creates the CTA section before <footer>.
 * Future pages: just include this script — nothing else needed.
 */
(function () {
    var CTA_HTML = [
        '<div class="cta-inner-grid">',
        '  <div class="cta-inner-left">',
        '    <h2 class="cta__title">Ready to Scale Your SEO Results?</h2>',
        '    <p class="cta__description">Partner with SMBify for done-for-you local SEO that gets real, measurable results &mdash; more calls, higher rankings, and consistent growth.</p>',
        '    <form class="cta-audit-form">',
        '      <input type="hidden" name="access_key" value="084e4af8-957e-4949-8513-e9e440ad59c1">',
        '      <input type="hidden" name="subject" value="Free SEO Audit Request \u2013 SMBify">',
        '      <input type="hidden" name="from_name" value="SMBify CTA Form">',
        '      <input type="checkbox" name="botcheck" style="display:none">',
        '      <div class="cta-audit-row">',
        '        <input type="url" name="Website URL" placeholder="https://yourwebsite.com" required class="cta-audit-input">',
        '        <input type="email" name="Email" placeholder="your@email.com" required class="cta-audit-input">',
        '        <button type="submit" class="btn btn--primary btn--large">Get Free Analysis</button>',
        '      </div>',
        '      <div class="cta-audit-success" style="display:none;margin-top:.75rem;"></div>',
        '    </form>',
        '  </div>',
        '  <div class="cta-stats-grid">',
        '    <div class="cta-stat"><div class="cta-stat__value">30&ndash;100</div><div class="cta-stat__label">Days to Results</div></div>',
        '    <div class="cta-stat"><div class="cta-stat__value">24hr</div><div class="cta-stat__label">Response Time</div></div>',
        '    <div class="cta-stat"><div class="cta-stat__value">100%</div><div class="cta-stat__label">White-Label Ready</div></div>',
        '    <div class="cta-stat"><div class="cta-stat__value">Cancel</div><div class="cta-stat__label">Anytime</div></div>',
        '  </div>',
        '</div>'
    ].join('\n');

    function attachFormHandler(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var row = form.querySelector('.cta-audit-row');
            var success = form.querySelector('.cta-audit-success');
            btn.disabled = true;
            btn.textContent = 'Sending...';
            var data = {};
            var fd = new FormData(form);
            fd.forEach(function(v, k) { data[k] = v; });
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            }).then(function(res) {
                return res.json();
            }).then(function(json) {
                if (json.success) {
                    row.style.display = 'none';
                    success.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#84CC16" stroke-width="2" style="vertical-align:middle;margin-right:.4rem;"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg><span style="color:#fff;font-weight:600;">Received! We\'ll send your report within 24 hours.</span>';
                    success.style.display = 'block';
                } else {
                    btn.disabled = false;
                    btn.textContent = 'Get Free Analysis';
                    alert('Something went wrong. Please try again.');
                }
            }).catch(function() {
                btn.disabled = false;
                btn.textContent = 'Get Free Analysis';
                alert('Network error. Please try again.');
            });
        });
    }

    function inject() {
        var ctas = document.querySelectorAll('.cta');

        // No .cta div found — auto-create section before <footer>
        if (ctas.length === 0) {
            var footer = document.querySelector('footer.footer');
            if (!footer) return;

            var section = document.createElement('section');
            section.className = 'section';

            var container = document.createElement('div');
            container.className = 'container';

            var ctaDiv = document.createElement('div');
            ctaDiv.className = 'cta';
            ctaDiv.setAttribute('data-animate', '');

            container.appendChild(ctaDiv);
            section.appendChild(container);
            footer.parentNode.insertBefore(section, footer);

            ctas = [ctaDiv];
        }

        // Inject CTA content into every .cta div
        Array.prototype.forEach.call(ctas, function (el) {
            el.innerHTML = CTA_HTML;
            var form = el.querySelector('.cta-audit-form');
            if (form) attachFormHandler(form);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
