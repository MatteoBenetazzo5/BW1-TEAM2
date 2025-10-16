<<<<<<< Updated upstream
const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
console.log('Risposte salvate:', savedAnswers);

const totalQuestions = 10;
const correctAnswers = 6;
const wrongAnswers = totalQuestions - correctAnswers;

const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(1);

const ctx = document.getElementById('resultsChart').getContext('2d');
=======
// Recupera le risposte salvate dal benchmark
const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || []
console.log("Risposte salvate:", savedAnswers)

// Conta quante risposte corrette e sbagliate
const correctAnswers = savedAnswers.filter((ans) => ans.isCorrect).length
const wrongAnswers = savedAnswers.length - correctAnswers
const totalQuestions = savedAnswers.length

// Mostra i numeri nel testo
document.getElementById("correct-count").innerText = correctAnswers
document.getElementById("wrong-count").innerText = wrongAnswers

// Calcola le percentuali
const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1)
const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(1)

// Crea il grafico a ciambella
const ctx = document.getElementById("resultsChart").getContext("2d")
>>>>>>> Stashed changes

const resultsChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Correct', 'Wrong'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ['#00f4ff', '#c71f91'], // Colori dinamici
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
<<<<<<< Updated upstream
            const label = context.label || '';
            const value = context.raw;
            const percent = ((value / totalQuestions) * 100).toFixed(1);
            return `${label}: ${value}/${totalQuestions} (${percent}%)`;
=======
            const label = context.label || ""
            const value = context.raw
            const percent = ((value / totalQuestions) * 100).toFixed(1)
            return `${label}: ${value}/${totalQuestions} (${percent}%)`
>>>>>>> Stashed changes
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
      // Plugin personalizzato per mostrare il testo al centro
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.restore();
        const fontSize = (height / 150).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';

        const message =
          correctAnswers >= 6 ? 'You passed the exam' : 'Exam not passed';
        const textX = Math.round((width - ctx.measureText(message).width) / 2);
        const textY = height / 2;

        ctx.fillText(message, textX, textY);
        ctx.save();
      },
    },
  },
})

// Messaggio sotto il grafico
const message =
<<<<<<< Updated upstream
  correctAnswers >= 6
    ? "Congratulations! You'll receive the certificate shortly. Check your email (including spam/promotions)."
    : "Unfortunately, you didn't pass. Try again after reviewing the material.";

document.getElementById('message').innerText = message;
=======
  correctAnswers >= totalQuestions / 2
    ? "🎉 You passed the exam! You'll receive the certificate shortly."
    : "❌ Unfortunately, you didn't pass. Try again after reviewing the material."

document.getElementById("message").innerText = message

//pulisci le risposte per nuovi tentativi
localStorage.removeItem("userAnswers")
>>>>>>> Stashed changes
