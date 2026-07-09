// Инициализация приложения после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Доступ к переводам (fallback на ключ, если i18n не подключён)
  const t = (key) => (window.t ? window.t(key) : key);

  document.getElementById('close-info-btn')?.addEventListener('click', () => {
    const infoBox = document.getElementById('project-info');
    if (infoBox) infoBox.style.display = 'none';
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

  const renderFeed = (items, sortMode) => {
    const activeFeeds = getActiveFeeds();

    activeFeeds.forEach((f) => {
      f.innerHTML = '';
    });

    const sorted = sortIdeas(items, sortMode);

    sorted.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'simple-card';

      const shortId =
        item.id && item.id.length > 10
          ? `${item.id.slice(0, 4)}...${item.id.slice(-4)}`
          : item.id || 'N/A';

      div.innerHTML = `
        <p>"${item.text}"</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 10px;">
          <span id="likes-${item.id}" class="like-badge" data-likes="${item.likes}">💎 ${item.likes}</span>
          <button class="vote-btn up" type="button" data-vote-id="${item.id}" data-vote-change="1" aria-label="Vote">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 11H9V21H15V11H20L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div style="text-align:right; margin-top:5px;">
          <small class="author-id-label">
            <span class="author-id-label-text">${t('author_id_label')}</span>:
            <span class="author-id-value">${shortId}</span>
          </small>
          <div style="margin-top:6px; text-align:right;">
            <small style="color: rgba(255,255,255,0.65);">${formatDateYYYYMMDD(item.createdAt)}</small>
          </div>
        </div>
      `;

      activeFeeds[index % activeFeeds.length]?.appendChild(div);
    });
  };

  let sortMode = 'diamonds_desc';

  const readSortModeFromUI = () => {
    const checked = document.querySelector('input[name="sort"]:checked');
    sortMode = checked?.value || 'diamonds_desc';
  };

  // Загрузка/отрисовка идей на странице
  const loadIdeas = () => {
    const activeFeeds = getActiveFeeds();

    activeFeeds.forEach(

      (f) => (f.innerHTML = `<p class="loading-msg">${t('loading_text')}</p>`)
    );

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

  window.addEventListener('resize', loadIdeas);

  window.updateTexts?.();

  readSortModeFromUI();
  loadIdeas();

  document.getElementById('current-year').textContent = new Date().getFullYear();
});