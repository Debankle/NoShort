(() => {
    let noshortEnabled = false;
    let settings = {};

    function toggleShortsVisibility() {
        const selectors = {
            homePage: "ytd-rich-shelf-renderer",
            searchPage: "ytd-reel-shelf-renderer",
            suggestedPage: "ytd-compact-video-renderer",
        };

        Object.entries(selectors).forEach(([key, selector]) => {
            const elements = document.querySelectorAll(selector);
            if (noshortEnabled && (settings.all || settings[key])) {
                hideElements(elements);
            } else {
                showElements(elements);
            }
        });
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

    function updateShortsState() {
        browser.storage.local.get(["noshortEnabled", "settings"]).then((result) => {
            noshortEnabled = result.noshortEnabled || false;
            settings = result.settings || {};
            toggleShortsVisibility();
        });
    }

    updateShortsState();

    window.addEventListener('yt-navigate-finish', updateShortsState);

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "toggle-feature") {
            updateShortsState();
        }
    })
})();