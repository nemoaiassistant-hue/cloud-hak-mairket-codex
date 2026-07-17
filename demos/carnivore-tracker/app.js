// ============================================================
// CARNIVORE RESET — 30 Day Tracker App
// ============================================================

// ===== STORAGE KEYS =====
const SK_START = 'carn_start_date';
const SK_CHECKINS = 'carn_checkins';
const SK_WATER = 'carn_water';
const SK_PHOTOS = 'carn_photos';
const SK_REFLECTIONS = 'carn_reflections';
const SK_SHOPPING = 'carn_shopping';

// ===== DATA =====
const DAILY_TIPS = [
    "Let's go! Day 1. Take a starting photo and weigh yourself. This is the beginning of something great.",
    "Day 2. Your body is starting to adapt. Drink plenty of water and add salt to your food.",
    "Day 3. The hardest day for many. Headaches and cravings are NORMAL. Push through — you've got this.",
    "Day 4. Still adapting? Eat MORE fat. Butter on everything. Your body needs energy as it switches to fat-burning.",
    "Day 5. Almost through the worst of it. Most people start feeling better tomorrow. Keep going!",
    "Day 6. Energy should start improving. Notice how you're not snacking between meals? That's fat keeping you full.",
    "Day 7. One week down! Take a photo. How do your clothes feel compared to day 1?",
    "Day 8. Week 2 begins. This is where momentum builds. You've proven you can do it.",
    "Day 9. Mental clarity kicking in? Most people report sharper focus by week 2.",
    "Day 10. A third of the way through. Reflect on why you started. Your family is counting on you.",
    "Day 11. Notice reduced bloating? Sugar cravings fading? These are wins. Celebrate them.",
    "Day 12. Getting into the rhythm now. Food is fuel. Your body is running cleaner than ever.",
    "Day 13. Almost halfway. Take a moment to appreciate the discipline you're building.",
    "Day 14. Two weeks! Take a photo. Compare it to day 1. The mirror doesn't lie.",
    "Day 15. Halfway point. You're crushing this. Energy levels should be higher than before you started.",
    "Day 16. Past the halfway mark. The rest is downhill from here.",
    "Day 17. Your taste buds are resetting. Food tastes different now — richer, more satisfying.",
    "Day 18. You've built a habit. This isn't a diet anymore — it's just how you eat.",
    "Day 19. Think about what you'll eat after the 30 days. Plan your transition now.",
    "Day 20. Two-thirds done. You're going to finish this. No doubt about it.",
    "Day 21. Three weeks. Research says it takes 21 days to build a habit. You've done it.",
    "Day 22. Home stretch. The finish line is in sight. Stay sharp.",
    "Day 23. How's your sleep? Most people report deeper, more restful sleep on carnivore.",
    "Day 24. You're doing something most people can't. That discipline carries into everything else.",
    "Day 25. Five days left. Think about how far you've come. Day 1 you would be proud.",
    "Day 26. Start planning your post-carnivore meals. Transition slowly — add vegetables first.",
    "Day 27. Three days left. Take a photo. The transformation is real.",
    "Day 28. Almost there. Reflect on everything you've learned about your body.",
    "Day 29. One more day. You've built discipline that will last a lifetime.",
    "Day 30. YOU DID IT. Take your final photo and weight. Compare day 1 to day 30. Be proud."
];

const MEALS = [
    { day: 'Day 1 — Steak Day', badge: '1', meals: [
        { label: 'Breakfast', food: '3 eggs fried in butter, 2 rashers bacon, cheese on top', portion: '3 eggs, 2 bacon, 40g cheese' },
        { label: 'Lunch', food: 'Beef mince fried with butter, cheddar cheese melted on top', portion: '250g mince, 50g cheese' },
        { label: 'Dinner', food: 'Ribeye steak (thick cut) cooked in butter, side of scrambled eggs', portion: '300g steak, 2 eggs' },
        { label: 'Snack', food: 'Handful of cheese cubes or 2 hard boiled eggs', portion: 'As needed' },
    ]},
    { day: 'Day 2 — Chicken Day', badge: '2', meals: [
        { label: 'Breakfast', food: 'Omelette with cheese and butter, 4 eggs', portion: '4 eggs, 40g cheese' },
        { label: 'Lunch', food: 'Chicken thighs (skin on) roasted in butter, with cheese', portion: '3 thighs, 40g cheese' },
        { label: 'Dinner', food: 'Chicken breast pan-fried in butter, cream sauce (cream + butter)', portion: '250g chicken, 50ml cream' },
        { label: 'Snack', food: 'Cheese slices or chicken cold cuts', portion: 'As needed' },
    ]},
    { day: 'Day 3 — Fish Day', badge: '3', meals: [
        { label: 'Breakfast', food: 'Smoked salmon with cream cheese, 2 soft boiled eggs', portion: '100g salmon, 50g cream cheese' },
        { label: 'Lunch', food: 'Salmon fillets pan-fried in butter, side of prawns', portion: '200g salmon, 100g prawns' },
        { label: 'Dinner', food: 'White fish (cod/haddock) baked with butter, cheese topping', portion: '250g fish, 50g cheese' },
        { label: 'Snack', food: 'Tinned fish (mackerel/sardines) or cheese', portion: '1 tin or 40g cheese' },
    ]},
    { day: 'Day 4 — Pork Day', badge: '4', meals: [
        { label: 'Breakfast', food: 'Pork sausages (high meat content) with fried eggs', portion: '3 sausages, 2 eggs' },
        { label: 'Lunch', food: 'Pork belly slices pan-fried, cheddar on the side', portion: '250g pork, 40g cheese' },
        { label: 'Dinner', food: 'Pork chops (bone in) cooked in butter, scrambled eggs', portion: '2 chops, 2 eggs' },
        { label: 'Snack', food: 'Pork rinds / crackling or cheese cubes', portion: 'As needed' },
    ]},
    { day: 'Day 5 — Egg Day', badge: '5', meals: [
        { label: 'Breakfast', food: 'Scrambled eggs (4) with lots of butter and cheese', portion: '4 eggs, 30g cheese, 20g butter' },
        { label: 'Lunch', food: 'Egg salad — chopped boiled eggs mixed with butter', portion: '4 eggs, 20g butter' },
        { label: 'Dinner', food: 'Beef burgers (no bun) with cheese, fried egg on top', portion: '2 patties, cheese, 1 egg' },
        { label: 'Snack', food: 'Devilled eggs or cheese slices', portion: '2-3 eggs or 40g cheese' },
    ]},
    { day: 'Day 6 — Lamb Day', badge: '6', meals: [
        { label: 'Breakfast', food: 'Lamb chops with fried eggs, butter on everything', portion: '2 chops, 2 eggs' },
        { label: 'Lunch', food: 'Lamb mince kebab style — seasoned and pan-fried in butter', portion: '250g mince' },
        { label: 'Dinner', food: 'Leg of lamb roast (or shoulder), served with eggs', portion: '300g lamb, 2 eggs' },
        { label: 'Snack', food: 'Cheese or leftover lamb cold cuts', portion: 'As needed' },
    ]},
    { day: 'Day 7 — Mixed Day', badge: '7', meals: [
        { label: 'Breakfast', food: 'Full carnivore fry-up: bacon, eggs, sausage, cheese', portion: '2 bacon, 2 eggs, 1 sausage, cheese' },
        { label: 'Lunch', food: 'Tin of tuna mixed with cream cheese and butter', portion: '1 tin tuna, 50g cream cheese' },
        { label: 'Dinner', food: 'Steak and prawns pan-fried together in garlic butter', portion: '200g steak, 100g prawns' },
        { label: 'Snack', food: 'Cheese board — mix of whatever cheese you have', portion: '60-80g cheese' },
    ]},
];

const CAN_EAT = [
    '🥩 Beef, lamb, pork, chicken, turkey',
    '🐟 Fish and seafood (salmon, prawns, cod)',
    '🥚 Eggs (any style)',
    '🧈 Butter and ghee (cook everything in it)',
    '🧀 Hard cheese (cheddar, parmesan, gouda)',
    '🥛 Cream and double cream (in coffee, on food)',
    '🥓 Bacon and sausages (check ingredients — no fillers)',
    '🫀 Organ meats (liver once a week)',
    '🍲 Bone broth',
];

const CANNOT_EAT = [
    '🍞 Bread, rice, pasta, potatoes',
    '🍫 Sugar, sweets, chocolate, cake',
    '🍎 Fruit and vegetables',
    '🥤 Fizzy drinks and fruit juice',
    '🥛 Milk (too much lactose/sugar)',
    '🧀 Soft cheese (brie, mozzarella — high lactose)',
    '🥜 Nuts, seeds, grains, legumes',
    '🍺 Alcohol',
    '🥫 Sauces and condiments (ketchup, mayo)',
];

const DRINKS = [
    '💧 Water — aim for 3 litres per day',
    '☕ Black coffee or coffee with cream (no sugar)',
    '🍵 Tea — black tea, green tea (no milk, no sugar)',
    '🫧 Sparkling water (plain, no flavours)',
];

const REFLECTION_PROMPTS = [
    { week: 'Week 1', prompt: 'Hardest week. How did the transition feel? What was the toughest moment? Did you have any cravings?' },
    { week: 'Week 2', prompt: 'Energy should be improving. Notice any changes in the mirror? How are clothes fitting? Mood compared to week 1?' },
    { week: 'Week 3', prompt: 'Momentum phase. Weight trend going the right direction? Energy levels compared to before you started? Foods you are enjoying?' },
    { week: 'Week 4 (Final)', prompt: 'Reflection time. Compare day 1 photo to day 30. Compare weight. How do you FEEL vs 30 days ago? What will you eat after?' },
];

const SUPP_ESSENTIAL = [
    { name: 'Electrolyte Powder (Sodium + Potassium + Magnesium)', detail: '1-2 servings/day. Prevents headaches, fatigue, cramps. THE most important supplement.' },
    { name: 'Magnesium (Glycinate or Citrate)', detail: '200-400mg before bed. Sleep quality, muscle recovery.' },
];

const SUPP_RECOMMENDED = [
    { name: 'Omega-3 / Fish Oil', detail: 'If not eating fatty fish (salmon, mackerel) regularly. Reduces inflammation.' },
    { name: 'Vitamin D3', detail: '2000-4000 IU/day. Most UK residents are deficient. Energy, mood, immune.' },
    { name: 'Vitamin C (small dose)', detail: '500mg. Insurance policy — controversial on carnivore but won\'t hurt.' },
];

const SUPP_DONTNEED = [
    { name: 'Multivitamins', detail: 'Plant-based fillers. You get nutrients from meat.' },
    { name: 'Iron', detail: 'Red meat is packed with iron already.' },
    { name: 'B Vitamins', detail: 'Eggs and meat have plenty.' },
    { name: 'Calcium', detail: 'Hard cheese covers this.' },
];

const SHOPPING_LIST = [
    { category: 'Meat', items: [
        'Beef mince (1kg)',
        'Steak x2 (ribeye or sirloin)',
        'Pork chops x4',
        'Chicken thighs (pack of 8)',
        'Chicken breast (500g)',
        'Lamb chops x4',
        'Sausages x6 (high meat %)',
        'Bacon (1 pack)',
        'Burgers x4 (no bun)',
        'Pork belly (500g)',
    ]},
    { category: 'Fish', items: [
        'Salmon fillets x4',
        'White fish — cod/haddock (500g)',
        'Prawns (200g)',
        'Smoked salmon (1 pack)',
        'Tinned mackerel or sardines x2',
    ]},
    { category: 'Eggs', items: [
        '3 dozen large eggs',
    ]},
    { category: 'Dairy', items: [
        'Butter (500g)',
        'Cheddar cheese (500g block)',
        'Parmesan (1 block)',
        'Cream cheese (200g)',
        'Double cream (500ml)',
    ]},
    { category: 'Supplements', items: [
        'Electrolyte powder or LMNT',
        'Magnesium (glycinate or citrate)',
        'Omega-3 / Fish oil',
        'Vitamin D3',
    ]},
    { category: 'Other', items: [
        'Salt (Himalayan or sea salt)',
        'Black pepper',
        'Garlic (optional, for flavour)',
    ]},
];

// ===== STATE =====
let state = {
    startDate: null,
    checkins: {},
    water: {},
    photos: [],
    reflections: {},
    currentEnergy: null,
    currentMood: null,
};

// ===== INIT =====
function init() {
    loadState();
    renderHome();
    renderMeals();
    renderRules();
    renderWaterGlasses();
    renderReflections();
    renderSupplements();
    renderShopping();
    setupCheckinForm();
    setupPhotoInput();

    // Check if first visit — show welcome overlay instead of blocking confirm()
    if (!state.startDate) {
        showWelcomeOverlay();
    }
}

// ===== STORAGE =====
function loadState() {
    state.startDate = localStorage.getItem(SK_START);
    try { state.checkins = JSON.parse(localStorage.getItem(SK_CHECKINS) || '{}'); } catch(e) { state.checkins = {}; }
    try { state.water = JSON.parse(localStorage.getItem(SK_WATER) || '{}'); } catch(e) { state.water = {}; }
    try { state.photos = JSON.parse(localStorage.getItem(SK_PHOTOS) || '[]'); } catch(e) { state.photos = []; }
    try { state.reflections = JSON.parse(localStorage.getItem(SK_REFLECTIONS) || '{}'); } catch(e) { state.reflections = {}; }
    try { state.shopping = JSON.parse(localStorage.getItem(SK_SHOPPING) || '{}'); } catch(e) { state.shopping = {}; }
}

function saveState() {
    if (state.startDate) localStorage.setItem(SK_START, state.startDate);
    localStorage.setItem(SK_CHECKINS, JSON.stringify(state.checkins));
    localStorage.setItem(SK_WATER, JSON.stringify(state.water));
    localStorage.setItem(SK_PHOTOS, JSON.stringify(state.photos));
    localStorage.setItem(SK_REFLECTIONS, JSON.stringify(state.reflections));
    localStorage.setItem(SK_SHOPPING, JSON.stringify(state.shopping));
}

// ===== DAY LOGIC =====
function getCurrentDay() {
    if (!state.startDate) return 1;
    const start = new Date(state.startDate);
    const now = new Date();
    const diffMs = now - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(30, diffDays));
}

function getTodayKey() {
    return new Date().toDateString();
}

function getDayKey(dayNum) {
    if (!state.startDate) return getTodayKey();
    const start = new Date(state.startDate);
    start.setDate(start.getDate() + dayNum - 1);
    return start.toDateString();
}

// ===== NAVIGATION =====
function navTo(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // Update bottom nav
    const navMap = { home: 0, checkin: 1, progress: 2, meals: 3, rules: 4 };
    const navBtns = document.querySelectorAll('.nav-btn');
    if (navMap[view] !== undefined && navBtns[navMap[view]]) {
        navBtns[navMap[view]].classList.add('active');
    }

    // Refresh views on navigation
    if (view === 'home') renderHome();
    if (view === 'progress') renderCharts();
    if (view === 'checkin') loadCheckinForm();
    if (view === 'photos') renderPhotos();

    window.scrollTo(0, 0);
}

// ===== HOME RENDER =====
function renderHome() {
    const day = getCurrentDay();

    document.getElementById('dayNumber').textContent = day;
    document.getElementById('daySub').textContent = day >= 30 ? 'COMPLETE!' : `of 30`;
    document.getElementById('dayProgress').querySelector('.progress-fill').style.width = `${(day / 30) * 100}%`;

    // Streak
    let streak = 0;
    for (let i = 0; i < 30; i++) {
        const key = getDayKey(getCurrentDay() - i);
        if (state.checkins[key]) streak++;
        else if (i > 0) break;
    }
    document.getElementById('streakNum').textContent = streak;

    // Weight diff
    const firstCheckin = Object.values(state.checkins).find(c => c.weight);
    const todayCheckin = state.checkins[getTodayKey()];
    if (firstCheckin && firstCheckin.weight && todayCheckin && todayCheckin.weight) {
        const diff = todayCheckin.weight - firstCheckin.weight;
        const sign = diff <= 0 ? '' : '+';
        document.getElementById('weightDiff').textContent = `${sign}${diff.toFixed(1)}kg`;
        document.getElementById('weightDiff').style.color = diff <= 0 ? 'var(--green)' : 'var(--red)';
    }

    // Checkin count
    document.getElementById('checkinCount').textContent = Object.keys(state.checkins).length;

    // Daily tip
    const tipIdx = Math.min(day - 1, 29);
    document.querySelector('.tip-text').textContent = DAILY_TIPS[tipIdx];

    // Water count
    const todayWater = state.water[getTodayKey()] || 0;
    document.getElementById('waterCount').textContent = todayWater;

    // Start date
    if (state.startDate) {
        const d = new Date(state.startDate);
        document.getElementById('startDateInfo').textContent = `Started ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · Day ${day} of 30`;
    }

    renderWaterGlasses();
}

// ===== WATER TRACKER =====
function renderWaterGlasses() {
    const container = document.getElementById('waterGlasses');
    if (!container) return;
    const count = state.water[getTodayKey()] || 0;
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const glass = document.createElement('div');
        glass.className = 'glass' + (i < count ? ' filled' : '');
        glass.textContent = '💧';
        glass.onclick = () => {
            if (i + 1 <= count) {
                state.water[getTodayKey()] = i;
            } else {
                state.water[getTodayKey()] = i + 1;
            }
            saveState();
            renderWaterGlasses();
            document.getElementById('waterCount').textContent = state.water[getTodayKey()] || 0;
        };
        container.appendChild(glass);
    }
}

function addWater() {
    const today = getTodayKey();
    const current = state.water[today] || 0;
    if (current < 8) {
        state.water[today] = current + 1;
        saveState();
        renderWaterGlasses();
        document.getElementById('waterCount').textContent = state.water[today];
    }
}

// ===== CHECK-IN =====
function setupCheckinForm() {
    document.querySelectorAll('#ratingEnergy .rate-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#ratingEnergy .rate-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentEnergy = parseInt(btn.dataset.val);
        };
    });
    document.querySelectorAll('#ratingMood .rate-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#ratingMood .rate-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentMood = parseInt(btn.dataset.val);
        };
    });
}

function loadCheckinForm() {
    const day = getCurrentDay();
    document.getElementById('checkinDayLabel').textContent = `Day ${day}`;

    const existing = state.checkins[getTodayKey()];
    if (existing) {
        document.getElementById('inputWeight').value = existing.weight || '';
        document.getElementById('inputMeals').value = existing.meals || '';
        document.getElementById('inputNotes').value = existing.notes || '';

        if (existing.energy) {
            state.currentEnergy = existing.energy;
            document.querySelectorAll('#ratingEnergy .rate-btn').forEach(b => {
                b.classList.toggle('active', parseInt(b.dataset.val) === existing.energy);
            });
        }
        if (existing.mood) {
            state.currentMood = existing.mood;
            document.querySelectorAll('#ratingMood .rate-btn').forEach(b => {
                b.classList.toggle('active', parseInt(b.dataset.val) === existing.mood);
            });
        }
    }
}

function saveCheckin() {
    const weight = parseFloat(document.getElementById('inputWeight').value);
    const meals = document.getElementById('inputMeals').value;
    const notes = document.getElementById('inputNotes').value;

    state.checkins[getTodayKey()] = {
        day: getCurrentDay(),
        weight: weight || null,
        energy: state.currentEnergy,
        mood: state.currentMood,
        meals: meals,
        notes: notes,
        timestamp: Date.now(),
    };
    saveState();

    const msg = document.getElementById('saveMsg');
    msg.textContent = '✅ Check-in saved! Keep going.';
    setTimeout(() => { msg.textContent = ''; }, 3000);

    renderHome();
}

// ===== MEALS =====
function renderMeals() {
    const container = document.getElementById('mealContainer');
    if (!container) return;
    container.innerHTML = '';
    MEALS.forEach(dayData => {
        const card = document.createElement('div');
        card.className = 'meal-day';
        card.innerHTML = `
            <div class="meal-day-title">
                <span>${dayData.day}</span>
                <span class="day-badge">DAY ${dayData.badge}</span>
            </div>
            ${dayData.meals.map(m => `
                <div class="meal-row">
                    <div class="meal-label">${m.label}</div>
                    <div class="meal-food">${m.food}</div>
                    <div class="meal-portion">${m.portion}</div>
                </div>
            `).join('')}
        `;
        container.appendChild(card);
    });
}

// ===== RULES =====
function renderRules() {
    const canList = document.getElementById('canEatList');
    const cantList = document.getElementById('cannotEatList');
    const drinkList = document.getElementById('drinkList');
    if (canList) canList.innerHTML = `<div class="rules-body">${CAN_EAT.map(i => `<div class="rule-item">${i}</div>`).join('')}</div>`;
    if (cantList) cantList.innerHTML = `<div class="rules-body">${CANNOT_EAT.map(i => `<div class="rule-item">${i}</div>`).join('')}</div>`;
    if (drinkList) drinkList.innerHTML = `<div class="rules-body">${DRINKS.map(i => `<div class="rule-item">${i}</div>`).join('')}</div>`;
}

// ===== CHARTS =====
function renderCharts() {
    const entries = Object.entries(state.checkins)
        .map(([date, data]) => ({ date: new Date(date), ...data }))
        .filter(e => e.day)
        .sort((a, b) => a.date - b.date);

    // Weight chart
    const weightData = entries.filter(e => e.weight);
    drawLineChart('weightChart', weightData.map(e => e.day), weightData.map(e => e.weight), '#1a6fb5', 'weightEmpty', 'kg');

    // Energy chart
    const energyData = entries.filter(e => e.energy);
    drawLineChart('energyChart', energyData.map(e => e.day), energyData.map(e => e.energy), '#e8c170', 'energyEmpty', '/10');

    // Mood chart
    const moodData = entries.filter(e => e.mood);
    drawLineChart('moodChart', moodData.map(e => e.day), moodData.map(e => e.mood), '#22a06b', 'moodEmpty', '/10');
}

function drawLineChart(canvasId, labels, data, colour, emptyId, unit) {
    const canvas = document.getElementById(canvasId);
    const emptyMsg = document.getElementById(emptyId);

    if (!canvas) return;

    if (data.length < 1) {
        canvas.style.display = 'none';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    canvas.style.display = 'block';
    if (emptyMsg) emptyMsg.style.display = 'none';

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0a0e14';
    ctx.fillRect(0, 0, w, h);

    // Padding
    const padL = 45, padR = 15, padT = 15, padB = 30;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Min/max
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;
    const yMin = minVal - range * 0.15;
    const yMax = maxVal + range * 0.15;
    const yRange = yMax - yMin || 1;

    // Grid lines
    ctx.strokeStyle = '#1c2330';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padT + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(w - padR, y);
        ctx.stroke();

        // Y labels
        const val = yMax - (yRange / 4) * i;
        ctx.fillStyle = '#7a8595';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1), padL - 5, y + 3);
    }

    // X axis labels (days)
    const xStep = labels.length > 1 ? chartW / (labels.length - 1) : 0;
    ctx.fillStyle = '#7a8595';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    // Show every Nth label depending on data count
    const labelStep = Math.ceil(labels.length / 8);
    labels.forEach((label, i) => {
        if (i % labelStep === 0 || i === labels.length - 1) {
            const x = padL + xStep * i;
            ctx.fillText('D' + label, x, h - 12);
        }
    });

    // Draw line
    ctx.strokeStyle = colour;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padL + xStep * i;
        const y = padT + chartH - ((val - yMin) / yRange) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill area under line
    ctx.lineTo(padL + xStep * (data.length - 1), padT + chartH);
    ctx.lineTo(padL, padT + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, colour + '40');
    grad.addColorStop(1, colour + '05');
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw points
    data.forEach((val, i) => {
        const x = padL + xStep * i;
        const y = padT + chartH - ((val - yMin) / yRange) * chartH;
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0a0e14';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    // Show last value
    const lastVal = data[data.length - 1];
    const lastX = padL + xStep * (data.length - 1);
    const lastY = padT + chartH - ((lastVal - yMin) / yRange) * chartH;
    ctx.fillStyle = colour;
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(lastVal.toFixed(1) + unit, lastX + 8, lastY - 5);
}

// ===== PHOTOS =====
function setupPhotoInput() {
    const input = document.getElementById('photoInput');
    if (input) {
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            // Compress the image before storing to avoid localStorage overflow
            try {
                const compressed = await compressImage(file, 800, 0.7);
                state.photos.push({
                    day: getCurrentDay(),
                    date: Date.now(),
                    image: compressed,
                });
                saveState();
                // Check if save actually worked (localStorage not full)
                if (!localStorage.getItem(SK_PHOTOS)) {
                    alert('Storage is full! Deleting oldest photo to make room.');
                    state.photos.shift();
                    saveState();
                }
                renderPhotos();
            } catch (err) {
                alert('Could not save photo. Please try a smaller image.');
            }
            e.target.value = '';
        };
    }
}

// Compress image using canvas - resize + quality reduction
function compressImage(file, maxSize, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                // Resize if larger than maxSize while keeping aspect ratio
                if (width > height) {
                    if (width > maxSize) {
                        height = Math.round((height * maxSize) / width);
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = Math.round((width * maxSize) / height);
                        height = maxSize;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
            img.src = ev.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function addPhoto() {
    document.getElementById('photoInput').click();
}

function renderPhotos() {
    const grid = document.getElementById('photoGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (state.photos.length === 0) {
        grid.innerHTML = '<div style="text-align:center;color:var(--text-dim);padding:30px;font-size:0.9rem;">No photos yet. Add your Day 1 photo to get started!</div>';
        return;
    }

    state.photos.forEach((photo, idx) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        const date = new Date(photo.date);
        card.innerHTML = `
            <div class="photo-header">
                <span>Day ${photo.day} — ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                <button class="photo-delete" onclick="deletePhoto(${idx})">✕</button>
            </div>
            <img src="${photo.image}" class="photo-img" alt="Day ${photo.day}">
        `;
        grid.appendChild(card);
    });
}

function deletePhoto(idx) {
    if (confirm('Delete this photo?')) {
        state.photos.splice(idx, 1);
        saveState();
        renderPhotos();
    }
}

// ===== REFLECTIONS =====
function renderReflections() {
    const container = document.getElementById('reflectionContainer');
    if (!container) return;
    container.innerHTML = '';

    REFLECTION_PROMPTS.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'reflection-card';
        const saved = state.reflections['week' + idx] || '';
        card.innerHTML = `
            <div class="reflection-week">${item.week}</div>
            <div class="reflection-prompt">${item.prompt}</div>
            <textarea class="reflection-input" id="reflect${idx}" placeholder="Write your reflection here...">${saved}</textarea>
            <div class="reflection-saved" id="reflectSaved${idx}"></div>
        `;
        container.appendChild(card);

        // Auto-save on input
        const textarea = card.querySelector('textarea');
        textarea.addEventListener('input', () => {
            state.reflections['week' + idx] = textarea.value;
            saveState();
            const savedMsg = document.getElementById('reflectSaved' + idx);
            savedMsg.textContent = '✓ Saved';
            clearTimeout(textarea._saveTimer);
            textarea._saveTimer = setTimeout(() => { savedMsg.textContent = ''; }, 1500);
        });
    });
}

// ===== SUPPLEMENTS =====
function renderSupplements() {
    const essEl = document.getElementById('suppEssential');
    const recEl = document.getElementById('suppRecommended');
    const dontEl = document.getElementById('suppDontNeed');

    if (essEl) essEl.innerHTML = `<div class="rules-body">${SUPP_ESSENTIAL.map(s => `<div class="rule-item"><div><div style="font-weight:600">${s.name}</div><div style="font-size:0.8rem;color:var(--text-dim);margin-top:2px">${s.detail}</div></div></div>`).join('')}</div>`;

    if (recEl) recEl.innerHTML = `<div class="rules-body">${SUPP_RECOMMENDED.map(s => `<div class="rule-item"><div><div style="font-weight:600">${s.name}</div><div style="font-size:0.8rem;color:var(--text-dim);margin-top:2px">${s.detail}</div></div></div>`).join('')}</div>`;

    if (dontEl) dontEl.innerHTML = `<div class="rules-body">${SUPP_DONTNEED.map(s => `<div class="rule-item"><div><div style="font-weight:600">${s.name}</div><div style="font-size:0.8rem;color:var(--text-dim);margin-top:2px">${s.detail}</div></div></div>`).join('')}</div>`;
}

// ===== SHOPPING LIST =====
function renderShopping() {
    const container = document.getElementById('shoppingContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!state.shopping) state.shopping = {};

    SHOPPING_LIST.forEach(section => {
        const title = document.createElement('div');
        title.className = 'shop-section-title';
        title.textContent = section.category;
        container.appendChild(title);

        section.items.forEach(item => {
            const key = section.category + '::' + item;
            const isChecked = state.shopping[key];

            const el = document.createElement('div');
            el.className = 'shop-item' + (isChecked ? ' checked' : '');
            el.innerHTML = `
                <div class="shop-checkbox">${isChecked ? '✓' : ''}</div>
                <div class="shop-label">${item}</div>
            `;
            el.onclick = () => {
                state.shopping[key] = !state.shopping[key];
                saveState();
                renderShopping();
            };
            container.appendChild(el);
        });
    });
}

function resetShopping() {
    if (confirm('Clear all checkmarks? Your list will reset for a new shop.')) {
        state.shopping = {};
        saveState();
        renderShopping();
    }
}

// ===== EXPORT PROGRESS =====
function exportProgress() {
    const entries = Object.values(state.checkins).filter(c => c.day).sort((a, b) => a.day - b.day);
    const first = entries[0];
    const latest = entries[entries.length - 1];

    let summary = '🥩 CARNIVORE RESET — PROGRESS\n';
    summary += '━━━━━━━━━━━━━━━━━━━━━\n';
    summary += `Day: ${getCurrentDay()} of 30\n`;
    summary += `Check-ins: ${entries.length}\n`;

    if (first && latest && first.weight && latest.weight) {
        const diff = latest.weight - first.weight;
        summary += `Start weight: ${first.weight}kg\n`;
        summary += `Current weight: ${latest.weight}kg\n`;
        summary += `Change: ${diff.toFixed(1)}kg ${diff <= 0 ? '✅' : '⬆️'}\n`;
    }

    if (latest) {
        summary += `Energy: ${latest.energy || '-'}/10\n`;
        summary += `Mood: ${latest.mood || '-'}/10\n`;
    }

    const avgEnergy = entries.filter(e => e.energy).map(e => e.energy);
    if (avgEnergy.length) {
        const avg = avgEnergy.reduce((a, b) => a + b, 0) / avgEnergy.length;
        summary += `Avg energy: ${avg.toFixed(1)}/10\n`;
    }

    const avgMood = entries.filter(e => e.mood).map(e => e.mood);
    if (avgMood.length) {
        const avg = avgMood.reduce((a, b) => a + b, 0) / avgMood.length;
        summary += `Avg mood: ${avg.toFixed(1)}/10\n`;
    }

    summary += '━━━━━━━━━━━━━━━━━━━━━\n';

    // Copy to clipboard
    navigator.clipboard.writeText(summary).then(() => {
        document.getElementById('exportMsg').textContent = '✅ Progress copied to clipboard! Paste anywhere to share.';
    }).catch(() => {
        document.getElementById('exportMsg').textContent = summary;
    });

    setTimeout(() => {
        const el = document.getElementById('exportMsg');
        if (el) el.textContent = '';
    }, 5000);
}

// ===== WELCOME OVERLAY =====
function showWelcomeOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'welcomeOverlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,14,20,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.innerHTML = `
        <div style="background:linear-gradient(135deg,#0f4c81 0%,#0a2e52 100%);border-radius:20px;padding:40px 30px;max-width:340px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
            <div style="font-size:3rem;margin-bottom:16px;">🥩</div>
            <div style="font-size:1.6rem;font-weight:900;color:#e8eef5;margin-bottom:8px;">30-Day Carnivore Reset</div>
            <div style="font-size:0.9rem;color:#7a8595;margin-bottom:24px;">Your personal weight loss tracker. Simple daily check-ins, meal plans, progress charts, and motivation — all in your pocket.</div>
            <button id="startBtn" style="width:100%;background:#e8c170;color:#0a2e52;border:none;border-radius:14px;padding:16px;font-size:1.1rem;font-weight:800;cursor:pointer;">Start Day 1 Today</button>
            <div style="font-size:0.75rem;color:#7a8595;margin-top:16px;">All data stays private on your device</div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('startBtn').onclick = () => {
        state.startDate = new Date().toDateString();
        saveState();
        overlay.remove();
        renderHome();
    };
}

// ===== RESET APP =====
function resetApp() {
    if (confirm('Reset everything? This will clear all your data and start fresh from Day 1.')) {
        localStorage.removeItem(SK_START);
        localStorage.removeItem(SK_CHECKINS);
        localStorage.removeItem(SK_WATER);
        localStorage.removeItem(SK_PHOTOS);
        localStorage.removeItem(SK_REFLECTIONS);
        localStorage.removeItem(SK_SHOPPING);
        state = {
            startDate: null,
            checkins: {},
            water: {},
            photos: [],
            reflections: {},
            shopping: {},
            currentEnergy: null,
            currentMood: null,
        };
        showWelcomeOverlay();
        navTo('home');
    }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);