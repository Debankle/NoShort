document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = {
        all: document.getElementById("all"),
        homePage: document.getElementById("home-page"),
        searchPage: document.getElementById("search-page"),
        suggestedPage: document.getElementById("suggested-page"),
    };

    function loadSettings() {
        browser.storage.local.get(["settings"]).then((result) => {
            const settings = result.settings || {};
            checkboxes.all.checked = settings.all || false;
            checkboxes.homePage.checked = settings.homePage || false;
            checkboxes.searchPage.checked = settings.searchPage || false;
            checkboxes.suggestedPage.checked = settings.suggestedPage || false;
        });
    };

    function saveSettings() {
        const settings = {
            all: checkboxes.all.checked,
            homePage: checkboxes.homePage.checked,
            searchPage: checkboxes.searchPage.checked,
            suggestedPage: checkboxes.suggestedPage.checked,
        };
    
        browser.storage.local.set({ settings }).then(() => {
            browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                if (tabs.length > 0) {
                    browser.tabs.sendMessage(tabs[0].id, { command: "toggle-feature" });
                }
            });
        });
    }

    Object.values(checkboxes).forEach((checkbox) => {
        checkbox.addEventListener("change", saveSettings);
    })

    loadSettings();
});