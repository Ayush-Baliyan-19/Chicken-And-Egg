function preloadAssets(assets) {
    var promises = assets.map(function(asset) {
        return new Promise(function(resolve) {
            if (asset.type === 'image') {
                var img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = asset.src;
            } else if (asset.type === 'video') {
                var video = document.createElement('video');
                video.preload = 'auto';
                video.oncanplaythrough = resolve;
                video.onerror = resolve;
                video.src = asset.src;
                video.load();
                // Fallback timeout in case canplaythrough doesn't fire
                setTimeout(resolve, 5000);
            } else if (asset.type === 'audio') {
                var audio = new Audio();
                audio.preload = 'auto';
                audio.oncanplaythrough = resolve;
                audio.onerror = resolve;
                audio.src = asset.src;
                audio.load();
                setTimeout(resolve, 3000);
            } else {
                resolve();
            }
        });
    });
    return Promise.all(promises);
}

var noClickCount = 0;
var noResponses = [
    "Are you sure? 🥺",
    "Please? Pretty please? 🙏",
    "Come on, it'll be fun! 😄",
    "You're breaking my heart! 💔",
    "Just one tiny click? 👉👈",
    "I promise it's worth it! ✨",
    "Okay fine... but you're missing out! 😢",
    "Last chance... 🎁",
    "Alright, I'll wait... 🐔⏳"
];

function handleNoClick() {
    var responseEl = document.getElementById('noResponse');
    var noBtn = document.querySelector('.no-button');

    if (responseEl) {
        // Reset animation
        responseEl.style.animation = 'none';
        responseEl.offsetHeight; // Trigger reflow
        responseEl.style.animation = 'fadeInUp 0.4s ease';

        responseEl.textContent = noResponses[noClickCount % noResponses.length];
        noClickCount++;

        // After a few clicks, make the Yes button more prominent
        if (noClickCount >= 3) {
            var yesBtn = document.querySelector('.yes-button');
            if (yesBtn) {
                yesBtn.classList.add('bounce-once');
                setTimeout(function() {
                    yesBtn.classList.remove('bounce-once');
                }, 400);
            }
        }

        // After many clicks, change No button text
        if (noClickCount === 5 && noBtn) {
            noBtn.textContent = "Still no?";
        } else if (noClickCount === 7 && noBtn) {
            noBtn.textContent = "Really? 😅";
        } else if (noClickCount >= 9 && noBtn) {
            noBtn.textContent = "Fine 😤";
        }
    }
}

function handleYesClick() {
    var btn = document.querySelector('.yes-button');
    if (btn) {
        btn.textContent = 'Loading...';
        btn.disabled = true;
    }

    // Preload assets for reveal.html
    var assets = [
        { type: 'video', src: './BhaiKaBdday.mp4' },
        { type: 'audio', src: './assets/bg-music.webm' }
    ];

    preloadAssets(assets).then(function() {
        window.location.href = 'reveal.html';
    });
}
