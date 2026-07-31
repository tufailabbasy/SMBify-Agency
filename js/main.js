// =========================================
// Initialize All Modules
// =========================================


// =========================================
// FAQ Accordion Manager
// =========================================

// =========================================
// Compact FAQ Accordion Manager
// =========================================
const FAQAccordion = {
  init() {
    const questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach(q => {
      // Remove old listeners by replacing node or adding clean listener
      q.addEventListener('click', (e) => {
        e.preventDefault();
        const item = q.closest('.faq-item');
        if (!item) return;

        const isOpen = item.classList.contains('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle active
        item.classList.toggle('active');
      });
    });
  }
};




// =========================================
// Blog Archive Pagination Manager (12 posts per page)
// =========================================
const BlogPaginationManager = {
  init() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.blog-card');
    if (!cards.length) return;

    const POSTS_PER_PAGE = 12;
    const totalPages = Math.ceil(cards.length / POSTS_PER_PAGE);
    let currentPage = 1;

    let pagContainer = document.getElementById('blog-pagination');
    if (!pagContainer) {
      pagContainer = document.createElement('div');
      pagContainer.id = 'blog-pagination';
      pagContainer.className = 'blog-pagination';
      grid.parentNode.appendChild(pagContainer);
    }

    function renderPage(page) {
      currentPage = page;
      const start = (page - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;

      cards.forEach((card, index) => {
        if (index >= start && index < end) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });

      renderControls();
    }

    function renderControls() {
      if (totalPages <= 1) {
        pagContainer.style.display = 'none';
        return;
      }

      pagContainer.style.display = 'flex';
      let html = '';

      const prevDisabled = currentPage === 1 ? 'disabled' : '';
      html += `<button class="blog-pagination__btn blog-pagination__nav-btn ${prevDisabled}" data-page="${currentPage - 1}" ${prevDisabled ? 'disabled' : ''}>← Prev</button>`;

      for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        html += `<button class="blog-pagination__btn ${activeClass}" data-page="${i}">${i}</button>`;
      }

      const nextDisabled = currentPage === totalPages ? 'disabled' : '';
      html += `<button class="blog-pagination__btn blog-pagination__nav-btn ${nextDisabled}" data-page="${currentPage + 1}" ${nextDisabled ? 'disabled' : ''}>Next →</button>`;

      pagContainer.innerHTML = html;

      pagContainer.querySelectorAll('.blog-pagination__btn:not(.disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetPage = parseInt(btn.dataset.page, 10);
          if (targetPage && targetPage !== currentPage) {
            renderPage(targetPage);
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    renderPage(1);
  }
};


document.addEventListener('DOMContentLoaded', () => {
  // Initialize core modules
  HeaderFooterManager.init();
  ThemeManager.init();
  MobileNav.init();
  HeaderScroll.init();
  SmoothScroll.init();
  ScrollAnimations.init();
  LogoTicker.init();
  ContactForm.init();
  TestimonialSlider.init();
  PortfolioFilter.init();
  BackToTop.init();
  AutoTOCManager.init();
    FAQAccordion.init();
    BlogPaginationManager.init();
  // Render global CTAs (fills empty .cta containers)
  if (typeof GlobalCTAManager !== 'undefined' && GlobalCTAManager.init) GlobalCTAManager.init();
});

// =========================================
// Header & Footer Manager
// =========================================

const HeaderFooterManager = {
  init() {
    console.log('HeaderFooterManager initializing...');
    this.injectHeader();
    this.injectFooter();
  },

  isActive(href) {
    const p = window.location.pathname;
    if (href === '/') return p === '/' || p === '/index.html' || p === '';
    return p === href || p === href + '.html' || p.startsWith(href + '/') || p.startsWith(href + '-');
  },

  injectHeader() {
    const header = document.querySelector('header.header');
    if (!header) return;
    const p = window.location.pathname;
    const isAboutActive = p.startsWith('/about') || p.startsWith('/founder') || p.startsWith('/team');
    const isServicesActive = p.startsWith('/services') || p.startsWith('/local-seo') || p.startsWith('/local-citations') || p.includes('-seo');
    const isBlogActive = (p === '/blog' || p === '/blog.html' || p.startsWith('/blog/')) && !isServicesActive;

    const html = `<div class="container header__inner">
        <a href="/" class="header__logo">
          <img src="/assets/logo-dark.png" alt="SMBify Logo" class="logo-light">
        </a>
        <nav class="nav">
          <ul class="nav__list">
            <li><a href="/" class="nav__link${p === '/' || p === '/index.html' || p === '' ? ' active' : ''}">Home</a></li>
            
            <!-- ABOUT MEGA DROPDOWN -->
            <li class="nav__dropdown">
              <a href="/about" class="nav__link${isAboutActive ? ' active' : ''}">
                About
                <span class="nav__caret">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 1L5 5L9 1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
              <div class="nav__dropdown-menu" style="width: 320px; padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <a href="/about" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">About SMBify</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">Our mission & agency architecture</div>
                  </div>
                </a>
                <a href="/founder" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">Meet the Founder</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">Muhammad Tufail Abbas & 7+ Yr Story</div>
                  </div>
                </a>
                <a href="/team" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">Meet Our Team</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">Specialized Local SEO Engineers</div>
                  </div>
                </a>
                <a href="/smbify-vs-fiverr-local-seo" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">SMBify vs Fiverr</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">Why contractors pick us over freelancers</div>
                  </div>
                </a>
              </div>
            </li>

            <!-- SERVICES MEGA MENU -->
            <li class="nav__dropdown nav__dropdown--mega">
              <a href="/services" class="nav__link${isServicesActive ? ' active' : ''}">
                Services
                <span class="nav__caret">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 1L5 5L9 1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
              <div class="nav__dropdown-menu nav__mega-menu" style="padding: 1.5rem 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; background: #0D1220; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.7);">
                <div>
                  <h4 style="font-family:'Outfit',sans-serif; font-size:0.85rem; font-weight:800; color:#84CC16; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.85rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.4rem;">Core Trades &amp; Emergency</h4>
                  <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.55rem; font-size:0.88rem;">
                    <li><a href="/plumbing-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> Plumbing</a></li>
                    <li><a href="/hvac-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/><path d="M12 9h4M12 6h2M12 12h2"/></svg> HVAC</a></li>
                    <li><a href="/electrical-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Electrical</a></li>
                    <li><a href="/roofing-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Roofing</a></li>
                    <li><a href="/water-damage-restoration-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg> Water Damage &amp; Restoration</a></li>
                    <li><a href="/garage-door-repair-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg> Garage Door Repair</a></li>
                  </ul>
                </div>

                <div>
                  <h4 style="font-family:'Outfit',sans-serif; font-size:0.85rem; font-weight:800; color:#84CC16; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.85rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.4rem;">Maintenance &amp; Specialty</h4>
                  <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.55rem; font-size:0.88rem;">
                    <li><a href="/pest-control-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="5" r="2.5"/><path d="M8 8.5C8 6.5 16 6.5 16 8.5V17c0 2-8 2-8 0V8.5z"/><line x1="6" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="18" y2="14"/></svg> Pest Control</a></li>
                    <li><a href="/lawn-care-landscape-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M12 2A10 10 0 0 0 2 12c0 4.4 3.6 8 8 8h2a10 10 0 0 0 10-10V2H12zm0 18v-8"/></svg> Lawn Care &amp; Landscape</a></li>
                    <li><a href="/pool-service-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12h20M2 17h20M2 7h20"/></svg> Pool Service</a></li>
                    <li><a href="/cleaning-services-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z"/></svg> House &amp; Office Cleaning</a></li>
                    <li><a href="/junk-removal-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Junk Removal</a></li>
                    <li><a href="/tree-service-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polygon points="12 2 3 12 8 12 4 18 20 18 16 12 21 12 12 2"/><line x1="12" y1="18" x2="12" y2="22"/></svg> Tree Service</a></li>
                    <li><a href="/chimney-duct-cleaning-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 12h16M8 6v12M12 6v12"/></svg> Chimney &amp; Duct Sweep</a></li>
                  </ul>
                </div>

                <div>
                  <h4 style="font-family:'Outfit',sans-serif; font-size:0.85rem; font-weight:800; color:#84CC16; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.85rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.4rem;">Renovations &amp; Contracting</h4>
                  <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.55rem; font-size:0.88rem;">
                    <li><a href="/remodeling-builders-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M18 2l4 4-12 12-4-4L18 2zM15 5l2 2M9 11l-5 5v3h3l5-5-3-3z"/></svg> Remodeling &amp; Builders</a></li>
                    <li><a href="/painting-contractor-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="6" y="3" width="12" height="6" rx="1.5"/><path d="M6 6H4v8c0 1.1.9 2 2 2h6v5m0-13h6"/></svg> Painting</a></li>
                    <li><a href="/flooring-contractor-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg> Flooring</a></li>
                    <li><a href="/fencing-contractor-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12h20M6 12V4M10 12V4M14 12V4M18 12V4M6 20v-8M10 20v-8M14 20v-8M18 20v-8"/></svg> Fencing</a></li>
                    <li><a href="/windows-doors-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18M3 12h18"/></svg> Windows &amp; Doors</a></li>
                    <li><a href="/solar-installer-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg> Solar</a></li>
                    <li><a href="/concrete-paving-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6"/></svg> Concrete &amp; Paving</a></li>
                    <li><a href="/deck-builder-seo" class="nav__dropdown-link" style="padding:0.35rem 0.5rem;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M12 3v18M17 3v18M3 8h18M3 14h18"/></svg> Deck Builders</a></li>
                  </ul>
                </div>

                <!-- BOTTOM CORE SOLUTIONS BAR -->
                <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                  <a href="/local-seo" style="color: #F9FAFB; text-decoration: none; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: rgba(132, 204, 22, 0.15); color: #84CC16; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">CORE</span> Local SEO Engine &rarr;
                  </a>
                  <a href="/local-citations" style="color: #F9FAFB; text-decoration: none; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: rgba(132, 204, 22, 0.15); color: #84CC16; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">MAPS</span> Local Citations &amp; GBP &rarr;
                  </a>
                  <a href="/services" style="color: #84CC16; text-decoration: none; font-weight: 800; font-size: 0.88rem;">View All 21 Services &rarr;</a>
                </div>
              </div>
            </li>

            <li><a href="/portfolio" class="nav__link${p === '/portfolio' || p === '/portfolio.html' ? ' active' : ''}">Portfolio</a></li>

            <!-- RESOURCES MEGA DROPDOWN -->
            <li class="nav__dropdown">
              <a href="/resources" class="nav__link${p === '/resources' || p === '/resources.html' ? ' active' : ''}">
                Resources
                <span class="nav__caret">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 1L5 5L9 1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
              <div class="nav__dropdown-menu" style="width: 320px; padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <a href="/resources" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">Resource Hub</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">21 Trade Blueprints & Audit Checklists</div>
                  </div>
                </a>
                <a href="/blog" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">Blog &amp; Insights</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">Local SEO Playbooks & Founder Notes</div>
                  </div>
                </a>
                <a href="/audit-finding-local-service-sites" class="nav__dropdown-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  <div>
                    <div style="font-weight: 700; color: #F9FAFB; font-size: 0.92rem;">35k Impression Case Study</div>
                    <div style="font-size: 0.78rem; color: #9CA3AF;">See real local SEO ranking audit data</div>
                  </div>
                </a>
              </div>
            </li>

            <li><a href="/blog" class="nav__link${isBlogActive ? ' active' : ''}">Blog</a></li>
            <li><a href="/contacts" class="nav__link${p === '/contacts' || p === '/contacts.html' ? ' active' : ''}">Contact</a></li>
          </ul>
        </nav>

        <div class="header__actions">
          <a href="/booking" class="btn btn--primary hide-mobile">Book Audit</a>
          <a href="https://app.smbify.net" class="nav__link nav__link--highlighted" target="_blank" rel="noopener noreferrer">Client Portal</a>
          <button class="mobile-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>`;
    header.innerHTML = html;
    header.classList.add('header--ready');
  },

  injectFooter() {
    const footer = document.querySelector('footer.footer');
    if (!footer) {
      console.warn('Footer element "footer.footer" not found!');
      return;
    }
    console.log('Injecting footer...');

    const html = `
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="/assets/logo-dark.png" alt="SMBify Logo" class="footer__logo">
            <p class="footer__description">We help ambitious agencies generate more profits by providing top-tier white-label Local SEO services that get results.</p>
            <div class="footer__social">
              <a href="https://www.linkedin.com/company/smbifyagency" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="https://web.facebook.com/SMBifyAgency" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
              <a href="https://x.com/smbifyagency" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
              <a href="https://www.instagram.com/smbifyagency/" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            </div>
          </div>
          <div>
            <h6 class="footer__title">Contact Us</h6>
            <div class="footer__contact-item">contact@smbify.net</div>
          </div>
          <div>
            <h6 class="footer__title">Quick Links</h6>
            <div class="footer__links">
              <a href="/local-seo" class="footer__link">Local SEO</a>
              <a href="/services" class="footer__link">Services</a>
              <a href="/contacts" class="footer__link">Contacts</a>
              <a href="https://app.smbify.net" class="footer__link" target="_blank" rel="noopener noreferrer">Client Portal</a>
            </div>
          </div>
          <div>
            <h6 class="footer__title">Partnership</h6>
            <p style="font-size:0.875rem;color:var(--text-tertiary);">Ready to scale your agency? Let's talk about how we can handle your fulfillment.</p>
          </div>
        </div>
        <div class="footer__bottom">
          <p>Copyright &copy; ${new Date().getFullYear()} SMBify. All Rights Reserved.</p>
          <div class="footer__legal">
            <a href="/terms">Terms</a>
            <a href="/privacy-policy">Privacy</a>
          </div>
        </div>
      </div>
    `;
    footer.innerHTML = html;
  }
};

// =========================================
// Global CTA Manager
// =========================================




const GlobalCTAManager = {
  init() {
    // Skip CTA on contact page
    if (window.location.pathname.includes('contact')) return;

    const ctas = document.querySelectorAll('.cta');
    const html = `
      <div class="cta-inner-grid">
        <div class="cta-inner-left">
          <h2 class="cta__title">Ready to Scale Your Local SEO?</h2>
          <p class="cta__description">Partner with SMBify for done-for-you local SEO that gets real results — more calls, higher rankings, and consistent growth for your clients.</p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;">
            <a href="/contacts" class="btn btn--primary btn--large">Get Started Now</a>
            <a href="https://wa.me/923437967815" target="_blank" class="btn btn--secondary btn--large">WhatsApp Us</a>
            <a href="/booking.html" class="btn btn--outline btn--large">Book a Meeting</a>
          </div>
        </div>
      </div>
    `;

    ctas.forEach(cta => {
      cta.innerHTML = html;
    });
  }
};



// =========================================
// Theme Toggle
// =========================================

const ThemeManager = {
  init() {
    // Dark theme only
    document.documentElement.setAttribute('data-theme', 'dark');
  }
};

// =========================================
// Mobile Navigation
// =========================================

const MobileNav = {
  init() {
    this.toggle = document.querySelector('.mobile-toggle');
    this.nav = document.querySelector('.nav__list');
    this.isOpen = false;

    if (this.toggle && this.nav) {
      this.bindEvents();
    }
  },

  bindEvents() {
    this.toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    this.nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.parentElement.classList.contains('nav__dropdown')) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            link.parentElement.classList.toggle('open');
            return;
          }
        }
        this.closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.nav.classList.toggle('open', this.isOpen);
    this.toggle.classList.toggle('active', this.isOpen);
    document.body.classList.toggle('menu-open', this.isOpen);
  },

  closeMenu() {
    this.isOpen = false;
    this.nav.classList.remove('open');
    this.toggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
};

// =========================================
// Header Scroll Effect
// =========================================

const HeaderScroll = {
  init() {
    this.header = document.querySelector('.header');
    if (this.header) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        this.header.classList.toggle('scrolled', scrolled);
      }, { passive: true });
    }
  }
};

// =========================================
// Smooth Scroll
// =========================================

const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// =========================================
// Scroll Animations
// =========================================

const ScrollAnimations = {
  init() {
    const elements = document.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
};

// =========================================
// Logo Ticker
// =========================================

const LogoTicker = {
  init() {
    const track = document.querySelector('.partners__track');
    if (track) {
      track.innerHTML = track.innerHTML + track.innerHTML;
    }
  }
};

// =========================================
// Form Handling
// =========================================

const ContactForm = {
  init() {
    const form = document.querySelector('.contact-form form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          alert('Thank you! We\'ll get back to you soon.');
        }, 1500);
      });
    }
  }
};

// =========================================
// Testimonial Slider
// =========================================

const TestimonialSlider = {
  init() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.testimonial-card');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonials-dots';
    dotsContainer.style.cssText = 'display: flex; justify-content: center; gap: 8px; margin-top: 24px;';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
      dot.style.cssText = 'width: 10px; height: 10px; border-radius: 50%; border: none; cursor: pointer; background: var(--border-color);';
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    slider.appendChild(dotsContainer);
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goToSlide(index) {
      slides[currentIndex].style.display = 'none';
      dots[currentIndex].style.background = 'var(--border-color)';
      currentIndex = index;
      slides[currentIndex].style.display = 'block';
      dots[currentIndex].style.background = 'var(--brand-primary)';
    }

    setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }, 5000);
  }
};

// =========================================
// Portfolio Filter
// =========================================

const PortfolioFilter = {
  init() {
    const filters = document.querySelectorAll('.portfolio-filter');
    const items = document.querySelectorAll('.portfolio-card');
    if (filters.length === 0) return;

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        items.forEach(item => {
          const shouldShow = category === 'all' || item.dataset.category === category;
          item.style.display = shouldShow ? 'block' : 'none';
          item.style.opacity = shouldShow ? '1' : '0';
        });
      });
    });
  }
};

// =========================================
// Back To Top Button
// =========================================

const BackToTop = {
  init() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
    button.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; width: 48px; height: 48px; border-radius: 50%; background: #84CC16; color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; z-index: 999; box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: all 0.3s;';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 500;
      button.style.opacity = show ? '1' : '0';
      button.style.visibility = show ? 'visible' : 'hidden';
    });

    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
};


// =========================================
// Auto Table of Contents Generator for Blog Posts
// =========================================

const AutoTOCManager = {
  init() {
    const articleContent = document.querySelector('.blog-article__content');
    if (!articleContent) return;

    const headings = articleContent.querySelectorAll('h2');
    if (headings.length < 2) return;

    // Check if TOC already rendered by JS
    if (document.querySelector('.creative-toc')) return;

    console.log('Generating automatic Table of Contents...');

    const tocContainer = document.createElement('div');
    tocContainer.className = 'creative-toc';

    let gridHTML = '';
    headings.forEach((h2, index) => {
      if (!h2.id) {
        h2.id = 'toc-heading-' + (index + 1);
      }
      const numStr = (index + 1).toString().padStart(2, '0');
      gridHTML += `
        <a href="#${h2.id}" class="creative-toc__item">
          <span class="creative-toc__num">${numStr}</span>
          <span class="creative-toc__text">${h2.textContent.replace(/^[0-9.]+\s*/, '')}</span>
        </a>
      `;
    });

    tocContainer.innerHTML = `
      <div class="creative-toc__header">
        <div class="creative-toc__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          <span>QUICK NAV</span>
        </div>
        <h4 class="creative-toc__title">Inside This Audit Breakdown</h4>
      </div>
      <div class="creative-toc__grid">
        ${gridHTML}
      </div>
    `;

    // Insert TOC after lead paragraph or before first H2
    const leadP = articleContent.querySelector('.lead');
    if (leadP && leadP.nextSibling) {
      leadP.parentNode.insertBefore(tocContainer, leadP.nextSibling);
    } else {
      headings[0].parentNode.insertBefore(tocContainer, headings[0]);
    }
  }
};
