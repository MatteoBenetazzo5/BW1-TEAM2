// RESET SOLO ALL'AVVIO
if (!sessionStorage.getItem("quizStarted")) {
  localStorage.removeItem("userAnswers")
  localStorage.removeItem("quizResults")
  sessionStorage.setItem("quizStarted", "true")
}

// DOMANDE DEL QUIZ
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
    question: "Il film ha vinto l’Oscar nel 2020, è stato vinto da Parasite?",
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
]

// 🔹 ELEMENTI BASE
let currentIndex = 0
const proxBtn = document.getElementById("prox-btn")
const quizContainer = document.getElementById("quiz")
const counterElement = document.querySelector(".tot-question p")

function updateCounter() {
  counterElement.innerHTML = `QUESTION <span class='pink'>${currentIndex + 1}/${
    questions.length
  }</span>`
}

// 🔹 MOSTRA DOMANDE
function cicleQuestion(index) {
  const q = questions[index]
  let html = `<section id="q${index + 1}">
    <div class="question"><h2>${q.question}</h2></div>
    <div class="answers">
      ${q.answers
        .map(
          (ans) =>
            `<button type="button" class="choice" ${
              ans.correct ? 'data-correct="true"' : ""
            }>${ans.choice}</button>`
        )
        .join("")}
    </div>
  </section>`

  quizContainer.innerHTML = html
  proxBtn.innerText = index === questions.length - 1 ? "INVIA" : "PROSSIMA" //qui vorrei integrare l'icona della freccia che si va a perdere, ma con questo codice non so come fare. EP
  updateCounter()
}
cicleQuestion(currentIndex)

// 🔹 SALVATAGGIO RISPOSTE
let answersGiven = JSON.parse(localStorage.getItem("userAnswers")) || []

quizContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".choice")
  if (!btn) return

  const section = btn.closest("section")
  section
    .querySelectorAll(".choice")
    .forEach((b) => b.classList.remove("selected"))
  btn.classList.add("selected")

  const questionId = section.id
  const answerText = btn.textContent.trim()
  const isCorrect = btn.dataset.correct === "true"

  const answerObj = { questionId, answerText, isCorrect }

  const existingIndex = answersGiven.findIndex(
    (a) => a.questionId === questionId
  )
  if (existingIndex !== -1) {
    answersGiven[existingIndex] = answerObj
  } else {
    answersGiven.push(answerObj)
  }

  localStorage.setItem("userAnswers", JSON.stringify(answersGiven))
})

// 🔹 GESTIONE PULSANTE “PROSSIMA / INVIA”
proxBtn.addEventListener("click", () => {
  const currentSection = document.querySelector(`#q${currentIndex + 1}`)
  const selected = currentSection.querySelector(".selected")

  // impedisce di andare avanti senza risposta
  if (!selected) {
    alert("Seleziona una risposta prima di procedere!")
    return
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++
    cicleQuestion(currentIndex)
    resetTimer()
    startTimer()
  } else {
    const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || []
    const correctCount = savedAnswers.filter((a) => a.isCorrect).length
    const wrongCount = savedAnswers.length - correctCount

    localStorage.setItem(
      "quizResults",
      JSON.stringify({
        correct: correctCount,
        wrong: wrongCount,
        total: savedAnswers.length,
      })
    )

    // reset del flag per consentire nuovo quiz
    sessionStorage.removeItem("quizStarted")
    window.location.href = "results-page.html"
  }
})

// 🔹 TIMER
const timerCanvas = document.querySelector("#timer")
const ctx = timerCanvas.getContext("2d")
const header = document.querySelector("#bnc-header")
header.style.position = "relative"
timerCanvas.style.position = "absolute"
timerCanvas.style.top = "20px"
timerCanvas.style.right = "24px"
timerCanvas.style.width = "100px"
timerCanvas.style.height = "100px"

const DPR = window.devicePixelRatio || 1
const CSS_SIZE = 100
timerCanvas.width = CSS_SIZE * DPR
timerCanvas.height = CSS_SIZE * DPR
ctx.scale(DPR, DPR)

const COLOR_RING = "#00ffff"
const COLOR_TRACK = "rgba(255,255,255,0.25)"
const COLOR_TEXT = "#ffffff"
const SHADOW = "rgba(0,255,255,0.35)"
const size = CSS_SIZE
const cx = size / 2
const cy = size / 2
const radius = 42
const thickness = 10
const startAngle = -Math.PI / 2
const TEMPO_MAX = 30
let tempoRimasto = TEMPO_MAX
let idTimer = null

function disegnaTimer(sec) {
  ctx.clearRect(0, 0, size, size)
  ctx.save()
  ctx.shadowColor = SHADOW
  ctx.shadowBlur = 12
  ctx.beginPath()
  ctx.lineWidth = thickness
  ctx.strokeStyle = COLOR_TRACK
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()

  const progress = Math.max(sec, 0) / TEMPO_MAX
  const endAngle = startAngle + progress * Math.PI * 2
  ctx.beginPath()
  ctx.strokeStyle = COLOR_RING
  ctx.arc(cx, cy, radius, startAngle, endAngle, false)
  ctx.stroke()
  ctx.restore()

  ctx.fillStyle = COLOR_TEXT
  ctx.textAlign = "center"
  ctx.globalAlpha = 0.9
  ctx.font = '700 9px "Outfit", sans-serif'
  ctx.fillText("SECONDS", cx, cy - 20)
  ctx.globalAlpha = 1
  ctx.font = '700 26px "Outfit", sans-serif'
  ctx.fillText(String(sec), cx, cy + 2)
  ctx.globalAlpha = 0.8
  ctx.font = '700 9px "Outfit", sans-serif'
  ctx.fillText("REMAINING", cx, cy + 22)
}

function startTimer() {
  disegnaTimer(tempoRimasto)
  clearInterval(idTimer)
  idTimer = setInterval(function () {
    tempoRimasto--
    if (tempoRimasto < 0) {
      tempoRimasto = 0
      stopTimer()
      if (currentIndex < questions.length - 1) {
        currentIndex++
        cicleQuestion(currentIndex)
        resetTimer()
        startTimer()
      } else {
        window.location.href = "results-page.html"
      }
    }
    disegnaTimer(tempoRimasto)
  }, 1000)
}

function resetTimer() {
  tempoRimasto = TEMPO_MAX
  disegnaTimer(tempoRimasto)
}

function stopTimer() {
  if (idTimer) clearInterval(idTimer)
}

startTimer()
