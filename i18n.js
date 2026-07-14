// Simple (global) i18n without bundlers.
// Exposes:
//   window.setLang(lang)
//   window.getLang()
//   window.t(key)
//   window.updateTexts()

(() => {
    let currentLang = "ru";

    const translations = {
        ru: {
            header_title: "MANUSCRIPT PROJECT",
            community_ideas_title: "Следующие шаги в новую реальность",
            loading_text: "Сканирование...",
            feed_1_title: "Feed 1",
            feed_2_title: "Feed 2",
            feed_3_title: "Feed 3",
            connect_wallet_btn: "Подключить",
            about_btn: "Подробнее",

            about_back_btn: "Назад",
            about_title: "Манифест проекта",
            about_desc:
                "Добро пожаловать в Manuscript Project",
            mint_btn: "Записать в Историю",


            idea_placeholder:
                "Каким должен быть мир завтра? Какой шаг изменит будущее? Напиши свою идею:",
            author_id_label: "ID Автора",
            sort_label: "Сортировка:",

            info_title: "Намерение",
            info_desc:
                "Мы строим децентрализованную платформу, где каждая идея закрепляется за автором и превращается в нестираемую запись в блокчейне. Этот интеллектуальный капитал – твой вклад в общий интеллект человечества хранится вечно! Твоя идея становится частью глобальной цепи решений, а не просто текстом в интернете. Мы формируем сценарий развития человечества. Каждая мысль, записанная в блокчейн, становится кирпичиком в фундаменте нового мира. \n\n Это Web3, где ценность каждого пользователя определяется его вкладом во благо. Твоя идея может стать следующим шагом человечества. Зафиксируй её в блокчейне. Начни сегодня!",
        },
        en: {
            header_title: "MANUSCRIPT PROJECT",
            community_ideas_title: "Next steps into a new reality",
            loading_text: "Scanning...",
            feed_1_title: "Feed 1",
            feed_2_title: "Feed 2",
            feed_3_title: "Feed 3",
            connect_wallet_btn: "Connect",

            about_btn: "More details",

            about_back_btn: "Back",
            about_title: "Project Manifest",
            about_desc:
                "Welcome to Manuscript Project...",
            partners_title: "Partners",
            mint_btn: "Record to History",


            idea_placeholder:
                "What should the world be like tomorrow? What step will change the future? Write your idea:",
            author_id_label: "Author ID",
            sort_label: "Sort:",

            info_title: "Intent",
            info_desc:
                "We are building a decentralized platform where every idea is permanently linked to its author and recorded as an immutable entry on the blockchain. This intellectual capital is your contribution to humanity's collective intelligence, preserved forever. Your idea becomes part of a global chain of solutions, not just another piece of text on the internet. Together, we are shaping humanity's future. Every thought recorded on the blockchain becomes a building block in the foundation of a new world.\n\nThis is Web3, where the value of every user is defined by their contribution to the common good. Your idea could become humanity's next breakthrough. Record it on the blockchain. Start today!",
        },
    };

    const t = (key) =>
        (translations[currentLang] && translations[currentLang][key]) || key;

    const updateTexts = () => {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            el.innerText = t(key);
            if (key === "header_title") el.setAttribute("data-glitch", el.innerText);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            el.placeholder = t(key);
        });

        document.querySelectorAll(".author-id-label-text").forEach((el) => {
            el.textContent = t("author_id_label");
        });

        const ruBtn = document.getElementById("lang-ru");
        const enBtn = document.getElementById("lang-en");
        if (ruBtn) ruBtn.classList.toggle("active", currentLang === "ru");
        if (enBtn) enBtn.classList.toggle("active", currentLang === "en");
    };

    const setLang = (lang) => {
        currentLang = lang === "en" ? "en" : "ru";
    };

    const getLang = () => currentLang;

    // Hook lang buttons once DOM is ready.
    document.addEventListener("DOMContentLoaded", () => {
        const btnRu = document.getElementById("lang-ru");
        const btnEn = document.getElementById("lang-en");

        btnRu?.addEventListener("click", () => {
            setLang("ru");
            updateTexts();
        });

        btnEn?.addEventListener("click", () => {
            setLang("en");
            updateTexts();
        });

        updateTexts();
    });

    window.setLang = setLang;
    window.getLang = getLang;
    window.t = t;
    window.updateTexts = updateTexts;
})();

