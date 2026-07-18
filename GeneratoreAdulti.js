<script>
window.addEventListener('load', function(){

var CAT_INFO = {
  "Acumen":       { cls: "schedaacumen",  color: "#4b7bc9" },
  "Animus":       { cls: "schedaanimus",  color: "#c94b6e" },
  "Ars":          { cls: "schedaars",     color: "#7b4bc9" },
  "Numen":        { cls: "schedanumen",   color: "#4bc98f" },
  "Sensus":       { cls: "schedasensus",  color: "#c9944b" },
  "Voluntas":     { cls: "schedavoluntas",color: "#c94b4b" },
  "Intracciabile":{ cls: "schedaintracc", color: "#6b6b7d" }
};

var field_ids = ["nome","foto","nascita","stirpe","bacchetta","allineamento",
  "categoria","mestiere","scuola","animali","storia","infopub","infopriv",
  "aspetto","carattere","relazioni"];

var el = {};
for(var i=0; i<field_ids.length; i++){
  el[field_ids[i]] = document.getElementById(field_ids[i]);
}

function update_cat_preview(){
  var cat = el.categoria.value;
  var dot = document.getElementById('cat_dot');
  var label = document.getElementById('cat_label');
  var preview_span = document.getElementById('cat_mestiere_preview');
  if(cat && CAT_INFO[cat]){
    dot.style.setProperty('--catcolor', CAT_INFO[cat].color);
    label.textContent = "categoria: " + cat + " -> classe ." + CAT_INFO[cat].cls;
  } else {
    dot.style.setProperty('--catcolor', '#c9a24b');
    label.textContent = "nessuna categoria selezionata";
  }
  var mestiere = el.mestiere.value.trim();
  preview_span.textContent = (cat || "Categoria") + (mestiere ? ", " + mestiere : ", Mestiere");
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

  var scheda_class = (cat && CAT_INFO[cat]) ? CAT_INFO[cat].cls : "schedanumen/schedaanimus/schedaars/schedavoluntas/schedasensus/schedaacumen/schedaintracc";
  var cat_mestiere = cat ? (cat + (mestiere ? ", " + mestiere : ",")) : "";

  var righe = [];
  righe.push('<div class="' + scheda_class + '"><div data-slide="effect:slide{left}; duration:200ms; buttons:buttons;" class="scheda_slide_base"><div data-label="Generalità">');
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
  righe.push('<b>Categoria Magica e Mestiere:</b> ' + cat_mestiere);
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
  document.getElementById('fallback_hint').classList.remove('show');
  document.getElementById('output_panel').style.display = 'block';
  document.getElementById('output_panel').scrollIntoView({behavior:'smooth', block:'start'});
}

el.categoria.addEventListener('change', update_cat_preview);
el.mestiere.addEventListener('change', update_cat_preview);

document.getElementById('generate_btn').addEventListener('click', generate);

function show_copied(){
  var msg = document.getElementById('copied_msg');
  msg.classList.add('show');
  setTimeout(function(){ msg.classList.remove('show'); }, 1500);
}

function select_output_text(){
  var out = document.getElementById('output');
  out.focus();
  out.select();
  out.setSelectionRange(0, 999999); // per mobile
}

function copy_output(){
  var out = document.getElementById('output');
  var hint = document.getElementById('fallback_hint');

  // Tentativo 1: Clipboard API moderna (può essere bloccata in alcuni contesti)
  if(navigator.clipboard && window.isSecureContext){
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

// Bottone download: genera un link vero e visibile invece di simulare
// un'attivazione automatica via JS, così l'utente lo apre/salva da sé
document.getElementById('download_btn').addEventListener('click', function(){
  var text = document.getElementById('output').value;
  if(!text){
    return;
  }
  var blob = new Blob([text], {type: "text/html"});
  var url = URL.createObjectURL(blob);
  var nome_file = (el.nome.value.trim() || "scheda").toLowerCase().replace(/[^a-z0-9]+/g,'-');

  var box = document.getElementById('download_link_box');
  box.innerHTML = "";
  var link = document.createElement('a');
  link.href = url;
  link.download = "scheda-" + nome_file + ".html";
  link.textContent = "Salva il file: scheda-" + nome_file + ".html";
  link.className = "download-link";
  box.appendChild(link);
});

update_cat_preview();

}); // fine window.addEventListener('load', ...)
</script>
