// results-page.js

// 1️⃣ Recupera le risposte salvate dal localStorage
const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

// 2️⃣ Conta quante sono corrette e quante sbagliate
let correctCount = 0;
let wrongCount = 0;

for (let questionId in savedAnswers) {
  if (savedAnswers[questionId].correct === true) {
    correctCount++;
  } else {
    wrongCount++;
  }
}

// 3️⃣ Calcola il totale e la percentuale di risposte giuste
const total = correctCount + wrongCount;
const percentCorrect = total > 0 ? Math.round((correctCount / total) * 100) : 0;

// 4️⃣ Mostra un messaggio sotto al grafico
const messageDiv = document.getElementById("message");
if (percentCorrect >= 80) {
  messageDiv.textContent = `Excellent work! 🎉 (${percentCorrect}% correct)`;
  messageDiv.style.color = "#00ffcc";
} else if (percentCorrect >= 50) {
  messageDiv.textContent = `Good job! 👍 (${percentCorrect}% correct)`;
  messageDiv.style.color = "#ffaa00";
} else {
  messageDiv.textContent = `Keep practicing! 💪 (${percentCorrect}% correct)`;
  messageDiv.style.color = "#ff4444";
}

// 5️⃣ Disegna il grafico a ciambella con Chart.js
const ctx = document.getElementById("resultsChart").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [correctCount, wrongCount],
        backgroundColor: [
          "rgba(0, 255, 170, 0.9)", // verde acqua per le giuste
          "rgba(255, 80, 80, 0.9)", // rosso per le sbagliate
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        cutout: "70%", // per fare la ciambella
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  },
});
