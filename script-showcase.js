const API_BASE = "https://www.thesportsdb.com/api/v1/json/123";

// DOM Elements
const sportsGrid = document.getElementById('sports-grid');
const playerSearchInput = document.getElementById('player-search-input');
const playerSearchBtn = document.getElementById('player-search-btn');
const athleteDisplay = document.getElementById('athlete-display');
const leagueDisplay = document.getElementById('league-display');
const langSelect = document.getElementById('lang-select');

// State for language toggle
let currentLeagueData = null;

/**
 * Utility function for API fetching with error handling
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

/**
 * 1. Fetch and display all sports in a horizontal grid
 */
async function loadSportsGrid() {
    const data = await fetchData(`${API_BASE}/all_sports.php`);
    
    if (!data || !data.sports) {
        sportsGrid.innerHTML = '<p class="error-msg">Failed to load sports data.</p>';
        return;
    }

    sportsGrid.innerHTML = '';
    data.sports.forEach(sport => {
        const sportCard = document.createElement('div');
        sportCard.className = 'sport-card';
        sportCard.style.backgroundImage = `url(${sport.strSportThumb})`;
        
        sportCard.innerHTML = `
            <img src="${sport.strSportIconGreen}" class="sport-icon" alt="${sport.strSport} icon">
            <div class="sport-name-overlay">${sport.strSport}</div>
        `;
        sportsGrid.appendChild(sportCard);
    });
}

/**
 * 2. Search for a player and display the "Hologram Card"
 */
async function searchPlayer() {
    const playerName = playerSearchInput.value.trim();
    if (!playerName) return;

    athleteDisplay.innerHTML = '<p class="status-msg">Searching...</p>';

    const data = await fetchData(`${API_BASE}/searchplayers.php?p=${encodeURIComponent(playerName)}`);

    if (!data || !data.player) {
        athleteDisplay.innerHTML = '<p class="error-msg">No player found. Try searching for "Danny Welbeck" or "Lionel Messi".</p>';
        return;
    }

    const player = data.player[0];
    const thumb = player.strThumb || 'https://via.placeholder.com/400x300?text=No+Image';
    const cutout = player.strCutout || '';

    athleteDisplay.innerHTML = `
        <div class="hologram-card">
            <div class="hologram-bg" style="background-image: url(${thumb})"></div>
            <div class="hologram-content">
                ${cutout ? `<img src="${cutout}" class="hologram-cutout" alt="${player.strPlayer}">` : ''}
                <div class="player-info">
                    <h3>${player.strPlayer}</h3>
                    <p><strong>Team:</strong> ${player.strTeam || 'N/A'}</p>
                    <p><strong>Nationality:</strong> ${player.strNationality || 'N/A'}</p>
                    <p><strong>Position:</strong> ${player.strPosition || 'N/A'}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * 3. Load featured league and handle multilingual description
 */
async function loadFeaturedLeague(leagueId = '4328') { // Default to EPL
    const data = await fetchData(`${API_BASE}/lookupleague.php?id=${leagueId}`);

    if (!data || !data.leagues) {
        leagueDisplay.innerHTML = '<p class="error-msg">Failed to load league data.</p>';
        return;
    }

    currentLeagueData = data.leagues[0];
    renderLeague();
}

function renderLeague() {
    if (!currentLeagueData) return;

    const selectedLang = langSelect.value; // EN, ES, FR, etc.
    const descriptionKey = `strDescription${selectedLang}`;
    // Fallback to English if the selected language description is empty
    const description = currentLeagueData[descriptionKey] || currentLeagueData['strDescriptionEN'] || "No description available in this language.";

    leagueDisplay.innerHTML = `
        <div class="league-banner-wrapper">
            <img src="${currentLeagueData.strBanner}" class="league-banner" alt="${currentLeagueData.strLeague} Banner">
            <img src="${currentLeagueData.strBadge}" class="league-badge" alt="${currentLeagueData.strLeague} Badge">
        </div>
        <div class="league-details">
            <h3>${currentLeagueData.strLeague}</h3>
            <p class="league-country"><strong>Country:</strong> ${currentLeagueData.strCountry}</p>
            <div class="league-description">${description}</div>
        </div>
    `;
}

// Event Listeners
playerSearchBtn.addEventListener('click', searchPlayer);
playerSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPlayer();
});
langSelect.addEventListener('change', renderLeague);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSportsGrid();
    loadFeaturedLeague();
});
