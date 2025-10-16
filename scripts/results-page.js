// Recupera le risposte salvate dal benchmark
const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
console.log("Risposte salvate:", savedAnswers);

// Conta quante risposte corrette e sbagliate
const correctAnswers = savedAnswers.filter((ans) => ans.isCorrect).length;
const wrongAnswers = savedAnswers.length - correctAnswers;
const totalQuestions = savedAnswers.length;

// Mostra i numeri nel testo
document.getElementById("correct-count").innerText = correctAnswers;
document.getElementById("wrong-count").innerText = wrongAnswers;

// Calcola le percentuali
const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(1);

// Crea il grafico a ciambella
const ctx = document.getElementById("resultsChart").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["#00ffff", "#d20094"], // colori richiesti
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const percent = ((value / totalQuestions) * 100).toFixed(1);
            return `${label}: ${value}/${totalQuestions} (${percent}%)`;
          },
        },
      },
    },
  },
});

// Mostra il messaggio finale
const message =
  correctAnswers >= totalQuestions / 2
    ? " You passed the exam! You'll receive the certificate shortly."
    : " Unfortunately, you didn't pass. Try again after reviewing the material.";

document.getElementById("message").innerText = message;

//pulisci le risposte per nuovi tentativi
localStorage.removeItem("userAnswers");
