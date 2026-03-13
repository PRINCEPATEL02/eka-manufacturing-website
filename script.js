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
  initBackToTop();
  initActiveNavLinks();
  initParallax();
  initFormValidation();
  initProductCardHover();
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
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
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
   CONTACT FORM SUBMISSION
   ============================================ */
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate form submission (replace with actual backend or mailto)
  setTimeout(function () {
    btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent Successfully!';
    btn.style.background = '#25D366';
    form.reset();

    // Suggest WhatsApp follow-up
    setTimeout(function () {
      const name = 'Customer';
      const waUrl = `https://wa.me/919558348763?text=Hello EKA Manufacturing, I just submitted an inquiry from your website. Please get back to me.`;
      const followUp = confirm('Your inquiry has been noted! Would you like to also send it via WhatsApp for faster response?');
      if (followUp) {
        window.open(waUrl, '_blank');
      }
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry';
      btn.style.background = '';
    }, 2000);
  }, 1500);
}

/* ============================================
   CATALOGUE DOWNLOAD
   ============================================ */
function downloadCatalogue(e) {
  e.preventDefault();
  // Since no actual PDF exists, open WhatsApp to request it
  const waUrl = 'https://wa.me/919558348763?text=Hello EKA Manufacturing, I would like to download your product catalogue. Please send it to me.';
  const proceed = confirm('The catalogue will be sent to you via WhatsApp. Click OK to proceed.');
  if (proceed) {
    window.open(waUrl, '_blank');
  }
}

/* ============================================
   PRODUCT CARD HOVER EFFECTS
   ============================================ */
function initProductCardHover() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.15s ease';
    });

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
  });
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
