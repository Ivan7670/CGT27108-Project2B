// ALL CODE IS AI GENERATED UNLESS THERE IS A COMMENT DISCUSSING CHANGES OR ADDITIONS //
// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    populateHomeCarousels();
    populateWeeklyCompetitionHome();
    
    // Like buttons - functional
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.like-btn');
        if (!button) return;
        
        const photoId = button.getAttribute('data-photo-id');
        const photo = photos.find(p => (p.id || p.seat) === photoId);
        if (!photo) return;
        
        const wasLiked = button.classList.contains('liked');
        const likeCountEl = button.closest('.photo-card')?.querySelector('.like-count');
        if (!likeCountEl) return;
        
        let currentLikes = parseInt(likeCountEl.getAttribute('data-likes') || photo.likes);
        const icon = button.querySelector('i');
        
        if (wasLiked) {
            currentLikes--;
            photo.liked = false;
            button.classList.remove('liked');
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
        } else {
            currentLikes++;
            photo.liked = true;
            button.classList.add('liked');
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
        }
        
        photo.likes = currentLikes;
        likeCountEl.setAttribute('data-likes', currentLikes);
        likeCountEl.textContent = `${currentLikes} likes`;
        savePhotos();
    });

    // Image click handlers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) return;
        
        const photoCard = e.target.closest('.photo-card');
        if (!photoCard) return;
        
        const photoId = photoCard.getAttribute('data-photo-id');
        const photo = photos.find(p => (p.id || p.seat) === photoId);
        if (photo) {
            e.preventDefault();
            e.stopPropagation();
            showImageDetail(photo);
        }
    });

    // Image preview in submit form
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
                // Generate new photo object
                const rowNum = Math.floor(photos.length / 6) + 1;
                const seatLetter = String.fromCharCode(65 + (photos.length % 6));
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

                // Add to photos array
                photos.push(newPhoto);
                savePhotos();

                // Award points
                awardPoints(50, 'Photo submitted!');
                checkPersonalChallenges();

                // Reset form
                form.reset();
                imagePreview.classList.remove('show');
                imagePreview.src = '';

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('submitModal'));
                modal.hide();

                // Refresh displays
                populateHomeCarousels();

                // Show success message
                alert('Photo submitted successfully! You earned 50 points!');
            };
            reader.readAsDataURL(file);
        });
    }
});

// Populate weekly competition on home page
function populateWeeklyCompetitionHome() {
    const titleEl = document.getElementById('weeklyCompetitionTitle');
    const entriesEl = document.getElementById('homeCompetitionEntries');
    
    if (!titleEl || !entriesEl) return;
    
    // Sort photos by likes for competition
    const sortedPhotos = [...photos].sort((a, b) => b.likes - a.likes).slice(0, 5);
    
    titleEl.textContent = weeklyCompetition.title + ' - Top Submissions';
    
    entriesEl.innerHTML = sortedPhotos.map((photo, index) => {
        const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
        return `
        <div class="competition-entry" onclick="showImageDetail(photos.find(p => p.id === '${photo.id}'))" style="position: relative; cursor: pointer;">
            ${index < 3 ? `<div style="position: absolute; top: 10px; right: 10px; background: ${medalColors[index]}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${index + 1}</div>` : ''}
            <img src="${photo.image}" alt="${photo.seat}">
            <div class="competition-entry-info">
                <div style="font-weight: 600; color: #4a90e2; margin-bottom: 5px;">${photo.route}</div>
                <div style="color: #6c757d; font-size: 0.85rem; margin-bottom: 8px;">${photo.seat} • by ${photo.author}</div>
                <div class="competition-entry-votes">
                    <i class="bi bi-heart-fill"></i> ${photo.likes} votes
                </div>
            </div>
        </div>
    `;
    }).join('');
}

