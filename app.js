'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  modus: 'categorie',       // 'categorie' | 'eigen'
  woordenbank: [],          // geladen uit woorden.json (array van {naam, regel, woorden})
  actiefeLijst: [],         // gekozen / ingevoerde woorden
  sessieLijst: [],          // willekeurige selectie voor huidige sessie
  eigenVergrendeld: false,
  huidigIndex: 0,
  flitsduur: 1.5,
  pauze: 5,
  aantal: 10,
  countdownInterval: null,
};

// ── DOM-referenties ────────────────────────────────────────────────────────
const $  = id => document.getElementById(id);
const tabCategorie    = $('tab-categorie');
const tabEigen        = $('tab-eigen');
const panelCategorie  = $('panel-categorie');
const panelEigen      = $('panel-eigen');
const categorieLijst  = $('categorie-lijst');
const categoriePreview= $('categorie-preview');
const btnAlles        = $('btn-alles');
const btnGeen         = $('btn-geen');
const eigenInvoerWrap = $('eigen-invoer-wrap');
const eigenInvoer     = $('eigen-invoer');
const btnVergrendel   = $('btn-vergrendel');
const eigenVergrendeld= $('eigen-vergrendeld');
const btnBewerken     = $('btn-bewerken');
const sliderFlits     = $('flitsduur');
const valFlits        = $('flitsduur-val');
const sliderPauze     = $('pauze');
const valPauze        = $('pauze-val');
const sliderAantal    = $('aantal');
const valAantal       = $('aantal-val');
const btnStart        = $('btn-start');
const startHint       = $('start-hint');
const setupPanel      = $('setup-panel');
const flitsPanel      = $('flits-panel');
const voortgangTekst  = $('voortgang-tekst');
const progressbar     = $('progressbar');
const flitsScherm     = $('flits-scherm');
const flitsWoord      = $('flits-woord');
const faseWacht       = $('fase-wacht');
const faseAntwoord    = $('fase-antwoord');
const faseKlaar       = $('fase-klaar');
const countdownGetal  = $('countdown-getal');
const ringFg          = $('ring-fg');
const btnAntwoord     = $('btn-antwoord');
const btnVolgende     = $('btn-volgende');
const btnStop         = $('btn-stop');
const btnOpnieuw      = $('btn-opnieuw');
const btnOpnieuwKlaar = $('btn-opnieuw-klaar');
const btnTerugKlaar   = $('btn-terug-klaar');

// ── Laden van woorden.json ─────────────────────────────────────────────────
async function laadWoorden() {
  try {
    const resp = await fetch('woorden.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    state.woordenbank = await resp.json();
    vulCategorieCheckboxes();
  } catch (e) {
    categorieLijst.innerHTML = '<p style="padding:.8rem 1rem;color:var(--danger)">⚠ Kon woorden.json niet laden</p>';
    console.error('Fout bij laden woorden.json:', e);
  }
}

function vulCategorieCheckboxes() {
  categorieLijst.innerHTML = '';
  state.woordenbank.forEach((cat, index) => {
    const label = document.createElement('label');
    label.className = 'cat-item';
    label.htmlFor = `cat-${index}`;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `cat-${index}`;
    cb.value = index;
    cb.addEventListener('change', onCheckboxChange);

    const tekst = document.createElement('span');
    tekst.className = 'cat-item-tekst';
    tekst.innerHTML = `<span class="cat-naam">${cat.naam}</span><span class="cat-regel">${cat.regel}</span>`;

    label.appendChild(cb);
    label.appendChild(tekst);
    categorieLijst.appendChild(label);
  });
  updateAantalMax();
}

function onCheckboxChange() {
  // Highlight rij
  categorieLijst.querySelectorAll('.cat-item').forEach(item => {
    item.classList.toggle('geselecteerd', item.querySelector('input').checked);
  });
  updateActieveLijst();
}

function getGekozenWoorden() {
  const gekozen = [];
  categorieLijst.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    const cat = state.woordenbank[cb.value];
    if (cat) cat.woorden.forEach(w => { if (!gekozen.includes(w)) gekozen.push(w); });
  });
  return gekozen;
}

function updateActieveLijst() {
  state.actiefeLijst = getGekozenWoorden();
  const gekozenNamen = [];
  categorieLijst.querySelectorAll('input:checked').forEach(cb => {
    const cat = state.woordenbank[cb.value];
    if (cat) gekozenNamen.push(cat.naam);
  });
  const n = gekozenNamen.length;
  if (n === 0) {
    categoriePreview.textContent = '';
  } else if (n === 1) {
    categoriePreview.textContent = `1 categorie: ${gekozenNamen[0]}`;
  } else {
    const lijst = gekozenNamen.slice(0, -1).join(', ') + ' en ' + gekozenNamen[n - 1];
    categoriePreview.textContent = `${n} categorieën: ${lijst}`;
  }
  updateAantalMax();
  updateStartKnop();
}

// ── Tabs ──────────────────────────────────────────────────────────────────
function activeerTab(modus) {
  state.modus = modus;
  tabCategorie.classList.toggle('active', modus === 'categorie');
  tabEigen.classList.toggle('active', modus === 'eigen');
  tabCategorie.setAttribute('aria-selected', modus === 'categorie');
  tabEigen.setAttribute('aria-selected', modus === 'eigen');
  panelCategorie.classList.toggle('active', modus === 'categorie');
  panelEigen.classList.toggle('active', modus === 'eigen');
  updateStartKnop();
}

tabCategorie.addEventListener('click', () => activeerTab('categorie'));
tabEigen.addEventListener('click',     () => activeerTab('eigen'));

// ── Alles / Wis knoppen ───────────────────────────────────────────────────
btnAlles.addEventListener('click', () => {
  categorieLijst.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = true; });
  categorieLijst.querySelectorAll('.cat-item').forEach(item => item.classList.add('geselecteerd'));
  updateActieveLijst();
});

btnGeen.addEventListener('click', () => {
  categorieLijst.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
  categorieLijst.querySelectorAll('.cat-item').forEach(item => item.classList.remove('geselecteerd'));
  updateActieveLijst();
});

// ── Eigen woorden ─────────────────────────────────────────────────────────
btnVergrendel.addEventListener('click', () => {
  const invoer = eigenInvoer.value.trim();
  if (!invoer) { eigenInvoer.focus(); return; }

  const woorden = invoer
    .split(/[\n,]+/)
    .map(w => w.trim())
    .filter(w => w.length > 0);

  if (woorden.length === 0) { eigenInvoer.focus(); return; }

  state.actiefeLijst = woorden;
  state.eigenVergrendeld = true;
  eigenInvoerWrap.hidden = true;
  eigenVergrendeld.hidden = false;
  updateAantalMax();
  updateStartKnop();
});

btnBewerken.addEventListener('click', () => {
  state.eigenVergrendeld = false;
  eigenInvoerWrap.hidden = false;
  eigenVergrendeld.hidden = true;
  state.actiefeLijst = [];
  updateStartKnop();
});

// ── Sliders ───────────────────────────────────────────────────────────────
sliderFlits.addEventListener('input', () => {
  state.flitsduur = parseFloat(sliderFlits.value);
  valFlits.textContent = state.flitsduur.toFixed(1).replace('.', ',');
});
sliderPauze.addEventListener('input', () => {
  state.pauze = parseInt(sliderPauze.value, 10);
  valPauze.textContent = state.pauze;
});
sliderAantal.addEventListener('input', () => {
  state.aantal = parseInt(sliderAantal.value, 10);
  valAantal.textContent = state.aantal;
});

function updateAantalMax() {
  const max = state.actiefeLijst.length || 15;
  sliderAantal.max = max;
  if (state.aantal > max) {
    state.aantal = max;
    sliderAantal.value = max;
    valAantal.textContent = max;
  }
}

// ── Start-knop status ─────────────────────────────────────────────────────
function updateStartKnop() {
  const klaar =
    (state.modus === 'categorie' && state.actiefeLijst.length > 0) ||
    (state.modus === 'eigen' && state.eigenVergrendeld && state.actiefeLijst.length > 0);

  btnStart.disabled = !klaar;
  startHint.hidden = klaar;
}

// ── Fisher-Yates shuffle ──────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Sessie opbouwen ───────────────────────────────────────────────────────
function bouwSessie() {
  const geschud = shuffle(state.actiefeLijst);
  state.sessieLijst = geschud.slice(0, state.aantal);
  state.huidigIndex = 0;
}

// ── Start ─────────────────────────────────────────────────────────────────
btnStart.addEventListener('click', () => {
  bouwSessie();
  setupPanel.hidden = true;
  flitsPanel.hidden = false;
  toonFlits();
});

// ── Stop / Opnieuw ────────────────────────────────────────────────────────
btnStop.addEventListener('click', naarSetup);
btnTerugKlaar.addEventListener('click', naarSetup);

function naarSetup() {
  stopCountdown();
  verbergAlleFases();
  flitsPanel.hidden = true;
  setupPanel.hidden = false;
  flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
  flitsWoord.textContent = '';
}

btnOpnieuw.addEventListener('click', () => {
  stopCountdown();
  bouwSessie();
  verbergAlleFases();
  flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
  flitsWoord.textContent = '';
  toonFlits();
});

btnOpnieuwKlaar.addEventListener('click', () => {
  bouwSessie();
  verbergAlleFases();
  flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
  toonFlits();
});

// ── Voortgang bijwerken ───────────────────────────────────────────────────
function updateVoortgang() {
  const huidig = state.huidigIndex + 1;
  const totaal = state.sessieLijst.length;
  voortgangTekst.textContent = `${huidig} / ${totaal}`;
  progressbar.style.width = `${((huidig - 1) / totaal) * 100}%`;
}

// ── Fases tonen/verbergen ─────────────────────────────────────────────────
function verbergAlleFases() {
  faseWacht.hidden   = true;
  faseAntwoord.hidden = true;
  faseKlaar.hidden   = true;
}

// ── Automatisch schalen van lang woord ────────────────────────────────────
function schaalWoord() {
  flitsWoord.style.fontSize = '';                          // reset naar CSS-waarde
  const beschikbaar = flitsScherm.clientWidth - 48;       // 24px buffer aan elke kant
  if (flitsWoord.scrollWidth > beschikbaar) {
    const huidig = parseFloat(getComputedStyle(flitsWoord).fontSize);
    const nieuw  = Math.max(huidig * (beschikbaar / flitsWoord.scrollWidth), 22);
    flitsWoord.style.fontSize = nieuw + 'px';
  }
}

// ── Flits tonen ───────────────────────────────────────────────────────────
function toonFlits() {
  verbergAlleFases();
  updateVoortgang();

  const woord = state.sessieLijst[state.huidigIndex];
  flitsWoord.textContent = woord;
  schaalWoord();
  flitsWoord.classList.add('zichtbaar');

  setTimeout(() => {
    flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
    faseWacht.hidden = false;
    startCountdown(state.pauze);
  }, state.flitsduur * 1000);
}

// ── Countdown ─────────────────────────────────────────────────────────────
const OMTREK = 2 * Math.PI * 18; // ~113.1

function startCountdown(seconden) {
  stopCountdown();
  let over = seconden;
  ringFg.style.strokeDashoffset = 0;
  countdownGetal.textContent = over;

  state.countdownInterval = setInterval(() => {
    over -= 0.25;
    if (over <= 0) {
      stopCountdown();
      countdownGetal.textContent = '0';
      ringFg.style.strokeDashoffset = OMTREK;
      return;
    }
    countdownGetal.textContent = Math.ceil(over);
    const verstreken = (seconden - over) / seconden;
    ringFg.style.strokeDashoffset = verstreken * OMTREK;
  }, 250);
}

function stopCountdown() {
  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
    state.countdownInterval = null;
  }
}

// ── Toon antwoord ─────────────────────────────────────────────────────────
btnAntwoord.addEventListener('click', () => {
  stopCountdown();
  const woord = state.sessieLijst[state.huidigIndex];
  flitsWoord.textContent = woord;
  schaalWoord();
  flitsWoord.classList.add('zichtbaar', 'antwoord');
  flitsScherm.classList.add('antwoord-modus');
  faseWacht.hidden    = true;
  faseAntwoord.hidden = false;
  progressbar.style.width = `${((state.huidigIndex + 1) / state.sessieLijst.length) * 100}%`;
});

// ── Volgend woord ─────────────────────────────────────────────────────────
btnVolgende.addEventListener('click', () => {
  state.huidigIndex++;
  if (state.huidigIndex >= state.sessieLijst.length) {
    // Klaar
    verbergAlleFases();
    flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
    progressbar.style.width = '100%';
    voortgangTekst.textContent = `${state.sessieLijst.length} / ${state.sessieLijst.length}`;
    faseKlaar.hidden = false;
    return;
  }
  flitsWoord.classList.remove('zichtbaar', 'antwoord');
  flitsScherm.classList.remove('antwoord-modus');
  toonFlits();
});

// ── Init ──────────────────────────────────────────────────────────────────
laadWoorden();
