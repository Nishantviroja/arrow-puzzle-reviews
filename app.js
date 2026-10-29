// Load reviews from reviews.json and render single simple cards with copy button

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
    console.warn('Could not fetch reviews.json, using fallback', err);
  }

  if (!reviews || reviews.length === 0) {
    reviews = getFallbackReviews();
  }

  // Update total count
  reviewCount.textContent = `${reviews.length} reviews`;

  // Render cards
  reviewsList.innerHTML = reviews.map((item, index) => {
    const text = typeof item === 'string' ? item : (item.review || item.comment || '');
    const number = index + 1;

    return `
      <div class="review-card">
        <div class="card-top">
          <span class="card-number">#${number}</span>
          <button class="copy-btn" onclick="copyReviewText(this, ${index})">Copy</button>
        </div>
        <p class="review-text">${escapeHtml(text)}</p>
      </div>
    `;
  }).join('');

  window._allReviews = reviews;
}

// Copy single review text to clipboard
window.copyReviewText = function(btn, index) {
  const item = window._allReviews[index];
  if (!item) return;

  const textToCopy = typeof item === 'string' ? item : (item.review || item.comment || '');

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

  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 1500);
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
    { "id": 1, "review": "Absolutely love the minimalistic feel of Arrow Puzzle. The haptic feedback when an arrow successfully clears the board is so rewarding. Perfect game to play on the commute." },
    { "id": 2, "review": "Started playing thinking I'd do just 2 levels, and ended up finishing 40 in one sitting! The puzzles scale in difficulty nicely without feeling impossible." },
    { "id": 3, "review": "The mechanics are brilliant and smooth. My only small request is an undo button for when you accidentally tap the wrong arrow on larger boards." },
    { "id": 4, "review": "No annoying countdown timers, no energy meters forcing you to wait, just pure pure logic problem-solving. This is how mobile puzzle games should be made." },
    { "id": 5, "review": "Silky smooth animations on my display. It runs like butter and doesn't heat up the phone at all. Kudos to the developer team for great optimization." },
    { "id": 6, "review": "The puzzle gameplay itself is 5 stars, but the interstitial ads after every 3 levels break the zen immersion a bit. Would happily pay for an ad-free premium version." },
    { "id": 7, "review": "The click sounds and ambient audio create an extremely calming atmosphere. Perfect for unwinding after a stressful workday." },
    { "id": 8, "review": "Genuinely clever level design. When I finally figured out the sequence for clearing the interlocking corners on level 85, I audibly cheered. Loving the challenge." },
    { "id": 9, "review": "I've tried 5 or 6 similar arrow unblock games on Google Play. This one easily has the cleanest UI, most consistent touch detection, and no aggressive paywalls." },
    { "id": 10, "review": "Worked seamlessly during a 6-hour flight without needing Wi-Fi or data. Battery consumption was remarkably low too." },
    { "id": 11, "review": "On smaller screens, when arrows are tightly packed, it is too easy to tap the adjacent arrow by mistake. Needs slightly bigger touch hitboxes or zoom in option." },
    { "id": 12, "review": "Easy to learn within 5 seconds, but master-level boards require serious forward planning. Reminds me of classic spatial reasoning puzzles." },
    { "id": 13, "review": "The OLED true-black theme is gorgeous. It doesn't strain the eyes when playing late at night in bed. Well thought out UX." },
    { "id": 14, "review": "I really enjoy the mechanics! It would be wonderful to unlock different arrow skins or color palettes (e.g. pastel, cyberpunk, autumn) as level completion rewards." },
    { "id": 15, "review": "The multi-layered arrow trajectories in later chapters are genius. Every move requires anticipating 3 steps ahead. Highly recommended for puzzle lovers." },
    { "id": 16, "review": "Game froze once when multiple arrows cleared simultaneously on level 92. Had to restart the app, but progress was saved. Otherwise a solid game." },
    { "id": 17, "review": "In a sea of cash-grab games, Arrow Puzzle is refreshing. Skills and patience are all you need. Thank you dev for respecting players!" },
    { "id": 18, "review": "I do 5 levels every morning with my tea. Clears the morning fog better than coffee. Truly therapeutic and satisfying." },
    { "id": 19, "review": "It's deceptive—the first 15 levels trick you into thinking it's easy, then chapter 3 introduces looped blockers. Keeps you on your toes!" },
    { "id": 20, "review": "The difficulty spikes drastically. I don't want to spend 25 minutes on a single puzzle during my break. Not for casual players anymore." },
    { "id": 21, "review": "The subtle indication when an arrow path is blocked is great visual feedback. Clean, readable, and intuitive." },
    { "id": 22, "review": "My 10-year-old nephew and my 68-year-old mother both play this game. Rare to find something that appeals across generations so gracefully." },
    { "id": 23, "review": "The new level transition animation in the latest update feels much faster. Thanks for listening to community feedback!" },
    { "id": 24, "review": "There is nothing more satisfying than untangling a dense web of interlocking arrows until the last one whooshes off the screen. 10/10." },
    { "id": 25, "review": "Would love landscape tablet support! On a 12-inch tablet, playing locked in portrait orientation is awkward. Otherwise great game." },
    { "id": 26, "review": "Installed yesterday and already on level 110. Clean typography, smooth gesture inputs, zero lag. Outstanding indie game." },
    { "id": 27, "review": "Switched to my new phone and had to start over from level 1 because Google Play Games cloud save wasn't enabled. Please add cloud save!" },
    { "id": 28, "review": "The physical feedback makes every tap feel tactile and weighty. Brilliant puzzle mechanics with top tier polish." },
    { "id": 29, "review": "The daily puzzle feature gives a great reason to come back every day. Some of the trickiest puzzles are in the daily challenge section." },
    { "id": 30, "review": "No clutter, no flashy casino-like distractions. Just pure geometric logic and clever board puzzles. Truly deserves 5 stars." }
  ];
}

document.addEventListener('DOMContentLoaded', loadAndRenderReviews);
