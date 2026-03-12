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
    closeStats();
  }
});

/* ---------- PLAYER STATS MODAL ---------- */

// Player stats data
const playerStats = {
  'Numaruel': {
    game: 'valorant',
    role: 'IGL',
    useTracker: true,
    trackerLink: 'https://tracker.gg/valorant/profile/riot/numaruell%236969/overview?platform=pc&playlist=competitive&season=3ea2b318-423b-cf86-25da-7cbb0eefbe2d'
  },
  'marVxos': {
    game: 'valorant',
    role: 'Duelist',
    stats: {
      'K/D Ratio': '1.32',
      'Headshot %': '18.5%',
      'Win Rate': '52.3%',
      'Avg Combat Score': '245',
      'Matches Played': '487'
    }
  },
  'edii': {
    game: 'valorant',
    role: 'Controller',
    stats: {
      'K/D Ratio': '1.18',
      'Headshot %': '14.2%',
      'Win Rate': '51.8%',
      'Avg Combat Score': '198',
      'Matches Played': '512'
    }
  },
  'goonerJ67': {
    game: 'valorant',
    role: 'Smoker',
    stats: {
      'K/D Ratio': '1.25',
      'Headshot %': '16.7%',
      'Win Rate': '50.9%',
      'Avg Combat Score': '215',
      'Matches Played': '468'
    }
  },
  'ItzReallyMario': {
    game: 'valorant',
    role: 'Fragger',
    stats: {
      'K/D Ratio': '1.45',
      'Headshot %': '21.3%',
      'Win Rate': '54.1%',
      'Avg Combat Score': '268',
      'Matches Played': '521'
    }
  },
  'solak': {
    game: 'brawlstars',
    role: 'Vice President',
    stats: {
      'All-Time High': '100,002',
      'Current Trophies': '95,161',
      'Highest Rank': '9,147',
      '3vs3 Victories': '19,279',
      'Win Streak': '94'
    }
  }
};

/**
 * Shows player stats modal
 * @param {string} playerName - Name of the player
 * @param {string} game - 'valorant' or 'brawlstars'
 */
function showPlayerStats(playerName, game) {
  const data = playerStats[playerName];
  if (!data) return;

  const statsOverlay = document.getElementById('modal-stats');
  const statsHeader = document.getElementById('stats-header');
  const statsPlayerName = document.getElementById('stats-player-name');
  const statsTrackerLink = document.getElementById('stats-tracker-link');
  const statsDisplay = document.getElementById('stats-display');

  // Set header color based on game
  if (game === 'valorant') {
    statsHeader.style.background = 'linear-gradient(135deg, #1DA1FF 0%, #0A6CFF 100%)';
  } else {
    statsHeader.style.background = 'linear-gradient(135deg, #FF006E 0%, #C30450 100%)';
  }

  // Set player name and role
  statsPlayerName.textContent = playerName + ' — ' + data.role;

  // Handle tracker link or fake stats
  if (data.useTracker) {
    statsTrackerLink.innerHTML = `<p style="margin-bottom: 15px; text-align: center;"><a href="${data.trackerLink}" target="_blank" style="color: #1DA1FF; text-decoration: none; font-weight: bold;">📊 View Full Stats on Tracker.gg</a></p>`;
    statsDisplay.innerHTML = '<p style="text-align: center; color: #aaa;">Click the link above to view detailed competitive statistics.</p>';
  } else {
    statsTrackerLink.innerHTML = '';
    let statsHTML = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">';
    for (const [key, value] of Object.entries(data.stats)) {
      statsHTML += `
        <div style="background: rgba(29, 161, 255, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #1DA1FF;">
          <p style="margin: 0; font-size: 12px; color: #aaa; text-transform: uppercase;">${key}</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #1DA1FF;">${value}</p>
        </div>
      `;
    }
    statsHTML += '</div>';
    statsDisplay.innerHTML = statsHTML;
  }

  statsOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the player stats modal
 */
function closeStats() {
  const statsOverlay = document.getElementById('modal-stats');
  if (!statsOverlay) return;
  statsOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

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
