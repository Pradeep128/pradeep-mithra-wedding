(() => {
  'use strict';

  const WEDDING_DATE = new Date('2026-11-22T10:30:00+05:30').getTime();
  const VENUE_ADDRESS = 'Anandha Inn, Sardar Vallabhbhai Patel Salai, Puducherry 605001';
  const VENUE_PHONE = '';
  const PHOTOS_ALBUM_URL = 'https://photos.app.goo.gl/46vf5GNqiQpgyJJJ8';

  const RSVP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeMmBYoA7tV-4Ei8VVz_lxfeEpiFuOSB6KzxsmBddifxaRsrw/formResponse';
  const RSVP_ENTRY = {
    name: 'entry.1663616517',
    attending: 'entry.1768421477',
    guests: 'entry.1093209292',
    events: 'entry.997150284',
    notes: 'entry.1185465696'
  };

  function submitRsvpToGoogleForm() {
    const fd = new FormData();
    fd.append(RSVP_ENTRY.name, state.name.trim());
    fd.append(RSVP_ENTRY.attending, state.attending === 'yes' ? 'Yes' : 'No');
    fd.append(RSVP_ENTRY.guests, state.attending === 'yes' ? String(state.guests) : '0');
    if (state.attending === 'yes') {
      events.forEach((ev) => fd.append(RSVP_ENTRY.events, ev.name));
    }
    fd.append(RSVP_ENTRY.notes, state.note.trim());
    fetch(RSVP_FORM_URL, { method: 'POST', mode: 'no-cors', body: fd }).catch(() => {});
  }

  const events = [
    { dd: '20', mon: 'NOV', name: 'Haldi', when: 'Friday · 11:00 AM · La Thamara', tag: 'AM', blurb: 'Turmeric, laughter, and a great deal of it on your clothes. Come in something you do not love too much.' },
    { dd: '20', mon: 'NOV', name: 'Mehendi', when: 'Friday · 4:00 PM · La Thamara', tag: 'PM', blurb: 'Four artists, filter coffee, and enough time to get both hands done before dinner.' },
    { dd: '21', mon: 'NOV', name: 'Leisure Day', when: 'Saturday · Explore Pondicherry', tag: 'DAY', blurb: 'A breather between the celebrations — wander the French Quarter, the Promenade, or just sleep in. See <a href="#" data-goto="travel" data-scroll-to="spot-list" class="inline-link">our spot recommendations</a>.' },
    { dd: '22', mon: 'NOV', name: 'Muhurtham', when: 'Sunday · 06:30 AM · Anandha Inn', tag: 'AM', blurb: 'The ceremony begins promptly at the muhurtham. Please be seated by 06:30. Breakfast and lunch to follow.' }
  ];

  const travel = [
    { mode: 'BY AIR', title: 'Chennai (MAA) — 150 km', detail: 'Pre-booked cabs run 3 hrs door to door.' },
    { mode: 'BY TRAIN', title: 'Puducherry station — 3 km', detail: 'Villupuram junction is the bigger railhead, 40 min away by road.' },
    { mode: 'ON THE DAY', title: 'Shuttle from hotels', detail: 'Buses leave both hotels at 9:30 AM on the 22nd.' }
  ];

  const spots = [
    { name: 'Promenade Beach', note: 'Sea-facing boulevard lined with French-era buildings — best for the evening walk.', tag: '10 min from venue' },
    { name: 'French Quarter (White Town)', note: 'Mustard-and-bougainvillea streets, quiet cafés, hardly any traffic.', tag: 'Best at golden hour' },
    { name: 'Auroville', note: 'The Matrimandir and township gardens — worth the early start.', tag: '45 min drive' },
    { name: 'Sri Aurobindo Ashram', note: "A calm break from the wedding buzz — gardens and a reading room.", tag: '10 min from venue' },
    { name: 'Cuisine de Pondy', note: 'Biryani spot right by the venue — first stop if you are hungry and haven’t left yet.', tag: '2 min walk from venue' },
    { name: 'Villa Shanti', note: 'French-Tamil fusion in a restored colonial villa — go for dinner in White Town.', tag: '15 min from venue' }
  ];

  const spotSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>SPOT';

  const state = {
    tab: 'home',
    name: '',
    attending: null,
    guests: 2,
    note: '',
    sent: false
  };

  const $ = (sel) => document.querySelector(sel);
  const pad = (n) => String(n).padStart(2, '0');

  // ---------- Countdown ----------
  let lastSecond = null;
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
    if (s !== lastSecond) {
      lastSecond = s;
      const secEl = $('#cd-s');
      secEl.classList.remove('tick');
      void secEl.offsetWidth;
      secEl.classList.add('tick');
    }
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: $('#screens'), threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el) => observer.observe(el));
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
    list.innerHTML = events.map((ev, i) => `
      <button class="celeb-item reveal" style="transition-delay:${i * 70}ms" data-goto="events" type="button">
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
    list.innerHTML = events.map((ev, i) => `
      <div class="tl-item reveal" style="transition-delay:${i * 90}ms">
        <div class="tl-date"><div class="tl-dd">${ev.dd}</div><div class="tl-mon">${ev.mon}</div></div>
        <div class="tl-rail"></div>
        <div class="tl-body">
          <div class="tl-name">${ev.name}</div>
          <div class="tl-when">${ev.when}</div>
          <div class="tl-blurb">${ev.blurb}</div>
        </div>
      </div>
    `).join('');
  }

  // ---------- Travel ----------
  function renderTravel() {
    $('#travel-list').innerHTML = travel.map((t, i) => `
      <div class="travel-item reveal" style="transition-delay:${i * 80}ms">
        <div class="travel-mode">${t.mode}</div>
        <div>
          <div class="travel-title">${t.title}</div>
          <div class="travel-detail">${t.detail}</div>
        </div>
      </div>
    `).join('');

    $('#spot-list').innerHTML = spots.map((s, i) => `
      <div class="stay-item reveal" style="transition-delay:${i * 80}ms">
        <div class="ph stay-thumb">${spotSvg}</div>
        <div class="stay-body">
          <div class="stay-name">${s.name}</div>
          <div class="stay-note">${s.note}</div>
          <div class="stay-rate">${s.tag}</div>
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

    const submitBtn = $('#rsvp-submit');
    submitBtn.classList.toggle('ready', ready);
    submitBtn.disabled = !ready;
    $('#submit-hint').textContent = ready
      ? 'You can change this any time before 25 October.'
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
    $('#rsvp-note').addEventListener('input', (e) => { state.note = e.target.value; });
    $('#rsvp-submit').addEventListener('click', () => {
      if (state.name.trim().length > 1 && state.attending !== null) {
        submitRsvpToGoogleForm();
        state.sent = true;
        renderRsvp();
        $('#screens').scrollTop = 0;
      }
    });
  }

  // ---------- Global nav clicks ----------
  function bindNav() {
    document.addEventListener('click', (e) => {
      const goBtn = e.target.closest('[data-goto]');
      if (goBtn) {
        e.preventDefault();
        goTab(goBtn.dataset.goto);
        const scrollToId = goBtn.dataset.scrollTo;
        if (scrollToId) {
          requestAnimationFrame(() => {
            const target = document.getElementById(scrollToId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
      const tabBtn = e.target.closest('.tab-btn');
      if (tabBtn) goTab(tabBtn.dataset.tab);
    });
  }

  // ---------- Init ----------
  function init() {
    $('#photos-album-link').href = PHOTOS_ALBUM_URL;
    renderCelebList();
    renderItinerary();
    renderTravel();
    renderRsvp();
    bindRsvp();
    bindNav();
    renderTabs();
    initReveal();
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
