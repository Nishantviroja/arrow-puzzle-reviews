// Arrow Puzzle Reviews Manager
// Features: Load 10 More, Mobile Friendly, Persistent & Future-Proof Marked Reviews

const STORAGE_KEY = 'arrow_puzzle_marked_reviews';
const PAGE_SIZE = 10;

let reviews = [];
let markedIds = new Set();
let currentFilter = 'pending';
let visibleCount = PAGE_SIZE;

// Generate a permanent, stable ID for any review
// Ensures future reviews added to reviews.json will NEVER affect existing pending/marked status
function getReviewId(item, index) {
  if (item && item.id !== undefined && item.id !== null) {
    return String(item.id);
  }
  // Fallback hash of text if id is not present
  const text = typeof item === 'string' ? item : (item.review || item.comment || '');
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  return 'text_' + Math.abs(hash);
}

// Load marked review IDs from localStorage
function loadMarkedIds() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const arr = JSON.parse(saved);
      markedIds = new Set(arr.map(String));
    }
  } catch (e) {
    markedIds = new Set();
  }
}

// Save marked review IDs to localStorage
function saveMarkedIds() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...markedIds]));
}

async function init() {
  loadMarkedIds();

  try {
    const res = await fetch('reviews.json');
    if (res.ok) {
      reviews = await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch reviews.json, using fallback', err);
  }

  if (!reviews || reviews.length === 0) {
    reviews = getFallbackReviews();
  }

  // Filter dropdown listener
  const filterSelect = document.getElementById('filterSelect');
  filterSelect.value = currentFilter;
  filterSelect.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    visibleCount = PAGE_SIZE; // Reset to first 10 when changing filter
    render();
  });

  render();
}

function render() {
  const reviewsList = document.getElementById('reviewsList');
  const reviewCount = document.getElementById('reviewCount');
  const filterSelect = document.getElementById('filterSelect');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const allLoadedNotice = document.getElementById('allLoadedNotice');

  const total = reviews.length;
  const markedCount = reviews.filter((r, idx) => markedIds.has(getReviewId(r, idx))).length;
  const pendingCount = total - markedCount;

  // Update dropdown labels with dynamic live counts
  filterSelect.options[0].text = `Pending Reviews (${pendingCount})`;
  filterSelect.options[1].text = `Marked Reviews (${markedCount})`;
  filterSelect.options[2].text = `All Reviews (${total})`;

  // Filter reviews
  const filtered = reviews.filter((r, idx) => {
    const isMarked = markedIds.has(getReviewId(r, idx));
    if (currentFilter === 'pending') return !isMarked;
    if (currentFilter === 'marked') return isMarked;
    return true; // 'all'
  });

  // Update header count badge
  if (currentFilter === 'pending') {
    reviewCount.textContent = `${pendingCount} pending`;
  } else if (currentFilter === 'marked') {
    reviewCount.textContent = `${markedCount} marked`;
  } else {
    reviewCount.textContent = `${total} total`;
  }

  // Handle empty state
  if (filtered.length === 0) {
    let emptyMsg = 'No reviews found.';
    if (currentFilter === 'pending') {
      emptyMsg = '🎉 All caught up! No pending reviews left.';
    } else if (currentFilter === 'marked') {
      emptyMsg = 'No marked reviews yet. Tap "Mark" on any review to move it here.';
    }
    reviewsList.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    loadMoreContainer.style.display = 'none';
    return;
  }

  loadMoreContainer.style.display = 'block';

  // Paginated slice: Load 10 More
  const displayed = filtered.slice(0, visibleCount);

  // Render cards
  reviewsList.innerHTML = displayed.map((item, localIdx) => {
    const realId = getReviewId(item, localIdx);
    const displayNum = item.id !== undefined ? item.id : (localIdx + 1);
    const isMarked = markedIds.has(realId);
    const text = typeof item === 'string' ? item : (item.review || item.comment || '');

    return `
      <div class="review-card ${isMarked ? 'is-marked' : ''}" data-id="${realId}">
        <div class="card-top">
          <span class="card-number">#${displayNum}</span>
          <div class="card-actions">
            <button class="mark-btn ${isMarked ? 'marked' : ''}" onclick="toggleMark('${realId}')">
              ${isMarked ? '✓ Marked' : 'Mark'}
            </button>
            <button class="copy-btn" onclick="copyReviewText(this, '${realId}')">
              Copy
            </button>
          </div>
        </div>
        <p class="review-text">${escapeHtml(text)}</p>
      </div>
    `;
  }).join('');

  // Update Load 10 More button visibility and text
  if (visibleCount < filtered.length) {
    loadMoreBtn.style.display = 'inline-flex';
    loadMoreBtn.textContent = `Load 10 More (${displayed.length} of ${filtered.length})`;
    allLoadedNotice.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'none';
    if (filtered.length > PAGE_SIZE) {
      allLoadedNotice.style.display = 'block';
      allLoadedNotice.textContent = `Showing all ${filtered.length} reviews`;
    } else {
      allLoadedNotice.style.display = 'none';
    }
  }
}

// "Load 10 More" button click handler
window.loadMore = function() {
  visibleCount += PAGE_SIZE;
  render();
};

// Toggle review between Pending and Marked
window.toggleMark = function(id) {
  const strId = String(id);
  if (markedIds.has(strId)) {
    markedIds.delete(strId);
  } else {
    markedIds.add(strId);
  }
  saveMarkedIds();
  render();
};

// Copy review text to clipboard (works reliably on both mobile and desktop)
window.copyReviewText = function(btn, id) {
  const strId = String(id);
  const item = reviews.find((r, idx) => getReviewId(r, idx) === strId);
  if (!item) return;

  const textToCopy = typeof item === 'string' ? item : (item.review || item.comment || '');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 1400);
};

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFallbackReviews() {
  return [
    { "id": 1, "review": "To be honest, once you play this arrow game for a while, it is very enjoyable. You don't forget how to play. It makes you think more positive and alert, and when you clear a tough board, it feels so rewarding." },
    { "id": 2, "review": "I really enjoy this game. With no time limit and the ability to stop when needed, I'm able to play when I have down time without worry of losing because I had to close out. The puzzles keep your mind working and it's a great way to relax." },
    { "id": 3, "review": "This game is THE GAME. I can't put this thing down fr. Ads are minimal, difficulty level is just right. A small thing I love is that the arrows don't do damage if you release two intersecting ones at the same time. Every level is solvable and there's no evil timer." },
    { "id": 4, "review": "I really really like this game. It's one of the only mobile games that I've been able to keep playing consistently for more than a month. The levels can take a bit to complete, so it's reasonable. There also isn't a bunch of in-game purchases like most mobile games who just want your money. I really recommend it :)" },
    { "id": 5, "review": "I find the CarEscape-type games get boring quickly, so I tried this one, which is a similar concept but more challenging. I like the simpler UI as well! Short ads and you can watch an ad for a hint if needed. Very fun!" },
    { "id": 6, "review": "Giving 5 stars for the simplistic yet challenging levels and the ads. Thank you for short ads that are quickly and easily skippable after a few seconds. It's a super fun game!" },
    { "id": 7, "review": "You know how some things are cathartic 🧘🏽, well that is how this game is for me. I love how relaxing it is, while still being able to keep my mind working. This game constantly keeps my problem-solving and critical-thinking skills sharp 🤓." },
    { "id": 8, "review": "Honestly, out of all the arrow games I've played, this one is the best. The daily challenges are a decent level of challenge and take between 3 to 5 minutes. No timer, no energy meters, and no items needed to progress. Big thumbs up, the balance is good." },
    { "id": 9, "review": "Pretty fun game with multiple difficulty levels of challenges. The gameplay is engaging, smooth, and perfect for unwinding after a long day." },
    { "id": 10, "review": "Great game for killing time. I've gotten way more than my money's worth of entertainment out of it. The puzzles are clever and addictive." }
  ];
}

document.addEventListener('DOMContentLoaded', init);
