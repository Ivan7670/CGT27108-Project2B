// ALL CODE IS AI GENERATED UNLESS THERE IS A COMMENT DISCUSSING CHANGES OR ADDITIONS //
// Map page specific JavaScript

let currentZoom = 1;
let isPanning = false;
let startX, startY;
let currentX = 0, currentY = 0;

// Initialize map with dots on flight paths
function initializeMap() {
    const mapSvg = document.getElementById('mapSvg');
    if (!mapSvg || mapSvg.innerHTML) return;

    const mapWidth = 1200;
    const mapHeight = 700;

    // Create SVG with flight paths and dots
    mapSvg.innerHTML = `
        <!-- Ocean background -->
        <rect width="${mapWidth}" height="${mapHeight}" fill="#e3f2fd"/>
        
        <!-- Continents (realistic world map with proper spacing) -->
        <g fill="#81c784" stroke="#66bb6a" stroke-width="1.5" opacity="0.85">
            <!-- North America - Wider, more realistic -->
            <path d="M 80,120 L 120,100 L 180,90 L 260,85 L 340,90 L 420,105 L 480,135 L 520,175 L 540,225 L 535,275 L 520,320 L 490,355 L 450,375 L 400,380 L 340,375 L 280,365 L 220,350 L 170,325 L 130,290 L 100,250 L 85,200 L 80,160 Z"/>
            <!-- Mexico/Central America -->
            <path d="M 220,320 L 260,315 L 300,325 L 320,345 L 315,365 L 290,370 L 250,365 L 220,350 Z"/>
            <!-- South America - Well separated, elongated -->
            <path d="M 300,320 L 340,310 L 380,315 L 410,340 L 425,380 L 430,420 L 425,460 L 410,500 L 385,535 L 355,560 L 320,570 L 285,565 L 255,540 L 235,500 L 230,460 L 235,420 L 250,380 L 275,350 Z"/>
            <!-- Europe - Better positioned -->
            <path d="M 520,100 L 580,95 L 640,100 L 680,120 L 700,150 L 695,185 L 675,215 L 645,235 L 610,240 L 575,235 L 545,220 L 525,195 L 515,160 L 520,130 Z"/>
            <!-- Iberian Peninsula -->
            <path d="M 520,200 L 550,195 L 565,210 L 560,230 L 540,235 L 525,225 Z"/>
            <!-- Italy -->
            <path d="M 600,210 L 620,205 L 625,225 L 620,240 L 605,245 L 595,235 Z"/>
            <!-- Scandinavia -->
            <path d="M 640,60 L 680,55 L 700,70 L 695,90 L 675,100 L 650,95 L 635,80 Z"/>
            <!-- Africa - Better shape and spacing -->
            <path d="M 560,200 L 620,195 L 680,210 L 720,250 L 740,300 L 750,350 L 745,400 L 735,450 L 715,495 L 685,525 L 650,535 L 615,530 L 585,510 L 565,480 L 555,440 L 550,400 L 552,360 L 558,320 L 560,280 L 558,240 Z"/>
            <!-- Horn of Africa -->
            <path d="M 740,280 L 760,275 L 770,290 L 765,310 L 750,315 L 740,300 Z"/>
            <!-- Asia - Much larger, well spaced -->
            <path d="M 720,80 L 800,70 L 900,65 L 1000,75 L 1080,100 L 1140,140 L 1160,190 L 1155,250 L 1135,300 L 1100,335 L 1055,350 L 1005,345 L 955,330 L 910,305 L 875,275 L 850,240 L 835,205 L 830,170 L 735,120 Z"/>
            <!-- India -->
            <path d="M 900,240 L 950,235 L 970,255 L 975,285 L 965,305 L 940,310 L 920,295 L 905,275 Z"/>
            <!-- Southeast Asia -->
            <path d="M 1000,280 L 1040,275 L 1060,295 L 1055,315 L 1035,320 L 1015,310 L 1005,295 Z"/>
            <!-- Australia - Better positioned -->
            <path d="M 1000,400 L 1080,395 L 1120,410 L 1140,440 L 1135,480 L 1110,505 L 1070,510 L 1030,495 L 1005,460 L 1000,430 Z"/>
            <!-- New Zealand -->
            <path d="M 1160,500 L 1180,495 L 1190,515 L 1185,535 L 1170,540 L 1160,525 Z"/>
            <!-- Greenland -->
            <path d="M 380,40 L 480,35 L 540,50 L 560,80 L 550,110 L 500,120 L 440,115 L 390,100 L 370,75 Z"/>
            <!-- Japan -->
            <path d="M 1100,200 L 1120,195 L 1130,215 L 1125,235 L 1110,240 L 1100,225 Z"/>
            <!-- British Isles -->
            <path d="M 540,140 L 560,138 L 570,148 L 565,158 L 550,160 L 540,152 Z"/>
            <!-- Iceland -->
            <path d="M 500,70 L 520,68 L 525,78 L 520,85 L 505,87 L 500,80 Z"/>
            <!-- Madagascar -->
            <path d="M 780,420 L 800,415 L 810,435 L 805,455 L 790,460 L 780,445 Z"/>
            <!-- Indonesia -->
            <path d="M 1020,320 L 1040,315 L 1050,335 L 1045,355 L 1030,360 L 1020,345 Z"/>
            <path d="M 1040,340 L 1060,335 L 1070,355 L 1065,375 L 1050,380 L 1040,365 Z"/>
        </g>
        
        <!-- Mountain ranges for detail -->
        <g stroke="#5a7c5a" stroke-width="1" fill="none" opacity="0.4">
            <path d="M 250,200 L 280,190 L 300,195 L 320,200"/>
            <path d="M 600,250 L 630,240 L 650,245 L 670,250"/>
            <path d="M 750,180 L 780,175 L 800,180 L 820,185"/>
        </g>
        
        <!-- Flight paths -->
        <g stroke="#4a90e2" stroke-width="2" fill="none" opacity="0.6" id="flightPaths">
            ${photos.map((p, i) => {
                const startX = i % 2 === 0 ? 200 : 600;
                const startY = 200 + (i * 10) % 100;
                return `<path d="M ${startX},${startY} Q ${(startX + p.cx) / 2},${(startY + p.cy) / 2 - 50} ${p.cx},${p.cy}" stroke-dasharray="5,5"><animate attributeName="stroke-dashoffset" from="0" to="-100" dur="3s" repeatCount="indefinite"/></path>`;
            }).join('')}
        </g>
        
        <!-- Photo dots -->
        <g id="photoDots">
            ${photos.map(p => `
                <g class="photo-dot" data-seat="${p.seat}" data-route="${p.route}" data-author="${p.author}" data-image="${p.image}" data-id="${p.id}">
                    <circle cx="${p.cx}" cy="${p.cy}" r="8" fill="#4a90e2" stroke="#ffffff" stroke-width="2" style="cursor: pointer;">
                        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                </g>
            `).join('')}
        </g>
    `;
    
    setupMapTooltips();
}

// Setup map tooltips for dots
function setupMapTooltips() {
    const mapContainer = document.getElementById('flightMapContainer');
    const tooltip = document.createElement('div');
    tooltip.className = 'photo-tooltip';
    tooltip.id = 'photoTooltip';
    tooltip.innerHTML = `
        <img id="tooltipImage" src="" alt="">
        <div style="font-size: 0.85rem; color: #1a1a1a;">
            <div id="tooltipRoute" style="font-weight: 600; color: #4a90e2; margin-bottom: 4px;"></div>
            <div id="tooltipAuthor"></div>
        </div>
    `;
    mapContainer.appendChild(tooltip);

    document.querySelectorAll('.photo-dot circle').forEach(circle => {
        const dot = circle.parentElement;
        
        circle.addEventListener('mouseenter', function() {
            const photoId = dot.getAttribute('data-id');
            const photo = photos.find(p => p.id === photoId);
            if (!photo) return;
            
            tooltip.querySelector('#tooltipImage').src = photo.image;
            tooltip.querySelector('#tooltipRoute').textContent = `Seat ${photo.seat} • ${photo.route}`;
            tooltip.querySelector('#tooltipAuthor').textContent = `by ${photo.author}`;
            tooltip.classList.add('show');
        });

        circle.addEventListener('mousemove', function(e) {
            const rect = mapContainer.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 20) + 'px';
            tooltip.style.top = (e.clientY - rect.top + 20) + 'px';
        });

        circle.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });

        circle.addEventListener('click', function() {
            const photoId = dot.getAttribute('data-id');
            const photo = photos.find(p => p.id === photoId);
            if (photo) {
                showImageDetail(photo);
            }
        });
    });
}

// Map zoom functions
function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.3, 3);
    updateTransform();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.3, 1);
    if (currentZoom === 1) {
        currentX = 0;
        currentY = 0;
    }
    updateTransform();
}

function resetZoom() {
    currentZoom = 1;
    currentX = 0;
    currentY = 0;
    updateTransform();
}

function updateTransform() {
    const mapSvg = document.getElementById('mapSvg');
    if (mapSvg) {
        mapSvg.style.transform = `scale(${currentZoom}) translate(${currentX}px, ${currentY}px)`;
        mapSvg.style.transformOrigin = '0 0';
    }
}

// Update map statistics
function updateMapStats() {
    const floatingRouteCount = document.getElementById('floatingRouteCount');
    const floatingPhotoCount = document.getElementById('floatingPhotoCount');
    
    const uniqueRoutes = new Set(photos.map(p => p.route));
    const routesCount = uniqueRoutes.size;
    const photosCount = photos.length;
    
    if (floatingRouteCount) floatingRouteCount.textContent = routesCount;
    if (floatingPhotoCount) floatingPhotoCount.textContent = photosCount;
}

// Populate location challenges
function populateChallenges() {
    const container = document.getElementById('challengesContainer');
    if (!container) return;

    container.innerHTML = challenges.map(challenge => {
        const progress = (challenge.current / challenge.target) * 100;
        const isComplete = challenge.current >= challenge.target;
        
        return `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="challenge-card ${isComplete ? 'border-success' : ''}">
                    <div class="challenge-header">
                        <div class="challenge-title">
                            <i class="bi ${challenge.icon}"></i> ${challenge.title}
                        </div>
                        ${isComplete ? '<span class="challenge-badge" style="background: #28a745;">Completed!</span>' : ''}
                    </div>
                    <div class="challenge-description">${challenge.description}</div>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                        </div>
                        <div style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">
                            ${challenge.current} / ${challenge.target} photos
                        </div>
                    </div>
                    <div class="challenge-prize">
                        <i class="bi bi-trophy-fill"></i>
                        <span>Prize: ${challenge.prize}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Populate personal challenges
function populatePersonalChallenges() {
    const container = document.getElementById('personalChallengesContainer');
    if (!container) return;

    container.innerHTML = personalChallenges.map(challenge => {
        const progress = challenge.progress || 0;
        const target = challenge.target || 1;
        const progressPercent = (progress / target) * 100;
        const isStarted = localStorage.getItem(`challenge-started-${challenge.id}`) === 'true';
        const isCompleted = challenge.completed;
        
        let badgeHtml = '';
        if (isCompleted) {
            badgeHtml = '<span class="challenge-badge" style="background: #28a745;">✓ Completed</span>';
        } else if (isStarted) {
            badgeHtml = '<span class="challenge-badge" style="background: #ffc107; color: #1a1a1a;">In Progress</span>';
        } else {
            badgeHtml = '<span class="challenge-badge" style="background: #4a90e2;">Start</span>';
        }
        
        return `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="personal-challenge-card ${isCompleted ? 'border-success' : ''}" onclick="${!isCompleted ? (isStarted ? `stopChallenge('${challenge.id}')` : `startChallenge('${challenge.id}')`) : ''}" style="${!isCompleted ? 'cursor: pointer;' : ''}">
                    <div class="challenge-header">
                        <div class="challenge-title">${challenge.title}</div>
                        ${badgeHtml}
                    </div>
                    <div class="challenge-description">${challenge.description}</div>
                    ${target > 1 ? `
                        <div class="challenge-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${Math.min(progressPercent, 100)}%"></div>
                            </div>
                            <div style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">
                                ${progress} / ${target}
                            </div>
                        </div>
                    ` : '<div style="min-height: 30px;"></div>'}
                    <div class="points-reward">
                        <i class="bi bi-star-fill"></i>
                        <span>Reward: ${challenge.points} points</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Helper function to create modal
function createModal(className, content) {
    const modal = document.createElement('div');
    modal.className = className;
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;';
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// Start a personal challenge
window.startChallenge = function(challengeId) {
    const challenge = personalChallenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;
    
    const isStarted = localStorage.getItem(`challenge-started-${challengeId}`) === 'true';
    if (isStarted) return;
    
    localStorage.setItem(`challenge-started-${challengeId}`, 'true');
    
    createModal('challenge-start-modal', `
        <div style="background: white; padding: 30px; border-radius: 16px; max-width: 500px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); position: relative;">
            <button onclick="this.closest('.challenge-start-modal').remove()" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 1.5rem; color: #6c757d; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s;" onmouseover="this.style.background='#f0f0f0'; this.style.color='#1a1a1a';" onmouseout="this.style.background='transparent'; this.style.color='#6c757d';">×</button>
            <h3 style="color: #4a90e2; margin-bottom: 15px;">🎯 Challenge Started!</h3>
            <p style="color: #495057; margin-bottom: 20px;"><strong>${challenge.title}</strong></p>
            <p style="color: #6c757d; margin-bottom: 20px;">${challenge.description}</p>
            <p style="color: #495057; margin-bottom: 20px;">Complete this challenge to earn <strong style="color: #4a90e2;">${challenge.points} points</strong>!</p>
            <button onclick="this.closest('.challenge-start-modal').remove()" style="background: #4a90e2; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%;">
                Got it!
            </button>
        </div>
    `);
    
    populatePersonalChallenges();
};

// Stop a personal challenge
window.stopChallenge = function(challengeId) {
    const challenge = personalChallenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    const isStarted = localStorage.getItem(`challenge-started-${challengeId}`) === 'true';
    if (!isStarted) return;
    
    createModal('challenge-stop-modal', `
        <div style="background: white; padding: 30px; border-radius: 16px; max-width: 500px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); position: relative;">
            <button onclick="this.closest('.challenge-stop-modal').remove()" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 1.5rem; color: #6c757d; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s;" onmouseover="this.style.background='#f0f0f0'; this.style.color='#1a1a1a';" onmouseout="this.style.background='transparent'; this.style.color='#6c757d';">×</button>
            <h3 style="color: #dc3545; margin-bottom: 15px;">⚠️ Stop Challenge?</h3>
            <p style="color: #495057; margin-bottom: 20px;"><strong>${challenge.title}</strong></p>
            <p style="color: #6c757d; margin-bottom: 20px;">Are you sure you want to stop this challenge? Your progress will be saved, but you'll need to start it again to continue.</p>
            <div style="display: flex; gap: 10px;">
                <button onclick="this.closest('.challenge-stop-modal').remove()" style="background: #6c757d; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1;">
                    Cancel
                </button>
                <button onclick="confirmStopChallenge('${challengeId}')" style="background: #dc3545; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1;">
                    Stop Challenge
                </button>
            </div>
        </div>
    `);
};

// Confirm stop challenge
window.confirmStopChallenge = function(challengeId) {
    // Remove started state from localStorage
    localStorage.removeItem(`challenge-started-${challengeId}`);
    
    // Close modal
    const modal = document.querySelector('.challenge-stop-modal');
    if (modal) {
        modal.remove();
    }
    
    // Refresh challenges display to show "Start" state again
    populatePersonalChallenges();
};

// Populate prize shop
function populatePrizeShop() {
    const container = document.getElementById('prizeShopItems');
    if (!container) return;

    container.innerHTML = prizeShop.map(prize => {
        const canAfford = userPoints >= prize.points;
        
        return `
            <div class="prize-item">
                <div>
                    <div class="prize-item-name">${prize.name}</div>
                    <div style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">${prize.description}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="prize-item-points">${prize.points} pts</div>
                    <button class="redeem-btn" onclick="redeemPrize('${prize.id}')" ${!canAfford ? 'disabled' : ''}>
                        Redeem
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Populate weekly competition
function populateWeeklyCompetition() {
    const container = document.getElementById('competitionEntries');
    const prizeEl = document.getElementById('competitionPrize');
    const descEl = document.getElementById('competitionDescription');
    const endDateEl = document.getElementById('competitionEndDate');
    
    if (prizeEl) prizeEl.textContent = weeklyCompetition.prize;
    if (descEl) descEl.textContent = weeklyCompetition.description;
    if (endDateEl) endDateEl.textContent = `Ends: ${new Date(weeklyCompetition.endDate).toLocaleDateString()}`;
    
    if (!container) return;

    // Get top photos by likes for competition
    const topPhotos = [...photos].sort((a, b) => b.likes - a.likes).slice(0, 5);
    
    container.innerHTML = topPhotos.map((photo) => {
        const photoIndex = photos.findIndex(p => p.id === photo.id);
        return `
        <div class="competition-entry" onclick="showImageDetail(photos[${photoIndex}])" style="cursor: pointer;">
            <img src="${photo.image}" alt="${photo.seat}">
            <div class="competition-entry-info">
                <div style="font-weight: 600; margin-bottom: 5px;">${photo.title || photo.seat}</div>
                <div style="font-size: 0.85rem; color: #6c757d;">${photo.route}</div>
                <div class="competition-entry-votes">
                    <i class="bi bi-heart-fill"></i>
                    <span>${photo.likes} votes</span>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    updatePointsDisplay();
    initializeMap();
    populateChallenges();
    populatePersonalChallenges();
    populatePrizeShop();
    populateWeeklyCompetition();
    updateMapStats();
    
    // Handle hash navigation
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
    
    // Map interactions
    const mapContainer = document.getElementById('flightMapContainer');
    if (mapContainer) {
        mapContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });

        mapContainer.addEventListener('mousedown', function(e) {
            if (currentZoom > 1) {
                isPanning = true;
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
                mapContainer.style.cursor = 'grabbing';
            }
        });

        mapContainer.addEventListener('mousemove', function(e) {
            if (isPanning) {
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
                updateTransform();
            }
        });

        mapContainer.addEventListener('mouseup', function() {
            isPanning = false;
            mapContainer.style.cursor = 'grab';
        });

        mapContainer.addEventListener('mouseleave', function() {
            isPanning = false;
            mapContainer.style.cursor = 'grab';
        });
    }

    // Submit photo functionality
    const submitBtn = document.getElementById('submitPhotoBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const form = document.getElementById('submitForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const photoInput = document.getElementById('photoInput');
            const title = document.getElementById('photoTitle').value;
            const departure = document.getElementById('departure').value.toUpperCase();
            const arrival = document.getElementById('arrival').value.toUpperCase();
            const author = document.getElementById('authorName').value;
            const description = document.getElementById('description').value;

            if (photoInput.files.length === 0) {
                alert('Please select a photo');
                return;
            }

            const file = photoInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const rowNum = Math.floor(photos.length / 6) + 1;
                const seatMap = ['A', 'B', 'C', 'D', 'E', 'F'];
                const seat = seatMap[photos.length % 6];
                
                const newPhoto = {
                    id: `photo-${Date.now()}`,
                    seat: `${rowNum}${seat}`,
                    route: `${departure} → ${arrival}`,
                    author: author,
                    title: title,
                    description: description,
                    likes: 0,
                    liked: false,
                    image: event.target.result,
                    row: rowNum,
                    cx: 200 + (photos.length % 10) * 80,
                    cy: 200 + Math.floor(photos.length / 10) * 60,
                    userSubmitted: true
                };

                photos.push(newPhoto);
                savePhotos();
                awardPoints(50, 'Photo submitted!');
                checkPersonalChallenges();

                form.reset();
                const imagePreview = document.getElementById('imagePreview');
                if (imagePreview) {
                    imagePreview.classList.remove('show');
                    imagePreview.src = '';
                }

                const modal = bootstrap.Modal.getInstance(document.getElementById('submitModal'));
                modal.hide();

                // Refresh map
                const mapSvg = document.getElementById('mapSvg');
                if (mapSvg) {
                    mapSvg.innerHTML = '';
                    window.heatmapData = null;
                    initializeMap();
                }
                populateWeeklyCompetition();
                updateMapStats();
                populatePrizeShop();
                updatePointsDisplay();
                
                alert('Photo submitted successfully! You earned 50 points!');
            };
            reader.readAsDataURL(file);
        });
    }

    // Image preview
    const photoInput = document.getElementById('photoInput');
    const imagePreview = document.getElementById('imagePreview');
    
    if (photoInput && imagePreview) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                    imagePreview.classList.add('show');
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

