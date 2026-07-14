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
                "В девяностых годах прошлого века группа математиков и криптографов задалась вопросом, который казался почти фантастическим: можно ли создать среду, в которой информация останется неизменной навсегда? Где никто не сможет переписать историю, подделать факты или стереть то, что уже было сказано? Они придумали блокчейн — цифровую книгу, где каждая страница связанна с предыдущей, и если попытаться вырвать одну, рассыплется вся цепь. Это была первая технология, подарившая нам нечто большее, чем просто способ передавать данные. Она дала нам возможность оставлять след, который невозможно стереть.\n\nСпустя годы на базе этой технологии появился Биткоин, а за ним — тысячи других проектов. Блокчейн превратился в шумный базар, где люди забыли, зачем всё это затевалось. Его превратили в инструмент для быстрых денег, спекуляций и очередной гонки потребления. Но изначально он создавался для другого. Он создавался для того, чтобы мы могли сохранять самое ценное, что у нас есть, — наши мысли.\n\nМы возвращаем блокчейну его истинное предназначение.\n\nManuscript Project — это цифровой архив идей, который будет жить вечно. Каждая мысль, зафиксированная здесь, становится частью глобальной истории. Представь, что через сто, двести, пятьсот лет наши потомки смогут открыть этот архив и увидеть, о чём думали люди в начале двадцать первого века. Как сегодня мы находим глиняные таблички и артефакты древних Месопотамии и Египта, свитки Мёртвого моря и тексты Инков, так они найдут наши идеи. Мы строим мост между нами и будущим, между мыслью и реальностью.\n\nЧеловечество стоит на пороге новой эры. Мы вошли в новое тысячелетие, и выбор, который мы сделаем сейчас, определит дальнейшее развитие человечества. Можно продолжать бесконечную гонку за вещами, статусом и одобрением. А можно сделать шаг и начать строить новое, настоящее и действительно полезное. Мы не враги существующей системы, мы не пытаемся разрушить её. Мы создаём альтернативу — пространство, где ценность определяется не тем, сколько ты заплатил, а тем, какой след ты оставил. Мы идём не войной, а созиданием.\n\nЗдесь каждая идея обретает вес. Чем больше людей поддерживают её — лайками, вниманием, верой, — тем значимее она становится. Таким образом мы можем определить на что направлять реусрсы в первую очередь. Идея, подхваченная другими, перестаёт быть просто мыслью. Она становится движением. А движение способно изменить этот мир в лучшую сторону. Эту идею можно начать воплощать уже сегодня. Прямо сейчас. Не завтра, не через год, а в ту секунду, когда ты решишь, что она действительно важна. Мы лайки даём тебе ключ — токены, которые становятся финансированием твоей идеи. Это не просто цифры на экране. Это ресурс, который превращает замысел в действие.\n\nЧеловек — высшая форма жизни на Земле. Мы обладаем сознанием, способным менять реальность, но мы забыли об этом. У нас есть коллективное бессознательное, но мы давно им не пользуемся. Мы погрязли в чужих сценариях, в бесконечных списках дел, мы продаём своё время, в следуя за ценностями, которые сами когда‑то выбрали, но уже не помним зачем.. в погоне за целями, которые перестали быть нашими. Мы забыли, что мышление — это действие, что каждая мысль формирует мир вокруг нас, а коллективное сознание способно изменить в тот же миг. Мы напоминаем об этом. Мы создаём место, где тишина и осознанность возвращаются, где можно остановиться и услышать себя.\n\nЧеловечество всегда знало главные истины: не убивай, не кради, не обманывай, помогай ближнему, твори прекрасное вокруг себя. Мы возвращаем их в новом контексте Web3 — не как религиозные догмы, а как этику нового мира. Не убивай будущее своими действиями. Не кради чужие идеи — создавай свои. Не обманывай с целью личной выгоды. Помогай тем, кто в этом нуждается, делай мир лучше. Потому что только вместе и осознанно мы можем построить что-то большее. Это не про веру. Это про выбор. Выбор, который каждый из нас делает каждый день.\n\nТвоя идея может стать следующим шагом человечества. Зафиксируй её в блокчейне, оставь свой след в истории, стань частью вечного. Мы не знаем, каким будет мир через сто лет. Но мы знаем точно: наши идеи в нём останутся насегда, а начать реализовывать их можно уже сегодня. Присоединяйся. Мир ждёт твоих мыслей.\n\nВместе мы — следующий шаг человечества.",
            partners_title: "Партнёры",
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
                "In the 1990s, a group of mathematicians and cryptographers asked a question that seemed almost impossible: could a system be created where information would remain unchanged forever? A place where no one could rewrite history, forge the facts, or erase what had already been said? Their answer was the blockchain—a digital ledger where every page is linked to the one before it, so that if anyone tried to tear one out, the entire chain would fall apart. It was the first technology that gave us something greater than a new way to transfer data. It gave us the ability to leave a mark that could never be erased.\n\nYears later, Bitcoin was built upon this technology, followed by thousands of other projects. Blockchain became a crowded marketplace where people forgot why it had been created in the first place. It was turned into a tool for quick profits, speculation, and yet another race of endless consumption. But that was never its original purpose. It was created so that we could preserve the most valuable thing we possess—our ideas.\n\nWe are returning blockchain to its true purpose.\n\nManuscript Project is a digital archive of ideas designed to last forever. Every thought recorded here becomes part of humanity's shared history. Imagine that one hundred, two hundred, or even five hundred years from now, our descendants will be able to open this archive and discover what people at the beginning of the twenty-first century were thinking about. Just as we uncover clay tablets and artifacts from ancient Mesopotamia and Egypt, the Dead Sea Scrolls, and the surviving writings of the Inca civilization, they will uncover our ideas. We are building a bridge between the present and the future, between thought and reality.\n\nHumanity stands on the threshold of a new era. We have entered a new millennium, and the choices we make today will shape the future of our civilization. We can continue the endless pursuit of possessions, status, and approval. Or we can take a step forward and begin creating something new, something real, and something truly meaningful. We are not enemies of the existing system, nor are we trying to destroy it. We are creating an alternative—a place where value is measured not by how much you paid, but by the legacy you leave behind. We do not come with conflict. We come to create.\n\nHere, every idea carries weight. The more people support it—with likes, attention, and belief—the more significant it becomes. This allows us to understand where humanity's resources should be directed first. An idea embraced by others is no longer just a thought. It becomes a movement. And a movement has the power to change the world for the better. That idea can begin to take shape today. Right now. Not tomorrow, not next year, but the very moment you decide it truly matters. With every like, we give you the key—tokens that become the funding behind your idea. They are not just numbers on a screen. They are a resource that transforms vision into action.\n\nHuman beings are the highest form of life on Earth. We possess a consciousness capable of reshaping reality, yet we have forgotten it. We have access to a collective unconscious, but we have long stopped listening to it. We have become trapped in other people's scripts, buried beneath endless to-do lists, selling our time while chasing values we once chose but no longer remember why... pursuing goals that have long since ceased to be our own. We have forgotten that thought itself is action, that every idea shapes the world around us, and that collective consciousness has the power to transform reality in an instant. We are here to remind you. We are creating a place where silence and awareness return, where you can pause and truly hear yourself.\n\nHumanity has always known its deepest truths: do not kill, do not steal, do not deceive, help those in need, and create beauty wherever you can. We are bringing these principles into the age of Web3—not as religious commandments, but as the ethics of a new world. Do not destroy the future through your actions. Do not steal someone else's ideas—create your own. Do not deceive for personal gain. Help those who need it, and make the world a better place. Because only together, and with conscious intention, can we build something greater than ourselves. This is not about belief. It is about choice. A choice that every one of us makes every single day.\n\nYour idea could become humanity's next great step. Record it on the blockchain, leave your mark on history, and become part of something eternal. We do not know what the world will look like one hundred years from now. But we know one thing with certainty: our ideas will still be there, and we can begin turning them into reality today. Join us. The world is waiting for your ideas.\n\nTogether, we are humanity's next step.",
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

