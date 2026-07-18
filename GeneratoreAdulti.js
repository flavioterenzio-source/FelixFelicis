<script type="text/javascript"> 
var CAT_INFO = { 
 "Acumen": { cls: "schedaacumen", color: "#4b7bc9" }, 
 "Animus": { cls: "schedaanimus", color: "#c94b6e" }, 
 "Ars": { cls: "schedaars", color: "#7b4bc9" }, 
 "Numen": { cls: "schedanumen", color: "#4bc98f" }, 
 "Sensus": { cls: "schedasensus", color: "#c9944b" }, 
 "Voluntas": { cls: "schedavoluntas",color: "#c94b4b" }, 
 "Intracciabile":{ cls: "schedaintracc", color: "#6b6b7d" } 
}; 
 
var fieldIds = ["nome","foto","nascita","stirpe","bacchetta","allineamento", 
 "categoria","mestiere","scuola","animali","storia","infopub","infopriv", 
 "aspetto","carattere","relazioni"]; 
 
var el = {}; 
for(var i=0; i<fieldids.length; i++){ 
 el[fieldIds[i]] = document.getElementById(fieldIds[i]); 
} 
 
function updateCatPreview(){ 
 var cat = el.categoria.value; 
 var dot = document.getElementById('catDot'); 
 var label = document.getElementById('catLabel'); 
 var previewSpan = document.getElementById('catMestierePreview'); 
 if(cat && CAT_INFO[cat]){ 
 dot.style.setProperty('--catcolor', CAT_INFO[cat].color); 
 label.textContent = "categoria: " + cat + " -> classe ." + CAT_INFO[cat].cls; 
 } else { 
 dot.style.setProperty('--catcolor', '#c9a24b'); 
 label.textContent = "nessuna categoria selezionata"; 
 } 
 var mestiere = el.mestiere.value.trim(); 
 previewSpan.textContent = (cat || "Categoria") + (mestiere ? ", " + mestiere : ", Mestiere"); 
} 
 
function generate(){ 
 var nome = el.nome.value.trim() || "Nome e Cognome QUI"; 
 var foto = el.foto.value.trim() || "LINK FOTO QUI"; 
 var nascita = el.nascita.value.trim(); 
 var stirpe = el.stirpe.value.trim(); 
 var bacchetta = el.bacchetta.value.trim(); 
 var allineamento = el.allineamento.value; 
 var cat = el.categoria.value; 
 var mestiere = el.mestiere.value; 
 var scuola = el.scuola.value.trim(); 
 var animali = el.animali.value.trim() || "-"; 
 
 var storia = el.storia.value.trim(); 
 var infopub = el.infopub.value.trim(); 
 var infopriv = el.infopriv.value.trim(); 
 var aspetto = el.aspetto.value.trim(); 
 var carattere = el.carattere.value.trim(); 
 var relazioni = el.relazioni.value.trim(); 
 
 var schedaClass = (cat && CAT_INFO[cat]) ? CAT_INFO[cat].cls : "schedanumen/schedaanimus/schedaars/schedavoluntas/schedasensus/schedaacumen/schedaintracc"; 
 var catMestiere = cat ? (cat + (mestiere ? ", " + mestiere : ",")) : ""; 
 
 var righe = []; 
 righe.push('<div class="' + schedaClass + '"><div data-slide="effect:slide{left}; duration:200ms; buttons:buttons;" class="scheda_slide_base"><div data-label="Generalità">'); 
 righe.push('<div class="nome"><div style="text-align:center">' + nome + '</div></div><img class="schedafoto" src="' + foto + '">'); 
 righe.push(''); 
 righe.push('<div class="cont"><div class="cont0"><b>Data e luogo di Nascita:</b> ' + nascita); 
 righe.push(''); 
 righe.push('<b>Stirpe:</b> ' + stirpe); 
 righe.push(''); 
 righe.push('<b>Bacchetta:</b> ' + bacchetta); 
 righe.push(''); 
 righe.push('<b>Allineamento:</b> ' + allineamento); 
 righe.push(''); 
 righe.push('<b>Categoria Magica e Mestiere:</b> ' + catMestiere); 
 righe.push(''); 
 righe.push('<b>Scuola di Magia e Casa frequentata:</b> ' + scuola); 
 righe.push(''); 
 righe.push('<b>Animali da compagnia:</b> ' + animali); 
 righe.push('</div></div></div><div data-label="Storia"><p class="titolo-scheda"><i class="fa-solid fa-pen"></i> STORIA</p><div class="cont"><div class="cont0">' + storia); 
 righe.push(''); 
 righe.push('<p class="titolo-scheda"><i class="fa-solid fa-newspaper"></i> INFO PUBBLICHE</p>'); 
 righe.push(infopub); 
 righe.push(''); 
 righe.push('<p class="titolo-scheda"><i class="fa-solid fa-eye-low-vision"></i> INFO PRIVATE</p>'); 
 righe.push(infopriv); 
 righe.push(''); 
 righe.push('</div></div></div><div data-label="Aspetto"><p class="titolo-scheda"><i class="fa-solid fa-person"></i> ASPETTO</p><div class="cont"><div class="cont0">' + aspetto); 
 righe.push(''); 
 righe.push('</div></div></div><div data-label="Carattere"><p class="titolo-scheda"><i class="fa-solid fa-masks-theater"></i> CARATTERE</p><div class="cont"><div class="cont0">' + carattere); 
 righe.push(''); 
 righe.push('</div></div></div><div data-label="Relazioni"><p class="titolo-scheda"><i class="fa-solid fa-people-group"></i> RELAZIONI</p><div class="cont"><div class="cont0">' + relazioni); 
 righe.push('</div></div></div></div></div>'); 
 
 var html = righe.join("\n"); 
 
 document.getElementById('output').value = html; 
 document.getElementById('fallbackHint').classList.remove('show'); 
 document.getElementById('outputPanel').style.display = 'block'; 
 document.getElementById('outputPanel').scrollIntoView({behavior:'smooth', block:'start'}); 
} 
 
el.categoria.addEventListener('change', updateCatPreview); 
el.mestiere.addEventListener('change', updateCatPreview); 
 
document.getElementById('generateBtn').addEventListener('click', generate); 
 
function showCopied(){ 
 var msg = document.getElementById('copiedMsg'); 
 msg.classList.add('show'); 
 setTimeout(function(){ msg.classList.remove('show'); }, 1500); 
} 
 
function selectOutputText(){ 
 var out = document.getElementById('output'); 
 out.focus(); 
 out.select(); 
 out.setSelectionRange(0, 999999); // per mobile 
} 
 
function copyOutput(){ 
 var out = document.getElementById('output'); 
 var hint = document.getElementById('fallbackHint'); 
 
 // Tentativo 1: Clipboard API moderna (può essere bloccata in alcuni contesti) 
 if(navigator.clipboard && window.isSecureContext){ 
 navigator.clipboard.writeText(out.value).then(function(){ 
 hint.classList.remove('show'); 
 showCopied(); 
 }, function(){ 
 fallbackCopy(hint); 
 }); 
 return; 
 } 
 
 fallbackCopy(hint); 
} 
 
function fallbackCopy(hint){ 
 var riuscito = false; 
 try{ 
 selectOutputText(); 
 riuscito = document.execCommand('copy'); 
 }catch(err){ 
 riuscito = false; 
 } 
 if(riuscito){ 
 hint.classList.remove('show'); 
 showCopied(); 
 } else { 
 selectOutputText(); 
 hint.classList.add('show'); 
 } 
} 
 
document.getElementById('copyBtn').addEventListener('click', copyOutput); 
 
// Bottone download: genera un link vero e visibile invece di simulare 
// un'attivazione automatica via JS, così l'utente lo apre/salva da sé 
document.getElementById('downloadBtn').addEventListener('click', function(){ 
 var text = document.getElementById('output').value; 
 if(!text){ 
 return; 
 } 
 var blob = new Blob([text], {type: "text/html"}); 
 var url = URL.createObjectURL(blob); 
 var nomeFile = (el.nome.value.trim() || "scheda").toLowerCase().replace(/[^a-z0-9]+/g,'-'); 
 
 var box = document.getElementById('downloadLinkBox'); 
 box.innerHTML = ""; 
 var link = document.createElement('a'); 
 link.href = url; 
 link.download = "scheda-" + nomeFile + ".html"; 
 link.textContent = "Salva il file: scheda-" + nomeFile + ".html"; 
 link.className = "download-link"; 
 box.appendChild(link); 
}); 
 
updateCatPreview(); 
</script>
