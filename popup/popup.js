(function () {
    console.log("popup script loaded");

    const popupContent = document.querySelector("#popup-content");
    const errorContent = document.querySelector("#error-content");
    const toggleSlider = document.querySelector("#toggle-slider");

    function updateToggleState(noshortEnabled) {
        if (noshortEnabled) {
            toggleSlider.classList.add("on");
            toggleSlider.classList.remove("off");
        } else {
            toggleSlider.classList.add("off");
            toggleSlider.classList.remove("on");
        }
    }

    function toggleShortsState(tab) {
        browser.storage.local.get("noshortEnabled").then((result) => {
            const currentState = result.noshortEnabled || false;
            const newState = !currentState;

            browser.storage.local.set({ noshortEnabled: newState }).then(() => {
                updateToggleState(newState);
                browser.tabs.sendMessage(tab.id, { command: "toggle-feature", enabled: newState });
            });
        });
    }

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];

            if (tab.url.includes("youtube.com")) {
                popupContent.classList.remove("hidden");
                errorContent.classList.add("hidden");

                browser.storage.local.get("noshortEnabled").then((result) => {
                    const noshortEnabled = result.noshortEnabled || false;
                    updateToggleState(noshortEnabled);

                    toggleSlider.addEventListener("click", function () {
                        toggleShortsState(tab);
                    });
                });
            } else {
                popupContent.classList.add("hidden");
                errorContent.classList.remove("hidden");
            }
        } else {
            console.log("No active tab found.");
        }
    });
})();
