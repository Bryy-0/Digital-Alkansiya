// --- Navigation & Menu ---
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const icon = document.getElementById('hamburger-icon');
    menu.classList.toggle('active');
    icon.classList.toggle('open');
}

// --- Jar & Milestone Logic ---
const goal = 1000;
const totalBadges = 7;

// 1. Load the saved amount from the browser's memory, or start at 0
let currentSaved = parseInt(localStorage.getItem('savedAmount')) || 0;

function updateUI() {
    // Update Text
    document.getElementById('current-val').innerText = currentSaved;
    
    // Update Jar Liquid Fill
    const percent = (currentSaved / goal) * 100;
    document.getElementById('liquid-fill').style.height = percent + "%";
    
    // Update Milestone Badges
    updateBadges();
}

function updateBadges() {
    const badgeRow = document.getElementById('badge-row');
    if(!badgeRow) return;
    badgeRow.innerHTML = ''; 
    
    const milestonesReached = Math.floor((currentSaved / goal) * totalBadges);

    for (let i = 0; i < totalBadges; i++) {
        const dot = document.createElement('div');
        dot.classList.add('badge-dot');
        if (i < milestonesReached) {
            dot.classList.add('active');
        }
        badgeRow.appendChild(dot);
    }
}

// THE NEW REDIRECT LOGIC
function addDonation() {
    if (currentSaved < goal) {
        // Calculate new total
        let newTotal = currentSaved + 150;
        if (newTotal > goal) newTotal = goal;
        
        // Save the NEW total to localStorage so home.html can read it later
        localStorage.setItem('savedAmount', newTotal);
        
        // Redirect to your success page
        window.location.href = 'redirect.html';
    }
}

// Initialize the UI when the page opens
window.onload = updateUI;