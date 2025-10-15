// ==========================
// DOMANDE DEL QUIZ
// ==========================
const questions = [
  {
    question: `Chi ha diretto <strong>“Inception”?</strong>`,
    answers: [
      { choice: "Christopher Nolan", correct: true },
      { choice: "Steven Spielberg", correct: false },
      { choice: "Ridley Scott", correct: false },
      { choice: "James Cameron", correct: false },
    ],
  },
  {
    question: `In quale anno è uscito “Titanic”?`,
    answers: [
      { choice: "1995", correct: false },
      { choice: "1997", correct: true },
      { choice: "1999", correct: false },
      { choice: "2001", correct: false },
    ],
  },
  {
    question: `Quale attore interpreta Jack Sparrow?`,
    answers: [
      { choice: "Keanu Reeves", correct: false },
      { choice: "Johnny Depp", correct: true },
      { choice: "Leonardo DiCaprio", correct: false },
      { choice: "Robert Downey Jr.", correct: false },
    ],
  },
  {
    question: "Qual è il vero nome di “Neo” in Matrix?",
    answers: [
      { choice: "Thomas Anderson", correct: true },
      { choice: "John Wick", correct: false },
      { choice: "Peter Parker", correct: false },
      { choice: "Paul Atreides", correct: false },
    ],
  },
  {
    question: "Quanti film compongono la trilogia originale di Star Wars?",
    answers: [
      { choice: "2", correct: false },
      { choice: "3", correct: true },
      { choice: "4", correct: false },
      { choice: "6", correct: false },
    ],
  },
  {
    question: "Il film che ha vinto l’Oscar nel 2020 è stato Parasite?",
    answers: [
      { choice: "vero", correct: true },
      { choice: "falso", correct: false },
    ],
  },
  {
    question: "Chi ha scritto e diretto “Pulp Fiction”?",
    answers: [
      { choice: "Quentin Tarantino", correct: true },
      { choice: "Guy Ritchie", correct: false },
      { choice: "Francis Ford Coppola", correct: false },
      { choice: "David Fincher", correct: false },
    ],
  },
  {
    question: "Il Leone d’Oro viene assegnato al Festival di…",
    answers: [
      { choice: "Cannes", correct: false },
      { choice: "Berlino", correct: false },
      { choice: "Venezia", correct: true },
      { choice: "Locarno", correct: false },
    ],
  },
  {
    question:
      "Ne “Il Signore degli Anelli”, come si chiama la terra degli Hobbit?",
    answers: [
      { choice: "Mordor", correct: false },
      { choice: "Gondor", correct: false },
      { choice: "La Contea", correct: true },
      { choice: "Rivendell", correct: false },
    ],
  },
  {
    question:
      "La Vedova Nera nel Marvel Cinematic Universe viene interpretata da Scarlett Johansson",
    answers: [
      { choice: "Vero", correct: true },
      { choice: "Falso", correct: false },
    ],
  },
];

// ==========================
// VARIABILI BASE
// ==========================
let currentIndex = 0;
let answersGiven = [];
const proxBtn = document.getElementById("prox-btn");
const quizContainer = document.getElementById("quiz");
const counterElement = document.querySelector(".tot-question p");

// ==========================
// FUNZIONE CONTATORE DOMANDE
// ==========================
function updateCounter() {
  const domandaCorrente = currentIndex + 1;
  const totaleDomande = questions.length;
  counterElement.innerHTML = `QUESTION <span class="pink">${domandaCorrente}/${totaleDomande}</span>`;
}

// ==========================
// FUNZIONE PER MOSTRARE LE DOMANDE
// ==========================
function cicleQuestion(index) {
  const q = questions[index];
  let html = `
    <section id="q${index + 1}">
      <div class="question"><h2>${q.question}</h2></div>
      <div class="answers">
  `;
  q.answers.forEach((ans, ansIndex) => {
    const correctAttr = ans.correct ? ' data-correct="true"' : "";
    html += `<button type="button" class="choice"${correctAttr} data-index="${ansIndex}">${ans.choice}</button>`;
  });
  html += `</div></section>`;
  quizContainer.innerHTML = html;

  // aggiorno testo del bottone
  proxBtn.innerText = index === questions.length - 1 ? "INVIA" : "PROSSIMA";
  updateCounter();
}

// ==========================
// TIMER
// ==========================
const timerCanvas = document.querySelector("#timer");
const ctx = timerCanvas.getContext("2d");

const TEMPO_MAX = 30;
let tempoRimasto = TEMPO_MAX;
let idTimer = null;

const DPR = window.devicePixelRatio || 1;
const CSS_SIZE = 100;
timerCanvas.width = CSS_SIZE * DPR;
timerCanvas.height = CSS_SIZE * DPR;
ctx.scale(DPR, DPR);

const cx = CSS_SIZE / 2;
const cy = CSS_SIZE / 2;
const radius = 42;
const thickness = 10;
const startAngle = -Math.PI / 2;

function disegnaTimer(sec) {
  ctx.clearRect(0, 0, CSS_SIZE, CSS_SIZE);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  const progress = Math.max(sec, 0) / TEMPO_MAX;
  const endAngle = startAngle + progress * Math.PI * 2;
  ctx.strokeStyle = "#00ffff";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = '700 22px "Outfit"';
  ctx.fillText(String(sec), cx, cy + 8);
}

function startTimer() {
  disegnaTimer(tempoRimasto);
  clearInterval(idTimer);
  idTimer = setInterval(() => {
    tempoRimasto--;
    if (tempoRimasto < 0) {
      tempoRimasto = 0;
      stopTimer();
      nextQuestionOrEnd();
    }
    disegnaTimer(tempoRimasto);
  }, 1000);
}

function resetTimer() {
  tempoRimasto = TEMPO_MAX;
  disegnaTimer(tempoRimasto);
}

function stopTimer() {
  clearInterval(idTimer);
}

// ==========================
// CLICK SU RISPOSTE
// ==========================
quizContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".choice");
  if (!btn) return;

  const section = btn.closest("section");
  section
    .querySelectorAll(".choice")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");

  const questionId = section.id;
  const isCorrect = btn.dataset.correct === "true";
  const answerText = btn.textContent.trim();

  const answerObj = { questionId, answerText, isCorrect };
  const existingIndex = answersGiven.findIndex(
    (ans) => ans.questionId === questionId
  );
  if (existingIndex !== -1) answersGiven[existingIndex] = answerObj;
  else answersGiven.push(answerObj);

  localStorage.setItem("userAnswers", JSON.stringify(answersGiven));
});

// ==========================
// GESTIONE BOTTONE PROSSIMA/INVIA
// ==========================
proxBtn.addEventListener("click", nextQuestionOrEnd);

function nextQuestionOrEnd() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    cicleQuestion(currentIndex);
    resetTimer();
    startTimer();
  } else {
    goToResults();
  }
}

// ==========================
// PASSAGGIO AI RISULTATI
// ==========================
function goToResults() {
  const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
  const correctCount = savedAnswers.filter((ans) => ans.isCorrect).length;
  const wrongCount = savedAnswers.length - correctCount;

  localStorage.setItem(
    "quizResults",
    JSON.stringify({
      correct: correctCount,
      wrong: wrongCount,
      total: questions.length,
    })
  );

  window.location.href = "./results-page.html";
}

// ==========================
// AVVIO QUIZ
// ==========================
cicleQuestion(currentIndex);
startTimer();
