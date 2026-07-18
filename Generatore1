<script type="text/javascript"> 
const CAT_INFO = { 
 "Acumen": { class: "schedaacumen", color: "#4b7bc9" }, 
 "Animus": { class: "schedaanimus", color: "#c94b6e" }, 
 "Ars": { class: "schedaars", color: "#7b4bc9" }, 
 "Numen": { class: "schedanumen", color: "#4bc98f" }, 
 "Sensus": { class: "schedasensus", color: "#c9944b" }, 
 "Voluntas": { class: "schedavoluntas",color: "#c94b4b" }, 
 "Intracciabile":{ class: "schedaintracc", color: "#6b6b7d" } 
}; 
 
const fields = ["nome","foto","nascita","stirpe","bacchetta","allineamento", 
 "categoria","mestiere","scuola","animali","storia","infopub","infopriv", 
 "aspetto","carattere","relazioni"]; 
 
const el = {}; 
fields.forEach(id => el[id] = document.getElementById(id)); 
 
function updateCatPreview(){ 
 const cat = el.categoria.value; 
 const dot = document.getElementById('catDot'); 
 const label = document.getElementById('catLabel'); 
 const previewSpan = document.getElementById('catMestierePreview'); 
 if(cat && CAT_INFO[cat]){ 
 dot.style.setProperty('--catcolor', CAT_INFO[cat].color); 
 label.textContent = "categoria: " + cat + " &#8594; classe ." + CAT_INFO[cat].class; 
 } else { 
 dot.style.setProperty('--catcolor', '#c9a24b'); 
 label.textContent = "nessuna categoria selezionata"; 
 } 
 const mestiere = el.mestiere.value.trim(); 
 previewSpan.textContent = (cat || "Categoria") + (mestiere ? ", " + mestiere : ", Mestiere"); 
} 
 
function generate(){ 
 const nome = el.nome.value.trim() || "Nome e Cognome QUI"; 
 const foto = el.foto.value.trim() || "LINK FOTO QUI"; 
 const nascita = el.nascita.value.trim(); 
 const stirpe = el.stirpe.value.trim(); 
 const bacchetta = el.bacchetta.value.trim(); 
 const allineamento = el.allineamento.value; 
 const cat = el.categoria.value; 
 const mestiere = el.mestiere.value; 
 const scuola = el.scuola.value.trim(); 
 const animali = el.animali.value.trim() || "-"; 
 
 const storia = el.storia.value.trim(); 
 const infopub = el.infopub.value.trim(); 
 const infopriv = el.infopriv.value.trim(); 
 const aspetto = el.aspetto.value.trim(); 
 const carattere = el.carattere.value.trim(); 
 const relazioni = el.relazioni.value.trim(); 
 
 const schedaClass = (cat && CAT_INFO[cat]) ? CAT_INFO[cat].class : "schedanumen/schedaanimus/schedaars/schedavoluntas/schedasensus/schedaacumen/schedaintracc"; 
 const catMestiere = cat ? (cat + (mestiere ? ", " + mestiere : ",")) : ""; 
 
 const html = 
`<div class="${schedaClass}"><div data-slide="effect:slide{left}; duration:200ms; buttons:buttons;" class="scheda_slide_base"><div data-label="Generalità"> 
<div class="nome"><div style="text-align:center">${nome}</div></div><img class="schedafoto" src="${foto}"> 
 
<div class="cont"><div class="cont0"><b>Data e luogo di Nascita:</b> ${nascita} 
 
<b>Stirpe:</b> ${stirpe} 
 
<b>Bacchetta:</b> ${bacchetta} 
 
<b>Allineamento:</b> ${allineamento} 
 
<b>Categoria Magica e Mestiere:</b> ${catMestiere} 
 
<b>Scuola di Magia e Casa frequentata:</b> ${scuola} 
 
<b>Animali da compagnia:</b> ${animali} 
</div></div></div><div data-label="Storia"><p class="titolo-scheda"><i class="fa-solid fa-pen"></i> STORIA</p><div class="cont"><div class="cont0">${storia} 
 
<p class="titolo-scheda"><i class="fa-solid fa-newspaper"></i> INFO PUBBLICHE</p> 
${infopub} 
 
<p class="titolo-scheda"><i class="fa-solid fa-eye-low-vision"></i> INFO PRIVATE</p> 
${infopriv} 
 
</div></div></div><div data-label="Aspetto"><p class="titolo-scheda"><i class="fa-solid fa-person"></i> ASPETTO</p><div class="cont"><div class="cont0">${aspetto} 
 
</div></div></div><div data-label="Carattere"><p class="titolo-scheda"><i class="fa-solid fa-masks-theater"></i> CARATTERE</p><div class="cont"><div class="cont0">${carattere} 
 
</div></div></div><div data-label="Relazioni"><p class="titolo-scheda"><i class="fa-solid fa-people-group"></i> RELAZIONI</p><div class="cont"><div class="cont0">${relazioni} 
</div></div></div></div></div>`; 
 
 document.getElementById('output').textContent = html; 
 document.getElementById('outputPanel').style.display = 'block'; 
 document.getElementById('outputPanel').scrollIntoView({behavior:'smooth', block:'start'}); 
} 
 
el.categoria.addEventListener('change', updateCatPreview); 
el.mestiere.addEventListener('change', updateCatPreview); 
 
document.getElementById('generateBtn').addEventListener('click', generate); 
 
document.getElementById('copyBtn').addEventListener('click', () => { 
 const text = document.getElementById('output').textContent; 
 navigator.clipboard.writeText(text).then(() => { 
 const msg = document.getElementById('copiedMsg'); 
 msg.classList.add('show'); 
 setTimeout(() => msg.classList.remove('show'), 1500); 
 }); 
}); 
 
document.getElementById('downloadBtn').addEventListener('click', () => { 
 const text = document.getElementById('output').textContent; 
 const blob = new Blob([text], {type: "text/html"}); 
 const url = URL.createObjectURL(blob); 
 const a = document.createElement('a'); 
 a.href = url; 
 const nomeFile = (el.nome.value.trim() || "scheda").toLowerCase().replace(/[^a-z0-9]+/g,'-'); 
 a.download = "scheda-" + nomeFile + ".html"; 
 a.*click(); 
 URL.revokeObjectURL(url); 
}); 
 
updateCatPreview(); 
</script>
