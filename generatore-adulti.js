function init(){

var CATEGORIE_MAGICHE = {
  "Acumen": "acume",
  "Animus": "empatia",
  "Ars": "tecnica",
  "Numen": "potenza",
  "Sensus": "percezione",
  "Voluntas": "volonta"
};

var CATEGORIA_CLASS = {
  "Acumen": "schedaacumen",
  "Animus": "schedaanimus",
  "Ars": "schedaars",
  "Numen": "schedanumen",
  "Sensus": "schedasensus",
  "Voluntas": "schedavoluntas"
};

var PARAM_LABEL = {
  "acume": "Acume",
  "empatia": "Empatia",
  "percezione": "Percezione",
  "potenza": "Potenza",
  "tecnica": "Tecnica",
  "volonta": "Volontà"
};

// null = mestiere senza Parametro Magico affine
var MESTIERI = {
  "Spezzaincantesimi": "acume",
  "Auror": "potenza",
  "Pozionista": "tecnica",
  "Medimago": "tecnica",
  "Erbologo": "empatia",
  "Magizoologo": "empatia",
  "Divinatore": "percezione",
  "Difensore": "volonta",
  "Diplomatico": null,
  "Giornalista": null,
  "Locandiere/Cameriere": null,
  "Negoziante": null,
  "Mestiere Libero": null
};

// Fasce di Crescita a Debito: Sapienza da distribuire, Età minima del PG,
// Coefficiente di Debito, tetto massimo di Popolarità e Dialettica raggiungibili,
// bonus fisso di Prestigio della fascia.
var FASCE_DEBITO = {
  "10": { sapienza:10, eta_min:0,  coeff:1.2, pop_max:14, dial_max:2, prestigio_bonus:3  },
  "20": { sapienza:20, eta_min:30, coeff:1.3, pop_max:16, dial_max:3, prestigio_bonus:6  },
  "30": { sapienza:30, eta_min:35, coeff:1.4, pop_max:18, dial_max:4, prestigio_bonus:9  },
  "40": { sapienza:40, eta_min:40, coeff:1.5, pop_max:20, dial_max:5, prestigio_bonus:12 },
  "50": { sapienza:50, eta_min:45, coeff:1.6, pop_max:22, dial_max:6, prestigio_bonus:15 },
  "60": { sapienza:60, eta_min:50, coeff:1.7, pop_max:24, dial_max:7, prestigio_bonus:18 }
};

// Costo in Galeoni del Livello I di ogni Conoscenza (una tantum, per ogni ramo sviluppato).
var DEBITO_COSTO_GALEONI_LIVELLO1 = 50;
// Costo cumulativo in Punti Post per raggiungere un certo Livello di una Conoscenza
// Magica (Livello II +5, Livello III +10 in più, Livello IV +15 in più; il Livello V
// non è acquistabile tramite Crescita a Debito).
var DEBITO_COSTO_PP_LIVELLO = {0:0, 1:0, 2:5, 3:15, 4:30};
// Le Sapienze Fisiche e Sociali condividono lo stesso costo: 150 Galeoni per il
// Livello I, poi +10 e +20 Punti Post. Tramite Crescita a Debito possono arrivare
// al massimo al Livello III.
var DEBITO_COSTO_GALEONI_LIVELLO1_FISICO_SOCIALE = 150;
var DEBITO_COSTO_PP_LIVELLO_FISICO_SOCIALE = {0:0, 1:0, 2:10, 3:30};
// Costo cumulativo in Galeoni per la Dialettica oltre il primo punto (gratuito):
// 50 per il 2° punto, 100 per il 3°, 200 per il 4°, e così via raddoppiando.
function debito_costo_dialettica(valore){
  var costo = 0;
  var punto = 50;
  for(var v=2; v<=valore; v++){
    costo += punto;
    punto = punto * 2;
  }
  return costo;
}

var SAPIENZE = {
  "Generica":       { classe:"m-",    titolo:"Sapienza...",         conoscenze:["Conoscenza 1","Conoscenza 2","Conoscenza 3","Conoscenza 4","Conoscenza 5"] },
  "Arcaica":        { classe:"m-arc", titolo:"Sapienza Arcaica",       conoscenze:["Appare Vestigium","Avensegium","Esorcista","Spezzaincantesimi","Tracciante"] },
  "Difensiva":      { classe:"m-dif", titolo:"Sapienza Difensiva",     conoscenze:["Energia Difensiva","Protego Maxima","Protego Totalum","Protego Volantis","Repello Inimicum"] },
  "Divinatoria":    { classe:"m-veg", titolo:"Sapienza Divinatoria",   conoscenze:["Visione del Passato","Proiezione Astrale","Psicometria del Futuro","Chiaroveggenza","Psicometria del Passato"] },
  "Elementale":     { classe:"m-ele", titolo:"Sapienza Elementale",    conoscenze:["Aqua Eructo","Dominusterra","Incendio Maxima","Manipolo","Ventus Maxima"] },
  "Erbologica":     { classe:"m-erb", titolo:"Sapienza Erbologica",    conoscenze:["Erborista","Amico delle Piante","Custode delle Piante","Coltivatore di Piante","Pax"] },
  "Magizoologica":  { classe:"m-cre", titolo:"Sapienza Magizoologica", conoscenze:["Amico delle Creature","Addestratore di Creature","Custode delle Creature","Allevatore di Creature","Imposium"] },
  "Medimagica":     { classe:"m-med", titolo:"Sapienza Medimagica",    conoscenze:["Diagnosta","Terapista","Chirurgo","Emendo","Vulnera Sanentur"] },
  "Mentale":        { classe:"m-men", titolo:"Sapienza Mentale",       conoscenze:["Desiderium","Dissimulo","Legilimens","Oblivion","Occlumanzia"] },
  "Offensiva":      { classe:"m-off", titolo:"Sapienza Offensiva",     conoscenze:["Ad Caelum","Ardor","Bombarda Maxima","Confractus","Energia Offensiva"] },
  "Oscura":         { classe:"m-osc", titolo:"Sapienza Oscura",        conoscenze:["Ardemonio","Damnum","Dolohoferio","Ritualista Oscuro","Sectumsempra"] },
  "Pozionistica":   { classe:"m-poz", titolo:"Sapienza Pozionistica",  conoscenze:["Speziale","Chimico","Calderaio","Tocco Magico","Distillatore"] },
  "Trasfigurativa": { classe:"m-tra", titolo:"Sapienza Trasfigurativa",conoscenze:["Commutatio","Evanesco","Evocatio","Locomotor","Verto"] },
  "Rapidità":       { classe:"s-fis", titolo:"Sapienza Fisica — Rapidità",   tipo:"fisica",  conoscenze:["Livello"] },
  "Prestanza":      { classe:"s-fis", titolo:"Sapienza Fisica — Prestanza",  tipo:"fisica",  conoscenze:["Livello"] },
  "Resilienza":     { classe:"s-fis", titolo:"Sapienza Fisica — Resilienza", tipo:"fisica",  conoscenze:["Livello"] },
  "Vigore":         { classe:"s-fis", titolo:"Sapienza Fisica — Vigore",     tipo:"fisica",  conoscenze:["Livello"] },
  "Leader":         { classe:"s-soc", titolo:"Sapienza Sociale — Leader",     tipo:"sociale", conoscenze:["Livello"] },
  "Motivatore":     { classe:"s-soc", titolo:"Sapienza Sociale — Motivatore", tipo:"sociale", conoscenze:["Livello"] },
  "Oppositore":     { classe:"s-soc", titolo:"Sapienza Sociale — Oppositore", tipo:"sociale", conoscenze:["Livello"] },
  "Persuasore":     { classe:"s-soc", titolo:"Sapienza Sociale — Persuasore", tipo:"sociale", conoscenze:["Livello"] }
};

var CATEGORIA_SAPIENZE_AFFINI = {
  "Acumen":  ["Arcaica","Trasfigurativa"],
  "Animus":  ["Magizoologica","Erbologica"],
  "Ars":     ["Pozionistica","Medimagica"],
  "Numen":   ["Difensiva","Offensiva"],
  "Sensus":  ["Divinatoria","Elementale"],
  "Voluntas":["Oscura","Mentale"]
};

var MATERIE_FACOLTATIVE = {
  "antiche_rune": {
    nome: "Antiche Rune",
    html: '<details><summary><i class="fa-solid fa-scroll"></i> <u>Antiche Rune</u></summary>\n' +
      '<a href="?t=80421518#scrittura">Scritture Runiche (V anno)</a>\n' +
      '<a href="?t=80421518#benedizioni">Benedizioni Runiche (VI anno)</a>\n' +
      '<a href="?t=80421518#runista">Runista Magico (VII anno)</a></details>'
  },
  "aritmanzia": {
    nome: "Aritmanzia",
    html: '<details><summary><i class="fa-solid fa-infinity"></i> <u>Aritmanzia</u></summary>\n' +
      '<a href="?t=80421518#archimede">Sigillo di Archimede (V anno)</a>\n' +
      '<a href="?t=80421518#pitagora">Sigillo di Pitagora (VI anno)</a>\n' +
      '<a href="?t=80421518#euclide">Sigillo di Euclide (VII anno)</a></details>'
  },
  "babbanologia": {
    nome: "Babbanologia",
    html: '<details><summary><i class="fa-solid fa-radio"></i> <u>Babbanologia</u></summary>\n' +
      '<a href="?t=80421518#cultura">Cultura Babbana (V anno)</a>\n' +
      '<a href="?t=80421518#manualità">Manualità Babbana (VI anno)</a>\n' +
      '<a href="?t=80421518#dentro">Babbano Dentro (VII anno)</a></details>'
  },
  "cura_creature": {
    nome: "Cura delle Creature Magiche",
    html: '<details><summary><i class="fa-solid fa-dragon"></i> <u>Cura delle Creature Magiche</u></summary>\n' +
      '<b>V anno</b>\n' +
      'Creature X\n' +
      'Asticello\n' +
      'Augurey\n' +
      'Cavallo Alato\n' +
      'Mooncalf\n' +
      'Clabbert\n' +
      'Chizpurfle\n' +
      'Diricawl\n' +
      'Porlock\n' +
      '<b>VI anno</b>\n' +
      'Altre Creature XXX\n' +
      'Ashwinder\n' +
      'Fiammagranchio\n' +
      'Fwooper\n' +
      'Ippogrifo\n' +
      'Salamandra\n' +
      'Velenottero\n' +
      'Purvincolo\n' +
      'Dugbog\n' +
      'Jarvey\n' +
      '<b>VII anno</b>\n' +
      'Altre Creature XXXX ed Esseri\n' +
      'Centauro\n' +
      'Graphorn\n' +
      'Kappa\n' +
      'Fenice\n' +
      'Maridi\n' +
      'Matagot\n' +
      'Thestral\n' +
      'Unicorno\n' +
      'Quintaped\n' +
      '</details>'
  },
  "divinazione": {
    nome: "Divinazione",
    html: '<details><summary><i class="fa-solid fa-hand-sparkles"></i> <u>Divinazione</u></summary>\n' +
      '<b>V anno</b>\n' +
      'Divinazione degli Indumenti\n' +
      'Divinazione del Fumo\n' +
      'Divinazione del Fuoco\n' +
      'Divinazione del Legno\n' +
      'Divinazione del Sale\n' +
      'Divinazione delle Piante Cadute\n' +
      'Lettura dei Fondi del Tè\n' +
      'Lettura delle Macchie\n' +
      'Lettura delle Nuvole\n' +
      'Tema Natale\n' +
      '<b>VI anno</b>\n' +
      'Divinazione delle Gemme\n' +
      'Divinazione del Meteo\n' +
      'Divinazione dei Libri\n' +
      'Divinazione delle Piante\n' +
      'Divinazione degli Uccelli\n' +
      'Lettura della Mano\n' +
      'Lettura dei Tarocchi\n' +
      'Meditazione\n' +
      'Uso della Sfera di Cristallo\n' +
      'Yoga\n' +
      '<b>VII anno</b>\n' +
      'Divinazione Ancestrale dei Cadaveri\n' +
      'Divinazione delle Ceneri\n' +
      'Divinazione delle Lettere\n' +
      'Divinazione Runica\n' +
      'Interpretazione dei Sogni\n' +
      'Lettura dei Volti\n' +
      'Numerologia\n' +
      'Ritrovare gli Oggetti Smarriti\n' +
      'Ritrovare la Strada Persa\n' +
      'Uso della Tavola Ouija\n' +
      '</details>'
  }
};

var MATERIE_ORDINE = ["antiche_rune","aritmanzia","babbanologia","cura_creature","divinazione"];
var MATERIE_ANNO_BABBANOLOGIA_OBBLIGATORIA = 2007;

var MAGICI_TOTALE = 75;
var MAGICI_MIN_ALTRI = 4;
var MAGICI_MAX_ALTRI = 14;

var FISICI_TOTALE = 50;
var FISICI_MIN = 8;
var FISICI_MAX = 17;

var field_ids = ["categoria","mestiere","intracciabile","anno_nascita",
  "acume","empatia","percezione","potenza","tecnica","volonta",
  "destrezza","fatica","resistenza","salute",
  "dialettica","popolarita","eta_prestigio","debito_tier","prestigio_valore",
  "sapienza_iniziale","sapienza_celata",
  "mf_antiche_rune","mf_aritmanzia","mf_babbanologia","mf_cura_creature","mf_divinazione",
  "debito_sap_1","debito_sap_2","debito_sap_3","debito_sap_4","debito_sap_5",
  "debito_sap_1_celata","debito_sap_2_celata","debito_sap_3_celata","debito_sap_4_celata","debito_sap_5_celata"];

var el = {};
for(var i=0; i<field_ids.length; i++){
  el[field_ids[i]] = document.getElementById(field_ids[i]);
}

var magici_ids = ["acume","empatia","percezione","potenza","tecnica","volonta"];
var fisici_ids = ["destrezza","fatica","resistenza","salute"];

function num(id){
  var v = parseFloat(el[id].value);
  return isNaN(v) ? 0 : v;
}

// Calcola l'età del PG dall'Anno di nascita e dalla data corrente del dispositivo.
// Restituisce null se l'Anno di nascita non è ancora stato inserito.
function calcola_eta(){
  var anno_nascita = parseInt(el.anno_nascita.value, 10);
  if(!anno_nascita || isNaN(anno_nascita)){ return null; }
  var anno_corrente = new Date().getFullYear();
  return anno_corrente - anno_nascita;
}

function set_invalid(id, invalid){
  if(invalid){
    el[id].classList.add('invalid');
  } else {
    el[id].classList.remove('invalid');
  }
}

// Determina la distribuzione richiesta per i Parametri Magici in base a
// Categoria Magica, Mestiere e flag Intracciabile.
// Restituisce: {tipo, catAffine, mestAffine} oppure null se mancano i dati.
function magici_distribuzione(){
  var categoria = el.categoria.value;
  var mestiere = el.mestiere.value;
  if(!categoria || !mestiere) return null;

  var catAffine = CATEGORIE_MAGICHE[categoria];
  var mestAffine = MESTIERI[mestiere];
  var intracc = el.intracciabile.checked;

  if(mestAffine === null){
    return { tipo: "senza_affine", catAffine: catAffine, mestAffine: null };
  }
  if(mestAffine === catAffine){
    return intracc
      ? { tipo: "uguali_intracciabile", catAffine: catAffine, mestAffine: mestAffine }
      : { tipo: "uguali", catAffine: catAffine, mestAffine: mestAffine };
  }
  return { tipo: "diversi", catAffine: catAffine, mestAffine: mestAffine };
}

function update_rules_hint_magici(){
  var box = document.getElementById('rules_hint_magici');
  var d = magici_distribuzione();
  if(!d){
    box.textContent = "Seleziona Categoria Magica e Mestiere per vedere i vincoli.";
    return;
  }
  if(d.tipo === "senza_affine"){
    box.textContent = "Totale richiesto: " + MAGICI_TOTALE + " punti. " + PARAM_LABEL[d.catAffine] + " (affine alla Categoria Magica) deve valere 18. Tutti gli altri parametri tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + ".";
    return;
  }
  if(d.tipo === "uguali"){
    box.textContent = "Totale richiesto: " + MAGICI_TOTALE + " punti. " + PARAM_LABEL[d.catAffine] + " (affine a Categoria Magica e Mestiere) deve valere 20. Tutti gli altri parametri tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + ".";
    return;
  }
  if(d.tipo === "uguali_intracciabile"){
    box.textContent = "Totale richiesto: " + MAGICI_TOTALE + " punti. " + PARAM_LABEL[d.catAffine] + " (affine a Categoria Magica e Mestiere, PG Intracciabile) deve valere 18. Tutti gli altri parametri tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + ".";
    return;
  }
  // diversi
  box.textContent = "Totale richiesto: " + MAGICI_TOTALE + " punti. " + PARAM_LABEL[d.catAffine] + " (affine alla Categoria Magica) deve valere 18. " + PARAM_LABEL[d.mestAffine] + " (affine al Mestiere) deve valere tra 15 e 18. Tutti gli altri parametri tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + ".";
}

function update_live_feedback_magici(){
  var d = magici_distribuzione();
  var somma = 0;
  for(var i=0; i<magici_ids.length; i++){
    somma += num(magici_ids[i]);
  }

  for(var j=0; j<magici_ids.length; j++){ set_invalid(magici_ids[j], false); }

  var box = document.getElementById('totale_magici_box');
  if(!d){
    box.textContent = "Totale: " + somma + " / " + MAGICI_TOTALE;
    box.className = "totale-box";
    return;
  }

  for(var k=0; k<magici_ids.length; k++){
    var id = magici_ids[k];
    var v = num(id);
    var invalid = false;
    if(d.tipo === "senza_affine"){
      invalid = (id === d.catAffine) ? (v !== 18) : (v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI);
    } else if(d.tipo === "uguali"){
      invalid = (id === d.catAffine) ? (v !== 20) : (v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI);
    } else if(d.tipo === "uguali_intracciabile"){
      invalid = (id === d.catAffine) ? (v !== 18) : (v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI);
    } else { // diversi
      if(id === d.catAffine){ invalid = (v !== 18); }
      else if(id === d.mestAffine){ invalid = (v < 15 || v > 18); }
      else{ invalid = (v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI); }
    }
    set_invalid(id, invalid);
  }

  var ok = (somma === MAGICI_TOTALE);
  box.textContent = "Totale: " + somma + " / " + MAGICI_TOTALE;
  box.className = "totale-box " + (ok ? "ok" : "bad");
}

function update_live_feedback_fisici(){
  var somma = 0;
  var elevati = 0;
  for(var i=0; i<fisici_ids.length; i++){
    somma += num(fisici_ids[i]);
    if(num(fisici_ids[i]) > FISICI_MAX){ elevati++; }
  }
  for(var j=0; j<fisici_ids.length; j++){
    var v = num(fisici_ids[j]);
    var fuori_range = (v < FISICI_MIN || v > FISICI_MAX + 1);
    var troppi_elevati = (v > FISICI_MAX ? (elevati > 1) : false);
    set_invalid(fisici_ids[j], fuori_range || troppi_elevati);
  }
  var box = document.getElementById('totale_fisici_box');
  var ok = (somma === FISICI_TOTALE) ? (elevati <= 1) : false;
  box.textContent = "Totale: " + somma + " / " + FISICI_TOTALE +
    " (Salute in scheda comparirà come " + (num("salute") * 5) + ")" +
    (elevati > 1 ? " — troppi parametri elevati oltre " + FISICI_MAX : "");
  box.className = "totale-box " + (ok ? "ok" : "bad");
}

function prestigio_range(){
  var eta = el.eta_prestigio.value;
  if(eta === "neodiplomato" || eta === "cambio"){ return {min:0, max:0}; }
  if(eta === "19"){ return {min:0, max:12}; }
  if(eta === "20"){ return {min:0, max:24}; }
  if(eta === "21plus"){ return {min:0, max:36}; }
  if(eta === "debito"){
    var fascia = FASCE_DEBITO[el.debito_tier.value];
    var bonus = fascia ? fascia.prestigio_bonus : 0;
    return {min:0, max:36 + bonus};
  }
  return null;
}

// Stabilisce se una data opzione della select Prestigio è compatibile con
// l'età calcolata dalla nascita del PG (e, per "debito", con la fascia scelta).
function eta_prestigio_disponibile(valore, eta){
  if(valore === "neodiplomato"){ return (eta !== null) ? (eta === 17 || eta === 18) : false; }
  if(valore === "19"){ return (eta !== null) ? (eta === 19) : false; }
  if(valore === "20"){ return (eta !== null) ? (eta === 20) : false; }
  if(valore === "21plus"){ return (eta !== null) ? (eta >= 21) : false; }
  if(valore === "debito"){
    var fascia = FASCE_DEBITO[el.debito_tier.value];
    if(!el.debito_tier.value || !fascia){ return false; }
    if(fascia.eta_min ? (eta === null || eta < fascia.eta_min) : false){ return false; }
    return true;
  }
  if(valore === "cambio"){ return true; }
  return true;
}

// Disabilita nella select Prestigio le opzioni incompatibili con l'età calcolata,
// senza ricostruire la select. Azzera la selezione se diventa incompatibile.
function aggiorna_disponibilita_eta_prestigio(){
  var eta = calcola_eta();
  var opzioni = el.eta_prestigio.options;
  for(var i=0; i<opzioni.length; i++){
    var val = opzioni[i].value;
    if(val === ""){ continue; }
    opzioni[i].disabled = !eta_prestigio_disponibile(val, eta);
  }
  var corrente = el.eta_prestigio.value;
  if(corrente ? !eta_prestigio_disponibile(corrente, eta) : false){
    el.eta_prestigio.value = "";
  }
}

function update_prestigio_ui(){
  aggiorna_disponibilita_eta_prestigio();

  var box = document.getElementById('rules_hint_prestigio');
  var r = prestigio_range();
  if(!r){
    box.textContent = "Seleziona la fascia d'età per vedere il range consentito.";
    set_invalid("prestigio_valore", false);
  } else {
    box.textContent = "Valore consentito: da " + r.min + " a " + r.max + ".";
    var v = num("prestigio_valore");
    set_invalid("prestigio_valore", (v < r.min || v > r.max));
  }

  update_debito_ui();
}

function populate_select(select, options, placeholder){
  var current = select.value;
  select.innerHTML = "";
  var opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = placeholder;
  select.appendChild(opt0);
  for(var i=0; i<options.length; i++){
    var o = document.createElement("option");
    o.value = options[i];
    o.textContent = options[i];
    select.appendChild(o);
  }
  var stillValid = false;
  for(var j=0; j<select.options.length; j++){
    if(select.options[j].value === current){ stillValid = true; break; }
  }
  if(stillValid){ select.value = current; }
}

function update_sapienza_scelta(){
  var categoria = el.categoria.value;
  var intracc = el.intracciabile.checked;
  var select = el.sapienza_iniziale;

  if(intracc){
    var sapienze_magiche = [];
    for(var key in SAPIENZE){
      if(!SAPIENZE[key].tipo){ sapienze_magiche.push(key); }
    }
    populate_select(select, sapienze_magiche, "— seleziona —");
    select.disabled = false;
  } else if(categoria){
    populate_select(select, CATEGORIA_SAPIENZE_AFFINI[categoria] || [], "— seleziona —");
    select.disabled = false;
  } else {
    populate_select(select, [], "— seleziona prima Categoria Magica —");
    select.disabled = true;
  }

  if(intracc){
    el.sapienza_celata.disabled = false;
  } else {
    el.sapienza_celata.disabled = true;
    el.sapienza_celata.checked = false;
  }
}

function update_rules_hint_sapienza(){
  var box = document.getElementById('rules_hint_sapienza');
  var categoria = el.categoria.value;
  var intracc = el.intracciabile.checked;
  if(intracc){
    box.textContent = "PG Intracciabile: puoi scegliere una qualunque Sapienza Magica e tenerla celata senza vincoli.";
    return;
  }
  if(!categoria){
    box.textContent = "Seleziona la Categoria Magica per vedere le Sapienze affini selezionabili.";
    return;
  }
  var affini = CATEGORIA_SAPIENZE_AFFINI[categoria] || [];
  box.textContent = "Sapienze affini alla Categoria Magica " + categoria + ": " + affini.join(" o ") + ". Con una sola Sapienza scelta, questa resta pubblica (non celabile) perché non sei un PG Intracciabile.";
}

var debito_slot_ids = ["debito_sap_1","debito_sap_2","debito_sap_3","debito_sap_4","debito_sap_5"];

function debito_fascia_attiva(){
  return el.debito_tier.value ? FASCE_DEBITO[el.debito_tier.value] : null;
}

function update_debito_sapienza_options(){
  var iniziale = el.sapienza_iniziale.value;
  var scelti = [];
  for(var i=0; i<debito_slot_ids.length; i++){
    var v = el[debito_slot_ids[i]].value;
    if(v){ scelti.push(v); }
  }

  for(var j=0; j<debito_slot_ids.length; j++){
    var select = el[debito_slot_ids[j]];
    var current = select.value;
    var magiche = iniziale ? 1 : 0;
    var fisiche = 0;
    var sociali = 0;
    for(var c=0; c<debito_slot_ids.length; c++){
      if(c === j){ continue; }
      var scelta = el[debito_slot_ids[c]].value;
      if(!scelta){ continue; }
      if(SAPIENZE[scelta].tipo === "fisica"){
        fisiche++;
      } else if(SAPIENZE[scelta].tipo === "sociale"){
        sociali++;
      } else {
        magiche++;
      }
    }

    var opzioni = [];
    for(var key in SAPIENZE){
      if(key === iniziale){ continue; }
      if(scelti.indexOf(key) !== -1 ? (key !== current) : false){ continue; }
      if(SAPIENZE[key].tipo === "fisica" ? (fisiche >= 2) : false){ continue; }
      if(SAPIENZE[key].tipo === "sociale" ? (sociali >= 2) : false){ continue; }
      if(!SAPIENZE[key].tipo ? (magiche >= 4) : false){ continue; }
      opzioni.push(key);
    }
    select.innerHTML = "";
    var opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = "— nessuna —";
    select.appendChild(opt0);
    for(var k=0; k<opzioni.length; k++){
      var o = document.createElement("option");
      o.value = opzioni[k];
      o.textContent = SAPIENZE[opzioni[k]].titolo;
      select.appendChild(o);
    }
    var stillValid = false;
    for(var m=0; m<select.options.length; m++){
      if(select.options[m].value === current){ stillValid = true; break; }
    }
    select.value = stillValid ? current : "";
  }
}

function render_debito_livelli(slot_num){
  var prefix = (slot_num === 0) ? "debito_sap_iniziale" : "debito_sap_" + slot_num;
  var select = (slot_num === 0) ? el.sapienza_iniziale : el[prefix];
  var container = document.getElementById(prefix + "_livelli");
  var key = select.value;

  if(slot_num > 0){
    var celata_wrap = document.getElementById(prefix + "_celata_wrap");
    var celata_checkbox = el[prefix + "_celata"];
    if(celata_wrap ? celata_checkbox : false){
      celata_wrap.style.display = key ? "flex" : "none";
      celata_checkbox.checked = false;
    }
  }

  var precedenti = {};
  for(var p=0; p<5; p++){
    var vecchio = document.getElementById(prefix + "_liv_" + p);
    if(vecchio){ precedenti[p] = vecchio.value; }
  }
  container.innerHTML = "";
  if(!key || (slot_num === 0 ? !debito_fascia_attiva() : false)){ return; }
  var conoscenze = SAPIENZE[key].conoscenze;
  var max_livello = SAPIENZE[key].tipo ? 3 : 4;
  var min_livello = (slot_num === 0) ? 1 : 0;
  for(var i=0; i<conoscenze.length; i++){
    var row = document.createElement("div");
    row.className = "debito-livello-row";
    var span = document.createElement("span");
    span.textContent = conoscenze[i];
    var livello_select = document.createElement("select");
    livello_select.id = prefix + "_liv_" + i;
    var etichette = ["0 (non svilup.)","Livello I","Livello II","Livello III","Livello IV","Livello V"];
    for(var l=min_livello; l<=max_livello; l++){
      var opt = document.createElement("option");
      opt.value = l;
      opt.textContent = etichette[l];
      livello_select.appendChild(opt);
    }
    if(precedenti[i] !== undefined ? (parseInt(precedenti[i], 10) >= min_livello ? (parseInt(precedenti[i], 10) <= max_livello) : false) : false){
      livello_select.value = precedenti[i];
    } else if(slot_num === 0){
      livello_select.value = 1;
    }
    livello_select.addEventListener('change', update_debito_totali_ui);
    row.appendChild(span);
    row.appendChild(livello_select);
    container.appendChild(row);
  }
}

function debito_slot_dati(slot_num){
  var prefix = (slot_num === 0) ? "debito_sap_iniziale" : "debito_sap_" + slot_num;
  var key = (slot_num === 0) ? el.sapienza_iniziale.value : el[prefix].value;
  if(!key){ return null; }
  var livelli = [];
  var conoscenze = SAPIENZE[key].conoscenze;
  for(var i=0; i<conoscenze.length; i++){
    var sel = document.getElementById(prefix + "_liv_" + i);
    var livello = sel ? parseInt(sel.value, 10) : ((slot_num === 0) ? 1 : 0);
    livelli.push(isNaN(livello) ? ((slot_num === 0) ? 1 : 0) : livello);
  }
  return { key: key, livelli: livelli };
}

function debito_costo_sapienza(key, livelli){
  var somma = 0;
  var costo_galeoni = 0;
  var costo_pp = 0;
  var costo_galeoni_livello1 = SAPIENZE[key].tipo ? DEBITO_COSTO_GALEONI_LIVELLO1_FISICO_SOCIALE : DEBITO_COSTO_GALEONI_LIVELLO1;
  var costo_pp_livello = SAPIENZE[key].tipo ? DEBITO_COSTO_PP_LIVELLO_FISICO_SOCIALE : DEBITO_COSTO_PP_LIVELLO;
  for(var i=0; i<livelli.length; i++){
    var l = livelli[i];
    somma += l;
    if(l >= 1){
      costo_galeoni += costo_galeoni_livello1;
    }
    costo_pp += costo_pp_livello[l];
  }
  return { somma: somma, costo_galeoni: costo_galeoni, costo_pp: costo_pp };
}

function debito_totali(){
  var fascia = debito_fascia_attiva();
  var iniziale = null;
  var slots = [];
  var somma_totale = 0;
  var somma_invalida = false;
  var costo_galeoni_sapienza = 0;
  var costo_galeoni_sapienza_iniziale = 0;
  var costo_pp_totale = 0;
  var sapienze_magiche_totali = el.sapienza_iniziale.value ? 1 : 0;
  var sapienze_fisiche_totali = 0;
  var sapienze_sociali_totali = 0;

  if(fascia ? el.sapienza_iniziale.value : false){
    var dati_iniziali = debito_slot_dati(0);
    var costo_iniziale = debito_costo_sapienza(dati_iniziali.key, dati_iniziali.livelli);
    for(var il=0; il<dati_iniziali.livelli.length; il++){
      if(dati_iniziali.livelli[il] < 1 || dati_iniziali.livelli[il] > 4){ somma_invalida = true; }
    }
    somma_totale += costo_iniziale.somma;
    costo_galeoni_sapienza_iniziale = costo_iniziale.costo_galeoni;
    costo_galeoni_sapienza += costo_iniziale.costo_galeoni;
    costo_pp_totale += costo_iniziale.costo_pp;
    iniziale = { key: dati_iniziali.key, livelli: dati_iniziali.livelli, somma: costo_iniziale.somma, celata: el.sapienza_celata.checked };
  }

  for(var s=1; s<=debito_slot_ids.length; s++){
    var dati = debito_slot_dati(s);
    if(!dati){ continue; }
    var c = debito_costo_sapienza(dati.key, dati.livelli);
    var max_livello_sapienza = SAPIENZE[dati.key].tipo ? 3 : 4;
    for(var sl=0; sl<dati.livelli.length; sl++){
      if(dati.livelli[sl] < 0 || dati.livelli[sl] > max_livello_sapienza){ somma_invalida = true; }
    }
    somma_totale += c.somma;
    costo_galeoni_sapienza += c.costo_galeoni;
    costo_pp_totale += c.costo_pp;
    if(SAPIENZE[dati.key].tipo === "fisica"){
      sapienze_fisiche_totali++;
    } else if(SAPIENZE[dati.key].tipo === "sociale"){
      sapienze_sociali_totali++;
    } else {
      sapienze_magiche_totali++;
    }
    slots.push({ key: dati.key, livelli: dati.livelli, somma: c.somma, celata: el["debito_sap_" + s + "_celata"] ? el["debito_sap_" + s + "_celata"].checked : false });
  }

  var totale_sapienze = sapienze_magiche_totali + sapienze_fisiche_totali + sapienze_sociali_totali;
  var combinazione_invalida = sapienze_magiche_totali > 4 || sapienze_fisiche_totali > 2 || sapienze_sociali_totali > 2 || totale_sapienze > 6;

  var dialettica_valore = fascia ? num("dialettica") : 1;
  var costo_galeoni_dialettica = fascia ? debito_costo_dialettica(dialettica_valore) : 0;

  var costo_galeoni_base = costo_galeoni_sapienza + costo_galeoni_dialettica;
  var costo_pp_base = costo_pp_totale;

  var debito_galeoni = (fascia) ? Math.round(costo_galeoni_base * fascia.coeff) : 0;
  var debito_pp = (fascia) ? Math.round(costo_pp_base * fascia.coeff) : 0;

  return {
    fascia: fascia,
    iniziale: iniziale,
    slots: slots,
    somma_totale: somma_totale,
    somma_invalida: somma_invalida,
    combinazione_invalida: combinazione_invalida,
    sapienze_magiche_totali: sapienze_magiche_totali,
    sapienze_fisiche_totali: sapienze_fisiche_totali,
    sapienze_sociali_totali: sapienze_sociali_totali,
    totale_sapienze: totale_sapienze,
    dialettica_valore: dialettica_valore,
    costo_galeoni_sapienza: costo_galeoni_sapienza,
    costo_galeoni_sapienza_iniziale: costo_galeoni_sapienza_iniziale,
    costo_galeoni_dialettica: costo_galeoni_dialettica,
    costo_galeoni_base: costo_galeoni_base,
    costo_pp_base: costo_pp_base,
    debito_galeoni: debito_galeoni,
    debito_pp: debito_pp
  };
}

function update_debito_totali_ui(){
  var d = debito_totali();
  var box1 = document.getElementById('totale_debito_sapienza_box');
  var box2 = document.getElementById('totale_debito_costo_box');

  if(!d.fascia){
    box1.textContent = "Sapienza distribuita: —";
    box2.textContent = "Debito stimato: —";
    box1.className = "totale-box";
    box2.className = "totale-box";
    return;
  }

  var ok = (d.somma_totale === d.fascia.sapienza) ? (!d.somma_invalida ? !d.combinazione_invalida : false) : false;
  box1.textContent = "Sapienza distribuita: " + d.somma_totale + " / " + d.fascia.sapienza +
    " — Sapienze totali: " + d.totale_sapienze + " / 6 (" + d.sapienze_magiche_totali + " Magiche, " + d.sapienze_fisiche_totali + " Fisiche, " + d.sapienze_sociali_totali + " Sociali)" +
    (d.somma_invalida ? " — una Sapienza supera il proprio Livello massimo" : "") +
    (d.combinazione_invalida ? " — combinazione di Sapienze non consentita" : "");
  box1.className = "totale-box " + (ok ? "ok" : "bad");

  box2.textContent = "Debito stimato: " + d.debito_galeoni + " Galeoni, " + d.debito_pp + " Punti Post " +
    "(costo base " + d.costo_galeoni_base + " Galeoni e " + d.costo_pp_base + " Punti Post, inclusi " + d.costo_galeoni_sapienza_iniziale + " Galeoni della Sapienza di partenza, Coefficiente ×" + d.fascia.coeff + ")";
  box2.className = "totale-box";
}

function update_debito_ui(){
  var fascia = debito_fascia_attiva();

  var hint_fascia = document.getElementById('rules_hint_fascia_debito');
  if(!fascia){
    hint_fascia.textContent = "Seleziona una fascia per vedere età minima, coefficiente di Debito e limiti di Popolarità/Dialettica.";
  } else {
    hint_fascia.textContent = "Sapienza da distribuire: " + fascia.sapienza + ". Età minima del PG: " +
      (fascia.eta_min ? fascia.eta_min + " anni" : "nessuna") + ". Coefficiente di Debito: " + fascia.coeff +
      ". Popolarità fino a " + fascia.pop_max + ". Dialettica fino a " + fascia.dial_max + ".";
  }

  el.dialettica.disabled = !fascia;
  el.dialettica.max = fascia ? fascia.dial_max : 1;
  if(!fascia){ el.dialettica.value = 1; }

  el.popolarita.max = fascia ? fascia.pop_max : 8;

  document.getElementById('debito_sap_iniziale_wrap').style.display = fascia ? "block" : "none";
  render_debito_livelli(0);

  var hint_sociali = document.getElementById('rules_hint_sociali');
  hint_sociali.textContent = fascia ?
    ("Con la Crescita a Debito scelta: Dialettica modificabile da 1 a " + fascia.dial_max + ", Popolarità da 1 a " + fascia.pop_max + ".") :
    "Dialettica fissa a 1 (salvo bonus/malus di Razza o Crescita a Debito). Popolarità da 1 a 8. Virtuoso e Sinistro partono da \"//\" (si conquistano giocando).";

  update_debito_sapienza_options();
  for(var ds=0; ds<debito_slot_ids.length; ds++){
    el[debito_slot_ids[ds]].disabled = !fascia;
    var livello_selects = document.getElementById(debito_slot_ids[ds] + "_livelli").getElementsByTagName("select");
    for(var dl=0; dl<livello_selects.length; dl++){
      livello_selects[dl].disabled = !fascia;
    }
  }
  update_debito_totali_ui();
}

function materie_scelte(){
  var scelte = [];
  for(var i=0; i<MATERIE_ORDINE.length; i++){
    var key = MATERIE_ORDINE[i];
    if(el["mf_" + key].checked){ scelte.push(key); }
  }
  return scelte;
}

function update_rules_hint_materie(){
  var box = document.getElementById('rules_hint_materie');
  var scelte = materie_scelte();
  var anno = num("anno_nascita");
  var babbanologia_obbligatoria = (anno >= MATERIE_ANNO_BABBANOLOGIA_OBBLIGATORIA);

  var testo = "Scelte: " + scelte.length + " / 3.";
  if(babbanologia_obbligatoria){
    testo += " Il PG è nato dal " + MATERIE_ANNO_BABBANOLOGIA_OBBLIGATORIA + " in poi: Babbanologia è obbligatoria tra le Materie Facoltative.";
  }
  box.textContent = testo;
  box.className = "rules-hint" + (scelte.length > 3 || (babbanologia_obbligatoria ? !el.mf_babbanologia.checked : false) ? " totale-box bad" : "");
}

function update_live_feedback(){
  update_live_feedback_magici();
  update_live_feedback_fisici();
  update_prestigio_ui();
  update_rules_hint_materie();
  var pop_max_attuale = parseInt(el.popolarita.max, 10) || 8;
  set_invalid("popolarita", (num("popolarita") < 1 || num("popolarita") > pop_max_attuale));
}

function validate(){
  var errori = [];

  if(!el.categoria.value){ errori.push("Seleziona la Categoria Magica."); }
  if(!el.mestiere.value){ errori.push("Seleziona il Mestiere."); }

  var d = magici_distribuzione();
  if(d){
    var somma_magici = 0;
    for(var i=0; i<magici_ids.length; i++){
      var id = magici_ids[i];
      var v = num(id);
      somma_magici += v;
      var invalid = false;
      var label = PARAM_LABEL[id];
      if(d.tipo === "senza_affine"){
        if(id === d.catAffine){
          if(v !== 18){ errori.push(label + " (affine alla Categoria Magica) deve valere esattamente 18 (attuale: " + v + ")."); }
        } else if(v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI){
          errori.push(label + " deve essere tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + " (attuale: " + v + ").");
        }
      } else if(d.tipo === "uguali"){
        if(id === d.catAffine){
          if(v !== 20){ errori.push(label + " (affine a Categoria Magica e Mestiere) deve valere esattamente 20 (attuale: " + v + ")."); }
        } else if(v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI){
          errori.push(label + " deve essere tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + " (attuale: " + v + ").");
        }
      } else if(d.tipo === "uguali_intracciabile"){
        if(id === d.catAffine){
          if(v !== 18){ errori.push(label + " (affine a Categoria Magica e Mestiere, PG Intracciabile) deve valere esattamente 18 (attuale: " + v + ")."); }
        } else if(v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI){
          errori.push(label + " deve essere tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + " (attuale: " + v + ").");
        }
      } else { // diversi
        if(id === d.catAffine){
          if(v !== 18){ errori.push(label + " (affine alla Categoria Magica) deve valere esattamente 18 (attuale: " + v + ")."); }
        } else if(id === d.mestAffine){
          if(v < 15 || v > 18){ errori.push(label + " (affine al Mestiere) deve essere tra 15 e 18 (attuale: " + v + ")."); }
        } else if(v < MAGICI_MIN_ALTRI || v > MAGICI_MAX_ALTRI){
          errori.push(label + " deve essere tra " + MAGICI_MIN_ALTRI + " e " + MAGICI_MAX_ALTRI + " (attuale: " + v + ").");
        }
      }
    }
    if(somma_magici !== MAGICI_TOTALE){
      errori.push("La somma dei Parametri Magici deve essere " + MAGICI_TOTALE + " (attuale: " + somma_magici + ").");
    }
  }

  var somma_fisici = 0;
  var fuori_range_conteggio = 0;
  for(var j=0; j<fisici_ids.length; j++){
    var vf = num(fisici_ids[j]);
    somma_fisici += vf;
    if(vf < FISICI_MIN || vf > FISICI_MAX + 1){
      errori.push("Parametro fisico '" + fisici_ids[j] + "' deve essere tra " + FISICI_MIN + " e " + (FISICI_MAX + 1) + " (attuale: " + vf + ").");
    } else if(vf > FISICI_MAX){
      fuori_range_conteggio++;
    }
  }
  if(fuori_range_conteggio > 1){
    errori.push("Solo 1 Parametro Fisico può arrivare a " + (FISICI_MAX + 1) + "; attualmente ce ne sono " + fuori_range_conteggio + ".");
  }
  if(somma_fisici !== FISICI_TOTALE){
    errori.push("La somma dei Parametri Fisici deve essere " + FISICI_TOTALE + " (attuale: " + somma_fisici + ").");
  }

  if(!el.eta_prestigio.value){
    errori.push("Seleziona la fascia d'età per il Prestigio.");
  } else {
    if(el.eta_prestigio.value === "debito" ? !el.debito_tier.value : false){
      errori.push("Seleziona la fascia di Debito.");
    }
    var r = prestigio_range();
    if(r){
      var pv = num("prestigio_valore");
      if(pv < r.min || pv > r.max){
        errori.push("Prestigio deve essere tra " + r.min + " e " + r.max + " per la fascia d'età selezionata (attuale: " + pv + ").");
      }
    }
  }

  var fascia_debito = debito_fascia_attiva();
  var pop = num("popolarita");
  if(fascia_debito){
    var eta_calcolata = calcola_eta();
    if(eta_calcolata === null){
      errori.push("Inserisci l'Anno di nascita del PG per validare la fascia di Crescita a Debito scelta.");
    } else if(fascia_debito.eta_min ? (eta_calcolata < fascia_debito.eta_min) : false){
      errori.push("La fascia di Debito scelta richiede un'Età minima di " + fascia_debito.eta_min + " anni (attuale: " + eta_calcolata + ").");
    }

    if(pop < 1 || pop > fascia_debito.pop_max){
      errori.push("Con questa fascia di Debito, la Popolarità deve essere tra 1 e " + fascia_debito.pop_max + " (attuale: " + pop + ").");
    }

    var dial = num("dialettica");
    if(dial < 1 || dial > fascia_debito.dial_max){
      errori.push("Con questa fascia di Debito, la Dialettica deve essere tra 1 e " + fascia_debito.dial_max + " (attuale: " + dial + ").");
    }

    var dt = debito_totali();
    if(dt.somma_invalida){
      errori.push("Le Sapienze Magiche possono arrivare al massimo al Livello IV per Conoscenza; le Sapienze Fisiche e Sociali al massimo al Livello III.");
    }
    if(dt.sapienze_magiche_totali > 4){
      errori.push("Ogni PG può sviluppare al massimo 4 Sapienze Magiche, compresa la Sapienza di partenza.");
    }
    if(dt.sapienze_fisiche_totali > 2){
      errori.push("Ogni PG può sviluppare al massimo 2 Sapienze Fisiche.");
    }
    if(dt.sapienze_sociali_totali > 2){
      errori.push("Ogni PG può sviluppare al massimo 2 Sapienze Sociali.");
    }
    if(dt.totale_sapienze > 6){
      errori.push("Ogni PG può sviluppare al massimo 6 Sapienze complessive, compresa la Sapienza di partenza.");
    }
    if(dt.somma_totale !== fascia_debito.sapienza){
      errori.push("La Sapienza distribuita nella Crescita a Debito deve essere esattamente " + fascia_debito.sapienza + " (attuale: " + dt.somma_totale + ").");
    }
  } else {
    if(pop < 1 || pop > 8){ errori.push("Popolarità deve essere tra 1 e 8."); }
  }

  if(!el.sapienza_iniziale.value){
    errori.push("Seleziona la Sapienza di partenza.");
  }
  if(el.sapienza_celata.checked ? !el.intracciabile.checked : false){
    errori.push("Con una sola Sapienza scelta, un PG non Intracciabile non può tenerla celata: deve avere almeno una Sapienza pubblica affine alla Categoria Magica.");
  }

  if(!el.anno_nascita.value){
    errori.push("Inserisci l'Anno di nascita del PG.");
  }
  var scelte_materie = materie_scelte();
  if(scelte_materie.length > 3){
    errori.push("Puoi scegliere al massimo 3 Materie Facoltative (attualmente selezionate: " + scelte_materie.length + ").");
  }
  var anno_nascita = num("anno_nascita");
  if(anno_nascita >= MATERIE_ANNO_BABBANOLOGIA_OBBLIGATORIA ? !el.mf_babbanologia.checked : false){
    errori.push("Un PG nato dal " + MATERIE_ANNO_BABBANOLOGIA_OBBLIGATORIA + " in poi deve obbligatoriamente aver scelto Babbanologia tra le Materie Facoltative.");
  }

  return errori;
}

function generate(){
  var errori = validate();
  var error_box = document.getElementById('error_box');
  var error_list = document.getElementById('error_list');
  document.getElementById('output_panel').style.display = 'block';

  if(errori.length > 0){
    error_list.innerHTML = "";
    for(var i=0; i<errori.length; i++){
      var li = document.createElement('li');
      li.textContent = errori[i];
      error_list.appendChild(li);
    }
    error_box.classList.add('show');
    error_box.style.display = 'block';
    document.getElementById('output').value = "";
    document.getElementById('output_panel').scrollIntoView({behavior:'smooth', block:'start'});
    return;
  }
  error_list.innerHTML = "";
  error_box.classList.remove('show');
  error_box.style.display = 'none';

  var categoria = el.categoria.value;
  var mestiere = el.mestiere.value;
  var intracc = el.intracciabile.checked;
  var scheda_class = intracc ? "schedaintracc" : CATEGORIA_CLASS[categoria];

  var acume = num("acume");
  var empatia = num("empatia");
  var percezione = num("percezione");
  var potenza = num("potenza");
  var tecnica = num("tecnica");
  var volonta = num("volonta");

  var destrezza = num("destrezza");
  var fatica = num("fatica");
  var resistenza = num("resistenza");
  var salute_raw = num("salute");
  var salute_display = salute_raw * 5;

  var popolarita = num("popolarita");
  var dialettica = num("dialettica") || 1;
  var prestigio_valore = num("prestigio_valore");
  var debito = debito_totali();

  var righe = [];
  righe.push('<div class="' + scheda_class + '"><div data-slide="effect:slide{left}; duration:200ms; buttons:buttons;" class="scheda_slide_base"><div data-label="Punti"><p class="titolo-scheda"><i class="fa-solid fa-chart-column"></i> PUNTI</p><div class="cont">');
  righe.push('<div class="magici"><table><th colspan="6">Parametri Magici</th>');
  righe.push('');
  righe.push('<tr class="nomi">');
  righe.push('<td>Acume</td>');
  righe.push('<td>Empatia</td>');
  righe.push('<td>Percezione</td>');
  righe.push('<td>Potenza</td>');
  righe.push('<td>Tecnica</td>');
  righe.push('<td>Volontà</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('<tr class="valori">');
  righe.push('<td>' + acume + '</td>');
  righe.push('<td>' + empatia + '</td>');
  righe.push('<td>' + percezione + '</td>');
  righe.push('<td>' + potenza + '</td>');
  righe.push('<td>' + tecnica + '</td>');
  righe.push('<td>' + volonta + '</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('</table></div>');
  righe.push('<div class="fisici"><table><th colspan="4">Parametri Fisici</th>');
  righe.push('');
  righe.push('<tr class="nomi">');
  righe.push('<td>Destrezza</td>');
  righe.push('<td>Fatica</td>');
  righe.push('<td>Resistenza</td>');
  righe.push('<td>Salute</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('<tr class="valori">');
  righe.push('<td>' + destrezza + '</td>');
  righe.push('<td>' + fatica + '</td>');
  righe.push('<td>' + resistenza + '</td>');
  righe.push('<td>' + salute_display + '</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('</table></div>');
  righe.push('<div class="sociali"><table><th colspan="4">Parametri Sociali</th>');
  righe.push('');
  righe.push('<tr class="nomi">');
  righe.push('<td>Dialettica</td>');
  righe.push('<td>Popolarità</td>');
  righe.push('<td>Virtuoso</td>');
  righe.push('<td>Sinistro</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('<tr class="valori">');
  righe.push('<td>' + dialettica + '</td>');
  righe.push('<td>' + popolarita + '</td>');
  righe.push('<td>//</td>');
  righe.push('<td>//</td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('<tr class="nomi">');
  righe.push('<td colspan="4" style="border-top: 2px dashed;border-bottom: 2px dashed; padding:7px"><b>Prestigio - ' + mestiere + '</b></td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('<tr class="valori">');
  righe.push('<td colspan="4"><div class="contpunti"><div class="max" style="width:' + prestigio_valore + '%"></div><div class="prestigio" style="width:' + prestigio_valore + '%">' + prestigio_valore + '</div></div></td>');
  righe.push('</tr>');
  righe.push('');
  righe.push('</table></div></div></div><div data-label="Sapienze"><p class="titolo-scheda"><i class="fa-solid fa-wand-sparkles"></i> SAPIENZE</p><div class="cont">');
  righe.push('');

  var sap_key = el.sapienza_iniziale.value;
  var sapienze_output = [];
  var livelli_iniziali_output = [];
  var somma_iniziale_output = 0;
  if(debito.fascia ? debito.iniziale : false){
    livelli_iniziali_output = debito.iniziale.livelli;
    somma_iniziale_output = debito.iniziale.somma;
  } else {
    for(var si=0; si<SAPIENZE[sap_key].conoscenze.length; si++){
      livelli_iniziali_output.push(1);
      somma_iniziale_output += 1;
    }
  }
  sapienze_output.push({ key: sap_key, livelli: livelli_iniziali_output, somma: somma_iniziale_output, celata: el.sapienza_celata.checked });

  if(debito.fascia){
    for(var ds=0; ds<debito.slots.length; ds++){
      sapienze_output.push(debito.slots[ds]);
    }
  }

  var sapienze_magiche_output = [];
  var sapienze_sociali_output = [];
  var sapienze_fisiche_output = [];
  for(var so=0; so<sapienze_output.length; so++){
    if(SAPIENZE[sapienze_output[so].key].tipo === "sociale"){
      sapienze_sociali_output.push(sapienze_output[so]);
    } else if(SAPIENZE[sapienze_output[so].key].tipo === "fisica"){
      sapienze_fisiche_output.push(sapienze_output[so]);
    } else {
      sapienze_magiche_output.push(sapienze_output[so]);
    }
  }
  sapienze_output = sapienze_magiche_output.concat(sapienze_sociali_output).concat(sapienze_fisiche_output);

  for(var sx=0; sx<sapienze_output.length; sx++){
    var sapienza_output = sapienze_output[sx];
    var sap = SAPIENZE[sapienza_output.key];
    var prefisso_celata = sapienza_output.celata ? '<i class="fa-solid fa-eye-slash"></i> ' : '';
    righe.push('<div class="sapienza"><table>');
    righe.push('');
    if(sap.tipo){
      righe.push('<tr><th class="' + sap.classe + '">' + prefisso_celata + sapienza_output.key + '</th><th><div class="indice" data-html="livello' + sapienza_output.livelli[0] + '"></div></th>');
      righe.push('</tr>');
      righe.push('');
    } else {
      righe.push('<tr><th colspan="2" class="' + sap.classe + '">' + prefisso_celata + sap.titolo + '</th>');
      righe.push('</tr>');
      righe.push('');
      for(var sc=0; sc<sap.conoscenze.length; sc++){
        righe.push('<tr>');
        righe.push('<td>' + sap.conoscenze[sc] + '</td>');
        righe.push('<td><div class="indice" data-html="livello' + sapienza_output.livelli[sc] + '"></div></td>');
        righe.push('</tr>');
        righe.push('');
      }
      righe.push('<tr>');
      righe.push('<td colspan="2">' + sap.titolo + ': ' + sapienza_output.somma + '/25</td>');
      righe.push('</tr>');
      righe.push('');
    }
    righe.push('</table></div>');
  }

  righe.push('</div></div><div data-label="Bagaglio"><p class="titolo-scheda"><i class="fa-solid fa-suitcase"></i> BAGAGLIO</p><div class="cont"><i class="fa-solid fa-coins"></i> <b>Galeoni:</b> //');
  righe.push('• 100 da spendere in Eventi, Role a pagamento o Acquisti di Oggetti');
  righe.push(debito.fascia ?
    ('<i class="fa-solid fa-receipt"></i> <b>Debito Galeoni (Coefficiente di Debito ×' + debito.fascia.coeff + '):</b> ' + debito.debito_galeoni) :
    '<i class="fa-solid fa-receipt"></i> <b>Debito Galeoni:</b> SE PRESENTE, ALTRIMENTI ELIMINARE LA VOCE');
  righe.push('');
  righe.push('<i class="fa-solid fa-up-long"></i> <b>Punti Post:</b> //');
  righe.push(debito.fascia ?
    ('<i class="fa-solid fa-receipt"></i> <b>Debito Punti Post:</b> ' + debito.debito_pp) :
    '<i class="fa-solid fa-receipt"></i> <b>Debito Punti Post:</b> SE PRESENTE, ALTRIMENTI ELIMINARE LA VOCE');
  righe.push('');
  righe.push('<hr>');
  righe.push('<i class="fa-solid fa-feather"></i> <b>Dispensa degli ingredienti:</b> (link se presente)');
  righe.push('');
  righe.push('<details><summary><i class="fa-solid fa-award"></i> <b>Premi Fanta Felix Felicis:</b></summary></details>');
  righe.push('<details><summary><i class="fa-solid fa-broom-ball"></i> <b>Oggetti:</b></summary></details>');
  righe.push('<details><summary><i class="fa-solid fa-flask-vial"></i> <b>Pozioni:</b></summary></details>');
  righe.push('<details><summary><i class="fa-solid fa-disease"></i> <b>Immunità:</b></summary></details>');
  righe.push('');
  righe.push('</div></div><div data-label="Conoscenze"><div class="cont"><p class="titolo-scheda"><i class="fa-solid fa-book-bookmark"></i> CONOSCENZE</p>');
  righe.push('<b><i class="fa-brands fa-fort-awesome"></i> Conoscenze Scolastiche</b>');
  righe.push('');
  var scelte_output = materie_scelte();
  if(scelte_output.length > 0){
    for(var mo=0; mo<scelte_output.length; mo++){
      righe.push(MATERIE_FACOLTATIVE[scelte_output[mo]].html);
      righe.push('');
    }
  } else {
    righe.push('//');
    righe.push('');
  }
  righe.push('<hr>');
  righe.push('<b><i class="fa-solid fa-plus"></i> Extra</b>');
  righe.push('');
  righe.push('<hr>');
  righe.push('<b><i class="fa-solid fa-trophy"></i> Avanzate</b>');
  righe.push('');
  righe.push('<hr>');
  righe.push('<b><i class="fa-solid fa-bookmark"></i> Altro</b>');
  righe.push('</div>');
  righe.push('</div></div></div>');

  var html = righe.join("\n");

  document.getElementById('output').value = html;
  document.getElementById('fallback_hint').classList.remove('show');
  document.getElementById('output_panel').scrollIntoView({behavior:'smooth', block:'start'});
}

el.categoria.addEventListener('change', function(){
  update_rules_hint_magici();
  update_rules_hint_sapienza();
  update_sapienza_scelta();
  update_live_feedback();
});
el.mestiere.addEventListener('change', function(){
  update_rules_hint_magici();
  update_live_feedback();
});
el.intracciabile.addEventListener('change', function(){
  update_rules_hint_magici();
  update_rules_hint_sapienza();
  update_sapienza_scelta();
  update_live_feedback();
});
el.eta_prestigio.addEventListener('change', function(){
  update_prestigio_ui();
});
el.debito_tier.addEventListener('change', function(){
  update_prestigio_ui();
});
el.sapienza_iniziale.addEventListener('change', function(){
  update_prestigio_ui();
});
el.dialettica.addEventListener('input', update_debito_totali_ui);
var debito_sap_slot_ids = ["debito_sap_1","debito_sap_2","debito_sap_3","debito_sap_4","debito_sap_5"];
for(var dsi=0; dsi<debito_sap_slot_ids.length; dsi++){
  (function(slot_num){
    el["debito_sap_" + slot_num].addEventListener('change', function(){
      render_debito_livelli(slot_num);
      update_debito_sapienza_options();
      update_debito_totali_ui();
    });
  })(dsi + 1);
}

var totali_watch_ids = magici_ids.concat(fisici_ids).concat(["popolarita","prestigio_valore"]);
for(var k=0; k<totali_watch_ids.length; k++){
  el[totali_watch_ids[k]].addEventListener('input', update_live_feedback);
}

el.anno_nascita.addEventListener('input', function(){
  update_rules_hint_materie();
  update_prestigio_ui();
});
var materie_ids = ["mf_antiche_rune","mf_aritmanzia","mf_babbanologia","mf_cura_creature","mf_divinazione"];
for(var mfk=0; mfk<materie_ids.length; mfk++){
  el[materie_ids[mfk]].addEventListener('change', update_rules_hint_materie);
}

document.getElementById('generate_btn').addEventListener('click', generate);

document.getElementById('continua_btn').addEventListener('click', function(){
  document.getElementById('screens_inner').classList.add('at-sapienze');
  window.scrollTo({top:0, behavior:'smooth'});
});
document.getElementById('indietro_btn').addEventListener('click', function(){
  document.getElementById('screens_inner').classList.remove('at-sapienze');
  window.scrollTo({top:0, behavior:'smooth'});
});

function show_copied(){
  var msg = document.getElementById('copied_msg');
  msg.classList.add('show');
  setTimeout(function(){ msg.classList.remove('show'); }, 1500);
}

function select_output_text(){
  var out = document.getElementById('output');
  out.focus();
  out.select();
  out.setSelectionRange(0, 999999);
}

function copy_output(){
  var out = document.getElementById('output');
  var hint = document.getElementById('fallback_hint');
  if(!out.value){ return; }

  if(navigator.clipboard ? window.isSecureContext : false){
    navigator.clipboard.writeText(out.value).then(function(){
      hint.classList.remove('show');
      show_copied();
    }, function(){
      fallback_copy(hint);
    });
    return;
  }
  fallback_copy(hint);
}

function fallback_copy(hint){
  var riuscito = false;
  try{
    select_output_text();
    riuscito = document.execCommand('copy');
  }catch(err){
    riuscito = false;
  }
  if(riuscito){
    hint.classList.remove('show');
    show_copied();
  } else {
    select_output_text();
    hint.classList.add('show');
  }
}

document.getElementById('copy_btn').addEventListener('click', copy_output);

document.getElementById('download_btn').addEventListener('click', function(){
  var text = document.getElementById('output').value;
  if(!text){ return; }
  var blob = new Blob([text], {type: "text/html"});
  var url = URL.createObjectURL(blob);
  var nome_file = ((el.categoria.value || "scheda") + "-" + (el.mestiere.value || "adulto")).toLowerCase().replace(/[^a-z0-9]+/g,'-');

  var box = document.getElementById('download_link_box');
  box.innerHTML = "";
  var link = document.createElement('a');
  link.href = url;
  link.download = "scheda-punti-" + nome_file + ".html";
  link.textContent = "Salva il file: scheda-punti-" + nome_file + ".html";
  link.className = "download-link";
  box.appendChild(link);
});

update_rules_hint_magici();
update_rules_hint_sapienza();
update_sapienza_scelta();
update_live_feedback();

} // fine init()

function mostra_errore_js(e){
  try{
    var banner = document.createElement('div');
    banner.style.cssText = 'background:#ffdddd;border:2px solid #cc0000;color:#660000;padding:12px 16px;margin:12px auto;max-width:820px;font-family:monospace;font-size:13px;white-space:pre-wrap;border-radius:6px;';
    banner.textContent = "Errore JavaScript nel generatore: " + ((e ? e.message : false) ? e.message : e) + " — probabilmente il forum ha alterato il codice (es. apici trasformati, tag script filtrato). Segnala questo messaggio a chi ha creato lo strumento.";
    document.body.insertBefore(banner, document.body.firstChild);
  } catch(e2){}
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", function(){
    try{ init(); } catch(e){ mostra_errore_js(e); }
  });
} else {
  try{ init(); } catch(e){ mostra_errore_js(e); }
}
