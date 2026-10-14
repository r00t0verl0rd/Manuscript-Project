// Preserved verbatim from the previous demo data model: values, dates and author IDs.
export const navigationItems = [
  { panelId: 'about-info', buttonId: 'more-btn', titleKey: 'about_title', descriptionKey: 'about_desc' },
  { panelId: 'road-map-info', buttonId: 'road-map-btn', titleKey: 'road_map_title' },
  { panelId: 'meme-part-info', buttonId: 'meme-part-btn', titleKey: 'meme_part_title', descriptionKey: 'meme_part_desc' },
  { panelId: 'contacts-info', buttonId: 'contacts-btn', titleKey: 'contacts_title', descriptionKey: 'contacts_desc' },
];

export const roadmapStages = [
  { number: 1, icon: '🔬' },
  { number: 2, icon: '🎨' },
  { number: 3, icon: '📱' },
  { number: 4, icon: '📝' },
  { number: 5, icon: '🪙' },
  { number: 6, icon: '🤝' },
  { number: 7, icon: '🌉' },
  { number: 8, icon: '👤' },
  { number: 9, icon: '🗳️' },
  { number: 10, icon: '🗳️' },
];

const currentTime = Date.now();
export const ideas = [
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
  textKey: `idea_${index + 1}_text`, likes,
  createdAt: currentTime - 1000 * 60 * 60 * hoursAgo, id,
}));

export const partners = [
  { name: 'World Citizen Government', url: 'https://worldcitizengov.org/' },
  { name: 'The Venus Project', url: 'https://www.thevenusproject.com/' },
  { name: 'Million Dollar Homepage', url: 'https://www.milliondollarhomepage.com/' },
  { name: 'Bitcoin.org', url: 'https://bitcoin.org/' },
  { name: 'Great Awakening Map', url: 'https://greatawakeningmap.co/' },
];

export function sortedIdeas(mode) {
  const result = ideas.slice();
  if (mode === 'diamonds_asc') result.sort((a, b) => a.likes - b.likes);
  else if (mode === 'created_desc') result.sort((a, b) => b.createdAt - a.createdAt);
  else result.sort((a, b) => b.likes - a.likes);
  return result;
}

export function dateLabel(timestamp) {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function shortenId(id) {
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}
