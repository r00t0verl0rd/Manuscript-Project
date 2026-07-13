// Инициализация приложения после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Доступ к переводам (fallback на ключ, если i18n не подключён)
  const t = (key) => (window.t ? window.t(key) : key);

  const infoBox = document.getElementById('project-info');

  document.getElementById('close-info-btn')?.addEventListener('click', () => {
    if (infoBox) infoBox.style.display = 'none';

    // Возвращаем обратно намерение/сортировку/идеи
    const contentToShow = [
      document.getElementById('nft-section'),
      document.getElementById('ideas-feed'),
    ];

    contentToShow.forEach((el) => {
      if (el) el.style.display = '';
    });
  });



  document.getElementById('about-btn')?.addEventListener('click', () => {
    const aboutBtn = document.getElementById('about-btn');
    const aboutBackBtn = document.getElementById('about-back-btn');

    if (aboutBtn) aboutBtn.style.display = 'none';
    if (aboutBackBtn) aboutBackBtn.style.display = '';

    // Создаём отдельный чистый блок “About”, чтобы не дублировать/не переиспользовать “Intent”
    const existing = document.getElementById('about-info');
    if (existing) existing.remove();

    // Скрываем остальной контент (намерение/сортировка/идеи)
    const contentToHide = [
      document.getElementById('nft-section'),
      document.getElementById('ideas-feed'),
      document.getElementById('project-info'),
    ];

    contentToHide.forEach((el) => {
      if (el) el.style.display = 'none';
    });

    const wrapper = document.createElement('div');
    wrapper.id = 'about-info';
    wrapper.className = 'simple-card';
    wrapper.style.marginBottom = '30px';

    wrapper.innerHTML = `
      <h2 class="about-title">
        <span data-i18n="about_title">АААААААА</span>
      </h2>
      <p class="about-desc">
        <span data-i18n="about_desc">BBBBBBB</span>
      </p>
    `;

    // Вставляем ВЫШЕ контента About так, чтобы MANUSCRIPT PROJECT оставался сверху:
    // вставляем сразу после заголовка H1
    const main = document.querySelector('main.main-wrapper');
    const headerEl = document.querySelector('main.main-wrapper > h1');

    if (headerEl && headerEl.parentNode) {
      headerEl.insertAdjacentElement('afterend', wrapper);
    } else if (main) {
      main.insertBefore(wrapper, main.firstChild);
    } else {
      document.body.appendChild(wrapper);
    }

    // Применяем переводы к новому блоку
    window.updateTexts?.();

    wrapper.addEventListener('click', (e) => {
      // Закрытие по клику не нужно — удаляем обработчик.
    });

    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('about-back-btn')?.addEventListener('click', () => {
    const aboutInfo = document.getElementById('about-info');
    if (aboutInfo) aboutInfo.remove();

    // Возвращаем исходное состояние главной страницы:

    // nft-section (форма создания) изначально скрыта.
    const contentToShow = [
      document.getElementById('project-info'),
      document.getElementById('ideas-feed'),
    ];

    // nft-section должен быть скрыт, чтобы не показывать create_idea_title
    const nftSection = document.getElementById('nft-section');
    if (nftSection) nftSection.style.display = 'none';


    contentToShow.forEach((el) => {
      if (el) el.style.display = '';
    });

    const aboutBtn = document.getElementById('about-btn');
    const aboutBackBtn = document.getElementById('about-back-btn');

    if (aboutBtn) aboutBtn.style.display = '';
    if (aboutBackBtn) aboutBackBtn.style.display = 'none';

    // Не делаем скролл при возврате, чтобы не было "скачков".
    // Страница должна просто отрисовать верхний блок по новой вёрстке.



  });



  // Ссылки на ленты (колонки) с идеями
  const feeds = [
    document.getElementById('feed-1'),
    document.getElementById('feed-2'),
    document.getElementById('feed-3'),
  ].filter(Boolean);

  const createForm = document.getElementById('create-nft-form');

  // Обработчик отправки формы идеи
  const createIdea = (e) => {
    e.preventDefault();

    const ideaInput = document.getElementById('idea-text');
    const ideaText =
      ideaInput && typeof ideaInput.value === 'string' ? ideaInput.value.trim() : '';
    if (!ideaText) return;
    alert('Создание идеи в этой версии недоступно: on-chain запись не подключена.');
  };

  const now = Date.now();

  const mockIdeas = [
    {
      text: 'Нужно собрать весь пластик которым захломлена планета, аккуратно расплавить его и сделать огромную скульптуру как память о грязной эпохе, сжигать нельзя, слишком много выбросов в атмосферу.',
      likes: 13500,
      createdAt: now - 1000 * 60 * 60 * 24 * 2,
      id: '1jK3mN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9K',
    },
    {
      text: 'Ввести стандарт 100 вольт для всех жилых зон. Это на порядок безопаснее при авариях и снижает потери на преобразовании.',
      likes: 9240,
      createdAt: now - 1000 * 60 * 60 * 24 * 5,
      id: '5sG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE3fG6hI9jK2mN',
    },
    {
      text: 'Автомобили со 100% коэффициентом рециркуляции. Хватит плодить свалки, каждая деталь должна идти в новый цикл.',
      likes: 8850,
      createdAt: now - 1000 * 60 * 60 * 24 * 1,
      id: '2hX3yZ7aB1cE5fG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE7',
    },
    {
      text: 'Нам нужны ночные боты-ямоискатели. Маленькие роверы, которые сами находят трещины в асфальте и латают их, пока город спит.',
      likes: 7420,
      createdAt: now - 1000 * 60 * 60 * 24 * 7,
      id: '6mR8s7tW5vX2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vX',
    },
    {
      text: 'Умная разметка: дороги должны светиться и менять полосы в зависимости от трафика.',
      likes: 6100,
      createdAt: now - 1000 * 60 * 60 * 24 * 3,
      id: '8vS7nKpR1aZwE9xMyt2hG6fBvD8uLq4pWjX5csM1TYrk',
    },
    {
      text: "Проект 'Гелиос': Орбитальная сеть зеркал для управления климатом планеты. Мы сделаем погоду предсказуемой.",
      likes: 17890,
      createdAt: now - 1000 * 60 * 60 * 12,
      id: '8mK2pL4nQ9rS5tW6vX3yZ7aB1cE8fG0hI4jK9mN2pR6s',
    },
    {
      text: 'Ресурсная база планеты должна пренадлежать всем. Если человек нашел минерал значит это его минерал',
      likes: 9500,
      createdAt: now - 1000 * 60 * 60 * 24 * 4,
      id: '4sL0aB8cE6fG1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1fG',
    },
  ];

  const formatDateYYYYMMDD = (ms) => {
    const d = new Date(ms);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const getActiveFeeds = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return isMobile ? feeds.filter((_, i) => i < 2) : feeds;
  };

  const sortIdeas = (items, mode) => {
    const copy = [...items];
    if (mode === 'diamonds_asc') copy.sort((a, b) => a.likes - b.likes);
    else if (mode === 'created_desc')
      copy.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    else copy.sort((a, b) => b.likes - a.likes);
    return copy;
  };

  const formatShortId = (id) => {
    if (!id) return 'N/A';
    return id.length > 10 ? `${id.slice(0, 4)}...${id.slice(-4)}` : id;
  };

  // Перерисовка с keyed-переиспользованием DOM.
  // Идея: не очищаем feed полностью (innerHTML=''), а перемещаем/обновляем существующие карточки.
  const renderFeed = (items, sortMode) => {
    const activeFeeds = getActiveFeeds();

    const sorted = sortIdeas(items, sortMode);

    // Получаем текущие карточки из DOM, чтобы переиспользовать
    const cardById = new Map();
    const allCurrentCards = document.querySelectorAll('.simple-card[data-idea-id]');
    allCurrentCards.forEach((el) => {
      const ideaId = el.getAttribute('data-idea-id');
      if (ideaId) cardById.set(ideaId, el);
    });

    // Быстрое обновление метаданных карточек (текст/дата/likes/shortId)
    const ensureCardContent = (cardEl, item) => {
      let ideaTextEl = cardEl.querySelector('.idea-text');
      let likeBadgeEl = cardEl.querySelector('.like-badge');
      let shortIdEl = cardEl.querySelector('.author-id-value');
      let createdAtEl = cardEl.querySelector('.created-at');

      if (!ideaTextEl) {
        ideaTextEl = document.createElement('p');
        ideaTextEl.className = 'idea-text';
        cardEl.insertBefore(ideaTextEl, cardEl.firstChild);
      }
      if (!likeBadgeEl) {
        likeBadgeEl = cardEl.querySelector('.like-badge');
      }
      if (!shortIdEl) {
        shortIdEl = cardEl.querySelector('.author-id-value');
      }
      if (!createdAtEl) {
        createdAtEl = cardEl.querySelector('.created-at');
      }

      // Всегда обновляем то, что может отличаться
      ideaTextEl.textContent = `"${item.text}"`;
      if (likeBadgeEl) {
        likeBadgeEl.textContent = `💎 ${item.likes}`;
        likeBadgeEl.setAttribute('data-likes', String(item.likes));
      }
      if (shortIdEl) shortIdEl.textContent = formatShortId(item.id);
      if (createdAtEl) createdAtEl.textContent = formatDateYYYYMMDD(item.createdAt);

      // На всякий случай синхронизируем data-* у кнопки, если потребуется
      const btn = cardEl.querySelector('.vote-btn');
      if (btn) {
        btn.dataset.voteId = item.id;
      }
    };

    // 1) Убираем карточки из активных колонок (не пересоздаём)
    activeFeeds.forEach((f) => {
      while (f.firstChild) f.removeChild(f.firstChild);
    });

    // 2) Добавляем в нужный порядок, переиспользуя существующие элементы
    sorted.forEach((item, index) => {
      const targetFeed = activeFeeds[index % activeFeeds.length];
      if (!targetFeed) return;

      let cardEl = cardById.get(item.id);
      if (!cardEl) {
        cardEl = document.createElement('div');
        cardById.set(item.id, cardEl);
        cardEl.className = 'simple-card';
        cardEl.setAttribute('data-idea-id', item.id);

        const shortId = formatShortId(item.id);

        cardEl.innerHTML = `
          <p class="idea-text">"${item.text}"</p>

          <div class="idea-vote-row">
            <span id="likes-${item.id}" class="like-badge" data-likes="${item.likes}">💎 ${item.likes}</span>
            <button class="vote-btn up" type="button" data-vote-id="${item.id}" data-vote-change="1" aria-label="Vote">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 11H9V21H15V11H20L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="idea-meta">
            <small class="author-meta">
              <span class="author-id-label-text">${t('author_id_label')}</span>:
              <span class="author-id-value">${shortId}</span>
            </small>

            <small class="created-at">${formatDateYYYYMMDD(item.createdAt)}</small>
          </div>
        `;
      } else {
        ensureCardContent(cardEl, item);
      }

      targetFeed.appendChild(cardEl);
    });
  };

  let sortMode = 'diamonds_desc';

  const readSortModeFromUI = () => {
    const checked = document.querySelector('input[name="sort"]:checked');
    sortMode = checked?.value || 'diamonds_desc';
  };


  // Загрузка/отрисовка идей на странице
  const loadIdeas = () => {
    // Не делаем тяжёлый innerHTML-пересоз при каждом вызове,
    // renderFeed сам переиспользует карточки и перемещает их по колонкам.
    renderFeed(mockIdeas, sortMode);
  };

  // Обработка кликов по кнопкам голосования
  document.getElementById('ideas-feed')?.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest('.vote-btn') : null;

    if (!btn) return;
    const id = btn.dataset.voteId;
    if (!id) return;
  });

  createForm?.addEventListener('submit', createIdea);

  document.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== 'sort') return;

    readSortModeFromUI();
    loadIdeas();
  });

  // Дребаунс/коалесинг на resize: чтобы снизить шанс микрофризов.
  // Рендер переносим на следующий кадр и выполняем только после того, как resize "успокоился".
  let resizeTimer = 0;
  let resizeRaf = 0;
  const scheduleLoadIdeas = () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      clearTimeout(resizeTimer);
      // Убрали лишнюю задержку: при резком изменении ширины колонки
      // должны успевать перестроиться без «подвисания».
      resizeTimer = window.setTimeout(() => {
        loadIdeas();
      }, 0);
    });
  };

  window.addEventListener('resize', scheduleLoadIdeas, { passive: true });

  // На некоторых браузерах media-query могут «пробиваться» без событий resize.
  // Быстро подстрахуемся, чтобы колонки не отставали от ширины.
  if (window.matchMedia) {
    const mql = window.matchMedia('(max-width: 768px)');
    mql.addEventListener?.('change', scheduleLoadIdeas);
  }


  window.updateTexts?.();

  readSortModeFromUI();
  loadIdeas();

  document.getElementById('current-year').textContent = new Date().getFullYear();
});

