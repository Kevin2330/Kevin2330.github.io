/* ═══════════════════════════════════════════════
   Kevin's Personal Website — Main JS
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Dark Mode ──
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark.matches ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Mobile Nav ──
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll Animations (Intersection Observer) ──
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(function (el) { observer.observe(el); });
  }

  // ── Research: Abstract Expand/Collapse ──
  document.querySelectorAll('.paper-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var abstract = this.previousElementSibling;
      if (!abstract || !abstract.classList.contains('paper-abstract')) {
        abstract = this.closest('.paper-card').querySelector('.paper-abstract');
      }
      if (abstract) {
        var expanded = abstract.classList.toggle('expanded');
        this.textContent = expanded ? '− Hide Abstract' : '+ Show Abstract';
      }
    });
  });

  // ── Life Page: Gallery Filters ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ── Life Page: Lightbox ──
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxContent = lightbox.querySelector('.lightbox-content');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var imgEl = this.querySelector('.gallery-placeholder, .gallery-img');
        var caption = this.querySelector('.gallery-caption h4');

        if (lightboxContent && imgEl) {
          // Clone the image/placeholder for lightbox
          var clone = imgEl.cloneNode(true);
          clone.style.transform = 'none';
          lightboxContent.innerHTML = '';
          lightboxContent.appendChild(clone);

          if (lightboxCaption && caption) {
            lightboxCaption.textContent = caption.textContent;
            lightboxContent.appendChild(lightboxCaption);
          }
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // ── Navbar hide/show on scroll ──
  var navbar = document.querySelector('.navbar');
  var lastScrollY = 0;
  if (navbar) {
    window.addEventListener('scroll', function () {
      var currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        navbar.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      navbar.style.transition = 'transform 0.3s ease';
      lastScrollY = currentScrollY;
    });
  }

})();
