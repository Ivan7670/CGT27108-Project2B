// ALL CODE IS AI GENERATED UNLESS THERE IS A COMMENT DISCUSSING CHANGES OR ADDITIONS //
// Shared data and functions for Window Seat website

// User points system (stored in localStorage)
let userPoints = parseInt(localStorage.getItem('windowSeatPoints')) || 0;

// Challenges data
const challenges = [
    {
        id: 'challenge-1',
        title: 'Arctic Explorer',
        location: 'Above 70°N Latitude',
        description: 'Capture a window seat view from flights over the Arctic Circle. Only 2 photos submitted so far!',
        target: 5,
        current: 2,
        prize: '$100 Gift Card',
        icon: 'bi-snow'
    },
    {
        id: 'challenge-2',
        title: 'Pacific Islander',
        location: 'Pacific Island Routes',
        description: 'Submit photos from routes connecting Pacific islands. Help us fill this underrepresented region!',
        target: 10,
        current: 3,
        prize: 'Premium Camera Lens',
        icon: 'bi-water'
    },
    {
        id: 'challenge-3',
        title: 'African Skies',
        location: 'Central Africa Routes',
        description: 'We need more images from Central African flight paths. Only 1 photo in this region!',
        target: 8,
        current: 1,
        prize: 'Drone Photography Kit',
        icon: 'bi-globe'
    },
    {
        id: 'challenge-4',
        title: 'Antarctic Approach',
        location: 'Southern Ocean Routes',
        description: 'Rare views from flights near Antarctica. Be one of the first to capture this region!',
        target: 3,
        current: 0,
        prize: '$500 Travel Voucher',
        icon: 'bi-compass'
    }
];

// Personal challenges (for points)
const personalChallenges = [
    {
        id: 'personal-1',
        title: 'First Submission',
        description: 'Submit your first photo to the gallery',
        points: 50,
        completed: localStorage.getItem('challenge-personal-1') === 'true'
    },
    {
        id: 'personal-2',
        title: 'Photo Collector',
        description: 'Submit 5 photos to the gallery',
        points: 200,
        completed: localStorage.getItem('challenge-personal-2') === 'true',
        progress: parseInt(localStorage.getItem('challenge-personal-2-progress')) || 0,
        target: 5
    },
    {
        id: 'personal-3',
        title: 'Social Butterfly',
        description: 'Get 10 likes on your photos',
        points: 150,
        completed: localStorage.getItem('challenge-personal-3') === 'true',
        progress: parseInt(localStorage.getItem('challenge-personal-3-progress')) || 0,
        target: 10
    },
    {
        id: 'personal-4',
        title: 'World Traveler',
        description: 'Submit photos from 3 different continents',
        points: 300,
        completed: localStorage.getItem('challenge-personal-4') === 'true',
        progress: parseInt(localStorage.getItem('challenge-personal-4-progress')) || 0,
        target: 3
    }
];

// Prize shop items
const prizeShop = [
    { id: 'prize-1', name: 'Window Seat T-Shirt', points: 500, description: 'Premium cotton t-shirt with Window Seat logo' },
    { id: 'prize-2', name: 'Camera Strap', points: 300, description: 'Professional camera strap with aviation theme' },
    { id: 'prize-3', name: 'Photo Print Credit', points: 200, description: '$25 credit towards any photo print' },
    { id: 'prize-4', name: 'Premium Membership', points: 1000, description: '1 year premium membership with exclusive features' },
    { id: 'prize-5', name: 'Aviation Photography Book', points: 400, description: 'Hardcover book featuring best window seat photos' }
];

// Weekly competition data
const weeklyCompetition = {
    title: 'Best Sunset View',
    description: 'Submit your best window seat sunset photo this week!',
    prize: '$250 Gift Card + Featured Spot',
    endDate: '2024-12-31',
    entries: []
};

// Photo data
// Images are loaded from the 'images' folder (Window1-30)
// Top 5 seats (1A-1E) use sunset photos, rest are randomized from the remaining 25 images
// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create array of all available images (1-30)
const allImages = Array.from({length: 30}, (_, i) => `images/Window${i + 1}.jpeg`);

// Remove sunset photos from pool (2A=Window7, 3F=Window18, 2B=Window8, 2D=Window10, 4E=Window23)
const sunsetImages = ['images/Window7.jpeg', 'images/Window18.jpeg', 'images/Window8.jpeg', 'images/Window10.jpeg', 'images/Window23.jpeg'];
const remainingImages = allImages.filter(img => !sunsetImages.includes(img));

// Shuffle remaining images (should be 25 images: 30 total - 5 sunset = 25)
const shuffledImages = shuffleArray(remainingImages);

// Assign sunset photos to top 5 seats (1A-1E)
// 1A = Window7 (2A), 1B = Window18 (3F), 1C = Window8 (2B), 1D = Window10 (2D), 1E = Window23 (4E)
//Added personal images to the code//
let photos = [
    {id: 'photo-1', seat: '1A', route: 'LAX → HNL', author: 'Sarah Chen', likes: 1247, image: 'images/Window7.jpeg', liked: true, row: 1, cx: 320, cy: 290},
    {id: 'photo-2', seat: '1B', route: 'JFK → LHR', author: 'Marcus Rodriguez', likes: 1198, image: 'images/Window18.jpeg', liked: false, row: 1, cx: 400, cy: 150},
    {id: 'photo-3', seat: '1C', route: 'DEN → SLC', author: 'Alex Thompson', likes: 1156, image: 'images/Window8.jpeg', liked: false, row: 1, cx: 200, cy: 210},
    {id: 'photo-4', seat: '1D', route: 'MIA → CUN', author: 'Jamie Park', likes: 1089, image: 'images/Window10.jpeg', liked: false, row: 1, cx: 300, cy: 285},
    {id: 'photo-5', seat: '1E', route: 'SFO → NRT', author: 'Kevin Chang', likes: 1034, image: 'images/Window23.jpeg', liked: false, row: 1, cx: 500, cy: 195},
    {id: 'photo-6', seat: '1F', route: 'SEA → ANC', author: 'Nina Patel', likes: 987, image: shuffledImages[0], liked: false, row: 1, cx: 180, cy: 180},
    {id: 'photo-7', seat: '2A', route: 'ORD → LAX', author: 'Taylor Kim', likes: 945, image: shuffledImages[1], liked: false, row: 2, cx: 230, cy: 225},
    {id: 'photo-8', seat: '2B', route: 'ATL → MIA', author: 'David Lee', likes: 923, image: shuffledImages[2], liked: false, row: 2, cx: 290, cy: 260},
    {id: 'photo-9', seat: '2C', route: 'PHX → LAS', author: 'Emma Wilson', likes: 876, image: shuffledImages[3], liked: false, row: 2, cx: 190, cy: 250},
    {id: 'photo-10', seat: '2D', route: 'SEA → PDX', author: 'Chris Martinez', likes: 834, image: shuffledImages[4], liked: false, row: 2, cx: 160, cy: 195},
    {id: 'photo-11', seat: '2E', route: 'HNL → OGG', author: 'Kai Nakamura', likes: 812, image: shuffledImages[5], liked: false, row: 2, cx: 350, cy: 305},
    {id: 'photo-12', seat: '2F', route: 'DFW → IAH', author: 'Miguel Santos', likes: 798, image: shuffledImages[6], liked: false, row: 2, cx: 265, cy: 270},
    {id: 'photo-13', seat: '3A', route: 'BOS → DCA', author: 'Rachel Green', likes: 812, image: shuffledImages[7], liked: false, row: 3, cx: 285, cy: 220},
    {id: 'photo-14', seat: '3B', route: 'YYZ → YVR', author: 'Michael Brown', likes: 789, image: shuffledImages[8], liked: false, row: 3, cx: 140, cy: 170},
    {id: 'photo-15', seat: '3C', route: 'DFW → PHX', author: 'Sophie Anderson', likes: 756, image: shuffledImages[9], liked: false, row: 3, cx: 210, cy: 260},
    {id: 'photo-16', seat: '3D', route: 'MSP → DSM', author: 'Jordan White', likes: 734, image: shuffledImages[10], liked: false, row: 3, cx: 245, cy: 230},
    {id: 'photo-17', seat: '3E', route: 'GVA → MXP', author: 'Pierre Dubois', likes: 721, image: shuffledImages[11], liked: false, row: 3, cx: 540, cy: 185},
    {id: 'photo-18', seat: '3F', route: 'AMS → BCN', author: 'Elena Silva', likes: 698, image: shuffledImages[12], liked: false, row: 3, cx: 530, cy: 200},
    {id: 'photo-19', seat: '4A', route: 'ICN → NRT', author: 'Hiroshi Tanaka', likes: 632, image: shuffledImages[13], liked: false, row: 4, cx: 750, cy: 220},
    {id: 'photo-20', seat: '4B', route: 'SIN → KUL', author: 'Mei Lin', likes: 621, image: shuffledImages[14], liked: false, row: 4, cx: 680, cy: 280},
    {id: 'photo-21', seat: '4C', route: 'LHR → CDG', author: 'James Wilson', likes: 598, image: shuffledImages[15], liked: false, row: 4, cx: 550, cy: 160},
    {id: 'photo-22', seat: '4D', route: 'FRA → VIE', author: 'Klaus Mueller', likes: 587, image: shuffledImages[16], liked: false, row: 4, cx: 570, cy: 175},
    {id: 'photo-23', seat: '4E', route: 'DOH → DXB', author: 'Ahmed Al-Rashid', likes: 576, image: shuffledImages[17], liked: false, row: 4, cx: 650, cy: 250},
    {id: 'photo-24', seat: '4F', route: 'BOM → DEL', author: 'Priya Sharma', likes: 565, image: shuffledImages[18], liked: false, row: 4, cx: 700, cy: 240},
    {id: 'photo-25', seat: '5A', route: 'DXB → IST', author: 'Omar Hassan', likes: 554, image: shuffledImages[19], liked: false, row: 5, cx: 640, cy: 245},
    {id: 'photo-26', seat: '5B', route: 'HKG → TPE', author: 'Wei Zhang', likes: 543, image: shuffledImages[20], liked: false, row: 5, cx: 720, cy: 235},
    {id: 'photo-27', seat: '5C', route: 'SYD → MEL', author: 'Emma Johnson', likes: 532, image: shuffledImages[21], liked: false, row: 5, cx: 760, cy: 380},
    {id: 'photo-28', seat: '5D', route: 'CPH → ARN', author: 'Lars Andersson', likes: 521, image: shuffledImages[22], liked: false, row: 5, cx: 560, cy: 165},
    {id: 'photo-29', seat: '5E', route: 'MAD → LIS', author: 'Sofia Martinez', likes: 510, image: shuffledImages[23], liked: false, row: 5, cx: 510, cy: 210},
    {id: 'photo-30', seat: '5F', route: 'YVR → SEA', author: 'Ryan Mitchell', likes: 499, image: shuffledImages[24], liked: false, row: 5, cx: 170, cy: 175}
];

// Load photos from localStorage if available
// Note: If you want to use your local images, clear localStorage first or update old URLs
const savedPhotos = localStorage.getItem('windowSeatPhotos');
if (savedPhotos) {
    const parsedPhotos = JSON.parse(savedPhotos);
    // Check if saved photos have old Unsplash URLs, wrong count, or missing new images
    const hasOldUrls = parsedPhotos.some(p => p.image && p.image.includes('unsplash.com'));
    const wrongCount = parsedPhotos.length !== photos.length;
    // Check if saved photos are missing the new Window26-30 images
    const savedHasNewImages = parsedPhotos.some(p => p.image && (p.image.includes('Window26') || p.image.includes('Window27') || p.image.includes('Window28') || p.image.includes('Window29') || p.image.includes('Window30')));
    
    if (hasOldUrls || wrongCount || !savedHasNewImages) {
        // Clear old localStorage and use default local images (which includes Window26-30)
        localStorage.removeItem('windowSeatPhotos');
        // photos array already has local image paths with new images, so we'll use that
    } else {
        photos = parsedPhotos;
    }
}

// Create photo card
function createPhotoCard(photo) {
    return `
        <div class="photo-card" data-photo-id="${photo.id || photo.seat}">
            <div class="photo-card-inner">
                <div class="photo-image-wrapper">
                    <img src="${photo.image}" class="photo-image" alt="${photo.seat}">
                    <div class="window-frame"></div>
                </div>
                <div class="photo-content">
                    <div class="photo-title">${photo.title || `Seat ${photo.seat}`}</div>
                    <div class="photo-route"><i class="bi bi-geo-alt-fill"></i> ${photo.route}</div>
                    <div class="photo-author">by ${photo.author}</div>
                    <div class="photo-footer">
                        <span class="like-count" data-likes="${photo.likes}">${photo.likes} likes</span>
                        <button class="like-btn ${photo.liked ? 'liked' : ''}" data-photo-id="${photo.id || photo.seat}">
                            <i class="bi bi-heart${photo.liked ? '-fill' : ''}"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create seat section for plane row layout (6 seats with aisle)
function createSeatSection(photo) {
    return `
        <div class="seat-section" data-photo-id="${photo.id || photo.seat}">
            <img src="${photo.image}" alt="${photo.seat}">
            <div class="seat-label">
                <div style="font-weight: 600; margin-bottom: 5px;">${photo.seat}</div>
                <div class="seat-likes">
                    <span class="like-count" data-likes="${photo.likes}">${photo.likes}</span>
                    <button class="like-btn ${photo.liked ? 'liked' : ''}" data-photo-id="${photo.id || photo.seat}" type="button">
                        <i class="bi bi-heart${photo.liked ? '-fill' : ''}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Populate full gallery with independent row layout and continuous aisle
function populateFullGallery() {
    const container = document.getElementById('fullGalleryGrid');
    if (!container) return;

    // Sort photos by likes (top should have more likes)
    const sortedPhotos = [...photos].sort((a, b) => b.likes - a.likes);

    // Group photos by row (6 photos per row)
    const photosPerRow = 6;
    const rows = [];
    for (let i = 0; i < sortedPhotos.length; i += photosPerRow) {
        rows.push(sortedPhotos.slice(i, i + photosPerRow));
    }

    container.innerHTML = `
        <div class="gallery-layout">
            <div class="left-seats-column">
                ${rows.map((rowPhotos, rowIndex) => {
                    const leftSeats = rowPhotos.slice(0, 3);
                    const emptyLeft = 3 - leftSeats.length;
                    return `
                        <div class="seat-row-wrapper">
                            <div class="row-number-label">Row ${rowIndex + 1}</div>
                            <div class="seat-row">
                                ${leftSeats.map(createSeatSection).join('')}
                                ${Array(emptyLeft).fill(0).map(() => `
                                    <div class="empty-seat">
                                        <i class="bi bi-image"></i>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="continuous-aisle"></div>
            <div class="right-seats-column">
                ${rows.map((rowPhotos, rowIndex) => {
                    const rightSeats = rowPhotos.slice(3, 6);
                    const emptyRight = 3 - rightSeats.length;
                    return `
                        <div class="seat-row-wrapper">
                            <div class="seat-row">
                                ${rightSeats.map(createSeatSection).join('')}
                                ${Array(emptyRight).fill(0).map(() => `
                                    <div class="empty-seat">
                                        <i class="bi bi-image"></i>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Add click handlers for seat sections (but not for like buttons)
    container.querySelectorAll('.seat-section').forEach(section => {
        const photoId = section.getAttribute('data-photo-id');
        if (photoId) {
            section.addEventListener('click', (e) => {
                // Don't trigger if clicking on like button
                if (e.target.closest('.like-btn')) {
                    return;
                }
                const photo = photos.find(p => (p.id || p.seat) === photoId);
                if (photo) showImageDetail(photo);
            });
        }
    });
    
    // Set up like button handlers for cabin view (using event delegation)
    // Only set up once to avoid duplicate listeners
    if (!container.hasAttribute('data-like-handler-setup')) {
        container.setAttribute('data-like-handler-setup', 'true');
        container.addEventListener('click', function(e) {
            // Check if click is on like button or icon inside it
            const likeBtn = e.target.closest('.like-btn');
            if (!likeBtn || !likeBtn.closest('.seat-section')) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const photoId = likeBtn.getAttribute('data-photo-id');
            const photo = photos.find(p => (p.id || p.seat) === photoId);
            if (!photo) return;
            
            const wasLiked = likeBtn.classList.contains('liked');
            const seatSection = likeBtn.closest('.seat-section');
            const likeCountEl = seatSection?.querySelector('.like-count');
            if (!likeCountEl) return;
            
            let currentLikes = parseInt(likeCountEl.getAttribute('data-likes') || photo.likes);
            const icon = likeBtn.querySelector('i');
            
            if (wasLiked) {
                currentLikes--;
                photo.liked = false;
                likeBtn.classList.remove('liked');
                if (icon) {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                }
            } else {
                currentLikes++;
                photo.liked = true;
                likeBtn.classList.add('liked');
                if (icon) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                }
            }
            
            photo.likes = currentLikes;
            likeCountEl.setAttribute('data-likes', currentLikes);
            likeCountEl.textContent = currentLikes;
            savePhotos();
            populateFullGallery();
        });
    }
}

// Populate home carousels
function populateHomeCarousels() {
    for (let i = 1; i <= 3; i++) {
        const rowPhotos = photos.filter(p => p.row === i);
        const container = document.getElementById(`homeRow${i}`);
        if (container) {
            container.innerHTML = rowPhotos.map(createPhotoCard).join('');
        }
    }
}

// Scroll row
function scrollRow(rowId, amount) {
    const el = document.getElementById(rowId);
    if (el) el.scrollBy({ left: amount, behavior: 'smooth' });
}

// Show image detail modal
window.showImageDetail = function(photo) {
    const modalEl = document.getElementById('imageDetailModal');
    if (!modalEl) return;
    
    document.getElementById('detailModalTitle').textContent = photo.title || `Seat ${photo.seat}`;
    document.getElementById('detailModalImage').src = photo.image;
    document.getElementById('detailRoute').textContent = photo.route;
    document.getElementById('detailAuthor').textContent = photo.author;
    document.getElementById('detailLikes').textContent = photo.likes;
    document.getElementById('detailSeat').textContent = photo.seat;
    const descEl = document.getElementById('detailDescription');
    if (photo.description) {
        descEl.textContent = photo.description;
        descEl.style.display = 'block';
    } else {
        descEl.style.display = 'none';
    }
    
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
};

// Handle purchase print
window.handlePurchasePrint = function() {
    const title = document.getElementById('detailModalTitle').textContent;
    alert(`Thank you for your interest! Purchase options for "${title}" will be available soon. Contact us at prints@windowseat.com for inquiries.`);
};

// Handle download rights
window.handleDownloadRights = function() {
    const title = document.getElementById('detailModalTitle').textContent;
    alert(`Download rights for "${title}" - Please contact us at licensing@windowseat.com for licensing information and pricing.`);
};

// Update points display
function updatePointsDisplay() {
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.textContent = userPoints;
    }
}

// Award points
function awardPoints(amount, reason) {
    userPoints += amount;
    localStorage.setItem('windowSeatPoints', userPoints);
    updatePointsDisplay();
    if (reason) {
        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4a90e2; color: white; padding: 15px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.2);';
        notification.innerHTML = `<strong>+${amount} Points!</strong><br>${reason}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Check and complete personal challenges
function checkPersonalChallenges() {
    const userPhotoCount = photos.filter(p => p.author === localStorage.getItem('currentUser') || p.userSubmitted).length;
    const userLikes = photos.filter(p => p.author === localStorage.getItem('currentUser') || p.userSubmitted)
        .reduce((sum, p) => sum + p.likes, 0);

    personalChallenges.forEach(challenge => {
        if (challenge.completed) return;

        let completed = false;
        if (challenge.id === 'personal-1' && userPhotoCount >= 1) {
            completed = true;
        } else if (challenge.id === 'personal-2' && userPhotoCount >= 5) {
            completed = true;
        } else if (challenge.id === 'personal-3' && userLikes >= 10) {
            completed = true;
        }

        if (completed && !challenge.completed) {
            challenge.completed = true;
            localStorage.setItem(`challenge-${challenge.id}`, 'true');
            awardPoints(challenge.points, `Challenge completed: ${challenge.title}`);
        }
    });
}

// Redeem prize
window.redeemPrize = function(prizeId) {
    const prize = prizeShop.find(p => p.id === prizeId);
    if (!prize) return;

    if (userPoints >= prize.points) {
        userPoints -= prize.points;
        localStorage.setItem('windowSeatPoints', userPoints);
        updatePointsDisplay();
        alert(`Congratulations! You've redeemed ${prize.name}. We'll contact you soon with details.`);
    } else {
        alert(`You need ${prize.points - userPoints} more points to redeem this prize.`);
    }
};

// Save photos to localStorage
function savePhotos() {
    localStorage.setItem('windowSeatPhotos', JSON.stringify(photos));
}

