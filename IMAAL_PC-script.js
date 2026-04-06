// ══════════════════════════════════════
//  STATE
// ══════════════════════════════════════
const catEmoji = {
  Affitto: "🏠",
  Stipendio: "💼",
  Investimento: "📈",
  Rimborso: "↩️",
  Vendita: "🏷️",
  Bonus: "🎁",
  Dividendo: "💰",
  Utenze: "💡",
  Manutenzione: "🔧",
  Tasse: "🏛️",
  "Assicuraz.": "🛡️",
  Mutuo: "🏦",
  Spesa: "🛒",
  Trasporto: "🚗",
  Altro: "➕",
};
const cardLabels = {
  visa: "Visa ••4821",
  mc: "Mastercard ••7730",
  amex: "Amex ••0054",
  n26: "N26 ••3391",
  cash: "Contanti",
};
const currencies = [
  { sym: "€", code: "EUR", name: "Euro" },
  { sym: "$", code: "USD", name: "Dollaro USA" },
  { sym: "£", code: "GBP", name: "Sterlina" },
  { sym: "₿", code: "BTC", name: "Bitcoin" },
  { sym: "¥", code: "JPY", name: "Yen" },
];
const themes = [
  { id: "blue", name: "Blu scuro" },
  { id: "purple", name: "Viola notte" },
  { id: "dark", name: "Nero assoluto" },
  { id: "teal", name: "Verde acqua" },
];
const avatarOptions = ["MR", "👤", "🏠", "💰", "📊", "🏦"];

let state = {
  user: {
    name: "Marco Rossi",
    email: "marco@imaal.it",
    phone: "+39 333 1234567",
    avatar: "MR",
  },
  currency: 0,
  theme: "blue",
  notifs: {
    push: true,
    newTx: true,
    monthReport: true,
    alerts: false,
    marketing: false,
  },
  cards: [
    {
      id: "visa",
      net: "VISA",
      last: "4821",
      bal: 2340,
      limit: 5000,
      spent: 680,
      type: "visa",
      holder: "MARCO ROSSI",
      exp: "09/27",
    },
    {
      id: "mc",
      net: "MASTERCARD",
      last: "7730",
      bal: 4890,
      limit: 8000,
      spent: 620,
      type: "mc",
      holder: "MARCO ROSSI",
      exp: "03/26",
    },
    {
      id: "amex",
      net: "AMEX",
      last: "0054",
      bal: 1220,
      limit: 3000,
      spent: 310,
      type: "amex",
      holder: "MARCO ROSSI",
      exp: "11/28",
    },
    {
      id: "n26",
      net: "N26",
      last: "3391",
      bal: 630,
      limit: 2000,
      spent: 140,
      type: "n26",
      holder: "MARCO ROSSI",
      exp: "06/25",
    },
  ],
  apis: [
    {
      name: "Visa Connect API",
      sub: "v3.2 · OAuth 2.0",
      lat: "42ms",
      status: "ok",
    },
    {
      name: "Mastercard Open Banking",
      sub: "v2.1 · PSD2",
      lat: "68ms",
      status: "ok",
    },
    {
      name: "Amex API Gateway",
      sub: "v1.8 · API Key",
      lat: "91ms",
      status: "ok",
    },
    {
      name: "N26 Banking API",
      sub: "v2.0 · Token scaduto",
      lat: "—",
      status: "warn",
    },
  ],
  newCardType: "visa",
  pinBuffer: [],
  activeTxId: null,
  currentFilter: "all",
  currentFilterGroup: "tipo",
};

let txMar = [
  {
    id: 1,
    type: "in",
    em: "🏠",
    name: "Affitto App. Via Roma",
    meta: "Visa ••4821 · 19 mar",
    card: "visa",
    amount: 1200,
    cat: "Affitto",
    date: "2026-03-19",
    note: "",
  },
  {
    id: 2,
    type: "out",
    em: "💡",
    name: "Bolletta Enel",
    meta: "Mastercard ••7730 · 18 mar",
    card: "mc",
    amount: -95,
    cat: "Utenze",
    date: "2026-03-18",
    note: "Bimestrale",
  },
  {
    id: 3,
    type: "in",
    em: "💼",
    name: "Consulenza professionale",
    meta: "Amex ••0054 · 17 mar",
    card: "amex",
    amount: 800,
    cat: "Stipendio",
    date: "2026-03-17",
    note: "",
  },
  {
    id: 4,
    type: "out",
    em: "🔧",
    name: "Riparazione caldaia",
    meta: "Visa ••4821 · 15 mar",
    card: "visa",
    amount: -320,
    cat: "Manutenzione",
    date: "2026-03-15",
    note: "Idraulico Bianchi",
  },
  {
    id: 5,
    type: "out",
    em: "🏦",
    name: "Rata mutuo",
    meta: "N26 ••3391 · 10 mar",
    card: "n26",
    amount: -650,
    cat: "Mutuo",
    date: "2026-03-10",
    note: "",
  },
  {
    id: 6,
    type: "in",
    em: "💼",
    name: "Stipendio marzo",
    meta: "Visa ••4821 · 5 mar",
    card: "visa",
    amount: 1200,
    cat: "Stipendio",
    date: "2026-03-05",
    note: "",
  },
  {
    id: 7,
    type: "out",
    em: "🛡️",
    name: "Assicurazione auto",
    meta: "Visa ••4821 · 3 mar",
    card: "visa",
    amount: -180,
    cat: "Assicuraz.",
    date: "2026-03-03",
    note: "",
  },
  {
    id: 8,
    type: "out",
    em: "🛒",
    name: "Spesa settimanale",
    meta: "Mastercard ••7730 · 1 mar",
    card: "mc",
    amount: -112,
    cat: "Spesa",
    date: "2026-03-01",
    note: "",
  },
];
const txFeb = [
  {
    id: 101,
    type: "in",
    em: "🏠",
    name: "Affitto App. Via Roma",
    meta: "Visa ••4821 · 19 feb",
    card: "visa",
    amount: 1200,
    cat: "Affitto",
    date: "2026-02-19",
    note: "",
  },
  {
    id: 102,
    type: "out",
    em: "💡",
    name: "Bolletta A2A Gas",
    meta: "N26 ••3391 · 16 feb",
    card: "n26",
    amount: -78,
    cat: "Utenze",
    date: "2026-02-16",
    note: "",
  },
  {
    id: 103,
    type: "out",
    em: "🏛️",
    name: "IMU caparra",
    meta: "Amex ••0054 · 10 feb",
    card: "amex",
    amount: -430,
    cat: "Tasse",
    date: "2026-02-10",
    note: "Appartamento Via Roma",
  },
];
let nextId = 200;
let inCat = "Stipendio",
  outCat = "Utenze";
let barData3m = [
  { l: "G", i: 3000, o: 1700 },
  { l: "F", i: 2900, o: 1850 },
  { l: "M", i: 3200, o: 1750 },
];
let barData6m = [
  { l: "O", i: 2200, o: 1600 },
  { l: "N", i: 2800, o: 1900 },
  { l: "D", i: 2500, o: 2100 },
  { l: "G", i: 3000, o: 1700 },
  { l: "F", i: 2900, o: 1850 },
  { l: "M", i: 3200, o: 1750 },
];
let barData1y = [
  { l: "A", i: 1900, o: 1400 },
  { l: "M", i: 2100, o: 1500 },
  { l: "G", i: 2400, o: 1800 },
  { l: "L", i: 2600, o: 1700 },
  { l: "A", i: 2200, o: 1600 },
  { l: "S", i: 2700, o: 1750 },
  { l: "O", i: 2200, o: 1600 },
  { l: "N", i: 2800, o: 1900 },
  { l: "D", i: 2500, o: 2100 },
  { l: "G", i: 3000, o: 1700 },
  { l: "F", i: 2900, o: 1850 },
  { l: "M", i: 3200, o: 1750 },
];
let currentBarData = barData6m;

// ══════════════════════════════════════
//  AUTH
// ══════════════════════════════════════
function togglePwd() {
  const i = document.getElementById("loginPass");
  const btn = document.getElementById("eyeBtn");
  i.type = i.type === "password" ? "text" : "password";
  btn.textContent = i.type === "password" ? "👁" : "🙈";
}

function doLogin() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  let ok = true;
  if (!email.includes("@")) {
    document.getElementById("loginEmail").classList.add("error");
    ok = false;
  } else document.getElementById("loginEmail").classList.remove("error");
  if (pass.length < 4) {
    document.getElementById("loginPass").classList.add("error");
    ok = false;
  } else document.getElementById("loginPass").classList.remove("error");
  if (!ok) return;
  const btn = document.getElementById("loginBtn");
  const loader = document.getElementById("loginLoader");
  btn.style.display = "none";
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
    btn.style.display = "block";
    setDates();
    renderAll();
    document.getElementById("pg-login").classList.remove("active");
    document.getElementById("pg-app").classList.add("active");
  }, 1000);
}
document.getElementById("loginPass").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doLogin();
});

function doLogout() {
  closeModal("modal-logout");
  document.getElementById("pg-app").classList.remove("active");
  document.getElementById("pg-login").classList.add("active");
}

// ══════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════
const pageTitles = {
  home: "Dashboard",
  trans: "Transazioni",
  entrate: "Nuova Entrata",
  uscite: "Nuova Uscita",
  report: "Report",
  settings: "Impostazioni",
};

function navTo(id) {
  document
    .querySelectorAll(".content")
    .forEach((c) => c.classList.remove("active"));
  document.getElementById("content-" + id).classList.add("active");
  document.querySelectorAll(".nav-item").forEach((n, i) => {
    const pages = ["home", "trans", "entrate", "uscite", "report", "settings"];
    n.classList.toggle("active", pages[i] === id);
  });
  document.getElementById("topBarTitle").textContent = pageTitles[id] || id;
}

// ══════════════════════════════════════
//  MODALS
// ══════════════════════════════════════
function openModal(id) {
  populateModal(id);
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}
document.querySelectorAll(".modal-overlay").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m) m.classList.remove("open");
  });
});

function populateModal(id) {
  if (id === "modal-balance") buildBalanceModal();
  else if (id === "modal-profile") buildProfileModal();
  else if (id === "modal-currency") buildCurrencyModal();
  else if (id === "modal-theme") buildThemeModal();
  else if (id === "modal-notif") buildNotifModal();
  else if (id === "modal-export") buildExportModal();
  else if (id === "modal-support") buildSupportModal();
  else if (id === "modal-plan") buildPlanModal();
  else if (id === "modal-detail-in") buildDetailModal("in");
  else if (id === "modal-detail-out") buildDetailModal("out");
  else if (id === "modal-pin") buildPinModal();
  else if (id === "modal-tos") { /* static content, nothing to populate */ }
}

// TX DETAIL
function openTxModal(id, isFeb) {
  const arr = isFeb ? txFeb : txMar;
  const tx = arr.find((t) => t.id === id);
  if (!tx) return;
  state.activeTxId = { id, isFeb };
  const sign = tx.amount > 0 ? "+" : "−";
  const col = tx.amount > 0 ? "var(--green)" : "var(--red)";
  const s = curSym();
  document.getElementById("txDetailHeader").innerHTML =
    `<div class="tx-detail-em">${tx.em}</div><div class="tx-detail-name">${tx.name}</div><div class="tx-detail-meta">${tx.meta}</div><div class="tx-detail-amount" style="color:${col}">${sign}${s}${Math.abs(tx.amount).toLocaleString("it")}</div>`;
  document.getElementById("txDetailRows").innerHTML =
    `<div class="tx-detail-row"><span class="tx-detail-key">Data</span><span class="tx-detail-val">${tx.date}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Categoria</span><span class="tx-detail-val">${tx.cat || "—"}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Carta</span><span class="tx-detail-val">${cardLabels[tx.card] || tx.card}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Note</span><span class="tx-detail-val">${tx.note || "—"}</span></div><div class="tx-detail-row"><span class="tx-detail-key">ID</span><span class="tx-detail-val" style="font-family:'DM Mono',monospace;font-size:10px">TX-${String(tx.id).padStart(6, "0")}</span></div>`;
  document.getElementById("modal-tx").classList.add("open");
}
function deleteTx() {
  if (!state.activeTxId) return;
  const { id, isFeb } = state.activeTxId;
  if (!isFeb) {
    const i = txMar.findIndex((t) => t.id === id);
    if (i > -1) txMar.splice(i, 1);
  }
  closeModal("modal-tx");
  renderAll();
  showToast("Transazione eliminata", "warn");
}

// CARD DETAIL
function openCardModal(cardId) {
  const card = state.cards.find((c) => c.id === cardId);
  if (!card) return;
  const s = curSym();
  document.getElementById("cardModalTitle").textContent =
    card.net + " ••" + card.last;
  document.getElementById("cardModalBody").innerHTML =
    `<div class="card-3d ${card.type}"><div class="card-big-chip"><div></div><div></div><div></div><div></div></div><div class="card-full-num">•••• •••• •••• ${card.last}</div><div class="card-meta-row"><div><div class="card-meta-lbl">Intestatario</div><div class="card-meta-val" style="font-size:11px">${card.holder}</div></div><div><div class="card-meta-lbl">Scadenza</div><div class="card-meta-val">${card.exp}</div></div></div></div><div class="card-detail-stats"><div class="card-stat"><div class="card-stat-lbl">Disponibile</div><div class="card-stat-val g">${s}${card.bal.toLocaleString("it")}</div></div><div class="card-stat"><div class="card-stat-lbl">Speso (mese)</div><div class="card-stat-val r">${s}${card.spent.toLocaleString("it")}</div></div><div class="card-stat"><div class="card-stat-lbl">Limite</div><div class="card-stat-val">${s}${card.limit.toLocaleString("it")}</div></div><div class="card-stat"><div class="card-stat-lbl">Utilizzo</div><div class="card-stat-val">${Math.round((card.spent / card.limit) * 100)}%</div></div></div><button class="refresh-btn" onclick="refreshCard('${card.id}')"><span id="refreshIco${card.id}">↻</span> Aggiorna saldo</button><button class="btn-danger" onclick="removeCard('${card.id}')">Scollega carta</button>`;
  document.getElementById("modal-card").classList.add("open");
}
function refreshCard(id) {
  const ico = document.getElementById("refreshIco" + id);
  ico.style.animation = "spin .7s linear infinite";
  setTimeout(() => {
    ico.style.animation = "";
    const card = state.cards.find((c) => c.id === id);
    if (card) {
      card.bal += Math.floor(Math.random() * 50 - 25);
    }
    renderCards();
    openCardModal(id);
    showToast("Saldo aggiornato", "success");
  }, 1500);
}
function removeCard(id) {
  state.cards = state.cards.filter((c) => c.id !== id);
  closeModal("modal-card");
  renderCards();
  renderProgressBars();
  showToast("Carta scollegata", "warn");
}

// ADD CARD
function setNewCardType(type, btn) {
  state.newCardType = type;
  document
    .querySelectorAll(".card-type-btn")
    .forEach((b) => b.classList.remove("sel"));
  btn.classList.add("sel");
  const p = document.getElementById("newCardPreview");
  p.className = "card-preview " + type;
  document.getElementById("newCardNet").textContent = type.toUpperCase();
}
function formatCardNum(inp) {
  let v = inp.value.replace(/\D/g, "").substring(0, 16);
  inp.value = v.replace(/(\d{4})/g, "$1 ").trim();
  const last = v.slice(-4).padStart(4, "•");
  document.getElementById("newCardNum").textContent = "•••• •••• •••• " + last;
}
function formatExpiry(inp) {
  let v = inp.value.replace(/\D/g, "");
  if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
  inp.value = v;
}
function addNewCard() {
  const num = document.getElementById("newCardNumInp").value;
  const holder = document.getElementById("newCardHolder").value;
  if (!num || num.replace(/\s/g, "").length < 16) {
    showToast("Inserisci un numero carta valido", "error");
    return;
  }
  if (!holder) {
    showToast("Inserisci il nome intestatario", "error");
    return;
  }
  const last = num.replace(/\s/g, "").slice(-4);
  const newCard = {
    id: state.newCardType + "_" + last,
    net: state.newCardType.toUpperCase(),
    last,
    bal: Math.floor(Math.random() * 5000 + 500),
    limit: 5000,
    spent: 0,
    type: state.newCardType,
    holder: holder.toUpperCase(),
    exp: document.getElementById("newCardExp").value || "--/--",
  };
  state.cards.push(newCard);
  state.apis.push({
    name: newCard.net + " API",
    sub: "v1.0 · Nuovo",
    lat: Math.floor(Math.random() * 80 + 30) + "ms",
    status: "ok",
  });
  closeModal("modal-addcard");
  renderCards();
  renderApiList();
  renderProgressBars();
  showToast("Carta " + newCard.net + " ••" + last + " collegata!", "success");
  document.getElementById("newCardNumInp").value = "";
  document.getElementById("newCardHolder").value = "";
  document.getElementById("newCardExp").value = "";
  document.getElementById("newCardCvv").value = "";
  document.getElementById("newCardNum").textContent = "•••• •••• •••• ••••";
}

function buildBalanceModal() {
  const s = curSym();
  const ins = txMar
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);
  const outs = Math.abs(
    txMar.filter((t) => t.amount < 0).reduce((a, t) => a + t.amount, 0),
  );
  const net = ins - outs;
  const totalCards = state.cards.reduce((a, c) => a + c.bal, 0);
  document.getElementById("balanceDetailBody").innerHTML =
    `<div style="background:var(--w08);border:1px solid var(--border);border-radius:16px;overflow:hidden;margin-bottom:14px"><div class="tx-detail-row"><span class="tx-detail-key">Entrate marzo</span><span class="tx-detail-val" style="color:var(--green)">${s}${ins.toLocaleString("it")}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Uscite marzo</span><span class="tx-detail-val" style="color:var(--red)">−${s}${outs.toLocaleString("it")}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Saldo netto</span><span class="tx-detail-val">${s}${net.toLocaleString("it")}</span></div><div class="tx-detail-row"><span class="tx-detail-key">Saldo carte</span><span class="tx-detail-val">${s}${totalCards.toLocaleString("it")}</span></div></div><div style="font-size:12px;color:var(--w70);text-align:center">Aggiornato in tempo reale da ${state.cards.length} carte collegate</div>`;
}

function buildProfileModal() {
  document.getElementById("editName").value = state.user.name;
  document.getElementById("editEmail").value = state.user.email;
  document.getElementById("editPhone").value = state.user.phone;
  document.getElementById("profileAv").textContent = state.user.avatar;
  document.getElementById("avSelector").innerHTML = avatarOptions
    .map(
      (a) =>
        `<div class="av-opt${a === state.user.avatar ? " sel" : ""}" onclick="selectAvatar('${a}',this)">${a}</div>`,
    )
    .join("");
}
function selectAvatar(a, el) {
  state.user.avatar = a;
  document.getElementById("profileAv").textContent = a;
  document
    .querySelectorAll(".av-opt")
    .forEach((x) => x.classList.remove("sel"));
  el.classList.add("sel");
}
function saveProfile() {
  state.user.name =
    document.getElementById("editName").value || state.user.name;
  state.user.email =
    document.getElementById("editEmail").value || state.user.email;
  state.user.phone =
    document.getElementById("editPhone").value || state.user.phone;
  const initials = state.user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  ["sideAvatar", "settingsAvatar"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.textContent =
        state.user.avatar.length > 2 ? state.user.avatar : initials;
  });
  document.getElementById("sidebarName").textContent = state.user.name;
  document.getElementById("sidebarEmail").textContent = state.user.email;
  document.getElementById("settingsName").textContent = state.user.name;
  document.getElementById("settingsEmail").textContent = state.user.email;
  closeModal("modal-profile");
  showToast("Profilo aggiornato", "success");
}

function buildCurrencyModal() {
  document.getElementById("currencyList").innerHTML =
    `<div>${currencies.map((c, i) => `<div class="currency-opt${i === state.currency ? " sel" : ""}" onclick="setCurrency(${i})"><div><div style="font-size:13px;font-weight:600;color:var(--white)">${c.sym} ${c.name}</div><div style="font-size:10px;color:var(--w70)">${c.code}</div></div>${i === state.currency ? '<span class="check-ico" style="display:block">✓</span>' : ""}</div>`).join("")}</div>`;
}
function setCurrency(i) {
  state.currency = i;
  document.getElementById("currDesc").textContent =
    currencies[i].name + " (" + currencies[i].sym + ")";
  closeModal("modal-currency");
  updateBalance();
  renderCards();
  showToast("Valuta: " + currencies[i].name, "success");
}
function curSym() {
  return currencies[state.currency].sym;
}

function buildThemeModal() {
  document.getElementById("themeList").innerHTML = themes
    .map(
      (t) =>
        `<div class="theme-opt${state.theme === t.id ? " sel" : ""}" onclick="setTheme('${t.id}')"><div style="width:32px;height:32px;border-radius:8px;background:${t.id === "blue" ? "#1a1fa8" : t.id === "purple" ? "#4a1fa8" : t.id === "dark" ? "#111" : "#0a4a3a"};flex-shrink:0"></div><div style="flex:1;margin-left:12px"><div style="font-size:13px;font-weight:600;color:var(--white)">${t.name}</div></div>${state.theme === t.id ? '<span class="check-ico" style="display:block">✓</span>' : ""}</div>`,
    )
    .join("");
}
function setTheme(id) {
  state.theme = id;
  closeModal("modal-theme");
  showToast("Tema aggiornato", "success");
}

function buildNotifModal() {
  const items = [
    { key: "push", lbl: "Notifiche push", sub: "Abilita tutte" },
    {
      key: "newTx",
      lbl: "Nuova transazione",
      sub: "Avviso ad ogni movimento",
    },
    {
      key: "monthReport",
      lbl: "Report mensile",
      sub: "Riepilogo a fine mese",
    },
    { key: "alerts", lbl: "Alert saldo basso", sub: "Sotto soglia" },
    { key: "marketing", lbl: "Offerte e novità", sub: "News app" },
  ];
  document.getElementById("notifList").innerHTML = items
    .map(
      (item) =>
        `<div class="notif-item"><div style="flex:1"><div class="notif-lbl">${item.lbl}</div><div class="notif-sub">${item.sub}</div></div><div class="toggle${state.notifs[item.key] ? " on" : ""}" onclick="toggleNotif('${item.key}',this)"><div class="toggle-knob"></div></div></div>`,
    )
    .join("");
}
function toggleNotif(key, el) {
  el.classList.toggle("on");
  state.notifs[key] = el.classList.contains("on");
  const active = Object.values(state.notifs).filter(Boolean).length;
  document.getElementById("notifDesc").textContent =
    `Push ${state.notifs.push ? "attive" : "disattive"} · ${active} tipi`;
}

function buildExportModal() {
  const opts = [
    { ico: "📄", bg: "rgba(255,79,123,.2)", name: "PDF Report" },
    { ico: "📊", bg: "rgba(0,229,160,.2)", name: "Excel (.xlsx)" },
    { ico: "📋", bg: "rgba(91,97,255,.2)", name: "CSV" },
    { ico: "🗂️", bg: "rgba(251,191,36,.2)", name: "Backup completo" },
  ];
  document.getElementById("exportList").innerHTML = opts
    .map(
      (o) =>
        `<div class="export-opt" onclick="doExport('${o.name}')"><div class="export-ico-wrap" style="background:${o.bg}">${o.ico}</div><div style="flex:1"><div class="export-name" style="font-size:14px;font-weight:600">${o.name}</div></div><span style="color:var(--w40);font-size:16px">›</span></div>`,
    )
    .join("");
}
function doExport(type) {
  closeModal("modal-export");
  showToast("Esportazione " + type + " avviata...", "info");
  setTimeout(() => showToast(type + " pronto!", "success"), 2000);
}

function buildSupportModal() {
  const opts = [
    { ico: "❓", bg: "rgba(91,97,255,.2)", name: "FAQ" },
    { ico: "💬", bg: "rgba(0,229,160,.2)", name: "Chat live" },
    { ico: "✉️", bg: "rgba(255,255,255,.1)", name: "Email" },
    { ico: "📱", bg: "rgba(251,191,36,.2)", name: "Telefono" },
  ];
  document.getElementById("supportList").innerHTML = opts
    .map(
      (o) =>
        `<div class="export-opt" onclick="closeModal('modal-support');showToast('${o.name} aperto','info')"><div class="export-ico-wrap" style="background:${o.bg}">${o.ico}</div><div style="flex:1"><div style="font-size:14px;font-weight:600">${o.name}</div></div><span style="color:var(--w40);font-size:16px">›</span></div>`,
    )
    .join("");
}

function buildPlanModal() {
  document.getElementById("planBody").innerHTML =
    `<div style="background:linear-gradient(135deg,rgba(91,97,255,.3),rgba(59,65,240,.1));border:1px solid var(--accent2);border-radius:18px;padding:20px;margin-bottom:16px;text-align:center"><div style="font-size:32px;margin-bottom:6px">⭐</div><div style="font-size:20px;font-weight:700">Piano PRO</div><div style="font-size:28px;font-weight:700;color:var(--accent2);margin:8px 0">€9,99<span style="font-size:14px;color:var(--w70)">/mese</span></div><div style="font-size:11px;color:var(--green)">Attivo fino a dicembre 2026</div></div><div style="background:var(--w08);border:1px solid var(--border);border-radius:16px;padding:16px">${["Carte illimitate", "Sync in tempo reale", "Report avanzati", "Export PDF/Excel", "Supporto prioritario"].map((f) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--green)">✓</span><span style="font-size:13px">${f}</span></div>`).join("")}</div><button class="btn-cancel" style="width:100%;margin-top:16px" onclick="closeModal('modal-plan')">Chiudi</button>`;
}

function buildDetailModal(type) {
  const list = txMar.filter((t) =>
    type === "in" ? t.amount > 0 : t.amount < 0,
  );
  const total = list.reduce((a, t) => a + Math.abs(t.amount), 0);
  const s = curSym();
  const cats = {};
  list.forEach((t) => {
    cats[t.cat] = (cats[t.cat] || 0) + Math.abs(t.amount);
  });
  const catHtml = Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([cat, val]) =>
        `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="font-size:13px">${catEmoji[cat] || "📌"} ${cat}</span><span style="font-size:13px;font-weight:700;font-family:'DM Mono',monospace">${type === "in" ? "+" : "−"}${s}${val.toLocaleString("it")}</span></div>`,
    )
    .join("");
  const id = type === "in" ? "detailInBody" : "detailOutBody";
  document.getElementById(id).innerHTML =
    `<div style="text-align:center;padding:10px 0 20px"><div style="font-size:36px;font-weight:700;font-family:'DM Mono',monospace;color:${type === "in" ? "var(--green)" : "var(--red)"}">${type === "in" ? "+" : "−"}${s}${total.toLocaleString("it")}</div><div style="font-size:12px;color:var(--w70);margin-top:4px">${list.length} transazioni · Marzo 2026</div></div><div style="background:var(--w08);border:1px solid var(--border);border-radius:16px;padding:4px 16px;margin-bottom:14px">${catHtml}</div>`;
}

function buildPinModal() {
  state.pinBuffer = [];
  const dots = document.getElementById("pinDots");
  const pad = document.getElementById("pinPad");
  dots.innerHTML = Array(4).fill('<div class="pin-dot"></div>').join("");
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
  pad.innerHTML = keys
    .map(
      (k) =>
        `<div class="pin-key${k === "" ? " empty" : k === "⌫" ? " del" : ""}" onclick="${k ? `pinKey('${k}')` : ""}">${k}</div>`,
    )
    .join("");
}
function pinKey(k) {
  if (k === "⌫") state.pinBuffer.pop();
  else if (state.pinBuffer.length < 4) state.pinBuffer.push(k);
  document
    .querySelectorAll(".pin-dot")
    .forEach((d, i) =>
      d.classList.toggle("filled", i < state.pinBuffer.length),
    );
  if (state.pinBuffer.length === 4)
    setTimeout(() => {
      closeModal("modal-pin");
      showToast("PIN impostato", "success");
    }, 300);
}

// ══════════════════════════════════════
//  SYNC
// ══════════════════════════════════════
function doSync() {
  const ico = document.getElementById("syncIco");
  const lbl = document.getElementById("syncLabel");
  ico.classList.add("spinning");
  lbl.textContent = "Sincronizzazione...";
  setTimeout(() => {
    ico.classList.remove("spinning");
    lbl.textContent = "Sincronizzato · adesso";
    state.cards.forEach((c) => {
      c.bal += Math.floor(Math.random() * 20 - 10);
    });
    renderCards();
    updateBalance();
    showToast("Dati aggiornati", "success");
  }, 2000);
}

// ══════════════════════════════════════
//  FORM
// ══════════════════════════════════════
function setDates() {
  const d = new Date().toISOString().split("T")[0];
  document.getElementById("inDate").value = d;
  document.getElementById("outDate").value = d;
}

function updateAmtPreview(type) {
  const id = type === "in" ? "in" : "out";
  const amt = parseFloat(document.getElementById(id + "Amt").value);
  const prev = document.getElementById(id + "AmtPreview");
  const s = curSym();
  if (amt > 0)
    prev.textContent = `${type === "in" ? "+" : "−"}${s}${amt.toLocaleString("it", { minimumFractionDigits: 2 })} · ${currencies[state.currency].code}`;
  else prev.textContent = "";
  validateForm(type);
}
function validateForm(type) {
  const id = type === "in" ? "in" : "out";
  const amt = parseFloat(document.getElementById(id + "Amt").value);
  const desc = document.getElementById(id + "Desc").value.trim();
  const btn = document.getElementById(
    "btnSubmit" + id.charAt(0).toUpperCase() + id.slice(1),
  );
  const valid = amt > 0 && desc.length > 0;
  btn.disabled = !valid;
  btn.textContent = valid
    ? `Registra ${type === "in" ? "Entrata" : "Uscita"}`
    : "Inserisci importo e descrizione";
}

function submitEntry(type) {
  const id = type === "in" ? "in" : "out";
  const amt = parseFloat(document.getElementById(id + "Amt").value);
  const desc = document.getElementById(id + "Desc").value.trim();
  const cat = type === "in" ? inCat : outCat;
  const card = document.getElementById(id + "Card").value;
  const note = document.getElementById(id + "Note").value.trim();
  const dateVal = document.getElementById(id + "Date").value;
  const signed = type === "in" ? amt : -amt;
  const dateObj = dateVal ? new Date(dateVal) : new Date();
  const months = [
    "gen",
    "feb",
    "mar",
    "apr",
    "mag",
    "giu",
    "lug",
    "ago",
    "set",
    "ott",
    "nov",
    "dic",
  ];
  const metaDate = dateObj.getDate() + " " + months[dateObj.getMonth()];
  txMar.unshift({
    id: nextId++,
    type,
    em: catEmoji[cat] || "📌",
    name: desc,
    meta: `${cardLabels[card]} · ${metaDate}`,
    card,
    amount: signed,
    cat,
    date: dateVal || new Date().toISOString().split("T")[0],
    note,
  });
  renderAll();
  document.getElementById(id + "Amt").value = "";
  document.getElementById(id + "Desc").value = "";
  document.getElementById(id + "Note").value = "";
  document.getElementById(id + "AmtPreview").textContent = "";
  validateForm(type);
  showToast(
    type === "in" ? "Entrata registrata!" : "Uscita registrata!",
    "success",
  );
  setTimeout(() => navTo("home"), 900);
}

// ══════════════════════════════════════
//  RENDER
// ══════════════════════════════════════
function renderAll() {
  renderRecent();
  renderTxList();
  renderCards();
  renderBarChart();
  renderApiList();
  renderProgressBars();
  updateBalance();
  updateReportCards();
}

function updateBalance() {
  const ins = txMar
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);
  const outs = txMar
    .filter((t) => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);
  const net = ins + outs;
  const s = curSym();
  document.getElementById("totalBalance").textContent =
    net.toLocaleString("it");
  document.getElementById("totalIn").textContent =
    "+" + s + ins.toLocaleString("it");
  document.getElementById("totalOut").textContent =
    "−" + s + Math.abs(outs).toLocaleString("it");
  document.getElementById("curSymbol").textContent = s;
}

function updateReportCards() {
  const ins = txMar
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);
  const outs = Math.abs(
    txMar.filter((t) => t.amount < 0).reduce((a, t) => a + t.amount, 0),
  );
  const s = curSym();
  ["repIn", "repIn2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = s + ins.toLocaleString("it");
  });
  ["repOut", "repOut2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = s + outs.toLocaleString("it");
  });
  ["repNet"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = s + (ins - outs).toLocaleString("it");
  });
  const marSum = document.getElementById("marSum");
  if (marSum)
    marSum.textContent =
      (ins - outs >= 0 ? "+" : "") + s + (ins - outs).toLocaleString("it");
  const repCount = document.getElementById("repCount");
  if (repCount) repCount.textContent = txMar.length;
  const txBadge = document.getElementById("txBadge");
  if (txBadge) txBadge.textContent = txMar.length;
}

function txHTML(tx, isFeb) {
  const sign = tx.amount > 0 ? "+" : "−";
  const s = curSym();
  return `<div class="tx-item" onclick="openTxModal(${tx.id},${isFeb || false})"><div class="tx-em ${tx.type}">${tx.em}</div><div class="tx-info"><div class="tx-name">${tx.name}</div><div class="tx-meta">${tx.meta}</div></div><span class="tx-amt ${tx.type}">${sign}${s}${Math.abs(tx.amount).toLocaleString("it")}</span></div>`;
}

function renderRecent() {
  document.getElementById("recentList").innerHTML = txMar
    .slice(0, 4)
    .map((t) => txHTML(t, false))
    .join("");
}

function renderTxList() {
  const q = (document.getElementById("txSearch")?.value || "").toLowerCase();
  const f = state.currentFilter;
  let list = txMar.filter((t) => {
    if (f === "in" && t.amount <= 0) return false;
    if (f === "out" && t.amount >= 0) return false;
    if (["visa", "mc", "amex", "n26"].includes(f) && t.card !== f) return false;
    if (f.startsWith("cat:") && t.cat !== f.slice(4)) return false;
    if (q && !t.name.toLowerCase().includes(q) && !t.cat?.toLowerCase().includes(q)) return false;
    return true;
  });

  // Group by category if active filter group is "categoria"
  if (state.currentFilterGroup === "categoria" && f === "all") {
    // Show grouped by category
    const inTx = list.filter(t => t.amount > 0);
    const outTx = list.filter(t => t.amount < 0);
    let html = "";
    if (inTx.length) {
      html += `<div class="tx-group-header in-group">↑ Entrate</div>` + inTx.map(t => txHTML(t, false)).join("");
    }
    if (outTx.length) {
      html += `<div class="tx-group-header out-group">↓ Uscite</div>` + outTx.map(t => txHTML(t, false)).join("");
    }
    document.getElementById("txList").innerHTML = html || `<div class="empty-state"><div class="e-ico">🔍</div><p>Nessuna transazione trovata</p></div>`;
  } else if (state.currentFilterGroup === "categoria" && f.startsWith("cat:")) {
    const catName = f.slice(4);
    const isIn = list.length > 0 && list[0].amount > 0;
    const groupClass = isIn ? "in-group" : "out-group";
    const icon = catEmoji[catName] || "📌";
    document.getElementById("txList").innerHTML = list.length
      ? `<div class="tx-group-header ${groupClass}">${icon} ${catName}</div>` + list.map(t => txHTML(t, false)).join("")
      : `<div class="empty-state"><div class="e-ico">🔍</div><p>Nessuna transazione in questa categoria</p></div>`;
  } else {
    document.getElementById("txList").innerHTML = list.length
      ? list.map((t) => txHTML(t, false)).join("")
      : `<div class="empty-state"><div class="e-ico">🔍</div><p>Nessuna transazione trovata</p></div>`;
  }

  document.getElementById("txListFeb").innerHTML = txFeb
    .map((t) => txHTML(t, true))
    .join("");
}

function filterTx(f, btn) {
  state.currentFilter = f;
  // Only deactivate chips within the currently visible chip group
  const activeGroup = document.querySelector(".chips:not(.hidden)");
  if (activeGroup) {
    activeGroup.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  }
  btn.classList.add("active");
  renderTxList();
}

function setFilterGroup(group, btn) {
  state.currentFilterGroup = group;
  state.currentFilter = "all";
  // Switch tabs
  document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  // Show/hide chip groups
  ["chips-tipo", "chips-carta", "chips-categoria"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", id !== "chips-" + group);
  });
  // Reset active chip in the shown group
  const shownGroup = document.getElementById("chips-" + group);
  if (shownGroup) {
    shownGroup.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    const first = shownGroup.querySelector(".chip");
    if (first) first.classList.add("active");
  }
  renderTxList();
}

function renderCards() {
  const s = curSym();
  const html = state.cards
    .map(
      (c) =>
        `<div class="cc ${c.type}" onclick="openCardModal('${c.id}')"><div class="cc-chip"><div></div><div></div><div></div><div></div></div><div class="cc-net">${c.net}</div><div class="cc-num">•••• ${c.last}</div><div class="cc-bal-lbl">Disponibile</div><div class="cc-bal">${s}${c.bal.toLocaleString("it")}</div></div>`,
    )
    .join("");
  document.getElementById("cardsRow").innerHTML =
    html +
    `<div class="add-cc" onclick="openModal('modal-addcard')"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span>Aggiungi</span></div>`;
}

function renderApiList() {
  document.getElementById("apiList").innerHTML = state.apis
    .map(
      (a) =>
        `<div class="api-item" onclick="apiAction('${a.name}')"><div class="api-dot ${a.status}"></div><div style="flex:1"><div class="api-name">${a.name}</div><div class="api-sub">${a.sub}</div></div><div class="api-lat">${a.lat}</div></div>`,
    )
    .join("");
}
function apiAction(name) {
  const api = state.apis.find((a) => a.name === name);
  if (api && api.status === "warn") {
    api.status = "ok";
    api.lat = Math.floor(Math.random() * 80 + 20) + "ms";
    api.sub = api.sub.replace("Token scaduto", "Rinnovato");
    renderApiList();
    showToast("Token rinnovato", "success");
  } else {
    showToast(name + ": online", "success");
  }
}

function renderBarChart() {
  const max = Math.max(...currentBarData.map((d) => Math.max(d.i, d.o)));
  document.getElementById("barChart").innerHTML = currentBarData
    .map(
      (m) =>
        `<div class="bar-grp"><div style="display:flex;gap:3px;align-items:flex-end;height:90px"><div class="bar in-bar" style="height:${Math.round((m.i / max) * 90)}px;width:14px" title="${m.i}"></div><div class="bar out-bar" style="height:${Math.round((m.o / max) * 90)}px;width:14px" title="${m.o}"></div></div><span class="bar-lbl">${m.l}</span></div>`,
    )
    .join("");
}
function setPeriod(p, btn) {
  document
    .querySelectorAll(".period-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  currentBarData = p === "3m" ? barData3m : p === "1y" ? barData1y : barData6m;
  renderBarChart();
}

function renderProgressBars() {
  const s = curSym();
  const total = state.cards.reduce((a, c) => a + c.spent, 0) || 1;
  document.getElementById("cardProgressBars").innerHTML = state.cards
    .map(
      (c) =>
        `<div class="prog-row"><div class="prog-head"><span class="prog-name">${c.net} ••${c.last}</span><span class="prog-val">${s}${c.spent.toLocaleString("it")}</span></div><div class="prog-bg"><div class="prog-fill" style="width:${Math.round((c.spent / total) * 100)}%;background:${c.type === "visa" ? "linear-gradient(90deg,#1a56db,#5b61ff)" : c.type === "mc" ? "linear-gradient(90deg,#eb5757,#f87171)" : c.type === "amex" ? "linear-gradient(90deg,#059669,#34d399)" : "linear-gradient(90deg,#555,#999)"}"></div></div></div>`,
    )
    .join("");
}

// ══════════════════════════════════════
//  TOAST
// ══════════════════════════════════════
function showToast(msg, type = "info") {
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.textContent = msg;
  document.getElementById("toastContainer").appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ══════════════════════════════════════
//  CATEGORY CHIPS
// ══════════════════════════════════════
function initChips(gridId, setter) {
  document.querySelectorAll("#" + gridId + " .cat-chip").forEach((c) => {
    c.addEventListener("click", () => {
      document
        .querySelectorAll("#" + gridId + " .cat-chip")
        .forEach((x) => x.classList.remove("sel"));
      c.classList.add("sel");
      setter(c.dataset.cat);
    });
  });
}
initChips("inCatGrid", (v) => {
  inCat = v;
  validateForm("in");
});
initChips("outCatGrid", (v) => {
  outCat = v;
  validateForm("out");
});
document
  .getElementById("inDesc")
  .addEventListener("input", () => validateForm("in"));
document
  .getElementById("outDesc")
  .addEventListener("input", () => validateForm("out"));
