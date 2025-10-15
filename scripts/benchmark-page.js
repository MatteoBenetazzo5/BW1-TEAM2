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
