/* ============================================================
   FLITS & CHECK! — Meester Danny design system
   Eén bestand, drie thema's:  data-theme="warm" | "polaroid" | "speels"
   Leesbaarheid voorop: het geflitste woord is altijd Nunito.
   ============================================================ */

/* ---------- Design tokens (Meester Danny) ---------- */
:root {
  --md-sky-400:#5dd0f2; --md-sky-500:#25b7e8; --md-sky-600:#0f9ad1; --md-sky-700:#0a7aa8;
  --md-orange-300:#ffc37a; --md-orange-500:#f28a2e; --md-orange-600:#e06a11; --md-orange-700:#b84e07;
  --md-cream-50:#fdf9f1; --md-cream-100:#faf3e4; --md-cream-200:#f1e6cc; --md-sand-300:#e3d4b3;
  --md-ink-900:#15202b; --md-ink-800:#1d2a38; --md-ink-700:#2c3e50; --md-ink-500:#526374;
  --md-ink-300:#9aa7b4; --md-ink-100:#e3e8ec; --md-white:#fff;
  --md-success:#38b24a; --md-success-deep:#247a34; --md-warn:#f2b632; --md-danger:#d64545;
  --md-purple:#8c5fd3; --md-purple-deep:#6a40b0; --md-purple-tint:#f1ebfb;

  --font-display:'Luckiest Guy','Bangers',Impact,cursive;
  --font-body:'Nunito',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-hand:'Patrick Hand','Caveat',cursive;

  --radius-sm:8px; --radius-md:14px; --radius-lg:20px; --radius-xl:28px; --radius-pill:9999px;
  --shadow-md:0 4px 14px rgba(27,42,56,.10);
  --shadow-lg:0 10px 28px rgba(27,42,56,.14);
  --shadow-paper:0 1px 2px rgba(27,42,56,.05),0 14px 34px rgba(27,42,56,.12);

  /* themable knobs (defaults = warm) */
  --chrome:var(--md-sky-500);
  --chrome-deep:var(--md-sky-600);
  --card-bg:var(--md-white);
  --card-border:2px solid var(--md-ink-100);
  --card-shadow:var(--shadow-paper);
  --btn-shadow:2px 2px 0 var(--md-ink-900);
  --title-font:var(--font-body);
  --title-weight:900;
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
[hidden] { display:none !important; }

html { font-size:16px; }
body {
  font-family:var(--font-body);
  background:var(--md-cream-50);
  color:var(--md-ink-900);
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:clamp(12px,3vw,40px) 16px;
  -webkit-font-smoothing:antialiased;
}

/* speels: vrolijk stippenpapier achter de kaart */
body:has(.app[data-x]) { }
[data-theme="speels"] body, body:has([data-theme]) {}

/* ============================================================
   APP CARD
   ============================================================ */
.app {
  width:min(96vw,980px);
  background:var(--card-bg);
  border:var(--card-border);
  border-radius:var(--radius-xl);
  box-shadow:var(--card-shadow);
  overflow:visible;
  position:relative;
}

/* ---------- Header ---------- */
.app-header {
  position:relative;
  background:var(--chrome);
  border-radius:calc(var(--radius-xl) - 2px) calc(var(--radius-xl) - 2px) 0 0;
  padding:clamp(16px,2.6vw,26px) clamp(20px,3vw,38px);
  overflow:hidden;
}
.header-inner {
  display:flex;
  align-items:center;
  gap:clamp(12px,2vw,22px);
  position:relative;
  z-index:2;
}
.header-badge {
  flex-shrink:0;
  display:grid;
  place-items:center;
  width:74px; height:74px;
  background:var(--md-white);
  border:3px solid var(--md-ink-900);
  border-radius:var(--radius-pill);
  box-shadow:3px 3px 0 rgba(21,32,43,.35);
  overflow:hidden;
}
.header-logo { width:62px; height:62px; object-fit:contain; display:block; }
.header-title { flex:1; min-width:0; }
.header-title h1 {
  font-family:var(--title-font);
  font-weight:var(--title-weight);
  font-size:clamp(30px,5vw,52px);
  line-height:1;
  color:var(--md-white);
  letter-spacing:.01em;
  text-shadow:0 2px 0 rgba(21,32,43,.25);
}
.header-title h1 .amp { color:var(--md-orange-300); }
.header-title .subtitle {
  margin-top:6px;
  font-size:clamp(13px,1.5vw,18px);
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:rgba(255,255,255,.92);
}
.header-mascotte {
  flex-shrink:0;
  height:clamp(72px,9vw,104px);
  width:auto;
  filter:drop-shadow(0 6px 10px rgba(0,0,0,.28));
  transform:scaleX(-1);
  margin-bottom:-6px;
  pointer-events:none;
}
.header-rand { display:none; }

/* ---------- Fullscreen-knop ---------- */
.btn-fullscreen {
  position:absolute; top:12px; right:14px; z-index:4;
  width:46px; height:46px; display:grid; place-items:center;
  border-radius:var(--radius-pill);
  border:2px solid rgba(255,255,255,.55);
  background:rgba(255,255,255,.18);
  color:#fff; cursor:pointer;
  transition:background .15s, transform .1s;
}
.btn-fullscreen:hover { background:rgba(255,255,255,.32); transform:translateY(-1px); }
.btn-fullscreen:active { transform:scale(.94); }
.btn-fullscreen .ic-compress { display:none; }
.btn-fullscreen.actief .ic-expand { display:none; }
.btn-fullscreen.actief .ic-compress { display:block; }

/* ---------- Main ---------- */
.app-main { padding:clamp(20px,3vw,40px) clamp(18px,3vw,40px) clamp(22px,3vw,38px); }
.panel { width:100%; }

/* ============================================================
   TABS
   ============================================================ */
.tabs {
  display:flex;
  gap:10px;
  margin-bottom:22px;
}
.tab {
  flex:1;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background:var(--md-cream-100);
  border:2px solid var(--md-ink-100);
  border-radius:var(--radius-md);
  padding:14px 18px;
  font-family:var(--font-body);
  font-size:clamp(16px,1.8vw,20px);
  font-weight:800;
  color:var(--md-ink-500);
  cursor:pointer;
  transition:transform .1s, background .15s, color .15s, border-color .15s, box-shadow .15s;
}
.tab .tab-emoji { display:inline-flex; }
.tab:hover { color:var(--chrome-deep); border-color:var(--md-ink-300); }
.tab.active {
  background:var(--md-white);
  color:var(--md-ink-900);
  border-color:var(--md-ink-900);
  box-shadow:3px 3px 0 var(--md-ink-900);
}
.tab.active .tab-emoji { color:var(--chrome); }

.tab-panel { display:none; }
.tab-panel.active { display:block; animation:fadeRise .22s ease-out; }
@keyframes fadeRise { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }

/* ============================================================
   CATEGORIE-LIJST
   ============================================================ */
.categorie-header-row {
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; margin-bottom:12px; flex-wrap:wrap;
}
.categorie-label {
  font-weight:800; font-size:clamp(16px,1.7vw,19px); color:var(--md-ink-800);
}
.categorie-acties { display:flex; gap:8px; }

.categorie-lijst {
  border:2px solid var(--md-ink-100);
  border-radius:var(--radius-md);
  max-height:300px;
  overflow-y:auto;
  background:var(--md-white);
  scrollbar-width:thin;
  scrollbar-color:var(--md-ink-300) transparent;
}
.categorie-lijst::-webkit-scrollbar { width:8px; }
.categorie-lijst::-webkit-scrollbar-thumb { background:var(--md-ink-300); border-radius:4px; }

.cat-item {
  display:flex; align-items:center; gap:14px;
  padding:13px 16px;
  cursor:pointer; user-select:none;
  border-bottom:1px solid var(--md-ink-100);
  transition:background .12s;
  position:relative;
}
.cat-item:last-child { border-bottom:none; }
.cat-item:hover { background:var(--md-purple-tint); }
.cat-item input { position:absolute; opacity:0; width:0; height:0; }

.cat-box {
  flex-shrink:0;
  width:26px; height:26px;
  border:2.5px solid var(--md-ink-300);
  border-radius:7px;
  background:var(--md-white);
  display:grid; place-items:center;
  transition:background .12s, border-color .12s;
}
.cat-box::after {
  content:""; width:13px; height:8px;
  border-left:3px solid #fff; border-bottom:3px solid #fff;
  transform:rotate(-45deg) scale(0); transform-origin:center;
  margin-top:-3px;
  transition:transform .14s cubic-bezier(.3,1.4,.5,1);
}
.cat-item.geselecteerd { background:var(--md-purple-tint); }
.cat-item.geselecteerd .cat-box { background:var(--md-purple); border-color:var(--md-purple-deep); }
.cat-item.geselecteerd .cat-box::after { transform:rotate(-45deg) scale(1); }
.cat-item.geselecteerd::before {
  content:""; position:absolute; left:0; top:0; bottom:0; width:5px;
  background:var(--md-purple);
}

.cat-item-tekst { display:flex; flex-direction:column; gap:2px; flex:1; min-width:0; }
.cat-naam { font-weight:800; font-size:clamp(15px,1.6vw,18px); color:var(--md-ink-900); }
.cat-regel { font-size:clamp(12px,1.35vw,14px); color:var(--md-ink-500); font-weight:600; }
.cat-telling {
  flex-shrink:0;
  font-size:13px; font-weight:800; color:var(--md-ink-500);
  background:var(--md-cream-100);
  border:1.5px solid var(--md-ink-100);
  border-radius:var(--radius-pill);
  padding:2px 11px;
  min-width:42px; text-align:center;
}
.cat-item.geselecteerd .cat-telling {
  background:var(--md-purple); color:#fff; border-color:var(--md-purple-deep);
}

.preview-text {
  margin-top:12px; font-size:15px; font-weight:700;
  color:var(--md-purple-deep); min-height:1.3em;
}

/* ============================================================
   EIGEN WOORDEN
   ============================================================ */
label {
  display:block; font-weight:800; margin-bottom:8px;
  color:var(--md-ink-800); font-size:clamp(15px,1.6vw,18px);
}
textarea {
  width:100%; padding:14px 16px;
  border:2px solid var(--md-ink-100); border-radius:var(--radius-md);
  font-size:clamp(16px,1.7vw,19px); font-family:var(--font-body); font-weight:600;
  color:var(--md-ink-900); background:var(--md-white);
  resize:vertical; min-height:140px; line-height:1.5;
  transition:border-color .15s;
}
textarea:focus { outline:none; border-color:var(--chrome); }
#btn-vergrendel { margin-top:14px; }

.locked-msg {
  display:flex; align-items:center; gap:10px;
  font-size:clamp(15px,1.6vw,18px); color:var(--md-success-deep); font-weight:700;
  padding:16px 18px; background:#e7f6ea;
  border:2px solid #b6e2bf; border-radius:var(--radius-md);
  margin-bottom:14px;
}
.locked-msg svg { flex-shrink:0; }

.herkend-msg {
  display:flex; align-items:center; gap:8px;
  font-size:clamp(13px,1.4vw,15px); font-weight:700;
  color:var(--md-purple-deep);
  background:var(--md-purple-tint);
  border:1.5px solid #d9c8f4;
  border-radius:var(--radius-md);
  padding:10px 16px; margin-bottom:14px;
}
.herkend-msg::before {
  content:""; flex-shrink:0; width:10px; height:10px; border-radius:50%;
  background:var(--md-purple);
}

/* ============================================================
   INSTELLINGEN
   ============================================================ */
.instellingen {
  display:flex; flex-wrap:wrap; gap:18px 28px;
  margin:26px 0 24px;
  padding:22px 24px;
  background:var(--md-cream-100);
  border:2px solid var(--md-sand-300);
  border-radius:var(--radius-lg);
}
.instelling-groep { flex:1 1 200px; }
.instelling-groep label { margin-bottom:10px; }
.eenheid { font-weight:700; color:var(--md-ink-300); font-size:.85em; }
.range-wrap { display:flex; align-items:center; gap:14px; }
.range-val {
  min-width:54px; text-align:center;
  font-weight:900; font-size:clamp(18px,2vw,22px);
  color:var(--md-white); background:var(--chrome);
  border:2px solid var(--md-ink-900); border-radius:var(--radius-sm);
  padding:3px 4px;
  box-shadow:2px 2px 0 var(--md-ink-900);
}

input[type="range"] {
  flex:1; -webkit-appearance:none; appearance:none;
  height:12px; border-radius:var(--radius-pill);
  background:linear-gradient(to right,
     var(--chrome) 0 var(--fill,40%), var(--md-sand-300) var(--fill,40%) 100%);
  border:2px solid var(--md-ink-900);
  cursor:pointer;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance:none; appearance:none;
  width:28px; height:28px; border-radius:var(--radius-pill);
  background:var(--md-white); border:3px solid var(--md-ink-900);
  box-shadow:1px 1px 0 rgba(21,32,43,.4);
  cursor:pointer; margin-top:0;
}
input[type="range"]::-moz-range-thumb {
  width:26px; height:26px; border-radius:var(--radius-pill);
  background:var(--md-white); border:3px solid var(--md-ink-900); cursor:pointer;
}

.hint-text {
  font-size:15px; color:var(--md-ink-500); font-weight:600;
  margin-top:14px; text-align:center;
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:9px;
  border:2px solid var(--md-ink-900); border-radius:var(--radius-pill);
  padding:13px 26px;
  font-family:var(--font-body); font-size:clamp(15px,1.7vw,18px); font-weight:800;
  color:var(--md-ink-900); background:var(--md-white);
  cursor:pointer; white-space:nowrap;
  box-shadow:var(--btn-shadow);
  transition:transform .1s ease, box-shadow .1s ease, background .15s, filter .15s;
}
.btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:4px 5px 0 var(--md-ink-900); }
.btn:active:not(:disabled) { transform:translate(2px,2px); box-shadow:0 0 0 var(--md-ink-900); }
.btn:disabled { opacity:.45; cursor:not-allowed; box-shadow:none; }

.btn-primary { background:var(--chrome); color:#fff; }
.btn-secondary { background:var(--md-white); color:var(--chrome-deep); }
.btn-danger { background:#fbe6e3; color:var(--md-danger); }
.btn-ghost {
  background:transparent; color:var(--md-ink-500);
  border:2px solid var(--md-ink-100); box-shadow:none;
}
.btn-ghost:hover:not(:disabled) {
  background:var(--md-cream-100); color:var(--md-ink-900);
  border-color:var(--md-ink-300); box-shadow:none; transform:translateY(-1px);
}
.btn-large { font-size:clamp(17px,2vw,21px); padding:16px 34px; }
.btn-small { font-size:14px; padding:7px 16px; box-shadow:1px 1px 0 var(--md-ink-900); }

.btn-start {
  width:100%;
  margin-top:4px;
  background:var(--md-orange-500); color:#fff;
  font-size:clamp(19px,2.3vw,24px); font-weight:900;
  padding:18px 28px;
  letter-spacing:.01em;
}
.btn-start svg { margin-top:-1px; }

/* ============================================================
   FLITS PANEL — voortgang
   ============================================================ */
.voortgang-balk {
  display:flex; align-items:center; gap:16px; margin-bottom:22px;
}
#voortgang-tekst {
  font-weight:900; color:var(--chrome-deep);
  white-space:nowrap; font-size:clamp(18px,2vw,22px); min-width:74px;
}
.progressbar-wrap {
  flex:1; height:14px;
  background:var(--md-cream-200);
  border:2px solid var(--md-ink-900);
  border-radius:var(--radius-pill);
  overflow:hidden;
}
#progressbar {
  height:100%; background:var(--chrome);
  border-radius:var(--radius-pill); transition:width .35s ease;
}
.voortgang-dots { display:none; flex:1; flex-wrap:wrap; gap:9px; align-items:center; }
.voortgang-dots .dot {
  width:16px; height:16px; border-radius:var(--radius-pill);
  background:var(--md-cream-200); border:2px solid var(--md-ink-900);
  transition:background .2s, transform .2s;
}
.voortgang-dots .dot.done { background:var(--md-success); }
.voortgang-dots .dot.actief { background:var(--md-orange-500); transform:scale(1.35); }

/* ============================================================
   STAGE + POLAROID
   ============================================================ */
.stage {
  position:relative;
  min-height:clamp(240px,34vw,360px);
  display:flex; align-items:center; justify-content:center;
  background:var(--md-cream-100);
  border:3px solid var(--md-sand-300);
  border-radius:var(--radius-lg);
  margin-bottom:24px;
  padding:26px;
  overflow:hidden;
}
.stage.antwoord-modus { background:#e7f6ea; border-color:#b6e2bf; }

.polaroid {
  position:relative;
  background:var(--md-white);
  padding:18px 18px 14px;
  border-radius:6px;
  box-shadow:0 10px 26px rgba(21,32,43,.22), 0 2px 0 rgba(21,32,43,.06);
  transform:rotate(-1.4deg);
  max-width:88%;
  transition:transform .25s ease;
}
.polaroid-photo {
  min-width:min(60vw,520px);
  min-height:clamp(140px,18vw,200px);
  padding:14px 28px;
  display:flex; align-items:center; justify-content:center;
  background:var(--md-cream-50);
  border-radius:3px;
  box-shadow:inset 0 0 0 1px rgba(21,32,43,.06);
}
#flits-woord {
  font-family:var(--font-body);
  font-size:clamp(56px,9vw,128px);
  font-weight:900;
  line-height:1;
  color:var(--md-ink-900);
  letter-spacing:.01em;
  user-select:none;
  visibility:hidden;
  white-space:nowrap;
  text-align:center;
}
#flits-woord.zichtbaar { visibility:visible; opacity:1; }
#flits-woord.zichtbaar:not(.antwoord):not(.klaar-woord) { animation:ontwikkel .6s ease-out; }
#flits-woord.antwoord { color:var(--md-success-deep); animation:woordPop .26s cubic-bezier(.3,1.5,.5,1); }
#flits-woord.klaar-woord {
  white-space:normal; text-wrap:balance;
  font-size:clamp(40px,6.4vw,86px);
  color:var(--md-orange-500);
  line-height:1.04;
  animation:woordPop .42s cubic-bezier(.3,1.6,.5,1);
}
@keyframes woordPop { from{transform:scale(.84)} to{transform:scale(1)} }
@keyframes ontwikkel {
  0%   { filter:blur(18px); transform:scale(.92); }
  55%  { filter:blur(2.5px); }
  100% { filter:blur(0); transform:scale(1); }
}

.polaroid-caption {
  margin-top:12px; text-align:center;
  font-family:var(--font-hand);
  font-size:clamp(18px,2.2vw,26px);
  color:var(--md-ink-500);
  min-height:1.2em;
}
.polaroid-caption .cap-check { display:none; color:var(--md-success-deep); }
.polaroid-caption .cap-klaar { display:none; color:var(--md-orange-600); }
.stage.antwoord-modus .polaroid-caption .cap-flits { display:none; }
.stage.antwoord-modus .polaroid-caption .cap-check { display:inline; }
.stage.klaar-modus .polaroid-caption .cap-flits { display:none; }
.stage.klaar-modus .polaroid-caption .cap-klaar { display:inline; }
.stage.antwoord-modus .polaroid { transform:rotate(1deg); }
.stage.klaar-modus { background:var(--md-cream-100); border-color:var(--md-orange-300); }
.stage.klaar-modus .polaroid { transform:rotate(-1deg); }

/* tape (alleen bij polaroid/speels) */
.flits-tape { display:none; position:absolute; z-index:3;
  width:96px; height:30px; background:rgba(255,255,255,.55);
  border:1px solid rgba(21,32,43,.08);
}
.flits-tape--l { top:18%; left:50%; transform:translateX(-150px) rotate(-24deg); }
.flits-tape--r { top:18%; left:50%; transform:translateX(60px) rotate(20deg); }

/* witte flits */
.flash-overlay {
  position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; z-index:5;
}
.stage.flitsen .flash-overlay { animation:flashbang .45s ease-out; }
@keyframes flashbang { 0%{opacity:0} 12%{opacity:.92} 100%{opacity:0} }

/* ============================================================
   FASES
   ============================================================ */
.fase { text-align:center; }
.fase-wacht {
  display:flex; align-items:center; justify-content:center; gap:clamp(10px,3vw,40px);
}
.quokka-schrijf { width:clamp(120px,16vw,180px); flex-shrink:0; pointer-events:none;
  filter:drop-shadow(0 6px 12px rgba(0,0,0,.16)); animation:floaty 3s ease-in-out infinite; }
@keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
.fase-midden { display:flex; flex-direction:column; align-items:center; gap:6px; }
.fase-info { font-size:clamp(18px,2vw,23px); font-weight:800; color:var(--md-ink-700); }

#countdown-wrap { display:flex; justify-content:center; margin:4px 0 12px; }
#countdown-ring { position:relative; width:84px; height:84px; display:grid; place-items:center; }
.countdown-svg { position:absolute; inset:0; width:84px; height:84px; transform:rotate(-90deg); }
.ring-bg { fill:none; stroke:var(--md-cream-200); stroke-width:4; }
.ring-fg { fill:none; stroke:var(--chrome); stroke-width:4; stroke-linecap:round;
  stroke-dasharray:113.1; stroke-dashoffset:0; transition:stroke-dashoffset .25s linear; }
#countdown-getal { font-size:30px; font-weight:900; color:var(--chrome-deep); z-index:1; }

.fase-antwoord { padding:6px 0; }

/* spellingregel bij het antwoord */
.antwoord-regel {
  display:flex; flex-direction:column; align-items:center; gap:3px;
  width:fit-content; max-width:94%; margin:0 auto 18px;
  padding:12px 24px;
  background:var(--md-cream-100);
  border:2px solid var(--md-orange-300);
  border-radius:var(--radius-md);
  box-shadow:var(--shadow-md);
  animation:fadeRise .26s ease-out;
}
.antwoord-regel .ar-label {
  font-size:12px; font-weight:900; letter-spacing:.15em; text-transform:uppercase;
  color:var(--md-orange-600);
}
.antwoord-regel .ar-naam { font-weight:900; font-size:clamp(16px,2vw,21px); color:var(--md-ink-900); }
.antwoord-regel .ar-regel { font-size:clamp(14px,1.7vw,18px); font-weight:700; color:var(--md-ink-700); text-align:center; }

.fase-klaar { display:flex; flex-direction:column; align-items:center; gap:6px; padding:6px 0; }
.quokka-klaar { width:clamp(120px,15vw,168px); pointer-events:none;
  filter:drop-shadow(0 6px 12px rgba(0,0,0,.18)); animation:floaty 3s ease-in-out infinite; }
.klaar-tekst {
  font-family:var(--title-font); font-weight:var(--title-weight);
  font-size:clamp(28px,3.6vw,42px); color:var(--md-success-deep); line-height:1.05;
}
.klaar-sub { font-size:clamp(15px,1.8vw,19px); color:var(--md-ink-500); font-weight:600; }
.klaar-acties { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:10px; }

.controle-knoppen {
  display:flex; justify-content:center; gap:14px;
  margin-top:28px; padding-top:20px; border-top:2px dashed var(--md-ink-100);
}

/* ============================================================
   CONFETTI canvas
   ============================================================ */
#confetti-canvas {
  position:fixed; inset:0; width:100vw; height:100vh;
  pointer-events:none; z-index:50;
}

/* ============================================================
   THEMA: WARM  (default — niets extra nodig)
   ============================================================ */

/* ============================================================
   THEMA: POLAROID  — "donkere kamer", de foto springt eruit
   ============================================================ */
[data-theme="polaroid"] {
  --chrome:var(--md-sky-600);
  --chrome-deep:var(--md-sky-700);
}
[data-theme="polaroid"] .stage {
  background:radial-gradient(circle at 50% 38%, #243446 0%, #15202b 78%);
  border:3px solid var(--md-ink-900);
  box-shadow:inset 0 0 90px rgba(0,0,0,.55);
}
[data-theme="polaroid"] .stage.antwoord-modus {
  background:radial-gradient(circle at 50% 38%, #1f4a33 0%, #11261b 80%);
  border-color:#0d3a25;
}
[data-theme="polaroid"] .stage.klaar-modus {
  background:radial-gradient(circle at 50% 40%, #4a3414 0%, #1a1305 82%);
  border-color:var(--md-ink-900);
  box-shadow:inset 0 0 90px rgba(0,0,0,.5);
}
[data-theme="polaroid"] .polaroid {
  transform:rotate(-2.2deg);
  box-shadow:0 18px 40px rgba(0,0,0,.5);
  padding:22px 22px 16px;
}
[data-theme="polaroid"] .flits-tape { display:block; }
[data-theme="polaroid"] .polaroid-caption { color:var(--md-ink-700); }
[data-theme="polaroid"] .ring-bg { stroke:rgba(255,255,255,.18); }
[data-theme="polaroid"] .stage.flitsen .flash-overlay { animation:flashbang .6s ease-out; }
[data-theme="polaroid"] .flits-tape--l,
[data-theme="polaroid"] .flits-tape--r { background:rgba(240,230,210,.5); }

/* ============================================================
   THEMA: SPEELS — Luckiest Guy chrome, stippen-voortgang,
   kleurrijk viewfinder-kader, dik ink-randje om de kaart
   ============================================================ */
[data-theme="speels"] {
  --chrome:var(--md-sky-500);
  --chrome-deep:var(--md-sky-600);
  --card-border:3px solid var(--md-ink-900);
  --card-shadow:8px 10px 0 rgba(21,32,43,.14), var(--shadow-paper);
  --title-font:var(--font-display);
  --title-weight:400;
  --btn-shadow:3px 3px 0 var(--md-ink-900);
}
[data-theme="speels"] body { background:var(--md-cream-100); }
[data-theme="speels"] .header-title h1 { letter-spacing:.02em; text-shadow:2px 3px 0 rgba(21,32,43,.3); }
[data-theme="speels"] .header-title h1 .amp { color:var(--md-orange-300); }
[data-theme="speels"] .header-title .subtitle { letter-spacing:.12em; }

/* stippen i.p.v. balk */
[data-theme="speels"] .progressbar-wrap { display:none; }
[data-theme="speels"] .voortgang-dots { display:flex; }

/* viewfinder-kader om de polaroid */
[data-theme="speels"] .stage {
  background:
    repeating-linear-gradient(45deg, #fff4df 0 14px, #fdeccf 14px 28px);
  border:4px solid var(--md-ink-900);
  box-shadow:inset 0 0 0 5px var(--md-orange-300);
}
[data-theme="speels"] .stage.antwoord-modus {
  background:repeating-linear-gradient(45deg, #e7f6ea 0 14px, #d8f0dd 14px 28px);
  box-shadow:inset 0 0 0 5px #9bdcab;
}
[data-theme="speels"] .polaroid { border:2.5px solid var(--md-ink-900); box-shadow:5px 6px 0 rgba(21,32,43,.18); }
[data-theme="speels"] .flits-tape { display:block; background:rgba(37,183,232,.4); border-color:rgba(21,32,43,.12); }
[data-theme="speels"] .btn-start { background:var(--md-orange-500); }
[data-theme="speels"] .tab.active { box-shadow:3px 3px 0 var(--md-ink-900); }
[data-theme="speels"] .klaar-tekst { letter-spacing:.02em; }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:680px) {
  .quokka-schrijf { display:none; }
  .header-mascotte { height:64px; }
  .instelling-groep { flex:1 1 100%; }
  .stage { padding:18px 14px; }
  .polaroid-photo { min-width:auto; width:100%; }
}
@media (max-width:520px) {
  .tabs { flex-direction:column; }
  .klaar-acties { flex-direction:column; width:100%; }
  .klaar-acties .btn { width:100%; }
}
