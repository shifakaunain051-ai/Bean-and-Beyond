/**
 * BEAN & BEYOND — VIBECODED WEB EXPERIENCE
 * Interactive Audio Synth, Mood Quiz, Cup Studio, Cart, Checkout & Guestbook
 * Connected with REST API Backend & Live Barista KDS
 */

// =============================================================================
// 1. DATA & STATE STORE
// =============================================================================

const MENU_ITEMS = [
    // Originals from previous version
    {
        id: 'espresso-classic',
        name: 'Espresso',
        category: 'espresso',
        price: 160,
        description: 'Concentrated double shot pulled from our Chikmagalur single estate roast with dense golden crema.',
        tags: ['Single Origin', 'Bold', 'Classic'],
        isOriginal: true
    },
    {
        id: 'cappuccino-classic',
        name: 'Cappuccino',
        category: 'espresso',
        price: 220,
        description: 'Equal parts espresso, velvety steamed milk, and a cloud-like microfoam cap with cocoa dust.',
        tags: ['Creamy', 'Balanced', 'Warm'],
        isOriginal: true
    },
    {
        id: 'latte-classic',
        name: 'Classic Latte',
        category: 'espresso',
        price: 240,
        description: 'Smooth double shot gently poured over silky steamed milk with delicate pour art.',
        tags: ['Smooth', 'Mellow', 'Comforting'],
        isOriginal: true
    },
    {
        id: 'mocha-classic',
        name: 'Mocha',
        category: 'espresso',
        price: 250,
        description: 'Double espresso blended with artisan 70% dark Belgian cocoa ganache and steamed jersey milk.',
        tags: ['Rich', 'Belgian Cocoa', 'Decadent'],
        isOriginal: true
    },

    // Expanded Espresso Bar
    {
        id: 'piccolo-latte',
        name: 'Piccolo Latte',
        category: 'espresso',
        price: 200,
        description: 'A punchy ristretto shot cut with just 3oz of warm textured milk for purists.',
        tags: ['Intense', 'Silky', '4oz Glass']
    },
    {
        id: 'cortado',
        name: 'Spanish Cortado',
        category: 'espresso',
        price: 210,
        description: '1:1 ratio of espresso and warm textured milk served in an authentic Gibraltar glass.',
        tags: ['Bold', 'Zero Sugar', 'Spanish Style']
    },
    {
        id: 'flat-white',
        name: 'Flat White',
        category: 'espresso',
        price: 230,
        description: 'Double ristretto with microfoam folded throughout the entire cup for a glossy, velvet texture.',
        tags: ['Double Ristretto', 'Velvet Crema']
    },

    // Slow Bar & Manual Pour Overs
    {
        id: 'pourover-ethiopia',
        name: 'Ethiopian Yirgacheffe V60',
        category: 'pourover',
        price: 260,
        description: 'Hand-poured slow extraction highlighting delicate floral jasmine, bergamot, and sweet citrus peach.',
        tags: ['Washed Process', 'Floral', 'Light Roast']
    },
    {
        id: 'pourover-geisha',
        name: 'Colombian Geisha Reserve',
        category: 'pourover',
        price: 340,
        description: 'Ultra-rare micro-lot with extraordinary tea-like clarity, notes of honeysuckle and candied papaya.',
        tags: ['Score: 92+', 'Exotic', 'Pour-Over']
    },
    {
        id: 'colddrip-kyoto',
        name: 'Kyoto 12-Hour Cold Drip',
        category: 'pourover',
        price: 280,
        description: 'Slow-dripped single drop by drop over a frozen marble column for 12 hours. Zero bitterness.',
        tags: ['12hr Brew', 'Chocolate Oak', 'High Caffeine']
    },

    // Signature Concoctions
    {
        id: 'smoked-rosemary-latte',
        name: 'Smoked Rosemary Latte',
        category: 'signatures',
        price: 270,
        description: 'Espresso infused with torch-smoked organic rosemary sprigs and Madagascan vanilla syrup.',
        tags: ['Woody Aroma', 'Herbal', 'House Special']
    },
    {
        id: 'cardamom-pistachio-cortado',
        name: 'Cardamom Pistachio Cortado',
        category: 'signatures',
        price: 280,
        description: 'Crushed green cardamom infused milk paired with stone-ground Sicilian pistachio drizzle.',
        tags: ['Aromatic', 'Nutty', 'Spiced']
    },
    {
        id: 'marshmallow-sea-salt-mocha',
        name: 'Sea Salt Fluff Mocha',
        category: 'signatures',
        price: 290,
        description: 'Dark cocoa espresso topped with torched house marshmallow fluff and Cornish sea salt flakes.',
        tags: ['Torched Fluff', 'Sweet & Salty']
    },

    // Artisan Bakery
    {
        id: 'bakery-croissant',
        name: 'Normandy Butter Croissant',
        category: 'bakery',
        price: 190,
        description: 'Laminated with cultured French butter, baked fresh three times daily. Flaky, honeycombed interior.',
        tags: ['Baked Daily', 'Flaky', 'Golden']
    },
    {
        id: 'bakery-cardamom-bun',
        name: 'Swedish Cardamom Bun (Kardemummabulle)',
        category: 'bakery',
        price: 210,
        description: 'Twisted Scandinavian sourdough enriched with freshly crushed cardamom seeds and pearl sugar.',
        tags: ['Warm Spices', 'Sourdough', 'Authentic']
    },
    {
        id: 'bakery-tiramisu',
        name: 'Espresso Pot Tiramisu',
        category: 'bakery',
        price: 240,
        description: 'Savoiardi biscuits soaked in our Kyoto cold drip, layered with light mascarpone crema.',
        tags: ['Kyoto Soaked', 'Mascarpone', 'Dessert']
    },
    {
        id: 'bakery-toast',
        name: 'Truffle Mushroom Toast',
        category: 'bakery',
        price: 280,
        description: 'Sauteed wild mushrooms, white truffle oil, and whipped thyme ricotta on toasted artisan sourdough.',
        tags: ['Savory', 'Warm Sourdough', 'Truffle']
    },

    // Whole Beans Retail
    {
        id: 'beans-chikmagalur',
        name: 'Chikmagalur Reserve Beans 250g',
        category: 'beans',
        price: 580,
        description: 'Whole bean medium roast from Western Ghats. Notes of toasted hazelnut, caramel, and dark chocolate.',
        tags: ['Whole Beans', 'Elevation: 1400m', 'Medium Roast']
    },
    {
        id: 'beans-colombia',
        name: 'Huila Pink Bourbon Beans 250g',
        category: 'beans',
        price: 750,
        description: 'Rare Pink Bourbon varietal. Vibrant strawberry, red apple acidity, and sugarcane sweetness.',
        tags: ['Whole Beans', 'Direct Trade', 'Light-Med']
    }
];

// Secret Barista Vault Items
const SECRET_VAULT_ITEMS = [
    {
        id: 'vault-midnight-tokyo',
        name: 'Midnight Tokyo Fog',
        price: 290,
        description: 'Slow-dripped Kyoto cold brew topped with Earl Grey infused velvet cold foam and lavender dust.',
        tag: 'Barista Secret #1'
    },
    {
        id: 'vault-cardamom-affogato',
        name: 'Spiced Honey Gelato Affogato',
        price: 280,
        description: 'Artisanal wildflower honey & cardamom gelato drowned in a scorching double ristretto shot.',
        tag: 'Barista Secret #2'
    },
    {
        id: 'vault-chili-mocha',
        name: 'Smoked Ancho Chili Velvet Mocha',
        price: 275,
        description: 'Belgian 75% dark cocoa simmered with subtle ancho chili spice and toasted cinnamon.',
        tag: 'Barista Secret #3'
    }
];

// Mood Matcher Profiles
const MOOD_PROFILES = {
    focus: {
        title: 'Deep Focus & Flow State',
        tagline: 'Precision & Clarity',
        drinkName: 'Ethiopian Yirgacheffe V60',
        price: 260,
        desc: 'A crystal-clean pour-over with bright floral jasmine and citrus notes. Clean caffeine release to keep your thoughts razor-sharp without jitters.',
        tastingNotes: ['Bergamot', 'Jasmine Blossom', 'White Peach', 'Crisp Lemon'],
        prep: 'Manual Pour Over · 92°C Extraction',
        itemMatchId: 'pourover-ethiopia'
    },
    sunday: {
        title: 'Slow Sunday Lounge',
        tagline: 'Warm Comfort & Conversation',
        drinkName: 'Classic Latte with Cardamom Crema',
        price: 240,
        desc: 'Rich Chikmagalur double shot wrapped in velvety warm jersey milk with a kiss of aromatic spice. Ideal for reading your favorite book.',
        tastingNotes: ['Mellow Honey', 'Sweet Cream', 'Warm Cardamom', 'Milk Chocolate'],
        prep: 'Double Shot Espresso · 65°C Microfoam',
        itemMatchId: 'latte-classic'
    },
    coding: {
        title: 'Late Night Midnight Coding',
        tagline: 'Quiet Intensity & Sustained Stamina',
        drinkName: 'Kyoto 12-Hour Cold Drip',
        price: 280,
        desc: 'Concentrated drop-by-drop cold brew steeped for half a day. Velvety, viscous, and brimming with sustained natural caffeine.',
        tastingNotes: ['Dark Cocoa Ganache', 'Smoked Oak', 'Black Cherry', 'Cigar Leaf'],
        prep: '12-Hour Kyoto Slow Drip Column',
        itemMatchId: 'colddrip-kyoto'
    },
    energize: {
        title: 'Morning Caffeine Elevation',
        tagline: 'Bold Punch & Pure Energy',
        drinkName: 'Spanish Cortado (Double Ristretto)',
        price: 210,
        desc: 'A powerful double ristretto cut with equal parts warm milk. Direct, rich, creamy, and instantly awakens your senses.',
        tastingNotes: ['Toasted Hazelnut', 'Dark Roast Caramel', 'Dense Crema'],
        prep: '1:1 Ratio · Gibraltar Tumbler',
        itemMatchId: 'cortado'
    }
};

// Initial Notes for Guestbook
const INITIAL_NOTES = [
    {
        id: 1,
        text: '"Sat by the rain-streaked window for 3 hours today sipping the Ethiopian V60 and finally finished my design book. Pure magic."',
        author: 'Aarav M. — Corner Table #4',
        likes: 18
    },
    {
        id: 2,
        text: '"Best flat white in town hands down. The milk texture is liquid silk and the lo-fi beats make you forget about deadlines."',
        author: 'Maya S. — Barista Bar',
        likes: 25
    },
    {
        id: 3,
        text: '"The Swedish Cardamom Bun with a Spanish Cortado is the ultimate pairing. Bean & Beyond feels like a haven."',
        author: 'Rohan K. — Sunlit Patio',
        likes: 14
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('bb_cart')) || [];
let currentCategory = 'all';
let currentSearchQuery = '';
let activeMood = 'focus';
let appliedPromo = null;

// Custom Cup Builder State
let cupCustomizer = {
    size: '12oz',
    sizePrice: 30,
    base: 'Double Ristretto',
    basePrice: 180,
    milk: 'Oatly Barista',
    milkPrice: 40,
    temp: 'Warm 65°C',
    tempPrice: 0,
    syrup: 'Madagascar Vanilla Caviar',
    syrupPrice: 30
};

// Guestbook notes state
let guestNotes = INITIAL_NOTES;

// =============================================================================
// 2. WEB AUDIO API LO-FI & AMBIENCE SYNTHESIZER
// =============================================================================

class CoffeeLoFiPlayer {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.chordLoopTimeout = null;
        this.rainNode = null;
        this.crackleNode = null;
        this.rainGain = null;
        this.crackleGain = null;
        
        this.isRainActive = true;
        this.isCrackleActive = true;
        this.volume = 0.55;

        this.tracks = [
            { title: 'Rain on Roasted Beans', artist: 'Bean & Beyond Lo-Fi Ensemble' },
            { title: 'Velvet Crema Dreams', artist: 'Late Night Coffee Sessions' },
            { title: 'Sunday Morning Porch', artist: 'Slow Extraction Beats' }
        ];
    }

    initAudioContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);

            this.setupRainSynth();
            this.setupVinylCrackle();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setupRainSynth() {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 2.5;
        }

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = buffer;
        rainSource.loop = true;

        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(650, this.ctx.currentTime);

        this.rainGain = this.ctx.createGain();
        this.rainGain.gain.setValueAtTime(this.isRainActive ? 0.12 : 0, this.ctx.currentTime);

        rainSource.connect(rainFilter);
        rainFilter.connect(this.rainGain);
        this.rainGain.connect(this.masterGain);
        rainSource.start(0);
        this.rainNode = rainSource;
    }

    setupVinylCrackle() {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            if (Math.random() < 0.0018) {
                data[i] = (Math.random() * 2 - 1) * 0.7;
            } else {
                data[i] = (Math.random() * 2 - 1) * 0.015;
            }
        }

        const crackleSource = this.ctx.createBufferSource();
        crackleSource.buffer = buffer;
        crackleSource.loop = true;

        const crackleFilter = this.ctx.createBiquadFilter();
        crackleFilter.type = 'bandpass';
        crackleFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
        crackleFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

        this.crackleGain = this.ctx.createGain();
        this.crackleGain.gain.setValueAtTime(this.isCrackleActive ? 0.18 : 0, this.ctx.currentTime);

        crackleSource.connect(crackleFilter);
        crackleFilter.connect(this.crackleGain);
        this.crackleGain.connect(this.masterGain);
        crackleSource.start(0);
        this.crackleNode = crackleSource;
    }

    playChord(notes, duration = 3.5) {
        if (!this.isPlaying || !this.ctx) return;

        const now = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(900, now);
            filter.frequency.exponentialRampToValueAtTime(350, now + duration);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.12);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now + (idx * 0.04));
            osc.stop(now + duration + 0.5);
        });
    }

    startChordProgression() {
        const progressions = [
            [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
            [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
            [196.00, 233.08, 293.66, 349.23, 440.00], // Gm9
            [130.81, 164.81, 233.08, 293.66, 440.00]  // C13
        ];

        let chordStep = 0;
        const playNext = () => {
            if (!this.isPlaying) return;
            this.playChord(progressions[chordStep], 3.8);
            chordStep = (chordStep + 1) % progressions.length;
            this.chordLoopTimeout = setTimeout(playNext, 3400);
        };

        playNext();
    }

    togglePlay() {
        this.initAudioContext();
        this.isPlaying = !this.isPlaying;

        const vinyl = document.getElementById('vinylDisk');
        const visualizer = document.getElementById('visualizerBars');
        const playBtn = document.getElementById('audioPlayBtn');

        if (this.isPlaying) {
            this.startChordProgression();
            if (vinyl) vinyl.classList.add('spinning');
            if (visualizer) visualizer.classList.add('active');
            if (playBtn) playBtn.innerHTML = '⏸';
            showToast('🎵 Lo-Fi Ambient Radio playing · Enjoy the café vibes');
        } else {
            clearTimeout(this.chordLoopTimeout);
            if (vinyl) vinyl.classList.remove('spinning');
            if (visualizer) visualizer.classList.remove('active');
            if (playBtn) playBtn.innerHTML = '▶';
        }
    }

    toggleRain() {
        this.isRainActive = !this.isRainActive;
        const chip = document.getElementById('chipRain');
        if (chip) chip.classList.toggle('active', this.isRainActive);
        if (this.rainGain && this.ctx) {
            this.rainGain.gain.setValueAtTime(this.isRainActive ? 0.12 : 0, this.ctx.currentTime);
        }
    }

    toggleCrackle() {
        this.isCrackleActive = !this.isCrackleActive;
        const chip = document.getElementById('chipCrackle');
        if (chip) chip.classList.toggle('active', this.isCrackleActive);
        if (this.crackleGain && this.ctx) {
            this.crackleGain.gain.setValueAtTime(this.isCrackleActive ? 0.18 : 0, this.ctx.currentTime);
        }
    }

    setVolume(val) {
        this.volume = parseFloat(val);
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
    }
}

const audioPlayer = new CoffeeLoFiPlayer();

// =============================================================================
// 3. CART & BACKEND API CHECKOUT ENGINE
// =============================================================================

function saveCart() {
    localStorage.setItem('bb_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const countBadge = document.getElementById('cartBadge');
    const itemsList = document.getElementById('cartItemsList');
    const subtotalElem = document.getElementById('cartSubtotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountAmount = document.getElementById('cartDiscountAmount');
    const grandTotalElem = document.getElementById('cartGrandTotal');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) {
        countBadge.innerText = totalCount;
        countBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (!itemsList) return;

    if (cart.length === 0) {
        itemsList.innerHTML = '<div class="empty-cart" style="text-align:center; padding: 40px 20px; color: var(--text-muted);"><p style="font-size:2rem; margin-bottom:10px;">☕</p><p>Your coffee bag is empty.</p><p style="font-size:0.85rem; margin-top:6px;">Explore the bar and add your favorite brews!</p></div>';
        if (subtotalElem) subtotalElem.innerText = '₹0';
        if (discountRow) discountRow.style.display = 'none';
        if (grandTotalElem) grandTotalElem.innerText = '₹0';
        return;
    }

    let subtotal = 0;
    itemsList.innerHTML = '';

    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                ${item.specs ? `<div class="cart-item-spec">${item.specs}</div>` : ''}
                <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
            </div>
            <div class="cart-qty-ctrls">
                <button class="qty-btn" onclick="changeItemQty(${idx}, -1)">−</button>
                <span style="font-weight:600; font-size:0.9rem; min-width:20px; text-align:center;">${item.quantity}</span>
                <button class="qty-btn" onclick="changeItemQty(${idx}, 1)">+</button>
                <button class="qty-btn" onclick="removeCartItem(${idx})" style="margin-left:4px; color:#ef4444;" title="Remove">✕</button>
            </div>
        `;
        itemsList.appendChild(row);
    });

    let discount = 0;
    if (appliedPromo) {
        discount = Math.round(subtotal * appliedPromo.percent);
        if (discountRow && discountAmount) {
            discountRow.style.display = 'flex';
            discountAmount.innerText = `-₹${discount} (${appliedPromo.code})`;
        }
    } else if (discountRow) {
        discountRow.style.display = 'none';
    }

    const grandTotal = Math.max(0, subtotal - discount);

    if (subtotalElem) subtotalElem.innerText = `₹${subtotal}`;
    if (grandTotalElem) grandTotalElem.innerText = `₹${grandTotal}`;
}

function addToCart(name, price, specs = '', id = null) {
    const existingIndex = cart.findIndex(item => item.name === name && item.specs === specs);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: id || 'custom-' + Date.now(),
            name: name,
            price: price,
            specs: specs,
            quantity: 1
        });
    }
    saveCart();
    showToast(`Added to Bag: ${name} (₹${price})`);
    openCartDrawer();
}

function changeItemQty(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeCartItem(index) {
    if (!cart[index]) return;
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    showToast(`Removed ${removedName} from bag`);
}

function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
    }
}

function applyPromoCode() {
    const input = document.getElementById('promoInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (code === 'VIBECODE') {
        appliedPromo = { code: 'VIBECODE', percent: 0.15 };
        showToast('🎉 Promo code VIBECODE applied! 15% off');
    } else if (code === 'FIRSTSIP') {
        appliedPromo = { code: 'FIRSTSIP', percent: 0.10 };
        showToast('☕ First Sip discount applied! 10% off');
    } else {
        showToast('❌ Invalid code. Try "VIBECODE" or "FIRSTSIP"');
    }
    updateCartUI();
}

// Checkout & Digital Receipt Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Your bag is empty. Please add items to checkout.');
        return;
    }
    closeCartDrawer();
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('open');
        renderReceiptPreview();
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('open');
}

function renderReceiptPreview() {
    const receiptContainer = document.getElementById('receiptContent');
    if (!receiptContainer) return;

    let subtotal = 0;
    let itemsRowsHtml = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemsRowsHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem;">
                <div>
                    <div><strong>${item.name}</strong> × ${item.quantity}</div>
                    ${item.specs ? `<div style="font-size:0.75rem; color:var(--text-muted);">${item.specs}</div>` : ''}
                </div>
                <div>₹${itemTotal}</div>
            </div>
        `;
    });

    let discount = 0;
    if (appliedPromo) {
        discount = Math.round(subtotal * appliedPromo.percent);
    }
    const total = subtotal - discount;

    receiptContainer.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-brand">BEAN & BEYOND</div>
            <div style="font-size:0.75rem; letter-spacing:2px; text-transform:uppercase; color:var(--accent-caramel); margin-top:2px;">Artisanal Roastery & Bar</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">READY TO BREW · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="receipt-barcode"></div>
        </div>

        <div style="margin-bottom:20px;">
            ${itemsRowsHtml}
        </div>

        <div style="border-top:1px dashed var(--border-strong); padding-top:12px; margin-bottom:24px;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px;">
                <span>Subtotal</span>
                <span>₹${subtotal}</span>
            </div>
            ${discount > 0 ? `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--accent-terracotta); margin-bottom:6px;">
                <span>Discount (${appliedPromo.code})</span>
                <span>-₹${discount}</span>
            </div>` : ''}
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px;">
                <span>Taxes & Roastery GST (5%)</span>
                <span>Included</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:1.2rem; font-weight:700; color:var(--text-primary); border-top:1px solid var(--border-strong); padding-top:10px; margin-top:6px;">
                <span>Grand Total</span>
                <span>₹${total}</span>
            </div>
        </div>

        <form id="orderForm" onsubmit="confirmOrder(event)" style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group">
                <label>Your Name</label>
                <input type="text" id="custName" class="form-input" placeholder="e.g. Shifa / Alex" required />
            </div>
            <div class="form-group">
                <label>Pickup or Table Number</label>
                <input type="text" id="custTable" class="form-input" placeholder="e.g. Table #4 or Pickup at Bar" required />
            </div>
            <div class="form-group">
                <label>Preparation Speed</label>
                <select id="custSpeed" class="form-select">
                    <option>Brew Immediately (~7 mins)</option>
                    <option>Ready in 20 mins</option>
                    <option>Ready in 45 mins</option>
                </select>
            </div>
            <button type="submit" id="btnSubmitOrder" class="btn-checkout" style="margin-top:10px;">Confirm & Send to Barista ☕</button>
        </form>
    `;
}

// Submitting order to Backend REST API
async function confirmOrder(event) {
    event.preventDefault();
    const btn = document.getElementById('btnSubmitOrder');
    if (btn) {
        btn.innerText = 'Transmitting to Barista KDS...';
        btn.disabled = true;
    }

    const name = document.getElementById('custName').value;
    const table = document.getElementById('custTable').value;
    const speed = document.getElementById('custSpeed').value;

    let subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    let discount = appliedPromo ? Math.round(subtotal * appliedPromo.percent) : 0;
    let grandTotal = subtotal - discount;

    const payload = {
        customerName: name,
        tableOrPickup: table,
        speed: speed,
        items: cart,
        subtotal: subtotal,
        discount: discount,
        grandTotal: grandTotal,
        promoCode: appliedPromo ? appliedPromo.code : null
    };

    let orderNum = 'BB-' + Math.floor(1000 + Math.random() * 9000);

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success && result.order) {
            orderNum = result.order.id;
        }
    } catch (err) {
        console.warn('Backend offline, using client order confirmation:', err);
    }

    const receiptBox = document.querySelector('.receipt-modal-box');
    if (receiptBox) {
        receiptBox.innerHTML = `
            <div style="text-align:center; padding: 20px 0;">
                <div style="font-size:3.5rem; margin-bottom:12px;">☕</div>
                <h3 style="font-size:1.8rem; margin-bottom:8px;">Order Dispatched to Barista!</h3>
                <p style="color:var(--accent-caramel); font-weight:700; letter-spacing:1px; margin-bottom:16px;">TICKET #${orderNum}</p>
                <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:24px;">
                    Thank you, <strong>${name}</strong>! Your artisanal brew has been transmitted to our live Barista KDS for <strong>${table}</strong>. Expected: <strong>${speed}</strong>.
                </p>
                <div style="background:var(--bg-surface); padding:16px; border-radius:var(--radius-md); font-size:0.85rem; color:var(--text-secondary); margin-bottom:24px;">
                    🌱 Roasted with care on zero-emission roasters · 100% Compostable packaging.
                </div>
                <div style="display:flex; gap:12px;">
                    <a href="/barista" target="_blank" class="btn-secondary" style="flex:1; justify-content:center; font-size:0.85rem;">View in Barista KDS ↗</a>
                    <button class="btn-primary" onclick="finishOrderFlow()" style="flex:1; justify-content:center;">Back to Lounge</button>
                </div>
            </div>
        `;
    }

    cart = [];
    appliedPromo = null;
    saveCart();
    showToast(`Order ${orderNum} received by kitchen!`);
}

function finishOrderFlow() {
    closeCheckoutModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================================================
// 4. MOOD MATCHER (VIBE QUIZ) LOGIC
// =============================================================================

function selectMood(moodKey) {
    activeMood = moodKey;
    const data = MOOD_PROFILES[moodKey];
    if (!data) return;

    document.querySelectorAll('.mood-option-card').forEach(card => {
        card.classList.toggle('active', card.dataset.mood === moodKey);
    });

    const display = document.getElementById('moodResultDisplay');
    if (display) {
        display.innerHTML = `
            <div>
                <span class="result-badge">${data.tagline}</span>
                <h3 class="result-heading">${data.drinkName}</h3>
                <p class="result-description">${data.desc}</p>
                
                <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--text-muted); margin-bottom:8px;">Tasting Palette:</div>
                <div class="tasting-notes-tags">
                    ${data.tastingNotes.map(note => `<span class="taste-tag">✨ ${note}</span>`).join('')}
                </div>

                <div style="font-size:0.82rem; color:var(--accent-caramel); font-weight:600; margin-bottom:20px;">
                    ⚙️ ${data.prep}
                </div>
            </div>

            <div class="result-action-row">
                <div>
                    <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted);">Recommended Pour</div>
                    <div class="result-price">₹${data.price}</div>
                </div>
                <button class="btn-primary" onclick="addToCart('${data.drinkName}', ${data.price}, 'Mood Pour: ${data.tagline}', '${data.itemMatchId}')">
                    Pour Into Bag ☕
                </button>
            </div>
        `;
    }
}

// =============================================================================
// 5. BESPOKE BREW STUDIO (CUSTOM CUP BUILDER)
// =============================================================================

function updateStudioOption(type, value, price, element) {
    if (type === 'size') {
        cupCustomizer.size = value;
        cupCustomizer.sizePrice = price;
    } else if (type === 'base') {
        cupCustomizer.base = value;
        cupCustomizer.basePrice = price;
    } else if (type === 'milk') {
        cupCustomizer.milk = value;
        cupCustomizer.milkPrice = price;
    } else if (type === 'temp') {
        cupCustomizer.temp = value;
        cupCustomizer.tempPrice = price;
    } else if (type === 'syrup') {
        cupCustomizer.syrup = value;
        cupCustomizer.syrupPrice = price;
    }

    if (element && element.parentElement) {
        element.parentElement.querySelectorAll('.studio-chip').forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
    }

    renderStudioPreview();
}

function renderStudioPreview() {
    const totalPrice = cupCustomizer.basePrice + cupCustomizer.sizePrice + cupCustomizer.milkPrice + cupCustomizer.tempPrice + cupCustomizer.syrupPrice;
    
    const priceDisplay = document.getElementById('studioPrice');
    if (priceDisplay) priceDisplay.innerText = `₹${totalPrice}`;

    const specSize = document.getElementById('cupSpecSize');
    const specBase = document.getElementById('cupSpecBase');
    const specMilk = document.getElementById('cupSpecMilk');
    if (specSize) specSize.innerText = cupCustomizer.size;
    if (specBase) specBase.innerText = cupCustomizer.base;
    if (specMilk) specMilk.innerText = cupCustomizer.milk;

    const layerCoffee = document.getElementById('cupLayerCoffee');
    const layerMilk = document.getElementById('cupLayerMilk');
    const layerSyrup = document.getElementById('cupLayerSyrup');

    if (layerCoffee) {
        if (cupCustomizer.base.includes('Matcha')) {
            layerCoffee.style.background = 'linear-gradient(to bottom, #5c7b39, #384e20)';
        } else if (cupCustomizer.base.includes('Turmeric')) {
            layerCoffee.style.background = 'linear-gradient(to bottom, #eab308, #ca8a04)';
        } else if (cupCustomizer.base.includes('Cold Brew')) {
            layerCoffee.style.background = 'linear-gradient(to bottom, #2b1a11, #0f0a07)';
        } else {
            layerCoffee.style.background = 'linear-gradient(to bottom, #4a2f1d, #21150f)';
        }
    }

    if (layerSyrup) {
        if (cupCustomizer.syrup === 'None') {
            layerSyrup.style.opacity = '0';
        } else if (cupCustomizer.syrup.includes('Caramel')) {
            layerSyrup.style.opacity = '0.9';
            layerSyrup.style.background = 'linear-gradient(90deg, #b45309, #d97724, #92400e)';
        } else {
            layerSyrup.style.opacity = '0.8';
            layerSyrup.style.background = 'linear-gradient(90deg, #c8883b, #d97724, #b85d38)';
        }
    }

    let sweetness = 30;
    let intensity = 75;
    let body = 65;
    let caffeine = 70;

    if (cupCustomizer.base.includes('Double Ristretto')) intensity = 95;
    if (cupCustomizer.base.includes('Cold Brew')) caffeine = 90;
    if (cupCustomizer.syrup !== 'None') sweetness += 45;
    if (cupCustomizer.milk.includes('Oatly') || cupCustomizer.milk.includes('Pistachio')) body += 20;

    setMeter('meterSweetness', sweetness);
    setMeter('meterIntensity', intensity);
    setMeter('meterBody', body);
    setMeter('meterCaffeine', caffeine);
}

function setMeter(id, val) {
    const elem = document.getElementById(id);
    if (elem) elem.style.width = `${Math.min(100, Math.max(10, val))}%`;
}

function addCustomCupToCart() {
    const totalPrice = cupCustomizer.basePrice + cupCustomizer.sizePrice + cupCustomizer.milkPrice + cupCustomizer.tempPrice + cupCustomizer.syrupPrice;
    const name = `Bespoke ${cupCustomizer.base} (${cupCustomizer.size})`;
    const specs = `${cupCustomizer.milk} · ${cupCustomizer.temp} · ${cupCustomizer.syrup}`;
    addToCart(name, totalPrice, specs, 'custom-studio-' + Date.now());
}

// =============================================================================
// 6. MENU RENDERING & FILTERING
// =============================================================================

function filterCategory(cat, btnElem) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');
    renderMenuGrid();
}

function searchMenu(query) {
    currentSearchQuery = query.toLowerCase().trim();
    renderMenuGrid();
}

function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const filtered = MENU_ITEMS.filter(item => {
        const matchesCat = (currentCategory === 'all') || (item.category === currentCategory);
        const matchesQuery = !currentSearchQuery || 
            item.name.toLowerCase().includes(currentSearchQuery) || 
            item.description.toLowerCase().includes(currentSearchQuery) ||
            item.tags.some(t => t.toLowerCase().includes(currentSearchQuery));
        return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding: 50px 20px; color:var(--text-muted);"><p style="font-size:2rem;">☕</p><p>No coffees found matching your search.</p></div>';
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="menu-card">
            <div>
                <div class="menu-card-top">
                    <div class="item-title-group">
                        <div class="item-category-tag">${item.category}</div>
                        <h3>${item.name}</h3>
                    </div>
                    <div class="item-price">₹${item.price}</div>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-tags-row">
                    ${item.tags.map(t => `<span class="item-tag">${t}</span>`).join('')}
                    ${item.isOriginal ? `<span class="item-tag" style="background:var(--accent-caramel); color:#ffffff;">★ Classic</span>` : ''}
                </div>
            </div>
            <div class="item-card-actions">
                <span style="font-size:0.8rem; color:var(--text-muted);">Freshly extracted</span>
                <button class="btn-add-cart" onclick="addToCart('${item.name}', ${item.price}, '${item.tags[0]}', '${item.id}')">
                    Add to Bag +
                </button>
            </div>
        </div>
    `).join('');
}

// =============================================================================
// 7. SECRET BARISTA VAULT
// =============================================================================

function openVaultModal() {
    const modal = document.getElementById('vaultModal');
    if (modal) {
        modal.classList.add('open');
        renderVaultItems();
    }
}

function closeVaultModal() {
    const modal = document.getElementById('vaultModal');
    if (modal) modal.classList.remove('open');
}

function renderVaultItems() {
    const list = document.getElementById('vaultList');
    if (!list) return;

    list.innerHTML = SECRET_VAULT_ITEMS.map(item => `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); padding:20px; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; gap:16px;">
            <div>
                <span style="font-size:0.72rem; color:var(--accent-caramel); font-weight:700; text-transform:uppercase;">${item.tag}</span>
                <h4 style="font-size:1.15rem; margin:2px 0 6px;">${item.name}</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); max-width:320px;">${item.description}</p>
            </div>
            <div style="text-align:right;">
                <div style="font-family:var(--font-accent); font-size:1.3rem; font-weight:800; margin-bottom:8px;">₹${item.price}</div>
                <button class="btn-primary" style="padding:8px 18px; font-size:0.82rem;" onclick="addToCart('${item.name}', ${item.price}, 'Secret Vault Spec', '${item.id}'); closeVaultModal();">
                    Order Secret Brew
                </button>
            </div>
        </div>
    `).join('');
}

// =============================================================================
// 8. TABLE RESERVATIONS (Connected to REST API)
// =============================================================================

async function handleReservation(event) {
    event.preventDefault();
    const guests = document.getElementById('resGuests').value;
    const area = document.getElementById('resArea').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const name = document.getElementById('resName').value;
    const phone = document.getElementById('resPhone').value;

    const payload = { name, phone, guests, area, date, time };
    let ref = 'RES-' + Math.floor(1000 + Math.random() * 9000);

    try {
        const res = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success && data.reservation) {
            ref = data.reservation.id;
        }
    } catch (err) {
        console.warn('Backend offline, reserved locally:', err);
    }

    showToast(`✨ Reserved! Reference: ${ref} for ${name} (${guests}, ${area})`);
    document.getElementById('reservationForm').reset();
}

// =============================================================================
// 9. NOTES FROM THE CORNER TABLE (REST API Persistent Guestbook)
// =============================================================================

async function loadGuestNotes() {
    try {
        const res = await fetch('/api/guestbook');
        const data = await res.json();
        if (data.success && Array.isArray(data.notes)) {
            guestNotes = data.notes;
            renderGuestbook();
            return;
        }
    } catch (err) {
        console.warn('Using local guest notes:', err);
    }
    renderGuestbook();
}

function renderGuestbook() {
    const container = document.getElementById('guestbookGrid');
    if (!container) return;

    container.innerHTML = guestNotes.map((n, idx) => `
        <div class="note-card">
            <p class="note-text">${n.text}</p>
            <div class="note-footer">
                <span class="note-author">${n.author}</span>
                <button class="like-btn" onclick="likeNote(${n.id || idx})">
                    ❤️ <span>${n.likes}</span>
                </button>
            </div>
        </div>
    `).join('');
}

async function likeNote(noteId) {
    try {
        const res = await fetch(`/api/guestbook/${noteId}/like`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            const note = guestNotes.find(n => n.id === noteId);
            if (note) note.likes = data.likes;
            renderGuestbook();
            return;
        }
    } catch (err) {
        console.warn('Like note local fallback:', err);
    }

    const note = guestNotes.find(n => n.id === noteId);
    if (note) {
        note.likes += 1;
        renderGuestbook();
    }
}

async function addGuestNote(event) {
    event.preventDefault();
    const textInput = document.getElementById('newNoteText');
    const authorInput = document.getElementById('newNoteAuthor');

    if (!textInput || !authorInput) return;
    const text = textInput.value.trim();
    const author = authorInput.value.trim() || 'Anonymous Coffee Lover';

    if (!text) return;

    try {
        const res = await fetch('/api/guestbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, author })
        });
        const data = await res.json();
        if (data.success && data.note) {
            guestNotes.unshift(data.note);
            textInput.value = '';
            authorInput.value = '';
            renderGuestbook();
            showToast('📝 Note pinned to the Corner Table board!');
            return;
        }
    } catch (err) {
        console.warn('Save note local fallback:', err);
    }

    guestNotes.unshift({
        id: Date.now(),
        text: `"${text}"`,
        author: `${author} — Guest`,
        likes: 1
    });

    textInput.value = '';
    authorInput.value = '';
    renderGuestbook();
    showToast('📝 Note pinned to the Corner Table board!');
}

// =============================================================================
// 10. THEME TOGGLE & TOAST SYSTEM
// =============================================================================

function initTheme() {
    const savedTheme = localStorage.getItem('bb_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bb_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(newTheme === 'dark' ? '🌙 Switched to Midnight Roastery' : '☀️ Switched to Morning Roast');
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('title', theme === 'dark' ? 'Switch to Morning Light' : 'Switch to Midnight Roastery');
    }
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>☕</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// =============================================================================
// INITIALIZATION ON DOM READY
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartUI();
    renderMenuGrid();
    selectMood('focus');
    renderStudioPreview();
    loadGuestNotes();

    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
});
