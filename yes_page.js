(function () {
    var countdownEl = document.getElementById('countdown');
    var curtainLeft = document.getElementById('curtainLeft');
    var curtainRight = document.getElementById('curtainRight');
    var confettiEl = document.getElementById('confetti');
    var mainVideo = document.getElementById('mainVideo');
    var btnContinueVideo1 = document.getElementById('btnContinueVideo1');
    var btnContinueMore = document.getElementById('btnContinueMore');
    var btnContinueVideo2 = document.getElementById('btnContinueVideo2');
    var sectionBalloon = document.getElementById('section-balloon');
    var sectionVideo1 = document.getElementById('section-video1');
    var sectionCake = document.getElementById('section-cake');
    var sectionMore = document.getElementById('section-more');
    var sectionPhotos = document.getElementById('section-photos');
    var sectionVideo2 = document.getElementById('section-video2');
    var sectionEnvelope = document.getElementById('section-envelope');
    var balloon = document.getElementById('balloon');
    var balloonWrap = document.getElementById('balloonWrap');
    var burstContainer = document.getElementById('burstContainer');
    var popSound = document.getElementById('popSound');
    var photoImage = document.getElementById('photoImage');
    var photoContainer = document.getElementById('photoContainer');
    var photoCounter = document.getElementById('photoCounter');
    var photosHint = document.getElementById('photosHint');
    var video2 = document.getElementById('video2');
    var bgMusic = document.getElementById('bgMusic');
    var btnMusicToggle = document.getElementById('btnMusicToggle');
    var cakeImage = document.getElementById('cakeImage');
    var btnCake = document.getElementById('btnCake');
    var envelopeWrap = document.getElementById('envelopeWrap');
    var envelopeClosed = document.getElementById('envelopeClosed');
    var envelopeLetter = document.getElementById('envelopeLetter');
    var letterText = document.getElementById('letterText');
    var typingCursor = document.getElementById('typingCursor');
    var envelopeHint = document.getElementById('envelopeHint');

    var steps = ['1', '2', '3'];
    var step = 0;
    var photoIndex = 0;
    var photoFiles = ['photos/Vishu-1.jpeg', 'photos/Vishu-2.jpeg', 'photos/Vishu-3.jpeg', 'photos/Vishu-4.jpeg', 'photos/Vishu-5.jpeg', 'photos/Vishu-6.jpeg', 'photos/Vishu-7.jpeg', 'photos/Vishu-8.jpeg'];
    var cakeStep = 1;
    var cakeSteps = [
        { img: 'cake-candles.png', btn: 'Blow the Candles' },
        { img: 'cake-smoke.gif', btn: 'Cut the Cake' },
        { img: 'cake-cut.gif', btn: 'Special Message' }
    ];
    var envelopeOpened = false;
    var envelopeTypingDone = false;
    var birthdayMessage = 'Happy Birthday Vishu!\n\nYou are an amazing friend and we are so grateful to have you. Wishing you a year full of joy, laughter, and all the best things. Stay awesome!\n\n— With love';

    function showSection(section) {
        var sections = document.querySelectorAll('.section');
        sections.forEach(function (s) {
            s.classList.remove('section-active');
        });
        if (section) section.classList.add('section-active');
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

    function startBgMusic() {
        if (bgMusic && !bgMusic.started) {
            bgMusic.started = true;
            bgMusic.volume = 0.4;
            bgMusic.play().catch(function () {});
        }
    }

    /* ---------- Balloon Pop ---------- */
    var balloonPopped = false;
    function onBalloonClick() {
        if (balloonPopped) return;
        balloonPopped = true;
        if (balloon) balloon.classList.add('popped');
        if (balloonWrap) balloonWrap.style.pointerEvents = 'none';

        if (popSound) {
            popSound.currentTime = 0;
            popSound.play().catch(function () {});
        }

        var burstCount = 10;
        var colors = ['#3db8a8', '#2a9d8f', '#55efc4', '#fef9e7'];
        for (var i = 0; i < burstCount; i++) {
            var angle = (i / burstCount) * Math.PI * 2;
            var dist = 120;
            var x = Math.cos(angle) * dist;
            var y = Math.sin(angle) * dist;
            var p = document.createElement('div');
            p.className = 'burst-piece';
            p.style.background = colors[i % colors.length];
            p.style.setProperty('--burst-pos', 'translate(' + x + 'px, ' + y + 'px)');
            if (burstContainer) burstContainer.appendChild(p);
            setTimeout(function (el) {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 600, p);
        }

        burstConfetti();
        setTimeout(function () {
            showSection(sectionVideo1);
            if (mainVideo) {
                mainVideo.playbackRate = 1;
                mainVideo.play().catch(function () {});
            }
            startBgMusic();
        }, 1500);
    }

    if (balloonWrap) balloonWrap.addEventListener('click', onBalloonClick);
    if (balloon) balloon.addEventListener('click', function (e) { e.stopPropagation(); onBalloonClick(); });

    /* ---------- Video 1 Continue -> Cake ---------- */
    if (btnContinueVideo1) {
        btnContinueVideo1.addEventListener('click', function () {
            startBgMusic();
            showSection(sectionCake);
            cakeStep = 1;
            if (cakeImage) cakeImage.src = cakeSteps[0].img;
            if (btnCake) btnCake.textContent = cakeSteps[0].btn;
        });
    }

    if (mainVideo) {
        mainVideo.addEventListener('ended', function () {
            if (btnContinueVideo1) btnContinueVideo1.classList.add('continue-btn-visible');
        });
    }

    /* ---------- Cake section ---------- */
    if (btnCake) {
        btnCake.addEventListener('click', function () {
            if (cakeStep === 1) {
                cakeStep = 2;
                if (cakeImage) cakeImage.src = cakeSteps[1].img;
                if (btnCake) btnCake.textContent = cakeSteps[1].btn;
            } else if (cakeStep === 2) {
                cakeStep = 3;
                if (cakeImage) cakeImage.src = cakeSteps[2].img;
                if (btnCake) btnCake.textContent = cakeSteps[2].btn;
            } else if (cakeStep === 3) {
                showSection(sectionMore);
            }
        });
    }

    /* ---------- But wait... -> Photos ---------- */
    if (btnContinueMore) {
        btnContinueMore.addEventListener('click', function () {
            showSection(sectionPhotos);
            photoIndex = 0;
            if (photoImage) photoImage.src = photoFiles[0];
            if (photoCounter) photoCounter.textContent = '1 / 8';
            if (photoContainer) photoContainer.classList.remove('photo-advance');
            void photoContainer.offsetWidth;
            if (photoContainer) photoContainer.classList.add('photo-advance');
        });
    }

    /* ---------- Photos -> Video 2 ---------- */
    function advancePhoto() {
        photoIndex++;
        if (photoIndex >= photoFiles.length) {
            showSection(sectionVideo2);
            if (video2) {
                video2.playbackRate = 1;
                video2.muted = false;
                video2.play().catch(function () {});
            }
            return;
        }
        if (photoImage) photoImage.src = photoFiles[photoIndex];
        if (photoCounter) photoCounter.textContent = (photoIndex + 1) + ' / 8';
        if (photoContainer) {
            photoContainer.classList.remove('photo-advance');
            void photoContainer.offsetWidth;
            photoContainer.classList.add('photo-advance');
        }
    }

    if (photoContainer) photoContainer.addEventListener('click', advancePhoto);
    if (photoImage) {
        photoImage.addEventListener('click', function (e) {
            e.stopPropagation();
            advancePhoto();
        });
    }

    /* ---------- Video 2 -> Envelope ---------- */
    if (btnContinueVideo2) {
        btnContinueVideo2.addEventListener('click', function () {
            showSection(sectionEnvelope);
        });
    }

    /* ---------- Envelope: open + typing (experience ends after) ---------- */
    function typeWriter(msg, i) {
        if (i >= msg.length) {
            if (typingCursor) typingCursor.classList.add('hidden');
            envelopeTypingDone = true;
            return;
        }
        if (letterText) letterText.textContent += msg.charAt(i);
        setTimeout(function () { typeWriter(msg, i + 1); }, 60);
    }

    if (envelopeWrap) {
        envelopeWrap.addEventListener('click', function () {
            if (envelopeOpened) return;
            envelopeOpened = true;
            envelopeWrap.classList.add('envelope-opened');
            if (envelopeHint) envelopeHint.style.visibility = 'hidden';
            setTimeout(function () {
                letterText.textContent = '';
                if (typingCursor) typingCursor.classList.remove('hidden');
                typeWriter(birthdayMessage, 0);
            }, 700);
        });
    }

    /* ---------- Music toggle ---------- */
    if (btnMusicToggle && bgMusic) {
        btnMusicToggle.addEventListener('click', function () {
            if (bgMusic.paused) {
                bgMusic.play().catch(function () {});
                btnMusicToggle.textContent = '🔊';
                btnMusicToggle.classList.remove('muted');
            } else {
                bgMusic.pause();
                btnMusicToggle.textContent = '🔇';
                btnMusicToggle.classList.add('muted');
            }
        });
    }

    /* Start with balloon section (no countdown) */
})();
