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
  } else {
    // ultima domanda: qui potresti raccogliere risposte e mostrare i risultati
  }
});

// mostra la prima domanda all’avvio
cicleQuestion(currentIndex);
