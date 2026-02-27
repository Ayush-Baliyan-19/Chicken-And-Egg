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
