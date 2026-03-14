/* ========== CIRO ESPORTS - REPLYTOTEM INSPIRED SCRIPT ========== */

/* ---------- MOBILE NAVIGATION TOGGLE ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* ---------- NEWS CAROUSEL FUNCTIONALITY ---------- */
const newsGrid = document.getElementById('newsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (newsGrid && prevBtn && nextBtn) {
  const cardWidth = 350; // Width of each card + gap
  let scrollPosition = 0;

  prevBtn.addEventListener('click', () => {
    scrollPosition = Math.max(0, scrollPosition - cardWidth);
    newsGrid.scrollLeft = scrollPosition;
  });

  nextBtn.addEventListener('click', () => {
    const maxScroll = newsGrid.scrollWidth - newsGrid.clientWidth;
    scrollPosition = Math.min(maxScroll, scrollPosition + cardWidth);
    newsGrid.scrollLeft = scrollPosition;
  });
}

/* ---------- SMOOTH SCROLL FOR NAVIGATION LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(29, 161, 255, 0.2)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = 'none';
  }

  lastScrollY = currentScroll;
});

/* ---------- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards for fade-in effect
document.querySelectorAll('.news-card, .team-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});

/* ---------- DYNAMIC NEWS CAROUSEL SCROLL INDICATOR ---------- */
if (newsGrid) {
  newsGrid.addEventListener('scroll', () => {
    const maxScroll = newsGrid.scrollWidth - newsGrid.clientWidth;
    const currentScroll = newsGrid.scrollLeft;

    // Disable prev button at start
    if (currentScroll <= 0) {
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.cursor = 'pointer';
    }

    // Disable next button at end
    if (currentScroll >= maxScroll - 10) {
      nextBtn.style.opacity = '0.5';
      nextBtn.style.cursor = 'not-allowed';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }
  });

  // Trigger initial state
  newsGrid.dispatchEvent(new Event('scroll'));
}

/* ---------- HOVER EFFECTS FOR INTERACTIVE ELEMENTS ---------- */
document.querySelectorAll('.news-card, .team-card, .apply-btn, .team-btn, .view-all-btn').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

/* ---------- KEYBOARD NAVIGATION FOR CAROUSEL ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && prevBtn) {
    prevBtn.click();
  } else if (e.key === 'ArrowRight' && nextBtn) {
    nextBtn.click();
  }
});

/* ---------- ACTIVE LINK HIGHLIGHTING ---------- */
const updateActiveLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = 'var(--text-light)';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary-blue)';
      link.style.textShadow = '0 0 10px rgba(29, 161, 255, 0.5)';
    }
  });
};

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

/* ---------- RESPONSIVE CAROUSEL ADJUSTMENT ---------- */
const adjustCarouselForMobile = () => {
  if (window.innerWidth <= 768) {
    // On mobile, show one card at a time
    if (newsGrid) {
      newsGrid.style.gridTemplateColumns = '1fr';
    }
  } else {
    // On desktop, show three cards
    if (newsGrid) {
      newsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
  }
};

window.addEventListener('resize', adjustCarouselForMobile);
adjustCarouselForMobile();

/* ---------- CONSOLE MESSAGE ---------- */
console.log('%c🎮 CIRO ESPORTS 🎮', 'font-size: 20px; font-weight: bold; color: #1DA1FF; text-shadow: 0 0 10px rgba(29, 161, 255, 0.5);');
console.log('%cCompete • Dominate • Conquer', 'font-size: 14px; color: #00D9FF;');
