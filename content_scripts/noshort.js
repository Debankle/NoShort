(() => {
    let noshortEnabled = false;

    function toggleShortsVisibility(enabled) {
        const shorts = getAllShorts();
        if (enabled) {
            hideElements(shorts);
            console.log("Hiding YouTube Shorts...");
        } else {
            showElements(shorts);
            console.log("Showing YouTube Shorts...");
        }
    }

    function getAllShorts() {
        const selectors = [
            'ytd-rich-shelf-renderer',
            'ytd-reel-shelf-renderer',
            'ytd-compact-video-renderer',
        ];

        return selectors.reduce((acc, selector) => {
            const elements = document.querySelectorAll(selector);
            return acc.concat(Array.from(elements));
        }, []);
    }

    function hideElements(elements) {
        elements.forEach(element => {
            element.style.display = 'none';
        });
    }

    function showElements(elements) {
        elements.forEach(element => {
            element.style.display = '';
        });
    }

    function checkShortsState() {
        browser.storage.local.get("noshortEnabled").then((result) => {
            noshortEnabled = result.noshortEnabled;
            toggleShortsVisibility(noshortEnabled);
        });
    }

    checkShortsState();

    window.addEventListener('yt-navigate-finish', checkShortsState);

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "toggle-feature") {
            checkShortsState();
        }
    })
})();