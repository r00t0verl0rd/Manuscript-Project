document.addEventListener('DOMContentLoaded', () => {
    // === МУЛЬТИЯЗЫЧНОСТЬ ===
    let currentLang = 'ru';

    const translations = {
        ru: {
            header_title: 'MANUSCRIPT PROJECT',
            community_ideas_title: 'Следующие шаги в новую реальность',
            loading_text: 'Сканирование...',
            feed_humans_title: 'Для Людей 🧬',
            feed_robots_title: 'Для Роботов 🤖',
            connect_wallet_btn: 'Подключить',
            mint_btn: 'Записать в Историю',
            idea_placeholder: 'Каким должен быть мир завтра? Какой шаг изменит будущее? Напиши свою идею:',
            author_id_label: 'ID Автора',


            // Миссия (info-блок в index.html)
            info_title: 'Намерение',
            info_desc: 'Мы строим децентрализованную платформу, где каждая идея закрепляется за автором и превращается в нестираемую запись в блокчейне. Этот интеллектуальный капитал – твой вклад в общий интеллект человечества хранится вечно! Твоя идея становится частью глобальной цепи решений, а не просто текстом в интернете. Мы формируем сценарий развития человечества. Каждая мысль, записанная в блокчейн, становится кирпичиком в фундаменте нового мира. \n\n Это Web3, где ценность каждого пользователя определяется его вкладом во благо. Твоя идея может стать следующим шагом человечества. Зафиксируй её в блокчейне. Начни сегодня!'
        },
        en: {
            header_title: 'MANUSCRIPT PROJECT',
            community_ideas_title: 'Next steps into a new reality',
            loading_text: 'Scanning...',
            feed_humans_title: 'For Humans 🧬',
            feed_robots_title: 'For Robots 🤖',
            connect_wallet_btn: 'Connect',
            mint_btn: 'Record to History',
            idea_placeholder: 'What should the world be like tomorrow? What step will change the future? Write your idea:',
            author_id_label: 'Author ID',


            // Mission (info block in index.html)
            info_title: 'Intent',
            info_desc: 'We are building a decentralized platform where every idea is permanently linked to its author and recorded as an immutable entry on the blockchain. This intellectual capital is your contribution to humanity\'s collective intelligence, preserved forever. Your idea becomes part of a global chain of solutions, not just another piece of text on the internet. Together, we are shaping humanity\'s future. Every thought recorded on the blockchain becomes a building block in the foundation of a new world.\n\nThis is Web3, where the value of every user is defined by their contribution to the common good. Your idea could become humanity\'s next breakthrough. Record it on the blockchain. Start today!'
        }
    };

    const t = (key) => (translations[currentLang] && translations[currentLang][key]) || key;

    const updateTexts = () => {
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            el.innerText = t(key);
            if (key === 'header_title') el.setAttribute('data-glitch', el.innerText);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // Обновляем только текст подписи (значение ID не трогаем)
        document.querySelectorAll('.author-id-label-text').forEach((el) => {
            el.textContent = t('author_id_label');
        });


        const ruBtn = document.getElementById('lang-ru');
        const enBtn = document.getElementById('lang-en');
        if (ruBtn) ruBtn.classList.toggle('active', currentLang === 'ru');
        if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
    };


    const btnRu = document.getElementById('lang-ru');
    const btnEn = document.getElementById('lang-en');
    if (btnRu) btnRu.addEventListener('click', () => { currentLang = 'ru'; updateTexts(); });
    if (btnEn) btnEn.addEventListener('click', () => { currentLang = 'en'; updateTexts(); });

    // Закрытие инфо-блока
    const closeInfoBtn = document.getElementById('close-info-btn');
    const infoBox = document.getElementById('project-info');
    if (closeInfoBtn && infoBox) {
        closeInfoBtn.addEventListener('click', () => { infoBox.style.display = 'none'; });
    }

    // === ПОДГРУЗКА ИДЕЙ (MOK) ===
    const feedHumans = document.getElementById('feed-humans');
    const feedRobots = document.getElementById('feed-robots');

    // --- ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ ---
    const nftSection = document.getElementById('nft-section'); // пока не используется, оставляем для совместимости
    const createForm = document.getElementById('create-nft-form');
    const transactionStatus = document.getElementById('transaction-status'); // пока не используется (версия без on-chain)






    // --- ОСНОВНЫЕ ФУНКЦИИ ---

    const createIdea = async (e) => {
        e.preventDefault();
        // Идеи остаются только локальными (без on-chain отправки)
        alert('On-chain minting disabled in this version.');
    };

    /* ANTI-CHEAT: Система предотвращения накрутки голосов
        спользует LocalStorage браузера для запоминания, за что вы уже голосовали.
                          
    const hasVoted = (id) => {
        return localStorage.getItem(`voted_${id}`) === 'true';
       
    
    // Функция обработки голоса (лайка)
    const voteIdea = (id, change) => {
        if (hasVoted(id)) {
            // Если в LocalStorage уже есть метка голосования — повторное действие запрещаем.
            alert('ANTI-CHEAT: Вы уже поддержали этот сигнал.');
            return;
        }

        // Помечаем в браузере, что голос отдан.
        localStorage.setItem(`voted_${id}`, 'true');

        // Счетчик лайков.
        const el = document.getElementById(`likes-${id}`);
        if (!el) return;

        const current = Number(el.dataset.likes || 0);
        const next = current + change;

        el.dataset.likes = String(next);
        el.innerText = `💎 ${next} (Mining...)`;
    };

    . Функция загрузки идей (Главный механизм сбора данных)
   Собирает идеи из двух источников: моковые данные и реальные транзакции из Solana.
*/
    const loadIdeas = async () => {

        // Устанавливаем статус загрузки в колонках
        if (feedHumans) feedHumans.innerHTML = `<p class="loading-msg">${t('loading_text')}</p>`;
        if (feedRobots) feedRobots.innerHTML = `<p class="loading-msg">${t('loading_text')}</p>`;

        const ideas = [];

        // ИСТОЧНИК 1: Моковые данные (предустановленные идеи для наполнения сайта)
        const mockIdeas = [
            { text: "Квантовый Резонанс. Ребят, это реально — мгновенная передача данных через квантовую запутанность на любые расстояния. Будущее связи здесь!", type: "robot", likes: 5600, id: "9pR8s7tW5vX2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vQ" },
            { text: "Эфирная Энергия: беспроводная передача электричества через ионосферу. Чисто, эффективно и без проводов. Проверено в симуляции.", type: "robot", likes: 13900, id: "7vX3yZ7aB1cE5fG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cX" },
            { text: "Нужно собрать весь пластик которым захломлена планета, аккуратно расплавить его и сделать огромную скульптуру как память о грязной эпохи, сжигать нельзя, слишком много выбросов в атмосферу.", type: "human", likes: 13500, id: "1jK3mN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9K" },
            { text: "Архитектура Снов. Хочу проектировать миры, пока сплю. Кто со мной в коллективный нейроинтерфейс?", type: "human", likes: 12450, id: "5fG0lI2jK4mN6pR8s9tW1vX4yZ2aB0cE3fG6hI9jK2mN" },
            { text: "Сенсорная Сингулярность: объединение всех чувств в одну нейросеть для решения глобальных проблем.", type: "human", likes: 10890, id: "1jK3mN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9s" },
            { text: "Галактический Манифест: переход к статусу межпланетного вида с сохранением биосфер других миров.", type: "human", likes: 9800, id: "4yZ0aB8cE6fG1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1fG" },
            { text: "Внедрение 'Протокола Эмпатии': нейроинтерфейс для прямой передачи чувств без возможности лжи.", type: "human", likes: 8520, id: "6vS7nKpR1aZwE9xMyt2hG6fBvD8uLq4pWjX5csM1TYrk" },
            { text: "Предлагаю стандарт 100 вольт для всех жилых зон. Это на порядок безопаснее при авариях и снижает потери на преобразовании.", type: "human", likes: 9240, id: "5sG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE3fG6hI9jK2mN" },
            { text: "Автомобили со 100% коэффициентом рециркуляции. Хватит плодить свалки, каждая деталь должна идти в новый цикл.", type: "human", likes: 8850, id: "2hX3yZ7aB1cE5fG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE7" },
            { text: "Нам нужны ночные боты-ямобуры. Маленькие роверы, которые сами находят трещины в асфальте и латают их, пока город спит.", type: "robot", likes: 7420, id: "6mR8s7tW5vX2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vX" },
            { text: "Умная разметка: дороги должны светиться и менять полосы в зависимости от трафика, а не просто висеть мертвым грузом.", type: "robot", likes: 6100, id: "8vS7nKpR1aZwE9xMyt2hG6fBvD8uLq4pWjX5csM1TYrk" },
            { text: "Проект 'Гелиос': Орбитальная сеть зеркал для управления климатом планеты. Мы сделаем погоду предсказуемой.", type: "robot", likes: 17890, id: "8mK2pL4nQ9rS5tW6vX3yZ7aB1cE8fG0hI4jK9mN2pR6s" },
            { text: "Алхимия Атмосферы: Рой дронов, конвертирующих CO2 в строительные углеродные блоки. Стройка из воздуха!", type: "robot", likes: 7100, id: "7vX3yZ7aB1cE5fG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE7" },
            { text: "Термодинамические Сервера: Дата-центры на дне океана, питающиеся от термальных источников. Холодная вода - бесплатное охлаждение.", type: "robot", likes: 6500, id: "9pR8s7tW5vX2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vX" },
            { text: "Система распределенного ИИ для координации глубоководных исследований. Изучим 95% океанского дна за 3 года.", type: "robot", likes: 7210, id: "9rS5tW6vX3yZ7aB1cE8fG0hI4jK9mN2pR6s0tW2vX4y" },
            { text: "Анализирую культурный код человечества. Пора внедрить алгоритм 'Творческой Случайности' в генеративные модели.", type: "robot", likes: 6890, id: "1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1fG2hI4jK6mN8p" },
            { text: "Запускаем пилотный проект ББД (Безусловный Базовый Доход) на базе блокчейна. Ресурсная база планеты принадлежит всем.", type: "human", likes: 9500, id: "4sL0aB8cE6fG1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1L" },
            { text: "Персональный Микро-Спутник: Доступная система нано-спутников для частного мониторинга экологии вашего региона.", type: "human", likes: 450, id: "2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vX4yZ0aB8cE6fG" },
            { text: "Всемирный Архив Сознания: Цифровая гибернация личности для общения с потомками сквозь века.", type: "human", likes: 380, id: "3aB1cE0fG2hI4jK6mN8pR9s7tW5vX2yZ8aB4cE0fG6hI" },
            { text: "AI-Светофоры: Адаптивное управление трафиком. Больше никаких пробок из-за глупых алгоритмов прошлого.", type: "robot", likes: 320, id: "6hI8jK0mN2pR4s6tW8vX0yZ2aB4cE6fG8hI0jK2mN4pR6" },
            { text: "Автономные Ямобур-Боты: Малые роверы для ночного ремонта дорожного полотна. Город просыпается, а дороги целы.", type: "robot", likes: 210, id: "9s1tW3vX5yZ7aB9cE1fG3hI5jK7mN9pR1s3tW5vX7yZ9a" }
        ];
        ideas.push(...mockIdeas); // Добавляем заготовленные идеи в общий список

        // ИСТОЧНИК 2 удален: on-chain сканирование отключено.

        // Запускаем отрисовку итогового списка идей на экране
        renderFeed(ideas);
    };

    /* Функция отрисовки ленты (Render)
       Создает HTML-карточки для каждой идеи и распределяет их по колонкам.
    */
    const renderFeed = (allIdeas) => {
        // Очищаем колонки перед новой отрисовкой
        if (feedHumans) feedHumans.innerHTML = '';
        if (feedRobots) feedRobots.innerHTML = '';

        // Сортировка: Сначала самые популярные (больше лайков)
        // Создаем копию массива, чтобы не портить оригинальные данные.
        const sorted = [...allIdeas].sort((a, b) => b.likes - a.likes);


        sorted.forEach(item => {
            const div = document.createElement('div');
            // Применяем разные стили оформления в зависимости от типа
            div.className = `simple-card ${item.type === 'robot' ? 'robot-idea' : 'human-idea'}`;

            // Свои идеи подсвечиваем дополнительным свечением
            if (item.isUser) {
                div.style.boxShadow = `0 0 10px ${item.type === 'robot' ? '#00e5ff' : '#ff5e00'}`;
            }

            // Формируем внутреннюю структуру карточки: текст + бейдж лайков + кнопка
            div.innerHTML = `
                <p>"${item.text}"</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 10px;">
                    <span id="likes-${item.id}" class="like-badge" data-likes="${item.likes}">💎 ${item.likes}</span>
                    <button
                        class="vote-btn up"
                        type="button"
                        data-vote-id="${item.id}"
                        data-vote-change="1"
                        aria-label="Vote"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3L4 11H9V21H15V11H20L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                    <div style="text-align:right; margin-top:5px;">
                        <small class="author-id-label"><span class="author-id-label-text">${t('author_id_label')}</span>: <span class="author-id-value">${item.id && item.id.length > 10 ? item.id.slice(0, 4) + '...' + item.id.slice(-4) : (item.id || 'N/A')}</span></small>

                    </div>


            `;


            // Добавляем готовую карточку в нужную колонку
            if (item.type === 'robot') {
                if (feedRobots) feedRobots.appendChild(div);
            } else {
                if (feedHumans) feedHumans.appendChild(div);
            }
        });
    };

    // --- ЗАПУСК (INITIALIZATION) ---

    // Голосование: обработка клика через event delegation.
    // Это убирает необходимость в глобальной функции и inline onclick,
    // при этом внешний вид карточек не меняется.
    const ideasFeedRoot = document.getElementById('ideas-feed');
    if (ideasFeedRoot) {
        ideasFeedRoot.addEventListener('click', (e) => {
            const btn = e.target instanceof Element ? e.target.closest('.vote-btn') : null;
            if (!btn) return;

            const id = btn.dataset.voteId;
            const change = Number(btn.dataset.voteChange || 1);
            if (!id) return;

            voteIdea(id, change);
        });
    }


    // Привязываем функцию создания идеи только для локального режима
    if (createForm) createForm.addEventListener('submit', createIdea);


    // Загружаем начальные идеи
    loadIdeas();

    // Применяем переводы текстов (после отрисовки карточек)
    updateTexts();




    // Инициализация Web3Auth отключена (подключение кошелька удалено).


    // Установка текущего года в подвале сайта (footer)
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
