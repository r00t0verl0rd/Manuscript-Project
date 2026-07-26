// Lightweight localization API for the static application.
// Тексты вынесены в отдельный файл translations.js для удобства редактирования.

(() => {
    let currentLanguage = "ru";
    const translationCatalog = TRANSLATIONS;
    const translate = (key) => translationCatalog[currentLanguage]?.[key] ?? key;
    const applyTranslations = (root = document) => {
        root.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (key) element.textContent = translate(key);
        });

        root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            if (key) element.setAttribute("aria-label", translate(key));
        });

        const languageButton = document.getElementById("lang-toggle");
        if (languageButton) {
            languageButton.textContent = currentLanguage === "ru" ? "🇬🇧" : "🇷🇺";
        }
    };

    const setLanguage = (language) => {
        currentLanguage = language === "en" ? "en" : "ru";
        document.documentElement.lang = currentLanguage;
        applyTranslations();
    };

    const toggleLanguage = () => {
        setLanguage(currentLanguage === "ru" ? "en" : "ru");
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("lang-toggle")?.addEventListener("click", toggleLanguage);
        setLanguage(currentLanguage);
    });

    window.AppI18n = Object.freeze({
        applyTranslations,
        getLanguage: () => currentLanguage,
        setLanguage,
        translate,
    });
})();
