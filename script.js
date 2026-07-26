(() => {
  const i18n = window.AppI18n;
  i18n.ready.then(() => {
    const translate = (key) => i18n.translate(key);
    const applyTranslations = (root) => i18n.applyTranslations(root);
    const mobileFeedQuery = window.matchMedia('(max-width: 480px)');
    const mainHeading = document.querySelector('.main-wrapper > h1');

    const mainSections = [
      document.getElementById('project-info'),
      document.getElementById('ideas-feed'),
    ].filter(Boolean);
    const ideaFeeds = ['feed-1', 'feed-2', 'feed-3']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const navigationItems = [
      {
        panelId: 'about-info',
        buttonId: 'more-btn',
        titleKey: 'about_title',
        descriptionKey: 'about_desc',
      },
      {
        panelId: 'road-map-info',
        buttonId: 'road-map-btn',
        titleKey: 'road_map_title',
      },
      {
        panelId: 'meme-part-info',
        buttonId: 'meme-part-btn',
        titleKey: 'meme_part_title',
        descriptionKey: 'meme_part_desc',
      },
      {
        panelId: 'contacts-info',
        buttonId: 'contacts-btn',
        titleKey: 'contacts_title',
        descriptionKey: 'contacts_desc',
      },
    ];

    const roadmapStages = [
      { number: 1, icon: '🔬' },
      { number: 2, icon: '🎨' },
      { number: 3, icon: '📱' },
      { number: 4, icon: '📝' },
      { number: 5, icon: '🪙' },
      { number: 6, icon: '🤝' },
      { number: 7, icon: '🌉' },
      { number: 8, icon: '👤' },
      { number: 9, icon: '🗳️' },
    ];

    const currentTime = Date.now();
    const ideas = [
      [12950, 23 * 10, 'f55dmN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9K'],
      [13501, 23, '2jj5mN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9K'],
      [13081, 24 * 2, '1jK3mN5pR7s9tW2vX4yZ0aB8cE6fG1hI3jK5mN7pR9K'],
      [9240, 24 * 5, '5sG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE3fG6hI9jK2mN'],
      [8850, 24, '2hX3yZ7aB1cE5fG0hI2jK4mN6pR8s9tW1vX4yZ2aB0cE7'],
      [7420, 24 * 7, '6mR8s7tW5vX2yZ8aB4cE0fG6hI1jK3mN5pR7s9tW2vX'],
      [6100, 24 * 3, '8vS7nKpR1aZwE9xMyt2hG6fBvD8uLq4pWjX5csM1TYrk'],
      [12770, 12, '8mK2pL4nQ9rS5tW6vX3yZ7aB1cE8fG0hI4jK9mN2pR6s'],
      [9500, 24 * 4, '4sL0aB8cE6fG1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1fG'],
      [10113, 24 * 8, '5kSdaB8cE6fG1hI3jK5mN7pR9s1tW3vX5yZ7aB9cE1fG'],
    ].map(([likes, hoursAgo, id], index) => ({
      textKey: `idea_${index + 1}_text`,
      likes,
      createdAt: currentTime - 1000 * 60 * 60 * hoursAgo,
      id,
    }));

    let activePanelId = null;
    let activeSortMode = 'diamonds_desc';
    const ideaCardCache = new Map();

    const createSvg = (viewBox, pathD) => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', viewBox);
      svg.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.append(path);
      return svg;
    };

    const voteIconTemplate = (() => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12 3L4 11H9V21H15V11H20L12 3Z');
      svg.append(path);
      return svg;
    })();

    const connectorIconTemplate = createSvg('0 0 40 40', 'M8 20h24M22 10l10 10-10 10');

    const setMainSectionsVisible = (isVisible) => {
      mainSections.forEach((section) => {
        section.hidden = !isVisible;
      });
    };

    const removeNavigationPanels = (exceptPanelId = null) => {
      navigationItems.forEach(({ panelId }) => {
        if (panelId !== exceptPanelId) document.getElementById(panelId)?.remove();
      });
    };

    const setNavigationButtonState = (item, isBackButton) => {
      const button = document.getElementById(item.buttonId);
      if (!button) return;

      button.dataset.i18n = isBackButton
        ? 'about_back_btn'
        : button.dataset.originalI18n;
      button.textContent = translate(button.dataset.i18n);
    };

    const createElement = (tagName, className, text) => {
      const element = document.createElement(tagName);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    };

    const createRoadmapConnector = (number, pointsRight) => {
      const connector = createElement(
        'div',
        `step-connector ${pointsRight ? 'arrow-right' : 'arrow-left'}`,
      );
      connector.dataset.connector = String(number);
      connector.append(connectorIconTemplate.cloneNode(true));
      return connector;
    };

    const createRoadmap = () => {
      const section = createElement('div', 'roadmap-section');
      const track = createElement('div', 'roadmap-snake-track');
      const fragment = document.createDocumentFragment();

      roadmapStages.forEach((stage, index) => {
        const stageKey = `stage_${stage.number}`;
        const status = translate(`${stageKey}_status`);
        const step = createElement(
          'div',
          `roadmap-step ${index % 2 === 0 ? 'step-left' : 'step-right'}`,
        );
        step.dataset.step = String(stage.number);

        const marker = createElement('div', 'step-marker');
        marker.append(
          createElement('span', 'step-num', String(stage.number).padStart(2, '0')),
          createElement('span', 'step-icon', stage.icon),
        );

        const card = createElement('div', 'step-card');
        const statusLabel = createElement(
          'div',
          `step-status status-${status}`,
          translate(`status_${status}`),
        );
        statusLabel.dataset.i18n = `status_${status}`;

        const title = createElement('h3', 'step-title', translate(`${stageKey}_title`));
        title.dataset.i18n = `${stageKey}_title`;
        const description = createElement('p', 'step-desc', translate(`${stageKey}_desc`));
        description.dataset.i18n = `${stageKey}_desc`;
        card.append(statusLabel, title, description);
        step.append(marker, card);
        fragment.append(step);

        if (index < roadmapStages.length - 1) {
          fragment.append(createRoadmapConnector(stage.number, index % 2 === 0));
        }
      });

      track.append(fragment);
      section.append(track, createElement('div', 'roadmap-bg-glow'));
      return section;
    };

    const createNavigationPanel = (item) => {
      const panel = createElement(
        'section',
        item.panelId === 'road-map-info' ? 'roadmap-wrapper' : 'simple-card navigation-panel',
      );
      panel.id = item.panelId;

      const heading = createElement('h2', 'about-title', translate(item.titleKey));
      heading.dataset.i18n = item.titleKey;
      panel.append(heading);

      if (item.panelId === 'road-map-info') {
        heading.classList.add('roadmap-title');
        panel.append(createRoadmap());
      } else {
        const description = createElement(
          'p',
          'content-text',
          translate(item.descriptionKey),
        );
        description.dataset.i18n = item.descriptionKey;
        panel.append(description);
      }

      mainHeading?.insertAdjacentElement('afterend', panel);
    };

    const navigateTo = (item) => {
      const isClosingActivePanel = activePanelId === item.panelId;
      removeNavigationPanels(isClosingActivePanel ? null : item.panelId);

      navigationItems.forEach((navigationItem) => {
        setNavigationButtonState(navigationItem, false);
      });

      if (isClosingActivePanel) {
        activePanelId = null;
        setMainSectionsVisible(true);
        return;
      }

      document.getElementById(item.panelId)?.remove();
      setMainSectionsVisible(false);
      createNavigationPanel(item);
      setNavigationButtonState(item, true);
      activePanelId = item.panelId;
    };

    navigationItems.forEach((item) => {
      const button = document.getElementById(item.buttonId);
      if (!button) return;
      button.dataset.originalI18n = button.dataset.i18n;
      button.addEventListener('click', () => navigateTo(item));
    });

    document.getElementById('intent-more-btn')?.addEventListener('click', () => {
      navigateTo(navigationItems[0]);
    });

    document.getElementById('close-info-btn')?.addEventListener('click', () => {
      document.getElementById('project-info')?.setAttribute('hidden', '');
    });

    document.getElementById('connect-wallet-btn')?.addEventListener('click', () => {
      alert(translate('wallet_disconnected'));
    });

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${date.getFullYear()}-${month}-${day}`;
    };

    const shortenId = (id) => `${id.slice(0, 4)}...${id.slice(-4)}`;

    const sortIdeas = (sortMode) => {
      const sorted = ideas.slice();
      if (sortMode === 'diamonds_asc') {
        sorted.sort((a, b) => a.likes - b.likes);
      } else if (sortMode === 'created_desc') {
        sorted.sort((a, b) => b.createdAt - a.createdAt);
      } else {
        sorted.sort((a, b) => b.likes - a.likes);
      }
      return sorted;
    };

    const createIdeaCard = (idea) => {
      const card = createElement('article', 'simple-card idea-card');

      const ideaText = createElement('p', 'idea-text', `“${translate(idea.textKey)}”`);
      const voteRow = createElement('div', 'idea-vote-row');
      const likeBadge = createElement('span', 'like-badge', `💎 ${idea.likes}`);
      const voteButton = createElement('button', 'vote-btn up');
      voteButton.type = 'button';
      voteButton.dataset.i18nAriaLabel = 'vote_btn_label';
      voteButton.setAttribute('aria-label', translate('vote_btn_label'));
      voteButton.append(voteIconTemplate.cloneNode(true));
      voteRow.append(likeBadge, voteButton);

      const metadata = createElement('div', 'idea-meta');
      const author = createElement('small', 'author-meta');
      const authorLabel = createElement('span', 'author-id-label-text', translate('author_id_label'));
      authorLabel.dataset.i18n = 'author_id_label';
      author.append(authorLabel, ': ', createElement('span', 'author-id-value', shortenId(idea.id)));
      metadata.append(author, createElement('small', 'created-at', formatDate(idea.createdAt)));
      card.append(ideaText, voteRow, metadata);
      return card;
    };

    const renderIdeas = () => {
      const visibleFeeds = mobileFeedQuery.matches ? ideaFeeds.slice(0, 2) : ideaFeeds;
      const feedCount = visibleFeeds.length;
      const fragments = Array.from({ length: feedCount }, () => document.createDocumentFragment());

      sortIdeas(activeSortMode).forEach((idea, index) => {
        let card = ideaCardCache.get(idea.id);
        if (!card) {
          card = createIdeaCard(idea);
          ideaCardCache.set(idea.id, card);
        }
        fragments[index % feedCount].append(card);
      });

      ideaFeeds.forEach((feed) => feed.replaceChildren());
      visibleFeeds.forEach((feed, index) => feed.append(fragments[index]));
    };

    document.getElementById('ideas-feed')?.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('.vote-btn')) {
        alert(translate('voting_unavailable'));
      }
    });

    document.querySelector('.type-selector')?.addEventListener('change', (event) => {
      if (!(event.target instanceof HTMLInputElement) || event.target.name !== 'sort') return;
      activeSortMode = event.target.value;
      renderIdeas();
    });

    if (typeof mobileFeedQuery.addEventListener === 'function') {
      mobileFeedQuery.addEventListener('change', renderIdeas);
    } else {
      mobileFeedQuery.addListener?.(renderIdeas);
    }

    document.addEventListener('i18n:changed', () => {
      ideaCardCache.clear();
      applyTranslations();
      renderIdeas();
    });

    document.addEventListener('visibilitychange', () => {
      document.documentElement.classList.toggle('animations-paused', document.hidden);
    });

    applyTranslations();
    renderIdeas();

    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
  });
})();
