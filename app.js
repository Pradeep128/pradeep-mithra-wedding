(() => {
  'use strict';

  const WEDDING_DATE = new Date('2026-11-22T10:30:00+05:30').getTime();
  const VENUE_ADDRESS = 'Anandha Inn, Sardar Vallabhbhai Patel Salai, Puducherry 605001';
  const VENUE_PHONE = '';

  const events = [
    { dd: '20', mon: 'NOV', name: 'Haldi', when: 'Friday · 9:00 AM · Home terrace', tag: 'AM', dress: 'yellow, cotton, washable', blurb: 'Turmeric, laughter, and a great deal of it on your clothes. Come in something you do not love too much.' },
    { dd: '20', mon: 'NOV', name: 'Mehendi', when: 'Friday · 4:00 PM · Garden lawn', tag: 'PM', dress: 'green & bright florals', blurb: 'Four artists, filter coffee, and enough time to get both hands done before dinner.' },
    { dd: '21', mon: 'NOV', name: 'Sangeet', when: 'Saturday · 7:00 PM · Grand Ballroom', tag: 'PM', dress: 'cocktail Indian, dancing shoes', blurb: 'The families have been rehearsing separately and competitively. Dinner follows the last performance.' },
    { dd: '22', mon: 'NOV', name: 'Muhurtham', when: 'Sunday · 10:30 AM · Anandha Inn', tag: 'AM', dress: 'silks and traditional', blurb: 'The ceremony begins promptly at the muhurtham. Please be seated by 10:15. Sadhya lunch to follow.' }
  ];

  const travel = [
    { mode: 'BY AIR', title: 'Chennai (MAA) — 150 km', detail: 'Pre-booked cabs run 3 hrs door to door. Tell us your flight and we will arrange a pickup.' },
    { mode: 'BY TRAIN', title: 'Puducherry station — 3 km', detail: 'Villupuram junction is the bigger railhead, 40 min away by road.' },
    { mode: 'ON THE DAY', title: 'Shuttle from hotels', detail: 'Buses leave both hotels at 9:30 AM on the 22nd.' }
  ];

  const stays = [
    { name: 'Anandha Inn Suites', note: 'At the venue. Walk downstairs to the mandapam.', rate: 'Wedding rate ₹4,200 · code PM22' },
    { name: 'Seaside Guest House', note: '1.2 km, on the Promenade.', rate: 'Wedding rate ₹2,800 · code PM22' }
  ];

  const hotelSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg>HOTEL';

  const state = {
    tab: 'home',
    name: '',
    attending: null,
    guests: 2,
    picked: {},
    note: '',
    sent: false
  };

  const $ = (sel) => document.querySelector(sel);
  const pad = (n) => String(n).padStart(2, '0');

  // ---------- Countdown ----------
  function tickCountdown() {
    const diff = Math.max(0, WEDDING_DATE - Date.now());
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;
    $('#cd-d').textContent = d;
    $('#cd-h').textContent = pad(h);
    $('#cd-m').textContent = pad(m);
    $('#cd-s').textContent = pad(s);
  }

  // ---------- Tabs ----------
  function renderTabs() {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      const isActive = btn.dataset.tab === state.tab;
      btn.classList.toggle('active', isActive);
    });
    document.querySelectorAll('.screen').forEach((el) => {
      el.classList.toggle('hidden', el.id !== `screen-${state.tab}`);
    });
  }

  function goTab(tab) {
    state.tab = tab;
    renderTabs();
    $('#screens').scrollTop = 0;
  }

  // ---------- Home: celebrations list ----------
  function renderCelebList() {
    const list = $('#celeb-list');
    list.innerHTML = events.map((ev) => `
      <button class="celeb-item" data-goto="events" type="button">
        <span class="celeb-dd">${ev.dd}</span>
        <span class="celeb-body">
          <span class="celeb-name">${ev.name}</span>
          <span class="celeb-when">${ev.when}</span>
        </span>
        <span class="celeb-tag">${ev.tag}</span>
      </button>
    `).join('');
  }

  // ---------- Events: itinerary ----------
  function renderItinerary() {
    const list = $('#itinerary-list');
    list.innerHTML = events.map((ev) => `
      <div class="tl-item">
        <div class="tl-date"><div class="tl-dd">${ev.dd}</div><div class="tl-mon">${ev.mon}</div></div>
        <div class="tl-rail"></div>
        <div class="tl-body">
          <div class="tl-name">${ev.name}</div>
          <div class="tl-when">${ev.when}</div>
          <div class="tl-blurb">${ev.blurb}</div>
          <div class="tl-dress">DRESS · ${ev.dress}</div>
        </div>
      </div>
    `).join('');
  }

  // ---------- Travel ----------
  function renderTravel() {
    $('#travel-list').innerHTML = travel.map((t) => `
      <div class="travel-item">
        <div class="travel-mode">${t.mode}</div>
        <div>
          <div class="travel-title">${t.title}</div>
          <div class="travel-detail">${t.detail}</div>
        </div>
      </div>
    `).join('');

    $('#stay-list').innerHTML = stays.map((s) => `
      <div class="stay-item">
        <div class="ph stay-thumb">${hotelSvg}</div>
        <div class="stay-body">
          <div class="stay-name">${s.name}</div>
          <div class="stay-note">${s.note}</div>
          <div class="stay-rate">${s.rate}</div>
        </div>
      </div>
    `).join('');

    $('#directions-link').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(VENUE_ADDRESS);
    const callLink = $('#call-link');
    if (VENUE_PHONE) {
      callLink.href = 'tel:' + VENUE_PHONE;
    } else {
      callLink.removeAttribute('href');
      callLink.style.opacity = '.5';
      callLink.style.cursor = 'default';
    }
  }

  // ---------- RSVP ----------
  function renderRsvp() {
    const yes = state.attending === 'yes';
    const no = state.attending === 'no';
    const ready = state.name.trim().length > 1 && state.attending !== null;

    $('#rsvp-yes').classList.toggle('active-yes', yes);
    $('#rsvp-no').classList.toggle('active-no', no);
    $('#rsvp-yes-block').classList.toggle('hidden', !yes);

    $('#guest-count').textContent = state.guests;

    $('#event-chips').innerHTML = events.map((ev) => `
      <button class="chip${state.picked[ev.name] ? ' active' : ''}" data-chip="${ev.name}" type="button">${ev.name}</button>
    `).join('');

    const submitBtn = $('#rsvp-submit');
    submitBtn.classList.toggle('ready', ready);
    submitBtn.disabled = !ready;
    $('#submit-hint').textContent = ready
      ? 'You can change this any time before 15 October.'
      : 'Add your name and let us know if you can make it.';

    const showThanks = state.sent;
    $('#rsvp-thanks').classList.toggle('hidden', !showThanks);
    $('#rsvp-form').classList.toggle('hidden', showThanks);

    if (showThanks) {
      const first = (state.name.trim().split(' ')[0]) || 'friend';
      $('#thanks-name').textContent = first;
      $('#thanks-body').textContent = yes
        ? `We have you down for ${state.guests} ${state.guests > 1 ? 'seats' : 'seat'}. Details and directions are in Travel.`
        : 'We will miss you on the day. We will send photos, and sweets.';
    }
  }

  function bindRsvp() {
    $('#rsvp-name').addEventListener('input', (e) => {
      state.name = e.target.value;
      renderRsvp();
    });
    $('#rsvp-yes').addEventListener('click', () => { state.attending = 'yes'; renderRsvp(); });
    $('#rsvp-no').addEventListener('click', () => { state.attending = 'no'; renderRsvp(); });
    $('#guest-inc').addEventListener('click', () => { state.guests = Math.min(9, state.guests + 1); renderRsvp(); });
    $('#guest-dec').addEventListener('click', () => { state.guests = Math.max(1, state.guests - 1); renderRsvp(); });
    $('#event-chips').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chip]');
      if (!chip) return;
      const name = chip.dataset.chip;
      state.picked[name] = !state.picked[name];
      renderRsvp();
    });
    $('#rsvp-note').addEventListener('input', (e) => { state.note = e.target.value; });
    $('#rsvp-submit').addEventListener('click', () => {
      if (state.name.trim().length > 1 && state.attending !== null) {
        state.sent = true;
        renderRsvp();
        $('#screens').scrollTop = 0;
      }
    });
    $('#edit-rsvp').addEventListener('click', () => { state.sent = false; renderRsvp(); });
  }

  // ---------- Global nav clicks ----------
  function bindNav() {
    document.addEventListener('click', (e) => {
      const goBtn = e.target.closest('[data-goto]');
      if (goBtn) goTab(goBtn.dataset.goto);
      const tabBtn = e.target.closest('.tab-btn');
      if (tabBtn) goTab(tabBtn.dataset.tab);
    });
  }

  // ---------- Init ----------
  function init() {
    renderCelebList();
    renderItinerary();
    renderTravel();
    renderRsvp();
    bindRsvp();
    bindNav();
    renderTabs();
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
