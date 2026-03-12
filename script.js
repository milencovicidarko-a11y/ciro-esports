/* ============================================================
   CIRO ESPORTS — MAIN JAVASCRIPT
   ============================================================ */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- FADE-IN ON SCROLL ---------- */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 100;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

/* ---------- ROSTER MODAL (DOUBLE-CLICK) ---------- */

/**
 * Opens the roster modal for a given game.
 * @param {string} game  - 'valorant' or 'brawlstars'
 */
function openRoster(game) {
  const overlay = document.getElementById('modal-' + game);
  if (!overlay) return;

  // Animate card flash
  const card = document.getElementById('card-' + game);
  if (card) {
    card.style.transition = 'box-shadow 0.15s ease';
    card.style.boxShadow = '0 0 0 3px #1DA1FF, 0 0 40px rgba(29,161,255,0.5)';
    setTimeout(() => {
      card.style.boxShadow = '';
    }, 400);
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the roster modal for a given game.
 * @param {string} game  - 'valorant' or 'brawlstars'
 */
function closeRoster(game) {
  const overlay = document.getElementById('modal-' + game);
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRoster('valorant');
    closeRoster('brawlstars');
  }
});

/* ---------- SMOOTH ACTIVE NAV HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active-nav');
    }
  });
});
