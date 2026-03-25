'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  modus: 'categorie',       // 'categorie' | 'eigen'
  woordenbank: {},          // geladen uit woorden.json
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
const categorieSelect = $('categorie-select');
const categoriePreview= $('categorie-preview');
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
const antwoordWoord   = $('antwoord-woord');
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
    vulCategorieSelect();
  } catch (e) {
    categorieSelect.innerHTML = '<option value="">⚠ Kon woorden.json niet laden</option>';
    console.error('Fout bij laden woorden.json:', e);
  }
}

function vulCategorieSelect() {
  const categorieen = Object.keys(state.woordenbank);
  categorieSelect.innerHTML = '<option value="">— Kies een categorie —</option>';
  categorieen.forEach(naam => {
    const opt = document.createElement('option');
    opt.value = naam;
    opt.textContent = naam;
    categorieSelect.appendChild(opt);
  });
  updateAantalMax();
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

// ── Categorie selectie ────────────────────────────────────────────────────
categorieSelect.addEventListener('change', () => {
  const key = categorieSelect.value;
  if (key && state.woordenbank[key]) {
    state.actiefeLijst = state.woordenbank[key];
    const n = state.actiefeLijst.length;
    categoriePreview.textContent = `${n} woorden — bijv.: ${state.actiefeLijst.slice(0,4).join(', ')}…`;
  } else {
    state.actiefeLijst = [];
    categoriePreview.textContent = '';
  }
  updateAantalMax();
  updateStartKnop();
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
  flitsWoord.classList.remove('zichtbaar');
  flitsWoord.textContent = '';
}

btnOpnieuw.addEventListener('click', () => {
  stopCountdown();
  bouwSessie();
  verbergAlleFases();
  flitsWoord.classList.remove('zichtbaar');
  flitsWoord.textContent = '';
  toonFlits();
});

btnOpnieuwKlaar.addEventListener('click', () => {
  bouwSessie();
  verbergAlleFases();
  flitsWoord.classList.remove('zichtbaar');
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

// ── Flits tonen ───────────────────────────────────────────────────────────
function toonFlits() {
  verbergAlleFases();
  updateVoortgang();

  const woord = state.sessieLijst[state.huidigIndex];
  flitsWoord.textContent = woord;
  flitsWoord.classList.add('zichtbaar');

  setTimeout(() => {
    flitsWoord.classList.remove('zichtbaar');
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
  antwoordWoord.textContent = woord;
  faseWacht.hidden   = true;
  faseAntwoord.hidden = false;
  progressbar.style.width = `${((state.huidigIndex + 1) / state.sessieLijst.length) * 100}%`;
});

// ── Volgend woord ─────────────────────────────────────────────────────────
btnVolgende.addEventListener('click', () => {
  state.huidigIndex++;
  if (state.huidigIndex >= state.sessieLijst.length) {
    // Klaar
    verbergAlleFases();
    flitsWoord.classList.remove('zichtbaar');
    progressbar.style.width = '100%';
    voortgangTekst.textContent = `${state.sessieLijst.length} / ${state.sessieLijst.length}`;
    faseKlaar.hidden = false;
    return;
  }
  flitsWoord.classList.remove('zichtbaar');
  toonFlits();
});

// ── Init ──────────────────────────────────────────────────────────────────
laadWoorden();
