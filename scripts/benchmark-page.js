// 1) RIFERIMENTI E BASE SU CUI LAVORARE IN JS CON IL BENCHMARK
const titoloDomanda = document.querySelector("#one .question h2"); // l'<h2> della domanda corrente
const pulsanti = Array.from(document.querySelectorAll("#one .answers .choice")); // i 4 bottoni (corretto il selettore)
const bottoneInvia = document.querySelector("#prox-btn"); // il pulsante per passare alla domanda successiva
const timerCanvas = document.querySelector("#timer"); // il Canvas del timer
const ctx = timerCanvas.getContext("2d"); // pannello 2D del timer fatto con Canvas

// Stato del benchmark
let indice = 0; // quale domanda sto mostrando (0 = la prima domanda)
let possoAndareAvanti = false; // diventa vera se clicchi solo su quella giusta
let punteggio = 0; // da usare nei risultati
let logRisposte = []; // serve per salvare le risposte fatte, per poi poterle usare nei risultati

// Timer di 30 sec. massimi per ogni risposta
const TEMPO_MAX = 30;
let tempoRimasto = TEMPO_MAX;
let idTimer = null;


// SEZIONE TIMER
// 1) IMPOSTAZIONE GRAFICA DEL TIMER (aspetto e posizione)
const header = document.querySelector("#bnc-header"); // header per posizionare il timer
header.style.position = "relative"; // serve per posizionare assolutamente il canvas
timerCanvas.style.position = "absolute";
timerCanvas.style.top = "20px";
timerCanvas.style.right = "24px";
timerCanvas.style.width = "100px";  // diametro visivo del timer
timerCanvas.style.height = "100px";

// pixel ratio per schermo nitido
const DPR = window.devicePixelRatio || 1;
const CSS_SIZE = 100;
timerCanvas.width = CSS_SIZE * DPR;
timerCanvas.height = CSS_SIZE * DPR;
ctx.scale(DPR, DPR); // adatta le coordinate grafiche

// colori e stili del timer
const COLOR_RING = "#00ffff";                // ciano acceso
const COLOR_TRACK = "rgba(255,255,255,0.25)";// anello grigio chiaro
const COLOR_TEXT = "#ffffff";                // bianco
const SHADOW = "rgba(0,255,255,0.35)";       // bagliore leggero azzurro

// parametri geometrici del cerchio
const size = CSS_SIZE;
const cx = size / 2;
const cy = size / 2;
const radius = 42;  // raggio dell’anello
const thickness = 10; // spessore dell’anello
const startAngle = -Math.PI / 2; // parte dall’alto


// 2) FUNZIONE CHE DISEGNA IL TIMER OGNI SECONDO
function disegnaTimer(sec) {
  // pulizia area del canvas (trasparente → si vede lo sfondo pagina dietro)
  ctx.clearRect(0, 0, size, size);

  // bagliore attorno
  ctx.save();
  ctx.shadowColor = SHADOW;
  ctx.shadowBlur = 12;

  // cerchio di sfondo (track)
  ctx.beginPath();
  ctx.lineWidth = thickness;
  ctx.strokeStyle = COLOR_TRACK;
  ctx.lineCap = "round";
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // cerchio principale (riempimento progressivo)
  const progress = Math.max(sec, 0) / TEMPO_MAX; // da 1 a 0
  const endAngle = startAngle + progress * Math.PI * 2;
  ctx.beginPath();
  ctx.strokeStyle = COLOR_RING;
  ctx.arc(cx, cy, radius, startAngle, endAngle, false);
  ctx.stroke();
  ctx.restore();

  // testo “SECONDS” sopra
  ctx.fillStyle = COLOR_TEXT;
  ctx.textAlign = "center";
  ctx.globalAlpha = 0.9;
  ctx.font = '700 9px "Outfit", sans-serif';
  ctx.fillText("SECONDS", cx, cy - 20);

  // numero grande centrale
  ctx.globalAlpha = 1;
  ctx.font = '700 26px "Outfit", sans-serif';
  ctx.fillText(String(sec), cx, cy + 2);

  // testo “REMAINING” sotto
  ctx.globalAlpha = 0.8;
  ctx.font = '700 9px "Outfit", sans-serif';
  ctx.fillText("REMAINING", cx, cy + 22);
}

// 3) FUNZIONI PER GESTIRE IL TIMER (start, stop, reset)
function startTimer() {
  disegnaTimer(tempoRimasto); // prima immagine (30s)
  clearInterval(idTimer);
  idTimer = setInterval(function () {
    tempoRimasto = tempoRimasto - 1;

    if (tempoRimasto < 0) {
      tempoRimasto = 0;
      stopTimer();

      // quando il tempo finisce, passa alla prossima domanda
      if (indice < domande.length - 1) {
        indice = indice + 1;        // vai alla prossima
        mostraDomanda(indice);      // cambia i testi e resetta timer
      } else {
        // se era l'ultima domanda → vai alla pagina risultati
        salvaPerRisultati();
        window.location.href = "./results-page.html";
      }
    }
    disegnaTimer(tempoRimasto);
  }, 1000);
}

function resetTimer() {
  tempoRimasto = TEMPO_MAX;
  disegnaTimer(tempoRimasto);
}

function stopTimer() {
  if (idTimer) {
    clearInterval(idTimer);
    idTimer = null;
  }
}

// 4) AVVIO DEL TIMER AUTOMATICO
startTimer();


