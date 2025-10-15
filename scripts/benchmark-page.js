const questions = [
  {
    //         <!-- DOMANDA 1 -->
    question: `Chi ha diretto <strong>“Inception”?</strong>`,
    answers: [
      { choise: 'Christopher Nolan', correct: true },
      { choise: 'Steven Spielberg', correct: false },
      { choise: 'Ridley Scott', correct: false },
      { choise: 'James Cameron', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 2 -->
    question: `In quale anno è uscito “Titanic”?`,
    answers: [
      { choise: '1995', correct: false },
      { choise: '1997', correct: true },
      { choise: '1999', correct: false },
      { choise: '2001', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 3 -->
    question: `Quale attore interpreta Jack Sparrow?`,
    answers: [
      { choise: 'Keanu Reeves', correct: false },
      { choise: 'Johnny Depp', correct: true },
      { choise: 'Leonardo DiCaprio', correct: false },
      { choise: 'Robert Downey Jr.', correct: false },
    ],
  },

  {
    //         <!-- DOMANDA 4 -->
    question: 'Qual è il vero nome di “Neo” in Matrix?',
    answers: [
      { choise: 'Thomas Anderson', correct: true },
      { choise: 'John Wick', correct: false },
      { choise: 'Peter Parker', correct: false },
      { choise: 'Paul Atreides', correct: false },
    ],
  },

  {
    //         <!-- DOMANDA 5 -->
    question: 'Quanti film compongono la trilogia originale di Star Wars?',
    answers: [
      { choise: '2', correct: false },
      { choise: '3', correct: true },
      { choise: '4', correct: false },
      { choise: '6', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 6 -->
    question: 'Il film ha vinto l’Oscar nel 2020, è stato vinto da Parasite?',
    answers: [
      { choise: 'vero', correct: true },
      { choise: 'falso', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 7 -->
    question: 'Chi ha scritto e diretto “Pulp Fiction”?',
    answers: [
      { choise: 'Quentin Tarantino', correct: true },
      { choise: 'Guy Ritchie', correct: false },
      { choise: 'Francis Ford Coppola', correct: false },
      { choise: 'David Fincher', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 8 -->
    question: 'Il Leone d’Oro viene assegnato al Festival di…',
    answers: [
      { choise: 'Cannes', correct: false },
      { choise: 'Berlino', correct: false },
      { choise: 'Venezia', correct: true },
      { choise: 'Locarno', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 9 -->
    question:
      'Ne “Il Signore degli Anelli”, come si chiama la terra degli Hobbit?',
    answers: [
      { choise: 'Mordor', correct: false },
      { choise: 'Gondor', correct: false },
      { choise: 'La Contea', correct: true },
      { choise: 'Rivendell', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 10 -->
    question:
      'La Vedova Nera nel Marvel Cinematic Universe viene interpretata da Scarlett Johansson',
    answers: [
      { choise: 'Vero', correct: true },
      { choise: 'Falso', correct: false },
    ],
  },
];

let currentIndex = 0;
const proxBtn = document.getElementById('prox-btn');
const quizContainer = document.getElementById('quiz');

function cicleQuestion(index) {
  const q = questions[index];

  // costruisco l'HTML come stringa e lo inietto nel container
  let html = `<section id="q${index + 1}">`;
  html += `<div class="question"><h2>${q.question}</h2></div>`;
  html += `<div class="answers">`;
  q.answers.forEach((ans, ansIndex) => {
    const correctAttr = ans.correct ? ' data-correct="true"' : '';
    html += `<button type="button" class="choice"${correctAttr} data-index="${ansIndex}">${ans.choise}</button>`;
  });
  html += `</div>`;
  html += `</section>`;

  quizContainer.innerHTML = html;

  // se siamo all’ultima domanda, cambiamo il testo del pulsante o lo nascondiamo
  if (index === questions.length - 1) {
    proxBtn.innerText = 'INVIA';
  } else {
    proxBtn.innerText = 'PROSSIMA';
  }
}

//fino alla fine delle domande clicco il bottone
proxBtn.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    cicleQuestion(currentIndex);

    // --- AGGIUNTO: reset & restart timer ad ogni click su PROSSIMA/INVIA ---
    resetTimer();
    startTimer();

  } else {
    // ultima domanda: qui potresti raccogliere risposte e mostrare i risultati
  }
});

// mostra la prima domanda all’avvio
cicleQuestion(currentIndex);

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

        // --- AGGIUNTO: reset & restart timer quando il tempo finisce ---
        resetTimer();
        startTimer();

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
const choiches = document.querySelectorAll(".choiche");

let answersGiven = [];
//Domanda corrente
let currentQuestion = 1;
// add listener per bottone
choiches.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selected = event.target;
    const questionSection = selected.closest("section");
    const questionId = questionSection
      ? questionSection.id
      : `question-${currentQuestion}`;
    // Verifica risposte
    const isCorrect = selected.dataset.correct === "true";
    const answerText = selected.textContent.trim();

    const answerObj = {
      questionId,
      answerText,
      isCorrect,
    };
    const existingIndex = answersGiven.findIndex(
      (ans) => ans.questionId === questionId
    );
    if (existingIndex !== -1) {
      answersGiven[existingIndex] = answerObj;
    } else {
      answersGiven.push(answerObj);
    }
    localStorage.setItem("userAnswers", JSON.stringify(answersGiven));
    console.log(answersGiven);
    const allButtons = questionSection.querySelectorAll(".choice");
    allButtons.forEach((btn) => btn.classList.remove("selected"));
    selected.classList.add("selected");
  });
});