# Arrow Puzzle - App Reviews Hub

A web application to manage, showcase, and export player reviews for **Arrow Puzzle (Android)**.

## ✨ Features

- **Google Font Rubik**: Clean, modern typography using the official Rubik font family.
- **Reviews Storage**:
  - Saved as a structured JSON file in [`reviews.json`](./reviews.json).
  - Loaded automatically into the UI with persistent `localStorage` synchronization.
  - Export button to download updated `reviews.json` at any time.
- **Copy Buttons**:
  - **Copy Review**: Formatted review text (Title, Rating, Author, Date, Comment) copied with one click.
  - **Copy JSON**: Instant raw JSON object copy for any individual review.
  - **Copy All (JSON)**: Full JSON array of all 30+ reviews copied to clipboard.
- **Interactive Reviews Feed**:
  - 30 pre-loaded realistic dummy reviews covering gameplay, mechanics, difficulty, and praise.
  - Real-time search by author, title, comment, or device.
  - Rating filter pills (`All`, `5 ★`, `4 ★`, `3 ★`, `2 ★`, `1 ★`).
  - Sort by Newest, Oldest, Highest Rating, Lowest Rating, or Most Helpful.
  - Like counter for each review.
- **Add New Review**:
  - Form dialog to publish new player feedback with star selector, author name, device, app version, title, and body.

## 🚀 How to Run

### Method 1: Direct File Opening
Simply double-click [`index.html`](./index.html) or open it in your favorite web browser (Chrome, Edge, Safari, Firefox). The application includes bundled fallback data so it works even over the `file://` protocol.

### Method 2: Local HTTP Server (Optional)
If you prefer running via a local web server:

```bash
cd /Users/nishant/Code/web/arrow-puzzel-reviewss
npx serve .
# or
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## 📁 File Structure

```text
arrow-puzzel-reviewss/
├── index.html       # Main HTML markup
├── style.css        # Responsive styling with Rubik font
├── app.js           # Filtering, sorting, copy-to-clipboard & review management
├── reviews.json     # 30 dummy reviews data
└── README.md        # Documentation
```
