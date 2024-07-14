$(document).ready(function(){
    // Initialize Slick slider for benefits section
    $('.benefits-container').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // Adjust speed as needed (5 seconds per slide)
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

function showSubscriptionOptions() {
    document.getElementById('subscription-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showOptions() {
    document.getElementById('options-modal').style.display = 'block';
    document.getElementById('discover-palette-section').scrollIntoView({ behavior: 'smooth' });
}

function uploadFromGallery() {
    document.getElementById('gallery-input').click();
}

function takePhoto() {
    // This feature requires HTTPS and may not work locally
    const constraints = {
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            const videoContainer = document.createElement('div');
            videoContainer.id = 'video-container';
            videoContainer.appendChild(video);

            const takePhotoButton = document.createElement('button');
            takePhotoButton.innerHTML = '<i class="fas fa-camera"></i> Capture Photo';
            takePhotoButton.onclick = () => capturePhoto(video, stream);
            videoContainer.appendChild(takePhotoButton);

            document.body.appendChild(videoContainer);
        })
        .catch((err) => {
            console.error('Error accessing camera: ', err);
        });
}

function capturePhoto(video, stream) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    handleImage(dataUrl);

    stream.getTracks().forEach(track => track.stop());
    document.getElementById('video-container').remove();
}

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        handleImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

function handleImage(dataUrl) {
    // Display the uploaded or captured image
    const img = document.createElement('img');
    img.src = dataUrl;
    img.style.maxWidth = '100%';
    img.style.marginTop = '20px';

    const optionsSection = document.getElementById('options-section');
    optionsSection.innerHTML = '<h3>Image Uploaded</h3>';
    optionsSection.appendChild(img);

    // Generate color recommendations (example)
    const colorBoxes = document.getElementById('color-boxes');
    colorBoxes.innerHTML = ''; // Clear previous colors
    const colors = ['#FF6347', '#FFD700', '#4CAF50', '#2196F3', '#9C27B0'];
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorBoxes.appendChild(colorBox);
    });
    document.getElementById('palette-section').style.display = 'block';
}

function subscribe(box) {
    alert(`You have chosen the ${box}!`);
    document.querySelector('.modal-content').innerHTML = `<h3>You have chosen the ${box}!</h3>`;
}
