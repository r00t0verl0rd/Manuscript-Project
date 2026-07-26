// Loads translations from YAML catalogs and exposes a small localization API.
(() => {
    const supportedLanguages = ["ru", "en"];
    const browserLang = (navigator.language || navigator.userLanguage || "").slice(0, 2);
    let currentLanguage = supportedLanguages.includes(browserLang) ? browserLang : "en";
    const catalogs = Object.create(null);

    const loadCatalog = async (language) => {
        const response = await fetch(`locales/${language}.yml`);
        if (!response.ok) throw new Error(`Unable to load locale: ${language}`);
        catalogs[language] = window.jsyaml.load(await response.text()) || {};
    };

    const ready = Promise.all(supportedLanguages.map(loadCatalog)).then(() => {
        document.documentElement.lang = currentLanguage;
        applyTranslations();
        document.dispatchEvent(new CustomEvent("i18n:ready"));
    });

    const translate = (key) => catalogs[currentLanguage]?.[key] ?? key;

    const applyTranslations = (root = document) => {
        root.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (key) element.textContent = translate(key);
        });

        root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            if (key) element.setAttribute("aria-label", translate(key));
        });

        root.querySelectorAll("[data-i18n-title]").forEach((element) => {
            const key = element.dataset.i18nTitle;
            if (key) element.setAttribute("title", translate(key));
        });

        const languageButton = document.getElementById("lang-toggle");
        if (languageButton) {
            languageButton.textContent = currentLanguage === "ru" ? "🇬🇧" : "🇷🇺";
        }
    };

    const setLanguage = (language) => {
        currentLanguage = supportedLanguages.includes(language) ? language : "en";
        document.documentElement.lang = currentLanguage;
        applyTranslations();
        document.dispatchEvent(new CustomEvent("i18n:changed"));
    };

    const toggleLanguage = () => {
        setLanguage(currentLanguage === "ru" ? "en" : "ru");
    };

    window.AppI18n = Object.freeze({
        applyTranslations,
        getLanguage: () => currentLanguage,
        ready,
        setLanguage,
        translate,
    });

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("lang-toggle")?.addEventListener("click", toggleLanguage);
    });
})();
