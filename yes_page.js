(function () {
    var countdownEl = document.getElementById('countdown');
    var curtainLeft = document.getElementById('curtainLeft');
    var curtainRight = document.getElementById('curtainRight');
    var confettiEl = document.getElementById('confetti');
    var mainVideo = document.getElementById('mainVideo');
    var btnContinueVideo1 = document.getElementById('btnContinueVideo1');
    var btnContinueMore = document.getElementById('btnContinueMore');
    var sectionVideo1 = document.getElementById('section-video1');
    var sectionMore = document.getElementById('section-more');
    var sectionPhotos = document.getElementById('section-photos');
    var sectionVideo2 = document.getElementById('section-video2');
    var photoImage = document.getElementById('photoImage');
    var photoContainer = document.getElementById('photoContainer');
    var photoCounter = document.getElementById('photoCounter');
    var photosHint = document.getElementById('photosHint');
    var video2 = document.getElementById('video2');
    var btnUnmuteVideo2 = document.getElementById('btnUnmuteVideo2');

    var steps = ['1', '2', '3'];
    var step = 0;
    var photoIndex = 0;
    var photoFiles = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg'];

    function showSection(section) {
        var sections = document.querySelectorAll('.section');
        sections.forEach(function (s) {
            s.classList.remove('section-active');
        });
        if (section) section.classList.add('section-active');
    }

    function showNextCountdown() {
        if (step < steps.length) {
            var numSpan = countdownEl.querySelector('.countdown-num');
            if (numSpan) numSpan.textContent = steps[step];
            countdownEl.classList.remove('countdown-hide');
            step++;
            setTimeout(showNextCountdown, 1000);
        } else {
            countdownEl.classList.add('countdown-hide');
            setTimeout(openCurtain, 400);
        }
    }

    function openCurtain() {
        curtainLeft.classList.add('curtain-open');
        curtainRight.classList.add('curtain-open');
        burstConfetti();
        if (mainVideo) {
            mainVideo.play().catch(function () {});
        }
    }

    function burstConfetti() {
        var colors = ['#f9e076', '#e8c547', '#c9a227', '#ff9f43', '#ff6b6b', '#a29bfe', '#55efc4', '#fd79a8'];
        var count = 60;
        for (var i = 0; i < count; i++) {
            var c = document.createElement('div');
            c.className = 'confetti-piece';
            c.style.left = Math.random() * 100 + '%';
            c.style.animationDelay = Math.random() * 0.5 + 's';
            c.style.animationDuration = (2 + Math.random() * 2) + 's';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            confettiEl.appendChild(c);
            setTimeout(function (el) {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 4000 + Math.random() * 1000, c);
        }
    }

    if (btnContinueVideo1) {
        btnContinueVideo1.addEventListener('click', function () {
            showSection(sectionMore);
        });
    }

    if (mainVideo) {
        mainVideo.addEventListener('ended', function () {
            if (btnContinueVideo1) btnContinueVideo1.classList.add('continue-btn-visible');
        });
    }

    if (btnContinueMore) {
        btnContinueMore.addEventListener('click', function () {
            showSection(sectionPhotos);
            photoIndex = 0;
            if (photoImage) photoImage.src = photoFiles[0];
            if (photoCounter) photoCounter.textContent = '1 / 7';
            if (photoContainer) photoContainer.classList.remove('photo-advance');
            void photoContainer.offsetWidth;
            if (photoContainer) photoContainer.classList.add('photo-advance');
        });
    }

    function advancePhoto() {
        photoIndex++;
        if (photoIndex >= photoFiles.length) {
            showSection(sectionVideo2);
            if (video2) {
                video2.play().catch(function () {});
            }
            return;
        }
        if (photoImage) photoImage.src = photoFiles[photoIndex];
        if (photoCounter) photoCounter.textContent = (photoIndex + 1) + ' / 7';
        if (photoContainer) {
            photoContainer.classList.remove('photo-advance');
            void photoContainer.offsetWidth;
            photoContainer.classList.add('photo-advance');
        }
    }

    if (photoContainer) {
        photoContainer.addEventListener('click', advancePhoto);
    }
    if (photoImage) {
        photoImage.addEventListener('click', function (e) {
            e.stopPropagation();
            advancePhoto();
        });
    }

    if (btnUnmuteVideo2 && video2) {
        btnUnmuteVideo2.addEventListener('click', function () {
            video2.muted = false;
            video2.play().catch(function () {});
            btnUnmuteVideo2.classList.add('hidden');
        });
    }

    setTimeout(showNextCountdown, 300);
})();
