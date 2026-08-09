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
    { mode: 'BY TRAIN', title: 'Puducherry station — 3 km', detail: 'Villupuram junction is the bigger railhead, 40 min away by road.' }
  ];

  const stays = [
    { name: 'La Tamara Luxury', note: 'TIE Hotels & Resorts — also hosts the Haldi and Mehendi.', tag: 'View on Maps', link: 'https://maps.app.goo.gl/2xyLPWwrmSTbwii89' }
  ];

  const staySvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg>STAY';

  const spotsVisit = [
    { name: 'Promenade Beach', note: 'Sea-facing boulevard lined with French-era buildings — best for the evening walk.', tag: '10 min from venue' },
    { name: 'French Quarter (White Town)', note: 'Mustard-and-bougainvillea streets, quiet cafés, hardly any traffic.', tag: 'Best at golden hour' },
    { name: 'Auroville', note: 'The Matrimandir and township gardens — worth the early start.', tag: '~40 min drive' },
    { name: 'Sri Aurobindo Ashram', note: "A calm break from the wedding buzz — gardens and a reading room.", tag: '10 min from venue' },
    { name: 'Matrimandir', note: "Auroville's golden meditation chamber — viewing needs a booked slot, arrive early.", tag: '~40 min drive', link: 'https://www.google.com/maps/search/?api=1&query=Matrimandir%2C+Auroville%2C+Puducherry' },
    { name: 'Pichavaram Mangrove Forest', note: 'Boat through the world’s second-largest mangrove forest.', tag: '~1.5 hr drive', link: 'https://www.google.com/maps/search/?api=1&query=Pichavaram+Mangrove+Forest' },
    { name: 'Arikamedu Ruins', note: 'Quiet ruins of an ancient Indo-Roman trading port.', tag: '~20 min drive', link: 'https://www.google.com/maps/search/?api=1&query=Arikamedu%2C+Puducherry' },
    { name: 'Arulmigu Manakula Vinayagar Temple', note: "Pondicherry's best-loved Ganesha temple, right in White Town.", tag: '10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Arulmigu+Manakula+Vinayagar+Temple%2C+Puducherry' },
    { name: 'Pondy Ocean Park', note: 'Water park and rides on the East Coast Road — a fun half-day out.', tag: '~1 hr drive', link: 'https://www.google.com/maps/search/?api=1&query=Pondy+Ocean+Park' },
    { name: 'Paradise Beach', note: 'Golden sand reached by a short boat ride from Chunnambar.', tag: '~20 min + boat', link: 'https://www.google.com/maps/search/?api=1&query=Paradise+Beach%2C+Puducherry' },
    { name: 'Rock Beach', note: 'The rocky stretch of the Promenade by the war memorial.', tag: '10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Rock+Beach%2C+Puducherry' },
    { name: 'Serenity Beach', note: 'Surf, cafés, and a quieter shoreline north of town.', tag: '~25 min drive', link: 'https://www.google.com/maps/search/?api=1&query=Serenity+Beach%2C+Puducherry' },
    { name: 'Eden Beach', note: 'A calmer backwater-side beach near Chunnambar.', tag: '~20 min + boat', link: 'https://www.google.com/maps/search/?api=1&query=Eden+Beach%2C+Puducherry' }
  ];

  const spotsEat = [
    { name: 'Cuisine de Pondy', note: 'Biryani spot right by the venue — first stop if you are hungry and haven’t left yet.', tag: '2 min walk from venue', link: 'https://www.google.com/maps/search/?api=1&query=Cuisine+de+Pondy%2C+Puducherry' },
    { name: 'Villa Shanti', note: 'French-Tamil fusion in a restored colonial villa — go for dinner in White Town.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Villa+Shanti%2C+Puducherry' },
    { name: 'Coromandel Cafe', note: 'Heritage-building café in White Town, popular for weekend brunch.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Coromandel+Cafe%2C+Puducherry' },
    { name: 'Surguru', note: 'Reliable South Indian vegetarian — good for a filter coffee and dosa fix.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Surguru%2C+Puducherry' },
    { name: 'Cafe Xtasi', note: 'Rooftop seating and continental plates in the French Quarter.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Cafe+Xtasi%2C+Puducherry' },
    { name: 'Baker’s Street', note: 'French bakery chain — croissants and pastries worth the stop.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Bakers+Street%2C+Puducherry' },
    { name: 'GMT Gelato', note: 'Small-batch gelato, a favourite after a Promenade walk.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=GMT+Gelato%2C+Puducherry' },
    { name: 'Sicily’s', note: 'Casual Italian-leaning menu in White Town.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Sicilys%2C+Puducherry' },
    { name: 'Blueline', note: 'Laid-back spot for a relaxed meal in town.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Blueline%2C+Puducherry' },
    { name: 'Zuka', note: 'Local chocolate café — good for dessert or a coffee break.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Zuka+Chocolate%2C+Puducherry' },
    { name: 'Cafe Des Arts', note: 'Garden courtyard café, a favourite brunch spot in White Town.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Cafe+Des+Arts%2C+Puducherry' },
    { name: 'Bread and Chocolate', note: 'French bakery-café known for fresh croissants and quiches — go early before things sell out.', tag: '~10 min from venue', link: 'https://www.google.com/maps/search/?api=1&query=Bread+and+Chocolate%2C+Puducherry' }
  ];

  const spotSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>SPOT';
  const eatSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v9M9 3v9M15 3c-1.5 0-2 2-2 4s.5 4 2 4v10M15 3v18"/></svg>EAT';
  let spotView = 'visit';

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

    $('#stay-list').innerHTML = stays.map((s, i) => `
      <a class="stay-item reveal" style="transition-delay:${i * 80}ms" href="${s.link}" target="_blank" rel="noopener">
        <div class="ph stay-thumb">${staySvg}</div>
        <div class="stay-body">
          <div class="stay-name">${s.name}</div>
          <div class="stay-note">${s.note}</div>
          <div class="stay-rate">${s.tag}</div>
        </div>
      </a>
    `).join('');

    renderSpots();

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

  function renderSpots() {
    const list = spotView === 'visit' ? spotsVisit : spotsEat;
    const icon = spotView === 'visit' ? spotSvg : eatSvg;
    document.querySelectorAll('#spot-segment .segment-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.spotView === spotView);
    });
    $('#spot-list').innerHTML = list.map((s, i) => {
      const tag = s.link ? 'a' : 'div';
      const linkAttrs = s.link ? `href="${s.link}" target="_blank" rel="noopener"` : '';
      return `
      <${tag} class="stay-item item-in" style="animation-delay:${i * 60}ms" ${linkAttrs}>
        <div class="ph stay-thumb">${icon}</div>
        <div class="stay-body">
          <div class="stay-name">${s.name}</div>
          <div class="stay-note">${s.note}</div>
          <div class="stay-rate">${s.tag}</div>
        </div>
      </${tag}>
    `;
    }).join('');
  }

  function bindSpotSegment() {
    $('#spot-segment').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-spot-view]');
      if (!btn) return;
      spotView = btn.dataset.spotView;
      renderSpots();
    });
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
    bindSpotSegment();
    bindNav();
    renderTabs();
    initReveal();
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
