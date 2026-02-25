(function () {
    var countdownEl = document.getElementById('countdown');
    var curtainLeft = document.getElementById('curtainLeft');
    var curtainRight = document.getElementById('curtainRight');
    var confettiEl = document.getElementById('confetti');
    var mainVideo = document.getElementById('mainVideo');
    var btnContinueVideo1 = document.getElementById('btnContinueVideo1');
    var btnContinueBalloons = document.getElementById('btnContinueBalloons');
    var btnContinueVideo2 = document.getElementById('btnContinueVideo2');
    var sectionVideo1 = document.getElementById('section-video1');
    var sectionBalloons = document.getElementById('section-balloons');
    var sectionVideo2 = document.getElementById('section-video2');
    var sectionEnvelope = document.getElementById('section-envelope');
    var balloonsRow = document.getElementById('balloonsRow');
    var popSound = document.getElementById('popSound');
    var video2 = document.getElementById('video2');
    var bgMusic = document.getElementById('bgMusic');
    var btnMusicToggle = document.getElementById('btnMusicToggle');
    var envelopeWrap = document.getElementById('envelopeWrap');
    var envelopeClosed = document.getElementById('envelopeClosed');
    var envelopeLetter = document.getElementById('envelopeLetter');
    var letterText = document.getElementById('letterText');
    var typingCursor = document.getElementById('typingCursor');
    var envelopeHint = document.getElementById('envelopeHint');

    var steps = ['1', '2', '3'];
    var step = 0;
    var balloonsPopped = 0;
    var envelopeOpened = false;
    var birthdayMessage = 'Happy Birthday Vishu!\n\nYou are an amazing friend and we are so grateful to have you. Wishing you a year full of joy, laughter, and all the best things. Stay awesome!\n\n— With love';

    var balloonNormalSrc = './assets/balloon.png';
    var balloonPoppedSrc = './assets/balloon-popped.png';

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

    /* ---------- Countdown then curtain then Video 1 ---------- */
    function showNextCountdown() {
        if (step < steps.length) {
            var numSpan = countdownEl ? countdownEl.querySelector('.countdown-num') : null;
            if (numSpan) numSpan.textContent = steps[step];
            if (countdownEl) countdownEl.classList.remove('countdown-hide');
            step++;
            setTimeout(showNextCountdown, 1000);
        } else {
            if (countdownEl) countdownEl.classList.add('countdown-hide');
            setTimeout(openCurtain, 400);
        }
    }

    function openCurtain() {
        if (curtainLeft) curtainLeft.classList.add('curtain-open');
        if (curtainRight) curtainRight.classList.add('curtain-open');
        burstConfetti();
        showSection(sectionVideo1);
        if (mainVideo) {
            mainVideo.playbackRate = 1;
            mainVideo.play().catch(function () {});
        }
        startBgMusic();
    }

    setTimeout(showNextCountdown, 300);

    /* ---------- Video 1: button "Wait there is more" -> Balloons ---------- */
    if (btnContinueVideo1) {
        btnContinueVideo1.addEventListener('click', function () {
            startBgMusic();
            showSection(sectionBalloons);
        });
    }

    if (mainVideo) {
        mainVideo.addEventListener('ended', function () {
            if (btnContinueVideo1) btnContinueVideo1.classList.add('continue-btn-visible');
        });
    }

    /* ---------- 4 Balloons: pop individually, then Continue ---------- */
    if (balloonsRow) {
        var items = balloonsRow.querySelectorAll('.balloon-item');
        items.forEach(function (item) {
            var img = item.querySelector('.balloon-img');
            if (!img) return;
            item.addEventListener('click', function () {
                if (img.getAttribute('src') === balloonPoppedSrc) return;
                img.setAttribute('src', balloonPoppedSrc);
                balloonsPopped++;
                if (popSound) {
                    popSound.currentTime = 0;
                    popSound.play().catch(function () {});
                }
                if (balloonsPopped >= 4 && btnContinueBalloons) {
                    btnContinueBalloons.classList.add('continue-btn-visible');
                }
            });
        });
    }

    if (btnContinueBalloons) {
        btnContinueBalloons.addEventListener('click', function () {
            showSection(sectionVideo2);
            if (video2) {
                video2.playbackRate = 1;
                video2.muted = false;
                video2.play().catch(function () {});
            }
        });
    }

    /* ---------- Video 2: button "And Finally" -> Envelope ---------- */
    if (btnContinueVideo2) {
        btnContinueVideo2.addEventListener('click', function () {
            showSection(sectionEnvelope);
        });
    }

    /* ---------- Envelope: click to open, letter out, typing ---------- */
    function typeWriter(msg, i) {
        if (i >= msg.length) {
            if (typingCursor) typingCursor.classList.add('hidden');
            return;
        }
        if (letterText) letterText.textContent += msg.charAt(i);
        setTimeout(function () { typeWriter(msg, i + 1); }, 60);
    }

    if (envelopeWrap) {
        envelopeWrap.addEventListener('click', function () {
            if (envelopeOpened) return;
            envelopeOpened = true;
            if (envelopeClosed) {
                envelopeClosed.setAttribute('src', './assets/envelope-open.png');
                envelopeClosed.classList.add('envelope-opened');
            }
            envelopeWrap.classList.add('envelope-opened');
            if (envelopeHint) envelopeHint.style.visibility = 'hidden';
            if (envelopeLetter) envelopeLetter.classList.add('visible');
            setTimeout(function () {
                if (letterText) letterText.textContent = '';
                if (typingCursor) typingCursor.classList.remove('hidden');
                typeWriter(birthdayMessage, 0);
            }, 500);
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
})();
