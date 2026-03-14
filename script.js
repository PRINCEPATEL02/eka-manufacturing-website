/**
 * EKA MANUFACTURING - SCRIPT.JS
 * Animations, interactions, and utility functions
 */

/* ============================================
   LOADING SCREEN
   ============================================ */
window.addEventListener('load', function () {
  document.body.classList.add('loading');
  setTimeout(function () {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }
    // Start counter animations after load
    initCounters();
  }, 2000);
});

/* ============================================
   AOS (ANIMATE ON SCROLL) INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
  });

  initNavbar();
  initHamburger();
  initDropdown();
  initBackToTop();
  initActiveNavLinks();
  initParallax();
  initFormValidation();
});

/* ============================================
   STICKY NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // Initial call
}

/* ============================================
   HAMBURGER MENU
   ============================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}

/* ============================================
   DROPDOWN TOGGLE FOR MOBILE
   ============================================ */
function initDropdown() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only handle click on mobile
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const dropdownItem = this.parentElement;
        dropdownItem.classList.toggle('active');
      }
    });
  });
}

/* ============================================
   ACTIVE NAV LINKS (SCROLL SPY)
   ============================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      const shapes = hero.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const speed = 0.1 + index * 0.05;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });

      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
      }
    }
  }, { passive: true });
}

/* ============================================
   EMAILJS CONFIGURATION
   ============================================
   To make the form work, you need to:
   1. Sign up at https://www.emailjs.com/ (free)
   2. Create an Email Service (e.g., connect your Gmail)
   3. Create an Email Template
   4. Replace the values below with your actual credentials:
      - YOUR_PUBLIC_KEY: Found in EmailJS Dashboard → Account
      - YOUR_SERVICE_ID: Found in EmailJS Dashboard → Email Services
      - YOUR_TEMPLATE_ID: Found in EmailJS Dashboard → Email Templates
   
   In your EmailJS template, use these variables:
   {{from_name}}, {{phone}}, {{reply_to}}, {{product}}, {{message}}
   ============================================ */
const EMAILJS_CONFIG = {
  publicKey: "c1iZU7eKx3Q_A-1aB",
  serviceId: "service_4bt4jt5",
  templateId: "template_cl0l6mr"
};

/* ============================================
   CONTACT FORM SUBMISSION — EmailJS
   ============================================ */
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  // Gather values
  const fromName    = document.getElementById('inq-name').value.trim();
  const phone       = document.getElementById('inq-phone').value.trim();
  const replyTo     = document.getElementById('inq-email').value.trim();
  const product     = document.getElementById('inq-product').value || 'Not specified';
  const message     = document.getElementById('inq-message').value.trim();

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Send via EmailJS
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
    from_name: fromName,
    phone: phone,
    reply_to: replyTo || 'website@visitor.com',
    product: product,
    message: message
  })
  .then(function(response) {
    btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent Successfully!';
    btn.style.background = '#25D366';
    form.reset();
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry';
      btn.style.background = '';
    }, 3000);
  })
  .catch(function(err) {
    console.error('EmailJS Error:', err);
    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
    btn.style.background = '#e74c3c';
    alert('Failed to send email. Please try again or contact us directly.');
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry';
      btn.style.background = '';
    }, 3000);
  });
}

/* ============================================
   CATALOGUE DOWNLOAD
   ============================================ */
function downloadCatalogue(e) {
  e.preventDefault();
  // Direct PDF download
  const link = document.createElement('a');
  link.href = 'assets/images/EKA MANUFACTURING CATLOGUE.pdf';
  link.download = 'EKA-Manufacturing-Product-Catalogue-2024.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.addEventListener('click', function (e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute('href');
  if (href === '#') return;

  const section = document.querySelector(href);
  if (section) {
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ============================================
   WHY CARD STAGGER ANIMATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const whyCards = document.querySelectorAll('.why-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = (i * 0.1) + 's';
          entry.target.classList.add('card-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  whyCards.forEach(card => observer.observe(card));
});

/* ============================================
   TICKER PAUSE ON HOVER
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }
});

/* ============================================
   SECTION REVEAL WITH COLOR INDICATOR
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-in-view');
        }
      });
    },
    { threshold: 0.05 }
  );
  sections.forEach(s => sectionObserver.observe(s));
});

/* ============================================
   INVOICE PRINT HELPER
   ============================================ */
function printInvoice() {
  const invoiceContent = document.querySelector('.invoice-paper');
  if (!invoiceContent) return;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>EKA Manufacturing - Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        * { box-sizing: border-box; }
      </style>
    </head>
    <body>
      ${invoiceContent.innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

/* ============================================
   FLOATING SHAPE ANIMATION ENHANCEMENT
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, i) => {
    shape.style.animationDuration = (6 + i * 1.5) + 's';
    shape.style.animationDelay = (i * 0.7) + 's';
  });
});

/* ============================================
   PROCESS STEP HIGHLIGHT ON HOVER
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.process-step');
  steps.forEach((step, i) => {
    step.addEventListener('mouseenter', function () {
      steps.forEach((s, j) => {
        if (j < i) {
          s.style.opacity = '0.5';
        } else if (j === i) {
          s.style.opacity = '1';
          s.style.transform = 'translateY(-8px) scale(1.02)';
        } else {
          s.style.opacity = '0.7';
        }
      });
    });
    step.addEventListener('mouseleave', function () {
      steps.forEach(s => {
        s.style.opacity = '';
        s.style.transform = '';
      });
    });
  });
});

/* ============================================
   KEYBOARD ACCESSIBILITY
   ============================================ */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }
});

/* ============================================
   PERFORMANCE: Lazy-load map on scroll
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  const mapContainer = document.querySelector('.map-container');
  if (!mapContainer) return;

  const iframe = mapContainer.querySelector('iframe');
  if (!iframe) return;

  // Store src and remove for lazy loading
  const src = iframe.getAttribute('src');
  iframe.removeAttribute('src');

  const mapObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !iframe.getAttribute('src')) {
          iframe.setAttribute('src', src);
          mapObserver.unobserve(mapContainer);
        }
      });
    },
    { rootMargin: '200px' }
  );

  mapObserver.observe(mapContainer);
});

