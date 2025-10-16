const questions = [
  {
    //         <!-- DOMANDA 1 -->
    question: `Chi ha diretto <strong>“Inception”?</strong>`,
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Christopher Nolan', correct: true },
      { choice: 'Steven Spielberg', correct: false },
      { choice: 'Ridley Scott', correct: false },
      { choice: 'James Cameron', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 2 -->
    question: `In quale anno è uscito “Titanic”?`,
    selectedAnswerIndex: undefined,
    answers: [
      { choice: '1995', correct: false },
      { choice: '1997', correct: true },
      { choice: '1999', correct: false },
      { choice: '2001', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 3 -->
    question: `Quale attore interpreta Jack Sparrow?`,
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Keanu Reeves', correct: false },
      { choice: 'Johnny Depp', correct: true },
      { choice: 'Leonardo DiCaprio', correct: false },
      { choice: 'Robert Downey Jr.', correct: false },
    ],
  },

  {
    //         <!-- DOMANDA 4 -->
    question: 'Qual è il vero nome di “Neo” in Matrix?',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Thomas Anderson', correct: true },
      { choice: 'John Wick', correct: false },
      { choice: 'Peter Parker', correct: false },
      { choice: 'Paul Atreides', correct: false },
    ],
  },

  {
    //         <!-- DOMANDA 5 -->
    question: 'Quanti film compongono la trilogia originale di Star Wars?',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: '2', correct: false },
      { choice: '3', correct: true },
      { choice: '4', correct: false },
      { choice: '6', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 6 -->
    question: 'Il film ha vinto l’Oscar nel 2020, è stato vinto da Parasite?',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'vero', correct: true },
      { choice: 'falso', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 7 -->
    question: 'Chi ha scritto e diretto “Pulp Fiction”?',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Quentin Tarantino', correct: true },
      { choice: 'Guy Ritchie', correct: false },
      { choice: 'Francis Ford Coppola', correct: false },
      { choice: 'David Fincher', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 8 -->
    question: 'Il Leone d’Oro viene assegnato al Festival di…',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Cannes', correct: false },
      { choice: 'Berlino', correct: false },
      { choice: 'Venezia', correct: true },
      { choice: 'Locarno', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 9 -->
    question:
      'Ne “Il Signore degli Anelli”, come si chiama la terra degli Hobbit?',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Mordor', correct: false },
      { choice: 'Gondor', correct: false },
      { choice: 'La Contea', correct: true },
      { choice: 'Rivendell', correct: false },
    ],
  },
  {
    //         <!-- DOMANDA 10 -->
    question:
      'La Vedova Nera nel Marvel Cinematic Universe viene interpretata da Scarlett Johansson',
    selectedAnswerIndex: undefined,
    answers: [
      { choice: 'Vero', correct: true },
      { choice: 'Falso', correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
const nextButton = document.getElementById('prox-btn');
const quizContainer = document.getElementById('quiz');
// chiamo la riga dove inserire il counter
const counterElement = document.querySelector('.tot-question p');

//funzione per aggiornare il counter delle domande
const updateCounter = function () {
  let domandaCorrente = currentQuestionIndex + 1;
  let totaleDomande = questions.length;
  counterElement.innerHTML =
    "QUESTION <span class= 'pink'>" +
    domandaCorrente +
    '/' +
    totaleDomande +
    '</span>';
};

// const saveCorrectAnswer = (selectedAnswerIndex) => {
//   questions[currentQuestionIndex].selectedAnswerIndex = selectedAnswerIndex;

//   let totCorrectAnswers = 0;

//   questions.forEach((currentQ) => {
//     if (currentQ.selectedAnswerIndex !== undefined) {
//       const isCorrect = currentQ.answers[currentQ.selectedAnswerIndex];
//       if (selected && selected.correct) {
//         totCorrectAnswers++;
//       }
//     }
//   });

//   // lo salvo su storage:

//   return totCorrectAnswers;
// };

const saveUserAnswer = (selectedAnswerIndex) => {
  questions[currentQuestionIndex].selectedAnswerIndex = selectedAnswerIndex;

};

const checkAllCorrectAnswers = () => {
   let totCorrectAnswers = 0;

  questions.forEach((currentQ) => {
    if (currentQ.selectedAnswerIndex !== undefined) {
      let selected = currentQ.selectedAnswerIndex
      const isCorrect = currentQ.answers[selected].correct;

      if (isCorrect === true) {
        totCorrectAnswers += 1;
      }
    }
  });
  //qui voglio salvare in local storage
  localStorage.setItem('totCorrectAnswers', totCorrectAnswers);
  return totCorrectAnswers;
}

function iterateQuestion() {
  const q = questions[currentQuestionIndex];

  // costruisco l'HTML come stringa e lo applico al container
  let html = `<section id="q${currentQuestionIndex + 1}">`;
  html += `<div class="question"><h2>${q.question}</h2></div>`;
  html += `<div class="answers">`;
  q.answers.forEach((ans, ansIndex) => {
    html += `<button type="button" class="choice" data-index="${ansIndex}" onClick="saveUserAnswer(${ansIndex})">${ans.choice}</button>`;
  });
  html += `</div>`;
  html += `</section>`;

  quizContainer.innerHTML = html;

  // se siamo all’ultima domanda, cambiamo il testo del pulsante
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerText = 'INVIA';
  }

  updateCounter();
}

//fino alla fine delle domande clicco il bottone
nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    iterateQuestion(currentQuestionIndex);

    // --- AGGIUNTO: reset & restart timer ad ogni click su PROSSIMA/INVIA ---
    resetTimer();
    startTimer();
  } else {
    checkAllCorrectAnswers();
    window.location.href = 'results-page.html';
  }
});

// mostra la prima domanda all’avvio
iterateQuestion(currentQuestionIndex);

// 1) RIFERIMENTI E BASE SU CUI LAVORARE IN JS CON IL BENCHMARK
const titoloDomanda = document.querySelector('#one .question h2'); // l'<h2> della domanda corrente
const pulsanti = Array.from(document.querySelectorAll('#one .answers .choice')); // i 4 bottoni (corretto il selettore)
const bottoneInvia = document.querySelector('#prox-btn'); // il pulsante per passare alla domanda successiva
const timerCanvas = document.querySelector('#timer'); // il Canvas del timer
const ctx = timerCanvas.getContext('2d'); // pannello 2D del timer fatto con Canvas

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
const header = document.querySelector('#bnc-header'); // header per posizionare il timer
header.style.position = 'relative'; // serve per posizionare assolutamente il canvas
timerCanvas.style.position = 'absolute';
timerCanvas.style.top = '20px';
timerCanvas.style.right = '24px';
timerCanvas.style.width = '100px'; // diametro visivo del timer
timerCanvas.style.height = '100px';

// pixel ratio per schermo nitido
const DPR = window.devicePixelRatio || 1;
const CSS_SIZE = 100;
timerCanvas.width = CSS_SIZE * DPR;
timerCanvas.height = CSS_SIZE * DPR;
ctx.scale(DPR, DPR); // adatta le coordinate grafiche

// colori e stili del timer
const COLOR_RING = '#00ffff'; // ciano acceso
const COLOR_TRACK = 'rgba(255,255,255,0.25)'; // anello grigio chiaro
const COLOR_TEXT = '#ffffff'; // bianco
const SHADOW = 'rgba(0,255,255,0.35)'; // bagliore leggero azzurro

// parametri geometrici del cerchio
const size = CSS_SIZE;
const cx = size / 2;
const cy = size / 2;
const radius = 42; // raggio dell’anello
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
  ctx.lineCap = 'round';
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
  ctx.textAlign = 'center';
  ctx.globalAlpha = 0.9;
  ctx.font = '700 9px "Outfit", sans-serif';
  ctx.fillText('SECONDS', cx, cy - 20);

  // numero grande centrale
  ctx.globalAlpha = 1;
  ctx.font = '700 26px "Outfit", sans-serif';
  ctx.fillText(String(sec), cx, cy + 2);

  // testo “REMAINING” sotto
  ctx.globalAlpha = 0.8;
  ctx.font = '700 9px "Outfit", sans-serif';
  ctx.fillText('REMAINING', cx, cy + 22);
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
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1; // vai alla prossima
        iterateQuestion(currentQuestionIndex); // cambia i testi e resetta timer
      } else {
        // se era l'ultima domanda → vai alla pagina risultati
        calculateResult();
        window.location.href = './results-page.html';
      }
    }
    disegnaTimer(tempoRimasto);
  }, 1000);
}

const calculateResult = () => {
  // -------codice da creare
};

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

/*
  let answersGiven = [];
  const choices = document.querySelectorAll('.choice');

  // add listener per bottone
  choices.forEach((button) => {
    button.addEventListener('click', (event) => {
      const selected = event.target;
      const questionSection = selected.closest('section');
      const questionId = questionSection
        ? questionSection.id
        : `question-${currentQuestionIndex}`;
      // Verifica risposte
      const isCorrect = selected.dataset.correct === 'true';
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

      localStorage.setItem('userAnswers', JSON.stringify(answersGiven));
      console.log(answersGiven);
      const allButtons = questionSection.querySelectorAll('.choice');
      allButtons.forEach((btn) => btn.classList.remove('selected'));
      selected.classList.add('selected');
    });
  });*/

// Evidenziazione rosa: aggiunge/rimuove .selected senza cambiare la tua logica di avanzamento
quizContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.choice');
  if (!btn) return;

  const section = btn.closest('section');
  if (section) {
    section
      .querySelectorAll('.choice')
      .forEach((b) => b.classList.remove('selected'));
  }
  btn.classList.add('selected');
});
