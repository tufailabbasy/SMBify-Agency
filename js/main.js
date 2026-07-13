// =========================================
// Initialize All Modules
// =========================================

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
    if (!header) {
      console.warn('Header element "header.header" not found!');
      return;
    }
    console.log('Injecting header...');

    const p = window.location.pathname;
    const isServicesActive = p.startsWith('/services') || p.startsWith('/local-citations');

    const html = `
      <div class="container header__inner">
        <a href="/" class="header__logo">
          <img src="/assets/logo-dark.png" alt="SMBify Logo" class="logo-light">
        </a>
        <nav class="nav">
          <ul class="nav__list">
            <li><a href="/" class="nav__link${this.isActive('/') ? ' active' : ''}">Home</a></li>
            <li><a href="/about" class="nav__link${this.isActive('/about') ? ' active' : ''}">About</a></li>
            <li><a href="/team" class="nav__link${this.isActive('/team') ? ' active' : ''}">Team</a></li>
            <li><a href="/portfolio" class="nav__link${this.isActive('/portfolio') ? ' active' : ''}">Portfolio</a></li>
            <li class="nav__dropdown">
              <a href="/services" class="nav__link${isServicesActive ? ' active' : ''}">
                Services
                <span class="nav__caret">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 1L5 5L9 1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
              <ul class="nav__dropdown-menu">
                <li>
                  <a href="/services" class="nav__dropdown-link">
                    <svg class="nav__dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span class="nav__dropdown-title">Local SEO</span>
                  </a>
                </li>
                <li>
                  <a href="/local-citations" class="nav__dropdown-link">
                    <svg class="nav__dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span class="nav__dropdown-title">Local Citations</span>
                  </a>
                </li>
              </ul>
            </li>
            <li><a href="/contacts" class="nav__link${this.isActive('/contacts') ? ' active' : ''}">Contact</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <a href="/services" class="btn btn--primary hide-mobile">Local SEO Service</a>
          <a href="/booking" class="btn btn--outline hide-mobile" style="margin-left:0.5rem;">Book</a>
          <button class="mobile-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    `;
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
            <div class="footer__contact-item">contact@smbify.agency</div>
          </div>
          <div>
            <h6 class="footer__title">Quick Links</h6>
            <div class="footer__links">
              <a href="/services" class="footer__link">Local SEO</a>
              <a href="/services" class="footer__link">Services</a>
              <a href="/contacts" class="footer__link">Contacts</a>
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
