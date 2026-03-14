/* ========== CIRO ESPORTS - PREMIUM SCRIPT ========== */

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Close menu when close button is clicked
const navClose = document.getElementById('navClose');
if (navClose) {
  navClose.addEventListener('click', () => navLinks.classList.remove('open'));
}

/* ---------- FADE-IN ON SCROLL ---------- */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

/* ---------- SMOOTH SCROLL NAVBAR ---------- */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.7)';
    navbar.style.boxShadow = 'none';
  }
});

/* ---------- PLAYER STATS MODAL ---------- */

// Player stats data
const playerStats = {
  'Numaruel': {
    game: 'valorant',
    role: 'IGL',
    age: 24,
    nationality: 'Spain',
    signatureMove: 'Sage Teleport Plays',
    useTracker: true,
    trackerLink: 'https://tracker.gg/valorant/profile/riot/numaruell%236969/overview?platform=pc&playlist=competitive&season=3ea2b318-423b-cf86-25da-7cbb0eefbe2d'
  },
  'marVxos': {
    game: 'valorant',
    role: 'Duelist',
    age: 22,
    nationality: 'Portugal',
    signatureMove: 'Raze Satchel Rush',
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
    age: 25,
    nationality: 'Germany',
    signatureMove: 'Viper Lineups',
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
    age: 23,
    nationality: 'France',
    signatureMove: 'Omen Teleport Escapes',
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
    age: 21,
    nationality: 'Italy',
    signatureMove: 'Jett Dash Duels',
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
    age: 26,
    nationality: 'Turkey',
    signatureMove: 'Aggressive Brawler Play',
    stats: {
      'All-Time High': '100,002',
      'Current Trophies': '95,161',
      'Highest Rank': '9,147',
      '3vs3 Victories': '19,279',
      'Win Streak': '94'
    }
  },
  'rezon': {
    game: 'brawlstars',
    role: 'Member',
    age: 20,
    nationality: 'Poland',
    signatureMove: 'Mortis Combo Master',
    stats: {
      'All-Time High': '57,450',
      'Current Trophies': '52,360',
      'Highest Rank': '13,016',
      '3vs3 Victories': '25,680',
      'Win Streak': '85'
    }
  }
};

/**
 * Shows player stats modal with full-screen Information Age design
 * @param {string} playerName - Name of the player
 * @param {string} game - 'valorant' or 'brawlstars'
 */
function showPlayerStats(playerName, game) {
  const data = playerStats[playerName];
  if (!data) return;

  const statsOverlay = document.getElementById('modal-stats');
  const accentColor = game === 'valorant' ? '#1DA1FF' : '#FF006E';

  // Build full-screen player card HTML
  let playerCardHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,10,30,0.95) 100%); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.4s ease-out; overflow-y: auto;">
      <div style="position: relative; width: 90%; max-width: 900px; background: rgba(10, 10, 20, 0.85); backdrop-filter: blur(20px); border: 2px solid ${accentColor}; border-radius: 20px; padding: 50px; box-shadow: 0 0 60px ${accentColor}40, inset 0 0 30px rgba(255,255,255,0.05); animation: slideUp 0.5s ease-out; margin: 50px auto;">
        <!-- Close Button -->
        <button onclick="document.getElementById('modal-stats').classList.remove('active')" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); border: 1px solid ${accentColor}; color: ${accentColor}; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; z-index: 10000;" onmouseover="this.style.background='${accentColor}20'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1)'">✕</button>
        
        <!-- Player Header -->
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid ${accentColor}; padding-bottom: 30px;">
          <h1 style="margin: 0 0 10px 0; font-size: 48px; font-weight: 900; color: ${accentColor}; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 30px ${accentColor}40;">${playerName}</h1>
          <p style="margin: 0; font-size: 18px; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">${data.role}</p>
        </div>
        
        <!-- Player Information Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 35px;">
          <div style="background: linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%); padding: 20px; border-radius: 12px; border-left: 4px solid ${accentColor}; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Age</p>
            <p style="margin: 0; font-size: 32px; font-weight: 900; color: ${accentColor};">${data.age}</p>
          </div>
          <div style="background: linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%); padding: 20px; border-radius: 12px; border-left: 4px solid ${accentColor}; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Nationality</p>
            <p style="margin: 0; font-size: 28px; font-weight: 900; color: ${accentColor};">${data.nationality}</p>
          </div>
          <div style="background: linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%); padding: 20px; border-radius: 12px; border-left: 4px solid ${accentColor}; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Signature Move</p>
            <p style="margin: 0; font-size: 16px; font-weight: 700; color: ${accentColor};">${data.signatureMove}</p>
          </div>
        </div>
        
        <!-- Performance Stats -->
        <div style="margin-top: 35px;">
          <h3 style="margin: 0 0 20px 0; font-size: 16px; color: #aaa; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Performance Stats</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">`;
  
  if (data.useTracker) {
    playerCardHTML += `
      <div style="grid-column: 1 / -1; text-align: center; padding: 30px;">
        <p style="margin: 0 0 15px 0; font-size: 16px; color: #ccc;">📊 View Full Stats on Tracker.gg</p>
        <a href="${data.trackerLink}" target="_blank" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s; box-shadow: 0 0 20px ${accentColor}40;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 30px ${accentColor}60'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 20px ${accentColor}40'">Open Tracker.gg</a>
      </div>
    `;
  } else {
    for (const [key, value] of Object.entries(data.stats)) {
      playerCardHTML += `
        <div style="background: linear-gradient(135deg, ${accentColor}10 0%, ${accentColor}02 100%); padding: 15px; border-radius: 10px; border: 1px solid ${accentColor}30; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">${key}</p>
          <p style="margin: 0; font-size: 24px; font-weight: 900; color: ${accentColor}; text-shadow: 0 0 15px ${accentColor}30;">${value}</p>
        </div>
      `;
    }
  }
  
  playerCardHTML += `
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    </style>
  `;
  
  statsOverlay.innerHTML = playerCardHTML;
  statsOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the player stats modal
 */
function closePlayerStats() {
  const statsOverlay = document.getElementById('modal-stats');
  statsOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const statsOverlay = document.getElementById('modal-stats');
  if (e.target === statsOverlay) {
    closePlayerStats();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePlayerStats();
  }
});


/* ---------- ROSTER MODAL FUNCTIONS ---------- */

/**
 * Opens the roster modal for a specific game
 * @param {string} game - 'valorant' or 'brawlstars'
 */
function openRoster(game) {
  const modal = document.getElementById(`modal-${game}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Closes the roster modal for a specific game
 * @param {string} game - 'valorant' or 'brawlstars'
 */
function closeRoster(game) {
  const modal = document.getElementById(`modal-${game}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/**
 * Closes player stats modal
 */
function closeStats() {
  const statsOverlay = document.getElementById('modal-stats');
  if (statsOverlay) {
    statsOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}


/* ---------- MATCH HISTORY TAB SWITCHING ---------- */

/**
 * Switches between match history tabs
 * @param {string} game - 'valorant' or 'brawlstars'
 */
function switchMatchTab(game) {
  // Hide all tables
  const valorantTable = document.getElementById('valorant-matches');
  const brawlstarsTable = document.getElementById('brawlstars-matches');
  
  if (valorantTable) valorantTable.style.display = 'none';
  if (brawlstarsTable) brawlstarsTable.style.display = 'none';
  
  // Show selected table
  if (game === 'valorant' && valorantTable) {
    valorantTable.style.display = 'table';
  } else if (game === 'brawlstars' && brawlstarsTable) {
    brawlstarsTable.style.display = 'table';
  }
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = Array.from(tabButtons).find(btn => 
    btn.textContent.toLowerCase().includes(game === 'valorant' ? 'valorant' : 'brawl')
  );
  if (activeBtn) activeBtn.classList.add('active');
}


/* ---------- PLAYER PROFILE DATA ---------- */

const playerProfiles = {
  numaruel: {
    name: 'Numaruel',
    role: 'IGL • IN-GAME LEADER',
    icon: '🛡️',
    iconColor: 'rgba(200,50,80,0.3)',
    iconBorder: 'rgba(255, 107, 53, 0.5)',
    age: 19,
    country: '🇪🇸',
    countryName: 'Spain',
    main: 'Sage',
    level: 156,
    peakRank: 'Diamond',
    currentRank: 'Platinum',
    about: 'The strategic mind. Numaruel has been calling strats since age 14. Born with a tactical mind that sees the map like a chess board, he leads the team through every clutch moment with ice in his veins. His calls have secured countless round wins and his presence calms the team when chaos strikes.'
  },
  marvxos: {
    name: 'marVxos',
    role: 'DUE • DUELIST',
    icon: '🔥',
    iconColor: 'rgba(200,100,50,0.3)',
    iconBorder: 'rgba(255, 107, 53, 0.5)',
    age: 21,
    country: '🇵🇹',
    countryName: 'Portugal',
    main: 'Raze',
    level: 77,
    peakRank: 'Platinum',
    currentRank: 'Platinum',
    about: 'Aggressive and fearless. marVxos opens sites and secures kills with unmatched confidence. Known for his explosive plays and ability to create space for the team, he is the entry fragger who never backs down. His confidence is contagious and his impact is undeniable.'
  },
  solak: {
    name: 'solak',
    role: 'BST • BRAWL STARS',
    icon: '⭐',
    iconColor: 'rgba(100,50,150,0.3)',
    iconBorder: 'rgba(255, 107, 53, 0.5)',
    age: 18,
    country: '🇪🇸',
    countryName: 'Spain',
    main: 'Shelly',
    about: 'Rising star in Brawl Stars. solak climbs ranks with strategy and clutch plays when it matters most. His game sense is exceptional for his age, and he continues to improve with every match. A dedicated player who brings energy and passion to the team.'
  },
  coach: {
    name: 'Coach',
    role: 'MGR • TEAM MANAGER',
    icon: '📋',
    iconColor: 'rgba(50,100,200,0.3)',
    iconBorder: 'rgba(255, 107, 53, 0.5)',
    age: 28,
    country: '🇪🇸',
    countryName: 'Spain',
    main: 'Strategy',
    about: 'Guides the team to victory. Coach is a strategist and mentor who ensures every player reaches their peak potential. With years of competitive experience, he brings structure, discipline, and a winning mentality to Ciro Esports. His leadership is the backbone of the organization.'
  },
  edii: {
    name: 'edii',
    role: 'CTR • CONTROLLER',
    icon: '🌀',
    iconColor: 'rgba(0,217,255,0.3)',
    iconBorder: 'rgba(0, 217, 255, 0.5)',
    age: 20,
    country: '🇩🇪',
    countryName: 'Germany',
    main: 'Viper',
    level: 86,
    peakRank: 'Diamond',
    currentRank: 'Platinum',
    about: 'Master of smoke and control. edii excels at setting up defensive positions and creating safe spaces for the team. His utility usage is precise and his map control is exceptional. A steady presence that anchors Valorant rounds.'
  },
  goonerj67: {
    name: 'goonerJ67',
    role: 'SMK • SMOKER',
    icon: '💨',
    iconColor: 'rgba(255, 184, 28, 0.3)',
    iconBorder: 'rgba(255, 184, 28, 0.5)',
    age: 19,
    country: '🇬🇧',
    countryName: 'United Kingdom',
    main: 'Omen',
    level: 50,
    peakRank: 'Platinum',
    currentRank: 'Gold',
    about: 'Smoke specialist with incredible game sense. goonerJ67 controls the tempo of rounds with perfectly timed smokes and rotations. His ability to read the enemy and adapt is unmatched. A crucial piece of the Valorant roster.'
  },
  itzmario: {
    name: 'ItzReallyMario',
    role: 'FRG • FRAGGER',
    icon: '⚡',
    iconColor: 'rgba(0, 255, 0, 0.3)',
    iconBorder: 'rgba(0, 255, 0, 0.5)',
    age: 21,
    country: '🇮🇹',
    countryName: 'Italy',
    main: 'Jett',
    level: 31,
    peakRank: 'Gold',
    currentRank: 'Gold',
    about: 'High-impact fragger with explosive potential. ItzReallyMario brings raw firepower and mechanical skill to every round. His aggressive plays create opportunities for the team and his clutch moments have secured countless victories.'
  },
  rezon: {
    name: 'rezon',
    role: 'BST • BRAWL STARS',
    icon: '🎯',
    iconColor: 'rgba(255, 149, 0, 0.3)',
    iconBorder: 'rgba(255, 149, 0, 0.5)',
    age: 17,
    country: '🇪🇸',
    countryName: 'Spain',
    main: 'Colt',
    about: 'Young and talented Brawl Stars player. rezon shows incredible promise with sharp mechanical skills and strong game awareness. Despite his age, he competes at the highest level and continues to develop his craft.'
  }
};

/* ---------- PLAYER PROFILE FUNCTIONS ---------- */

/**
 * Opens the player profile modal with specific player data
 * @param {string} playerKey - Key from playerProfiles object
 */
function openPlayerProfile(playerKey) {
  const player = playerProfiles[playerKey];
  if (!player) return;
  
  const modal = document.getElementById('player-profile-modal');
  const iconContainer = document.getElementById('profile-icon-container');
  const roleEl = document.getElementById('profile-role');
  const nameEl = document.getElementById('profile-name');
  const detailsEl = document.getElementById('profile-details');
  const aboutEl = document.getElementById('about-text');
  const iconEl = document.getElementById('profile-icon');
  const levelEl = document.getElementById('profile-level');
  const peakRankEl = document.getElementById('profile-peak-rank');
  const currentRankEl = document.getElementById('profile-current-rank');
  
  // Update icon container background
  iconContainer.style.background = `linear-gradient(135deg, ${player.iconColor} 0%, rgba(150,30,60,0.1) 100%)`;
  iconContainer.style.borderColor = player.iconBorder;
  
  // Update content
  iconEl.textContent = player.icon;
  roleEl.textContent = player.role;
  nameEl.textContent = player.name;
  detailsEl.textContent = `Age: ${player.age} • ${player.country} ${player.countryName} • Main: ${player.main}`;
  
  // Update rank stats if available
  if (player.level) levelEl.textContent = player.level;
  if (player.peakRank) peakRankEl.textContent = player.peakRank;
  if (player.currentRank) currentRankEl.textContent = player.currentRank;
  
  aboutEl.textContent = player.about;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the player profile modal
 */
function closePlayerProfile() {
  const modal = document.getElementById('player-profile-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* ---------- DOUBLE-CLICK HANDLERS FOR TEAM CARDS ---------- */

// Initialize double-click handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const teamCards = document.querySelectorAll('.team-card-modern');
  
  teamCards.forEach((card, index) => {
    const playerKeys = ['numaruel', 'marvxos', 'solak', 'coach'];
    const playerKey = playerKeys[index];
    
    card.addEventListener('dblclick', function() {
      openPlayerProfile(playerKey);
    });
  });
});

// Close profile when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('player-profile-modal');
  if (e.target === modal) {
    closePlayerProfile();
  }
});
