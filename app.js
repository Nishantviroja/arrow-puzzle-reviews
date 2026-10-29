// Simple Reviews Viewer for Arrow Puzzle
// Uses Rubik font, reads from reviews.json, shows cards with copy button and review count

async function loadAndRenderReviews() {
  const reviewsList = document.getElementById('reviewsList');
  const reviewCount = document.getElementById('reviewCount');

  let reviews = [];

  try {
    const res = await fetch('reviews.json');
    if (res.ok) {
      reviews = await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch reviews.json directly, checking backup...', err);
  }

  // Fallback if fetch fails (e.g., opened via file://)
  if (!reviews || reviews.length === 0) {
    reviews = getFallbackReviews();
  }

  // Update total count
  reviewCount.textContent = `${reviews.length} reviews`;

  // Render simple cards
  reviewsList.innerHTML = reviews.map((review, index) => {
    const stars = '★'.repeat(review.rating || 5) + '☆'.repeat(Math.max(0, 5 - (review.rating || 5)));
    const number = index + 1;

    return `
      <div class="review-card">
        <div class="card-header">
          <div class="card-meta">
            <span class="card-index">#${number}</span>
            <span class="card-stars">${stars}</span>
            <span class="card-author">${escapeHtml(review.author || 'Anonymous')}</span>
            <span class="card-date">${escapeHtml(review.date || '')}</span>
          </div>
          <button class="copy-btn" onclick="copyReviewText(this, ${index})">Copy</button>
        </div>

        ${review.title ? `<div class="card-title">${escapeHtml(review.title)}</div>` : ''}
        <div class="card-comment">${escapeHtml(review.comment || '')}</div>
      </div>
    `;
  }).join('');

  // Store globally for quick copying
  window._allReviews = reviews;
}

// Copy review comment to clipboard
window.copyReviewText = function(btn, index) {
  const review = window._allReviews[index];
  if (!review) return;

  const textToCopy = review.comment || '';

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  // Button feedback
  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 1600);
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
    { "id": "rev-001", "author": "Liam Vance", "rating": 5, "title": "Super satisfying and clean design!", "comment": "Absolutely love the minimalistic feel of Arrow Puzzle. The haptic feedback when an arrow successfully clears the board is so rewarding. Perfect game to play on the commute.", "date": "2026-10-28" },
    { "id": "rev-002", "author": "Sophia Chen", "rating": 5, "title": "Addictive logic puzzles", "comment": "Started playing thinking I'd do just 2 levels, and ended up finishing 40 in one sitting! The puzzles scale in difficulty nicely without feeling impossible.", "date": "2026-10-27" },
    { "id": "rev-003", "author": "Marcus Miller", "rating": 4, "title": "Great brain teaser, needs an undo button", "comment": "The mechanics are brilliant and smooth. My only small request is an undo button for when you accidentally tap the wrong arrow on larger boards.", "date": "2026-10-26" },
    { "id": "rev-004", "author": "Emma Watson-Taylor", "rating": 5, "title": "Zero unnecessary clutter", "comment": "No annoying countdown timers, no energy meters forcing you to wait, just pure pure logic problem-solving. This is how mobile puzzle games should be made.", "date": "2026-10-25" },
    { "id": "rev-005", "author": "Arjun Patel", "rating": 5, "title": "Smooth 120Hz animations!", "comment": "Silky smooth animations on my display. It runs like butter and doesn't heat up the phone at all. Kudos to the developer team for great optimization.", "date": "2026-10-24" },
    { "id": "rev-006", "author": "Chloe Dubois", "rating": 3, "title": "Fun concept, ads between levels are frequent", "comment": "The puzzle gameplay itself is 5 stars, but the interstitial ads after every 3 levels break the zen immersion a bit. Would happily pay for an ad-free premium version.", "date": "2026-10-23" },
    { "id": "rev-007", "author": "Mateo Rossi", "rating": 5, "title": "Zen aesthetic and soothing sound effects", "comment": "The click sounds and ambient audio create an extremely calming atmosphere. Perfect for unwinding after a stressful workday.", "date": "2026-10-22" },
    { "id": "rev-008", "author": "Ananya Sharma", "rating": 4, "title": "Level 85 had me stumped for days!", "comment": "Genuinely clever level design. When I finally figured out the sequence for clearing the interlocking corners on level 85, I audibly cheered. Loving the challenge.", "date": "2026-10-21" },
    { "id": "rev-009", "author": "David Becker", "rating": 5, "title": "Best arrow / unblock style game on Android", "comment": "I've tried 5 or 6 similar arrow unblock games on Google Play. This one easily has the cleanest UI, most consistent touch detection, and no aggressive paywalls.", "date": "2026-10-20" },
    { "id": "rev-010", "author": "Zara Al-Mansoor", "rating": 4, "title": "Great offline playability", "comment": "Worked seamlessly during a 6-hour flight without needing Wi-Fi or data. Battery consumption was remarkably low too.", "date": "2026-10-19" },
    { "id": "rev-011", "author": "Felix Nguyen", "rating": 2, "title": "Accidental taps ruin high scores", "comment": "On smaller screens, when arrows are tightly packed, it is too easy to tap the adjacent arrow by mistake. Needs slightly bigger touch hitboxes or zoom in option.", "date": "2026-10-18" },
    { "id": "rev-012", "author": "Isabella Gomez", "rating": 5, "title": "Simple yet deeply intellectual", "comment": "Easy to learn within 5 seconds, but master-level boards require serious forward planning. Reminds me of classic spatial reasoning puzzles.", "date": "2026-10-17" },
    { "id": "rev-013", "author": "Thomas Wright", "rating": 5, "title": "Crisp visuals and dark theme", "comment": "The OLED true-black theme is gorgeous. It doesn't strain the eyes when playing late at night in bed. Well thought out UX.", "date": "2026-10-16" },
    { "id": "rev-014", "author": "Hannah Schmidt", "rating": 4, "title": "Very relaxing, please add custom themes", "comment": "I really enjoy the mechanics! It would be wonderful to unlock different arrow skins or color palettes (e.g. pastel, cyberpunk, autumn) as level completion rewards.", "date": "2026-10-15" },
    { "id": "rev-015", "author": "Kenji Takahashi", "rating": 5, "title": "Masterpiece of spatial orientation", "comment": "The multi-layered arrow trajectories in later chapters are genius. Every move requires anticipating 3 steps ahead. Highly recommended for puzzle lovers.", "date": "2026-10-14" },
    { "id": "rev-016", "author": "Nadia Ivanova", "rating": 3, "title": "Good game, had a slight freeze on level 92", "comment": "Game froze once when multiple arrows cleared simultaneously on level 92. Had to restart the app, but progress was saved. Otherwise a solid game.", "date": "2026-10-13" },
    { "id": "rev-017", "author": "Oliver Brown", "rating": 5, "title": "No annoying pay-to-win gimmicks", "comment": "In a sea of cash-grab games, Arrow Puzzle is refreshing. Skills and patience are all you need. Thank you dev for respecting players!", "date": "2026-10-12" },
    { "id": "rev-018", "author": "Priya Nair", "rating": 5, "title": "My daily morning brain warm-up", "comment": "I do 5 levels every morning with my tea. Clears the morning fog better than coffee. Truly therapeutic and satisfying.", "date": "2026-10-11" },
    { "id": "rev-019", "author": "Carlos Morales", "rating": 4, "title": "Challenging and rewarding", "comment": "It's deceptive—the first 15 levels trick you into thinking it's easy, then chapter 3 introduces looped blockers. Keeps you on your toes!", "date": "2026-10-10" },
    { "id": "rev-020", "author": "Jessica Taylor", "rating": 1, "title": "Too hard after level 60", "comment": "The difficulty spikes drastically. I don't want to spend 25 minutes on a single puzzle during my break. Not for casual players anymore.", "date": "2026-10-09" },
    { "id": "rev-021", "author": "Simon Cooper", "rating": 5, "title": "The trajectory previews are so neat", "comment": "The subtle indication when an arrow path is blocked is great visual feedback. Clean, readable, and intuitive.", "date": "2026-10-08" },
    { "id": "rev-022", "author": "Elena Rostova", "rating": 5, "title": "Perfect for all ages", "comment": "My 10-year-old nephew and my 68-year-old mother both play this game. Rare to find something that appeals across generations so gracefully.", "date": "2026-10-07" },
    { "id": "rev-023", "author": "Derrick Owens", "rating": 4, "title": "Great update in v1.2.0", "comment": "The new level transition animation in the latest update feels much faster. Thanks for listening to community feedback!", "date": "2026-10-06" },
    { "id": "rev-024", "author": "Fatima Zahra", "rating": 5, "title": "Obsessed with clearing the grid", "comment": "There is nothing more satisfying than untangling a dense web of interlocking arrows until the last one whooshes off the screen. 10/10.", "date": "2026-10-05" },
    { "id": "rev-025", "author": "Lucas Silva", "rating": 3, "title": "Sound design is great, need landscape mode", "comment": "Would love landscape tablet support! On a 12-inch tablet, playing locked in portrait orientation is awkward. Otherwise great game.", "date": "2026-10-04" },
    { "id": "rev-026", "author": "Grace O'Connor", "rating": 5, "title": "Instant favorite!", "comment": "Installed yesterday and already on level 110. Clean typography, smooth gesture inputs, zero lag. Outstanding indie game.", "date": "2026-10-03" },
    { "id": "rev-027", "author": "Tariq Mansour", "rating": 2, "title": "Needs cloud save sync", "comment": "Switched to my new phone and had to start over from level 1 because Google Play Games cloud save wasn't enabled. Please add cloud save!", "date": "2026-10-02" },
    { "id": "rev-028", "author": "Maya Lin", "rating": 5, "title": "Haptics + Sound = Chef's kiss", "comment": "The physical feedback makes every tap feel tactile and weighty. Brilliant puzzle mechanics with top tier polish.", "date": "2026-10-01" },
    { "id": "rev-029", "author": "Benjamin Clark", "rating": 4, "title": "Solid game with daily challenges", "comment": "The daily puzzle feature gives a great reason to come back every day. Some of the trickiest puzzles are in the daily challenge section.", "date": "2026-09-30" },
    { "id": "rev-030", "author": "Zoe Kravitz-Lee", "rating": 5, "title": "Minimalist puzzle perfection", "comment": "No clutter, no flashy casino-like distractions. Just pure geometric logic and clever board puzzles. Truly deserves 5 stars.", "date": "2026-09-29" }
  ];
}

document.addEventListener('DOMContentLoaded', loadAndRenderReviews);
