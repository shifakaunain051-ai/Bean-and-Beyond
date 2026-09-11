# ☕ Bean & Beyond — Artisanal Coffeehouse & Roastery

> *"Coffee, Beyond Ordinary."* — Thoughtfully roasted coffee for slow mornings, long conversations, and everything in between.

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized-blueviolet.svg)]()
[![Full--Stack](https://img.shields.io/badge/Full--Stack-REST_API_&_KDS-orange.svg)]()

**Bean & Beyond** is a complete, vibecoded specialty coffeehouse digital platform. It pairs an aesthetic, sensory-rich customer web application with a live Node.js REST API backend and a real-time Barista Kitchen Display System (KDS).

---

## ✨ Features

### 🎨 1. Dual Atmosphere Theme System
- **Morning Roast Mode (Default)**: Warm parchment, creamy oat milk, golden caramel, and soft morning sunlight.
- **Midnight Roastery Mode**: Deep velvet obsidian espresso (`#110d0b`), warm glowing neon amber, and polished brass highlights.
- Seamless one-click switch with saved state in `localStorage`.

### 📻 2. Built-in Lo-Fi & Ambience Synthesizer
- Generates warm Rhodes-style electric piano jazz chord progressions (*Fmaj9*, *Dm9*, *Gm9*, *C13*) using browser **Web Audio API** synthesis.
- Toggleable ambient **Rain on Glass** and vintage **Vinyl Needle Crackle**.
- Interactive vinyl record spin animation and real-time audio visualizer sound bars. Zero external audio dependencies.

### 🎯 3. "What is Your Vibe Today?" (Mood Matcher Quiz)
- Immediate interactive vibe curation (*Deep Focus*, *Slow Sunday Lounge*, *Late Night Coding*, *Morning Elevation*).
- Suggests single origin pour-overs or cortados with tasting notes tags and a one-click *"Pour Into Bag"* button.

### 🧪 4. Bespoke Brew Studio ("Craft Your Cup")
- Dynamic SVG/CSS layered cup visualizer adjusting foam, syrup swirl, milk shade, and brew foundation in real-time.
- Customize Cup Size (8oz, 12oz, 16oz), Foundation (Double Ristretto, Cold Brew, Matcha Espresso, Golden Turmeric), Milks (Oatly Barista, Sicilian Pistachio, Almond, Jersey), Temperature, and Artisan Infusions.
- Live taste radar meters (Sweetness, Roast Intensity, Silky Body, Caffeine Kick) and instant price calculation.

### 🛍️ 5. Sensory Menu & Slide-out Bag Drawer
- Full menu featuring single-origin espressos, slow V60 pour-overs, Kyoto 12-hour cold drip, signature concoctions, flaky French bakes, and whole bean reserve bags.
- Live search bar and category filters.
- Real-time quantity adjustments, discount promo vouchers (try code **`VIBECODE`** for 15% off or **`FIRSTSIP`** for 10% off), and tax calculations.

### 🧾 6. Digital Receipt & Checkout Simulation
- Generates an authentic digital café receipt with barcode, order token (e.g. `#BB-1826`), and table/counter pickup scheduling.

### ☕ 7. Barista Live Kitchen Display System (KDS)
- Dedicated live screen at `/barista` for café kitchen staff.
- Incoming orders appear in real-time with highlighted recipe specs.
- Status workflow: *Start Brewing ☕* ➔ *Ready for Pickup 🔔* ➔ *Mark Completed ✔*.
- Live shift metrics: Active Queue size, Total Shift Revenue, and Cups Extracted.
- Table reservations ledger.

### 📅 8. Table & Tasting Flight Reservations
- Book seats for solo reading, cozy catchups, or a guided 3-course coffee tasting flight.
- Instant reference code generation and server persistence.

### 📌 9. Notes from the Corner Table (Guestbook)
- Shared community board where café visitors can leave thoughts, read stories, and like notes with heart animations. Synced across devices via the REST backend.

---

## 🛠️ Tech Stack

- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom Properties, Glassmorphism, Micro-animations), Vanilla JavaScript (ES6+).
- **Audio Engine**: Web Audio API (native oscillator synthesis, biquad filters, pink/white noise generation).
- **Backend**: Node.js Native HTTP REST Server (Zero external dependencies).
- **Persistence**: JSON-backed local document store (`data/orders.json`, `data/reservations.json`, `data/guestbook.json`).
- **Assets**: High-resolution generated specialty coffee and bakehouse photography.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher) installed.

### Installation & Launch

1. Clone the repository:
   ```bash
   git clone https://github.com/shifakaunain051-ai/Bean-and-Beyond.git
   cd Bean-and-Beyond
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Open in your browser:
   - **Customer Experience**: [http://localhost:3000/](http://localhost:3000/)
   - **Barista Kitchen KDS**: [http://localhost:3000/barista](http://localhost:3000/barista)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | List all orders |
| `POST` | `/api/orders` | Place a new order |
| `PATCH` | `/api/orders/:id/status` | Update order status (`brewing`, `ready`, `completed`) |
| `GET` | `/api/reservations` | List table reservations |
| `POST` | `/api/reservations` | Book a table or tasting flight |
| `GET` | `/api/guestbook` | Get all community guestbook notes |
| `POST` | `/api/guestbook` | Add a note to the guestbook |
| `POST` | `/api/guestbook/:id/like` | Upvote a guest note |
| `GET` | `/api/stats` | Real-time shift statistics |

---

## 📄 License
MIT © 2026 Bean & Beyond Coffee Roasters.
