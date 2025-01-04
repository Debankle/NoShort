(() => {
    let noshortEnabled = false;

    function toggleShortsVisibility(enabled) {
        const shorts = document.querySelectorAll('ytd-reel-shelf-renderer');

        shorts.forEach(short => {
            if (enabled) {
                short.style.display = 'none';
            } else {
                short.style.display = '';
            }
        });
    }

    function checkShortsState() {
        browser.storage.local.get("noshortEnabled").then((result) => {
            noshortEnabled = result.noshortEnabled;

            if (noshortEnabled) {
                console.log("Hiding YouTube Shorts...");
                toggleShortsVisibility(true);
            } else {
                console.log("Showing YouTube Shorts...");
                toggleShortsVisibility(false);
            }
        })
    }

    checkShortsState();

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "toggle-feature") {
            checkShortsState();
        }
    })
})();