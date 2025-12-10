// ALL CODE IS AI GENERATED UNLESS THERE IS A COMMENT DISCUSSING CHANGES OR ADDITIONS //
// Gallery page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    populateFullGallery();

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
                imagePreview.classList.remove('show');
                imagePreview.src = '';

                const modal = bootstrap.Modal.getInstance(document.getElementById('submitModal'));
                modal.hide();

                populateFullGallery();
                alert('Photo submitted successfully! You earned 50 points!');
            };
            reader.readAsDataURL(file);
        });
    }
});

