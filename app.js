/**
 * Arrow Puzzle - Reviews Hub Application
 * Handles fetching, filtering, sorting, copying, and adding reviews
 */

// Fallback dataset of 30 reviews in case reviews.json is loaded via file:// protocol
const DEFAULT_REVIEWS = [
  {
    "id": "rev-001",
    "author": "Liam Vance",
    "avatarColor": "#4F46E5",
    "rating": 5,
    "title": "Super satisfying and clean design!",
    "comment": "Absolutely love the minimalistic feel of Arrow Puzzle. The haptic feedback when an arrow successfully clears the board is so rewarding. Perfect game to play on the commute.",
    "date": "2026-10-28",
    "version": "v1.2.1",
    "device": "Google Pixel 8 Pro",
    "likes": 42
  },
  {
    "id": "rev-002",
    "author": "Sophia Chen",
    "avatarColor": "#EC4899",
    "rating": 5,
    "title": "Addictive logic puzzles",
    "comment": "Started playing thinking I'd do just 2 levels, and ended up finishing 40 in one sitting! The puzzles scale in difficulty nicely without feeling impossible.",
    "date": "2026-10-27",
    "version": "v1.2.1",
    "device": "Samsung Galaxy S24",
    "likes": 29
  },
  {
    "id": "rev-003",
    "author": "Marcus Miller",
    "avatarColor": "#10B981",
    "rating": 4,
    "title": "Great brain teaser, needs an undo button",
    "comment": "The mechanics are brilliant and smooth. My only small request is an undo button for when you accidentally tap the wrong arrow on larger boards.",
    "date": "2026-10-26",
    "version": "v1.2.0",
    "device": "OnePlus 12",
    "likes": 18
  },
  {
    "id": "rev-004",
    "author": "Emma Watson-Taylor",
    "avatarColor": "#F59E0B",
    "rating": 5,
    "title": "Zero unnecessary clutter",
    "comment": "No annoying countdown timers, no energy meters forcing you to wait, just pure pure logic problem-solving. This is how mobile puzzle games should be made.",
    "date": "2026-10-25",
    "version": "v1.2.1",
    "device": "Nothing Phone (2)",
    "likes": 56
  },
  {
    "id": "rev-005",
    "author": "Arjun Patel",
    "avatarColor": "#8B5CF6",
    "rating": 5,
    "title": "Smooth 120Hz animations!",
    "comment": "Silky smooth animations on my display. It runs like butter and doesn't heat up the phone at all. Kudos to the developer team for great optimization.",
    "date": "2026-10-24",
    "version": "v1.2.0",
    "device": "Xiaomi 14 Pro",
    "likes": 12
  },
  {
    "id": "rev-006",
    "author": "Chloe Dubois",
    "avatarColor": "#06B6D4",
    "rating": 3,
    "title": "Fun concept, ads between levels are frequent",
    "comment": "The puzzle gameplay itself is 5 stars, but the interstitial ads after every 3 levels break the zen immersion a bit. Would happily pay for an ad-free premium version.",
    "date": "2026-10-23",
    "version": "v1.1.9",
    "device": "Samsung Galaxy A54",
    "likes": 35
  },
  {
    "id": "rev-007",
    "author": "Mateo Rossi",
    "avatarColor": "#EF4444",
    "rating": 5,
    "title": "Zen aesthetic and soothing sound effects",
    "comment": "The click sounds and ambient audio create an extremely calming atmosphere. Perfect for unwinding after a stressful workday.",
    "date": "2026-10-22",
    "version": "v1.2.1",
    "device": "Sony Xperia 1 VI",
    "likes": 21
  },
  {
    "id": "rev-008",
    "author": "Ananya Sharma",
    "avatarColor": "#14B8A6",
    "rating": 4,
    "title": "Level 85 had me stumped for days!",
    "comment": "Genuinely clever level design. When I finally figured out the sequence for clearing the interlocking corners on level 85, I audibly cheered. Loving the challenge.",
    "date": "2026-10-21",
    "version": "v1.2.0",
    "device": "Google Pixel 7a",
    "likes": 15
  },
  {
    "id": "rev-009",
    "author": "David Becker",
    "avatarColor": "#6366F1",
    "rating": 5,
    "title": "Best arrow / unblock style game on Android",
    "comment": "I've tried 5 or 6 similar arrow unblock games on Google Play. This one easily has the cleanest UI, most consistent touch detection, and no aggressive paywalls.",
    "date": "2026-10-20",
    "version": "v1.2.1",
    "device": "Samsung Galaxy S23 Ultra",
    "likes": 38
  },
  {
    "id": "rev-010",
    "author": "Zara Al-Mansoor",
    "avatarColor": "#D946EF",
    "rating": 4,
    "title": "Great offline playability",
    "comment": "Worked seamlessly during a 6-hour flight without needing Wi-Fi or data. Battery consumption was remarkably low too.",
    "date": "2026-10-19",
    "version": "v1.1.8",
    "device": "Motorola Edge 50",
    "likes": 19
  },
  {
    "id": "rev-011",
    "author": "Felix Nguyen",
    "avatarColor": "#84CC16",
    "rating": 2,
    "title": "Accidental taps ruin high scores",
    "comment": "On smaller screens, when arrows are tightly packed, it is too easy to tap the adjacent arrow by mistake. Needs slightly bigger touch hitboxes or zoom in option.",
    "date": "2026-10-18",
    "version": "v1.1.8",
    "device": "Google Pixel 6a",
    "likes": 27
  },
  {
    "id": "rev-012",
    "author": "Isabella Gomez",
    "avatarColor": "#F97316",
    "rating": 5,
    "title": "Simple yet deeply intellectual",
    "comment": "Easy to learn within 5 seconds, but master-level boards require serious forward planning. Reminds me of classic spatial reasoning puzzles.",
    "date": "2026-10-17",
    "version": "v1.2.0",
    "device": "Asus Zenfone 10",
    "likes": 11
  },
  {
    "id": "rev-013",
    "author": "Thomas Wright",
    "avatarColor": "#3B82F6",
    "rating": 5,
    "title": "Crisp visuals and dark theme",
    "comment": "The OLED true-black theme is gorgeous. It doesn't strain the eyes when playing late at night in bed. Well thought out UX.",
    "date": "2026-10-16",
    "version": "v1.2.0",
    "device": "Samsung Galaxy S22+",
    "likes": 24
  },
  {
    "id": "rev-014",
    "author": "Hannah Schmidt",
    "avatarColor": "#A855F7",
    "rating": 4,
    "title": "Very relaxing, please add custom themes",
    "comment": "I really enjoy the mechanics! It would be wonderful to unlock different arrow skins or color palettes (e.g. pastel, cyberpunk, autumn) as level completion rewards.",
    "date": "2026-10-15",
    "version": "v1.1.9",
    "device": "Honor Magic 6 Pro",
    "likes": 16
  },
  {
    "id": "rev-015",
    "author": "Kenji Takahashi",
    "avatarColor": "#0EA5E9",
    "rating": 5,
    "title": "Masterpiece of spatial orientation",
    "comment": "The multi-layered arrow trajectories in later chapters are genius. Every move requires anticipating 3 steps ahead. Highly recommended for puzzle lovers.",
    "date": "2026-10-14",
    "version": "v1.2.1",
    "device": "Sony Xperia 5 V",
    "likes": 31
  },
  {
    "id": "rev-016",
    "author": "Nadia Ivanova",
    "avatarColor": "#10B981",
    "rating": 3,
    "title": "Good game, had a slight freeze on level 92",
    "comment": "Game froze once when multiple arrows cleared simultaneously on level 92. Had to restart the app, but progress was saved. Otherwise a solid game.",
    "date": "2026-10-13",
    "version": "v1.1.7",
    "device": "Xiaomi Redmi Note 13",
    "likes": 8
  },
  {
    "id": "rev-017",
    "author": "Oliver Brown",
    "avatarColor": "#E11D48",
    "rating": 5,
    "title": "No annoying pay-to-win gimmicks",
    "comment": "In a sea of cash-grab games, Arrow Puzzle is refreshing. Skills and patience are all you need. Thank you dev for respecting players!",
    "date": "2026-10-12",
    "version": "v1.2.0",
    "device": "Pixel 8",
    "likes": 47
  },
  {
    "id": "rev-018",
    "author": "Priya Nair",
    "avatarColor": "#F59E0B",
    "rating": 5,
    "title": "My daily morning brain warm-up",
    "comment": "I do 5 levels every morning with my tea. Clears the morning fog better than coffee. Truly therapeutic and satisfying.",
    "date": "2026-10-11",
    "version": "v1.2.0",
    "device": "OnePlus Nord 4",
    "likes": 22
  },
  {
    "id": "rev-019",
    "author": "Carlos Morales",
    "avatarColor": "#0284C7",
    "rating": 4,
    "title": "Challenging and rewarding",
    "comment": "It's deceptive—the first 15 levels trick you into thinking it's easy, then chapter 3 introduces looped blockers. Keeps you on your toes!",
    "date": "2026-10-10",
    "version": "v1.1.8",
    "device": "Samsung Galaxy S21 FE",
    "likes": 13
  },
  {
    "id": "rev-020",
    "author": "Jessica Taylor",
    "avatarColor": "#9333EA",
    "rating": 1,
    "title": "Too hard after level 60",
    "comment": "The difficulty spikes drastically. I don't want to spend 25 minutes on a single puzzle during my break. Not for casual players anymore.",
    "date": "2026-10-09",
    "version": "v1.1.6",
    "device": "Samsung Galaxy A15",
    "likes": 9
  },
  {
    "id": "rev-021",
    "author": "Simon Cooper",
    "avatarColor": "#059669",
    "rating": 5,
    "title": "The trajectory previews are so neat",
    "comment": "The subtle indication when an arrow path is blocked is great visual feedback. Clean, readable, and intuitive.",
    "date": "2026-10-08",
    "version": "v1.2.0",
    "device": "Google Pixel 7",
    "likes": 17
  },
  {
    "id": "rev-022",
    "author": "Elena Rostova",
    "avatarColor": "#D97706",
    "rating": 5,
    "title": "Perfect for all ages",
    "comment": "My 10-year-old nephew and my 68-year-old mother both play this game. Rare to find something that appeals across generations so gracefully.",
    "date": "2026-10-07",
    "version": "v1.1.9",
    "device": "Lenovo Tab P12",
    "likes": 33
  },
  {
    "id": "rev-023",
    "author": "Derrick Owens",
    "avatarColor": "#475569",
    "rating": 4,
    "title": "Great update in v1.2.0",
    "comment": "The new level transition animation in the latest update feels much faster. Thanks for listening to community feedback!",
    "date": "2026-10-06",
    "version": "v1.2.0",
    "device": "Motorola ThinkPhone",
    "likes": 14
  },
  {
    "id": "rev-024",
    "author": "Fatima Zahra",
    "avatarColor": "#BE185D",
    "rating": 5,
    "title": "Obsessed with clearing the grid",
    "comment": "There is nothing more satisfying than untangling a dense web of interlocking arrows until the last one whooshes off the screen. 10/10.",
    "date": "2026-10-05",
    "version": "v1.1.9",
    "device": "Galaxy Tab S9",
    "likes": 26
  },
  {
    "id": "rev-025",
    "author": "Lucas Silva",
    "avatarColor": "#2563EB",
    "rating": 3,
    "title": "Sound design is great, need landscape mode",
    "comment": "Would love landscape tablet support! On a 12-inch tablet, playing locked in portrait orientation is awkward. Otherwise great game.",
    "date": "2026-10-04",
    "version": "v1.1.7",
    "device": "Galaxy Tab S8+",
    "likes": 12
  },
  {
    "id": "rev-026",
    "author": "Grace O'Connor",
    "avatarColor": "#0D9488",
    "rating": 5,
    "title": "Instant favorite!",
    "comment": "Installed yesterday and already on level 110. Clean typography, smooth gesture inputs, zero lag. Outstanding indie game.",
    "date": "2026-10-03",
    "version": "v1.1.9",
    "device": "Google Pixel 8",
    "likes": 20
  },
  {
    "id": "rev-027",
    "author": "Tariq Mansour",
    "avatarColor": "#7C3AED",
    "rating": 2,
    "title": "Needs cloud save sync",
    "comment": "Switched to my new phone and had to start over from level 1 because Google Play Games cloud save wasn't enabled. Please add cloud save!",
    "date": "2026-10-02",
    "version": "v1.1.5",
    "device": "Vivo X100 Pro",
    "likes": 16
  },
  {
    "id": "rev-028",
    "author": "Maya Lin",
    "avatarColor": "#DC2626",
    "rating": 5,
    "title": "Haptics + Sound = Chef's kiss",
    "comment": "The physical feedback makes every tap feel tactile and weighty. Brilliant puzzle mechanics with top tier polish.",
    "date": "2026-10-01",
    "version": "v1.1.8",
    "device": "OnePlus 11",
    "likes": 28
  },
  {
    "id": "rev-029",
    "author": "Benjamin Clark",
    "avatarColor": "#4338CA",
    "rating": 4,
    "title": "Solid game with daily challenges",
    "comment": "The daily puzzle feature gives a great reason to come back every day. Some of the trickiest puzzles are in the daily challenge section.",
    "date": "2026-09-30",
    "version": "v1.1.7",
    "device": "Pixel 7 Pro",
    "likes": 19
  },
  {
    "id": "rev-030",
    "author": "Zoe Kravitz-Lee",
    "avatarColor": "#059669",
    "rating": 5,
    "title": "Minimalist puzzle perfection",
    "comment": "No clutter, no flashy casino-like distractions. Just pure geometric logic and clever board puzzles. Truly deserves 5 stars.",
    "date": "2026-09-29",
    "version": "v1.2.0",
    "device": "Galaxy S24 Ultra",
    "likes": 44
  }
];

const LOCAL_STORAGE_KEY = 'arrow_puzzle_reviews_v1';

// State Management
let reviews = [];
let activeRatingFilter = 'all';
let currentSearchTerm = '';
let currentSort = 'newest';

// DOM Elements
const reviewsGrid = document.getElementById('reviewsGrid');
const searchInput = document.getElementById('searchInput');
const ratingFilterPills = document.getElementById('ratingFilterPills');
const sortSelect = document.getElementById('sortSelect');
const avgRatingDisplay = document.getElementById('avgRatingDisplay');
const avgStarsDisplay = document.getElementById('avgStarsDisplay');
const totalReviewsCount = document.getElementById('totalReviewsCount');
const ratingBreakdownBars = document.getElementById('ratingBreakdownBars');
const positiveSentimentDisplay = document.getElementById('positiveSentimentDisplay');
const copyAllJsonBtn = document.getElementById('copyAllJsonBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const toastContainer = document.getElementById('toastContainer');

// Modal Elements
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeAddModalBtn = document.getElementById('closeAddModalBtn');
const cancelAddModalBtn = document.getElementById('cancelAddModalBtn');
const addReviewModal = document.getElementById('addReviewModal');
const addReviewForm = document.getElementById('addReviewForm');
const starInputGroup = document.getElementById('starInputGroup');
const formRating = document.getElementById('formRating');
const formDate = document.getElementById('formDate');

// Avatar Colors Generator
const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#EC4899', '#EF4444', 
  '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', 
  '#8B5CF6', '#14B8A6', '#D946EF', '#0284C7'
];

/**
 * Initialize Application
 */
async function initApp() {
  // Set default date in modal to today
  formDate.value = new Date().toISOString().split('T')[0];

  await loadReviewsData();
  setupEventListeners();
  updateStarInput(5);
  renderAll();
}

/**
 * Load Reviews from localStorage or reviews.json / fallback
 */
async function loadReviewsData() {
  const localSaved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localSaved) {
    try {
      reviews = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn('Failed to parse localStorage reviews, reloading defaults', e);
    }
  }

  // Attempt to fetch reviews.json
  try {
    const res = await fetch('reviews.json');
    if (res.ok) {
      reviews = await res.json();
      saveToLocalStorage();
      return;
    }
  } catch (err) {
    console.info('Fetch from reviews.json failed (likely local file:// origin). Using bundled fallback data.');
  }

  // Graceful fallback to bundled 30 items
  reviews = [...DEFAULT_REVIEWS];
  saveToLocalStorage();
}

/**
 * Save reviews to localStorage
 */
function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.trim().toLowerCase();
    renderReviews();
  });

  // Rating Filter Pills
  ratingFilterPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;

    ratingFilterPills.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    pill.classList.add('active');

    activeRatingFilter = pill.dataset.rating;
    renderReviews();
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderReviews();
  });

  // Export JSON
  exportJsonBtn.addEventListener('click', () => {
    exportJsonFile();
  });

  // Copy All JSON
  copyAllJsonBtn.addEventListener('click', () => {
    const jsonStr = JSON.stringify(reviews, null, 2);
    copyToClipboard(jsonStr, 'Copied all ' + reviews.length + ' reviews as JSON!');
  });

  // Modal Triggers
  openAddModalBtn.addEventListener('click', () => openModal());
  closeAddModalBtn.addEventListener('click', () => closeModal());
  cancelAddModalBtn.addEventListener('click', () => closeModal());
  addReviewModal.addEventListener('click', (e) => {
    if (e.target === addReviewModal) closeModal();
  });

  // Interactive Star Rating in Form
  starInputGroup.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.value, 10);
      updateStarInput(val);
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value, 10);
      highlightStars(val);
    });
  });

  starInputGroup.addEventListener('mouseleave', () => {
    updateStarInput(parseInt(formRating.value, 10));
  });

  // Form Submit
  addReviewForm.addEventListener('submit', handleFormSubmit);

  // Esc key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addReviewModal.classList.contains('active')) {
      closeModal();
    }
  });
}

function updateStarInput(rating) {
  formRating.value = rating;
  highlightStars(rating);
}

function highlightStars(rating) {
  starInputGroup.querySelectorAll('.star').forEach(star => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle('active', val <= rating);
  });
}

function openModal() {
  addReviewModal.classList.add('active');
  document.getElementById('formAuthor').focus();
}

function closeModal() {
  addReviewModal.classList.remove('active');
  addReviewForm.reset();
  formDate.value = new Date().toISOString().split('T')[0];
  updateStarInput(5);
}

/**
 * Handle Add Review Form
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const author = document.getElementById('formAuthor').value.trim();
  const rating = parseInt(formRating.value, 10);
  const title = document.getElementById('formTitle').value.trim();
  const comment = document.getElementById('formComment').value.trim();
  const version = document.getElementById('formVersion').value.trim() || 'v1.2.1';
  const device = document.getElementById('formDevice').value.trim() || 'Android Device';
  const date = formDate.value || new Date().toISOString().split('T')[0];

  const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

  const newReview = {
    id: 'rev-' + Date.now().toString(36),
    author,
    avatarColor: randomColor,
    rating,
    title,
    comment,
    date,
    version,
    device,
    likes: 0
  };

  reviews.unshift(newReview);
  saveToLocalStorage();
  closeModal();
  renderAll();
  showToast(`Review by "${author}" published!`, 'success');
}

/**
 * Render All Parts of the App
 */
function renderAll() {
  renderStats();
  renderReviews();
}

/**
 * Calculate & Render Statistics
 */
function renderStats() {
  const total = reviews.length;
  if (total === 0) {
    avgRatingDisplay.textContent = '0.0';
    avgStarsDisplay.textContent = '☆☆☆☆☆';
    totalReviewsCount.textContent = 'No reviews recorded yet';
    positiveSentimentDisplay.textContent = '0%';
    ratingBreakdownBars.innerHTML = '';
    return;
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = (sum / total).toFixed(1);
  avgRatingDisplay.textContent = avg;

  // Star String
  const rounded = Math.round(avg);
  avgStarsDisplay.textContent = '★'.repeat(rounded) + '☆'.repeat(Math.max(0, 5 - rounded));

  totalReviewsCount.textContent = `Based on ${total} player review${total === 1 ? '' : 's'}`;

  // Breakdown 5 -> 1
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (counts[r.rating] !== undefined) counts[r.rating]++;
  });

  const positiveCount = (counts[5] || 0) + (counts[4] || 0);
  const positivePercent = Math.round((positiveCount / total) * 100);
  positiveSentimentDisplay.textContent = `${positivePercent}% (4★ & 5★)`;

  let barsHtml = '';
  for (let stars = 5; stars >= 1; stars--) {
    const count = counts[stars];
    const pct = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
    barsHtml += `
      <div class="rating-bar-row">
        <div class="bar-star-label">${stars} ★</div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
        <div class="bar-count">${count}</div>
      </div>
    `;
  }
  ratingBreakdownBars.innerHTML = barsHtml;
}

/**
 * Filter & Sort Reviews
 */
function getFilteredAndSortedReviews() {
  return reviews.filter(item => {
    // Rating Filter
    if (activeRatingFilter !== 'all' && item.rating !== parseInt(activeRatingFilter, 10)) {
      return false;
    }

    // Search filter
    if (currentSearchTerm) {
      const matchAuthor = item.author.toLowerCase().includes(currentSearchTerm);
      const matchTitle = item.title.toLowerCase().includes(currentSearchTerm);
      const matchComment = item.comment.toLowerCase().includes(currentSearchTerm);
      const matchDevice = (item.device || '').toLowerCase().includes(currentSearchTerm);
      if (!matchAuthor && !matchTitle && !matchComment && !matchDevice) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.date) - new Date(a.date);
    if (currentSort === 'oldest') return new Date(a.date) - new Date(b.date);
    if (currentSort === 'highest') return b.rating - a.rating;
    if (currentSort === 'lowest') return a.rating - b.rating;
    if (currentSort === 'helpful') return (b.likes || 0) - (a.likes || 0);
    return 0;
  });
}

/**
 * Render Review Cards Grid
 */
function renderReviews() {
  const filtered = getFilteredAndSortedReviews();

  if (filtered.length === 0) {
    reviewsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔎</div>
        <h3>No reviews found</h3>
        <p>Try adjusting your search keywords or clearing rating filters.</p>
      </div>
    `;
    return;
  }

  reviewsGrid.innerHTML = filtered.map(review => {
    const initials = getInitials(review.author);
    const starStr = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const formattedDate = formatDate(review.date);

    return `
      <article class="review-card" data-id="${review.id}">
        <div>
          <div class="card-top">
            <div class="author-block">
              <div class="author-avatar" style="background-color: ${review.avatarColor || '#4F46E5'}">
                ${initials}
              </div>
              <div class="author-meta">
                <h4>
                  ${escapeHtml(review.author)}
                  <span class="badge-verified" title="Verified Player">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </span>
                </h4>
                <span class="review-date">${formattedDate}</span>
              </div>
            </div>
            <div class="card-stars" aria-label="${review.rating} out of 5 stars">
              ${starStr}
            </div>
          </div>

          <h3 class="card-title">${escapeHtml(review.title)}</h3>
          <p class="card-comment">${escapeHtml(review.comment)}</p>

          <div class="card-meta-tags">
            ${review.version ? `<span class="meta-tag">📦 ${escapeHtml(review.version)}</span>` : ''}
            ${review.device ? `<span class="meta-tag">📱 ${escapeHtml(review.device)}</span>` : ''}
          </div>
        </div>

        <div class="card-footer">
          <button class="like-btn" onclick="handleLike('${review.id}', this)" title="Mark as helpful">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <span class="like-count">${review.likes || 0}</span>
          </button>

          <div class="card-actions">
            <!-- Copy Text Button -->
            <button class="copy-btn" onclick="handleCopyReview('${review.id}', this)" title="Copy review to clipboard">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            </button>

            <!-- Copy JSON Button -->
            <button class="btn btn-secondary btn-sm" onclick="handleCopyJson('${review.id}', this)" title="Copy as JSON">
              { } JSON
            </button>

            <!-- Delete Button -->
            <button class="btn-ghost-danger" onclick="handleDelete('${review.id}')" title="Delete Review">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Handle Like Button Click
 */
window.handleLike = function(id, btnElement) {
  const review = reviews.find(r => r.id === id);
  if (!review) return;

  review.likes = (review.likes || 0) + 1;
  saveToLocalStorage();

  const countSpan = btnElement.querySelector('.like-count');
  if (countSpan) countSpan.textContent = review.likes;

  btnElement.classList.add('liked');
};

/**
 * Handle Copy Review Text
 */
window.handleCopyReview = function(id, btnElement) {
  const review = reviews.find(r => r.id === id);
  if (!review) return;

  const starStr = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const textToCopy = `"${review.title}" - ${starStr}\n` +
    `By ${review.author} on ${review.date} (${review.version || 'v1.2.1'})\n\n` +
    `${review.comment}`;

  copyToClipboard(textToCopy, `Review by ${review.author} copied!`);

  // Visual feedback on the button
  const originalHtml = btnElement.innerHTML;
  btnElement.classList.add('copied');
  btnElement.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Copied!</span>
  `;

  setTimeout(() => {
    btnElement.classList.remove('copied');
    btnElement.innerHTML = originalHtml;
  }, 2000);
};

/**
 * Handle Copy Review as JSON
 */
window.handleCopyJson = function(id, btnElement) {
  const review = reviews.find(r => r.id === id);
  if (!review) return;

  const jsonStr = JSON.stringify(review, null, 2);
  copyToClipboard(jsonStr, `JSON for "${review.author}" copied!`);

  const originalText = btnElement.textContent;
  btnElement.textContent = '✓ Copied!';
  setTimeout(() => {
    btnElement.textContent = originalText;
  }, 1800);
};

/**
 * Handle Delete Review
 */
window.handleDelete = function(id) {
  const target = reviews.find(r => r.id === id);
  if (!target) return;

  if (confirm(`Are you sure you want to delete the review by "${target.author}"?`)) {
    reviews = reviews.filter(r => r.id !== id);
    saveToLocalStorage();
    renderAll();
    showToast(`Review removed.`, 'info');
  }
};

/**
 * Copy string to Clipboard
 */
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, 'success');
    }).catch(err => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast(successMessage, 'success');
  } catch (err) {
    showToast('Failed to copy to clipboard', 'danger');
  } finally {
    document.body.removeChild(textArea);
  }
}

/**
 * Download JSON File
 */
function exportJsonFile() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reviews, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "reviews.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast('Exported reviews.json to downloads!', 'success');
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2600);
}

/**
 * Utilities
 */
function getInitials(name) {
  if (!name) return 'AP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start application
document.addEventListener('DOMContentLoaded', initApp);
