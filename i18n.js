// Loads translations from JSON catalogs and exposes a small localization API.
(() => {
  const supportedLanguages = ["ru", "en"];
  const browserLang = (navigator.language || navigator.languages?.[0] || "").toLowerCase();
  let currentLanguage = browserLang.startsWith("ru") ? "ru" : "en";
  const catalogs = Object.create(null);
  const loading = Object.create(null);

  const loadCatalog = (language) => {
    if (catalogs[language]) return Promise.resolve(catalogs[language]);
    if (loading[language]) return loading[language];

    loading[language] = fetch(`locales/${language}.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load locale: ${language}`);
        return response.json();
      })
      .then((data) => {
        catalogs[language] = data || {};
        delete loading[language];
        return catalogs[language];
      })
      .catch((error) => {
        delete loading[language];
        throw error;
      });

    return loading[language];
  };

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

  const prefetchSecondaryLanguage = () => {
    const secondary = currentLanguage === "ru" ? "en" : "ru";
    const run = () => {
      loadCatalog(secondary).catch(() => {});
    };

    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(run, { timeout: 2500 });
    } else {
      setTimeout(run, 1);
    }
  };

  const ready = loadCatalog(currentLanguage).then(() => {
    document.documentElement.lang = currentLanguage;
    applyTranslations();
    document.dispatchEvent(new CustomEvent("i18n:ready"));
    if (typeof window.__i18nResolve === "function") {
      window.__i18nResolve();
    }
    prefetchSecondaryLanguage();
  });

  const setLanguage = async (language) => {
    const next = supportedLanguages.includes(language) ? language : "ru";
    await loadCatalog(next);
    currentLanguage = next;
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

  document.getElementById("lang-toggle")?.addEventListener("click", toggleLanguage);
})();
