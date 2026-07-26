// Lightweight localization API for the static application.
(() => {
    let currentLanguage = "ru";

    const translationCatalog = {
        ru: {
            header_title: "MANUSCRIPT PROJECT",
            community_ideas_title: "Следующие шаги в новую реальность",

            feed_1_title: "Feed 1",
            feed_2_title: "Feed 2",
            feed_3_title: "Feed 3",
            connect_wallet_btn: "Подключить",
            wallet_disconnected: "Блокчейн не активен, смартконтракт в разработке",
            wallet_balance: "Баланс: __",
            more_btn: "Подробнее",
            intent_more_btn: "ещё",
            road_map_btn: "Дорожная карта",
            meme_part_btn: " Меме часть ",
            contacts_btn: "Контакты",

            road_map_title: "Дорожная карта",


            // Roadmap stages
            stage_1_title: "Фундамент",
            stage_1_desc: "Концепция сформирована, блокчейн-архитектура выбрана — TON. Стек для вечного хранения идей определён. Каркас готов — дальше сборка.",
            stage_1_status: "completed",
            stage_2_title: "Мем-часть + Pixel Art",
            stage_2_desc: "• Открытие пикселей за LTC\n• Мем-токен на TON (Blum) для вирального привлечения\n• Средства идут в резерв и ликвидность MANUS\n• Первый шаг к запуску — делаем шум",
            stage_2_status: "in_progress",
            stage_3_title: "Telegram Mini App (MVP)",
            stage_3_desc: "• Интеграция TON-кошелька (Testnet → Mainnet)\n• Создание идей, лайки, базовая токеномика внутри ТГ\n• Вход без регистрации — запустил и пользуешься\n• Привлечение первых 10 000 пользователей",
            stage_3_status: "upcoming",
            stage_4_title: "Запись идей в блокчейн",
            stage_4_desc: "• Разработка и аудит смарт-контракта для записи идей\n• Каждая идея — уникальный ID, привязанный к автору\n• Никто не сможет удалить или изменить запись\n• Честное и навсегда — без компромиссов",
            stage_4_status: "upcoming",
            stage_5_title: "Запуск токена MANUS",
            stage_5_desc: "• Деплой токена MANUS (8 млрд) на TON\n• Аудит, тестнет, мейннет — прозрачная эмиссия\n• Основа для наград, стейкинга и голосования\n• Рабочая лошадка токеномики — без хайпа",
            stage_5_status: "upcoming",
            stage_6_title: "Инвесторы и партнёры",
            stage_6_desc: "• Поиск институциональных инвесторов\n• Партнёрство с проектами «Венера», «Гражданство мира»\n• Подготовка к DEX-листингу\n• Стратегические коллаборации для роста",
            stage_6_status: "upcoming",
            stage_7_title: "Solana + мост",
            stage_7_desc: "• Развёртывание смарт-контрактов на Solana (Anchor)\n• Мост TON ↔ Solana для единого токена MANUS\n• Пользователи получают выбор: ТГ или сайт\n• Гибкость без привязки к одной сети",
            stage_7_status: "upcoming",
            stage_8_title: "Социальный профиль «Мой манускрипт»",
            stage_8_desc: "• Интеграция с Instagram, Telegram, Twitter, Facebook\n• Отображение твоих идей в био профиля\n• Твой цифровой след, который видят все\n• Публичная ценность в Web3",
            stage_8_status: "upcoming",
            stage_9_title: "DAO + масштаб",
            stage_9_desc: "• DAO для управления проектом сообществом\n• Листинг на CEX\n• Система грантов — лучшие идеи получают финансирование\n• Глобальный архив идей человечества",
            stage_9_status: "upcoming",

            status_completed: "✅ Завершено",
            status_in_progress: "🔄 В процессе",
            status_upcoming: "📅 В планах",
            meme_part_title: "Meme Part",
            meme_part_desc: "Контент появится позже.",
            contacts_title: "Контакты",
            contacts_desc: "Связь с нами: manuscript.project@example.com | Twitter: @ManuscriptProject | TG: t.me/manuscript_project",

            about_back_btn: "Назад",
            about_title: "Манифест проекта",
            about_desc: "В девяностых годах прошлого века группа математиков и криптографов задалась вопросом, который казался почти фантастическим: можно ли создать среду, в которой информация останется неизменной навсегда? Где никто не сможет переписать историю, подделать факты или стереть то, что уже было сказано? Они придумали блокчейн — цифровую книгу, где каждая страница связанна с предыдущей, и если попытаться вырвать одну, рассыплется вся цепь. Это была первая технология, подарившая нам нечто большее, чем просто способ передавать данные. Она дала нам возможность оставлять след, который невозможно стереть.\n\nСпустя годы на базе этой технологии появился Биткоин, а за ним — тысячи других проектов. Блокчейн превратился в шумный базар, где люди забыли, зачем всё это затевалось. Его превратили в инструмент для быстрых денег, спекуляций и очередной гонки потребления. Но изначально он создавался для другого - для того, чтобы мы могли сохранять самое ценное, что у нас есть, — наши мысли.\n\nМы возвращаем блокчейну его истинное предназначение!\n\nManuscript Project — это цифровой архив идей, который будет жить вечно. Каждая мысль, зафиксированная здесь, становится частью глобальной истории. Представь, что через сто или пятьсот лет наши потомки смогут открыть этот архив и увидеть, о чём думали люди в начале XXI века. Как сегодня мы находим глиняные таблички и артефакты древних Месопотамии и Египта, свитки Мёртвого моря и тексты Инков, так они найдут наши Идеи. Мы строим не только мост между нами и будущим но и структуру реальных шагов по улучшению мира.\n\nЧеловечество стоит на пороге новой эры. Мы вошли в новое тысячелетие, и выбор, который мы сделаем сейчас, определит дальнейшее развитие человечества. Можно продолжать бесконечную гонку за вещами, статусом и одобрением. А можно сделать шаг и начать строить новое, настоящее и действительно полезное. Мы не враги существующей системы, мы не пытаемся разрушить её. Мы создаём альтернативу — пространство, где ценность определяется не тем, сколько ты заплатил, а тем, какой след ты оставил. Мы идём не войной, а созиданием. \n\nЗдесь каждая идея обретает вес. Чем больше людей поддерживают её — лайками, вниманием, верой, — тем значимее она становится. Таким образом мы можем определить на что направлять ресурсы в первую очередь. Идея, подхваченная другими, перестаёт быть просто мыслью. Она становится движением. Эту идею можно начать воплощать уже сегодня. Прямо сейчас. В ту секунду, когда ты решишь, что она действительно важна. За создание манускрипта ты получаешь токен, если манускрипт лайкают количество токенов увеличивается. Это становятся финансированием твоей идеи. Это ресурс, который превращает замысел в действие.\n\nЧеловек — высшая форма жизни на Земле. Мы обладаем сознанием, способным менять реальность, но мы забыли об этом. У нас есть коллективное бессознательное, но мы давно им не пользуемся. Мы погрязли в чужих сценариях, в бесконечных списках дел, мы продаём своё время, следуя за ценностями, которые сами когда‑то выбрали, но уже не помним зачем. Мы гонимся за целями, которые перестали быть нашими. Мы забыли, что мышление — это действие, что каждая мысль формирует мир вокруг нас, что коллективное сознание способно создавать реальность в тот же миг. Мы напоминаем об этом. Мы создаём место, где тишина и осознанность возвращаются, где можно остановиться и услышать себя.\n\nЧеловечество всегда знало главные истины: не убивай, не кради, не обманывай, помогай ближнему, твори прекрасное вокруг себя. Мы возвращаем их в новом контексте Web3 — не как религиозные догмы, а как этику нового мира. Не убивай будущее своими действиями. Не кради чужие идеи — создавай свои. Не обманывай с целью выгоды. Помогай тем, кто в этом нуждается. Делай мир лучше! Вместе и осознанно мы можем построить что-то большее. Это не про веру. Это про выбор. Выбор, который каждый из нас делает каждый день.\n\nТвоя идея может стать следующим шагом человечества. Зафиксируй её в блокчейне, оставь свой след в истории, стань частью вечного. Мы не знаем, каким будет мир через сто лет. Но мы знаем точно: идеи влияют на будущее и реализовывать их можно уже сегодня. Присоединяйся. Мир ждёт твоих мыслей.\n\nВместе мы — следующий шаг человечества!",
            partners_title: "Партнёры",
            author_id_label: "ID Автора",
            voting_unavailable: "Голосование пока недоступно: блокчейн не подключён.",
            vote_btn_label: "Поддержать идею",

            info_title: "Намерение",
            info_desc:
                "Мы строим децентрализованную платформу, где каждая идея закрепляется за автором и превращается в нестираемую запись в блокчейне. Этот интеллектуальный капитал – твой вклад в общий интеллект человечества хранится вечно! Твоя идея становится частью глобальной цепи решений, а не просто текстом в интернете. Мы формируем сценарий развития человечества. Каждая мысль, записанная в блокчейн, становится кирпичиком в фундаменте нового мира. \n\n Это Web3, где ценность каждого пользователя определяется его вкладом во благо. Твоя идея может стать следующим шагом человечества. Зафиксируй её в блокчейне. Начни сегодня!",
        },
        en: {
            header_title: "MANUSCRIPT PROJECT",
            community_ideas_title: "Next steps into a new reality",

            feed_1_title: "Feed 1",
            feed_2_title: "Feed 2",
            feed_3_title: "Feed 3",
            connect_wallet_btn: "Connect",
            wallet_disconnected: "Blockchain is not active, smart contract under development",
            wallet_balance: "Balance: __",

            more_btn: "More details",
            intent_more_btn: "more",
            road_map_btn: "Road Map",
            meme_part_btn: " Meme Part ",
            contacts_btn: "Contacts",

            road_map_title: "Road Map",


            // Roadmap stages
            stage_1_title: "Foundation",
            stage_1_desc: "Concept formed, blockchain architecture chosen — TON. Stack for eternal idea storage defined. Framework is ready — assembly ahead.",
            stage_1_status: "completed",
            stage_2_title: "Meme Part + Pixel Art",
            stage_2_desc: "• Pixel opening for LTC\n• Meme token on TON (Blum) for viral traction\n• Funds go to MANUS reserve and liquidity\n• First step to launch — making noise",
            stage_2_status: "in_progress",
            stage_3_title: "Telegram Mini App (MVP)",
            stage_3_desc: "• TON wallet integration (Testnet → Mainnet)\n• Idea creation, likes, basic tokenomics inside TG\n• No registration — just launch and use\n• First 10,000 users acquisition",
            stage_3_status: "upcoming",
            stage_4_title: "Recording Ideas on Blockchain",
            stage_4_desc: "• Development and audit of smart contract for idea recording\n• Each idea — unique ID tied to author\n• No one can delete or alter the record\n• Honest and forever — no compromises",
            stage_4_status: "upcoming",
            stage_5_title: "MANUS Token Launch",
            stage_5_desc: "• MANUS token deployment (8 billion) on TON\n• Audit, testnet, mainnet — transparent emissions\n• Foundation for rewards, staking, and voting\n• Workhorse of tokenomics — no hype",
            stage_5_status: "upcoming",
            stage_6_title: "Investors & Partners",
            stage_6_desc: "• Institutional investor outreach\n• Partnership with «Venus», «World Citizenship» projects\n• Preparation for DEX listing\n• Strategic collaborations for growth",
            stage_6_status: "upcoming",
            stage_7_title: "Solana + Bridge",
            stage_7_desc: "• Smart contract deployment on Solana (Anchor)\n• TON ↔ Solana bridge for unified MANUS token\n• Users get the choice: TG or website\n• Flexibility without being locked to one network",
            stage_7_status: "upcoming",
            stage_8_title: "Social Profile «My Manuscript»",
            stage_8_desc: "• Integration with Instagram, Telegram, Twitter, Facebook\n• Display your ideas in your bio\n• Your digital footprint visible to everyone\n• Public value in Web3",
            stage_8_status: "upcoming",
            stage_9_title: "DAO + Scale",
            stage_9_desc: "• DAO for community-driven governance\n• CEX listing\n• Grant system — best ideas receive funding\n• Global archive of humanity's ideas",
            stage_9_status: "upcoming",

            status_completed: "✅ Completed",
            status_in_progress: "🔄 In Progress",
            status_upcoming: "📅 Upcoming",
            meme_part_title: "Meme Part",
            meme_part_desc: "Сontent — coming soon.",
            contacts_title: "Contacts",
            contacts_desc: "Contact us: manuscript.project@example.com | Twitter: @ManuscriptProject | TG: t.me/manuscript_project",

            about_back_btn: "Back",
            about_title: "Project Manifest",
            about_desc: "In the 1990s, a group of mathematicians and cryptographers asked a question that seemed almost impossible: could there be a system where information would remain unchanged forever? A place where no one could rewrite history, forge the truth, or erase what had already been said? Their answer was blockchain—a digital ledger in which every page is bound to the one before it, so that if you try to tear one away, the entire chain falls apart. It was the first technology that gave us something greater than a new way to transfer data. It gave us the ability to leave a mark that can never be erased.\n\nYears later, Bitcoin emerged from this technology, followed by thousands of other projects. Blockchain became a noisy marketplace where people forgot why it had been created in the first place. It was reduced to a tool for quick profits, speculation, and yet another race for consumption. But that was never its true purpose. It was created so that we could preserve the most valuable thing we possess—our ideas.\n\nWe are bringing blockchain back to its original purpose!\n\n**Manuscript Project** is a digital archive of ideas that will exist forever. Every thought recorded here becomes part of humanity's shared history. Imagine that one hundred or even five hundred years from now, our descendants open this archive and discover what people at the beginning of the twenty-first century were thinking about. Just as we uncover clay tablets and artifacts from ancient Mesopotamia and Egypt, the Dead Sea Scrolls, and the surviving writings of lost civilizations, they will discover our Ideas. We are building not only a bridge between the present and the future, but also a framework for taking real steps toward making the world better.\n\nHumanity stands on the threshold of a new era. We have entered a new millennium, and the choices we make today will shape the future of our civilization. We can continue the endless pursuit of possessions, status, and approval. Or we can take a step forward and begin creating something new—something real and genuinely meaningful. We are not enemies of the existing system, nor are we trying to destroy it. We are creating an alternative: a place where value is measured not by how much you paid, but by the mark you leave behind. We do not come with conflict—we come to create.\n\nHere, every idea carries weight. The more people support it—with likes, attention, and belief—the more significant it becomes. This allows us to understand where our collective resources should be directed first. Once an idea is embraced by others, it is no longer just a thought. It becomes a movement. And that movement can begin today. Right now. The very second you decide that the idea is worth bringing to life. Every manuscript you create earns you tokens, and every like it receives increases your reward. Those tokens become the funding behind your idea—the resource that transforms vision into action.\n\nHuman beings are the highest form of life on Earth. We possess a consciousness capable of changing reality, yet we have forgotten it. We share a collective unconscious, but we no longer know how to use it. We have become trapped in other people's scripts, buried beneath endless to-do lists, selling our time in pursuit of values we once accepted but no longer remember why. We chase goals that are no longer our own. We have forgotten that thinking is itself an act, that every thought shapes the world around us, and that collective consciousness has the power to transform reality. We are here to remind people of that. We are creating a place where silence and awareness return, where you can pause and finally hear yourself again.\n\nHumanity has always known its greatest truths: do not kill, do not steal, do not deceive, help those in need, and create beauty wherever you can. We are bringing these principles into the world of Web3—not as religious commandments, but as the ethics of a new civilization. Do not destroy the future through your actions. Do not steal other people's ideas—create your own. Do not deceive for personal gain. Help those who need it. Make the world better. Together, with awareness and intention, we can build something greater. This is not about faith. It is about choice—the choice each of us makes every single day.\n\nYour idea could become humanity's next step forward. Record it on the blockchain. Leave your mark on history. Become part of something eternal. We do not know what the world will look like a hundred years from now. But we know one thing with certainty: ideas shape the future, and they can begin changing it today. Join us. The world is waiting for your ideas.\n\nTogether, we are humanity's next step!",
            partners_title: "Partners",
            author_id_label: "Author ID",
            voting_unavailable: "Voting is not available yet: the blockchain is not connected.",
            vote_btn_label: "Support this idea",

            info_title: "Intent",
            info_desc:
                "We are building a decentralized platform where every idea is permanently linked to its author and recorded as an immutable entry on the blockchain. This intellectual capital is your contribution to humanity's collective intelligence, preserved forever. Your idea becomes part of a global chain of solutions, not just another piece of text on the internet. Together, we are shaping humanity's future. Every thought recorded on the blockchain becomes a building block in the foundation of a new world.\n\nThis is Web3, where the value of every user is defined by their contribution to the common good. Your idea could become humanity's next breakthrough. Record it on the blockchain. Start today!",
        },
    };

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

