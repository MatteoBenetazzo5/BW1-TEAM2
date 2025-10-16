// Recupera le risposte salvate dal benchmark
const correctAnswers = parseInt(localStorage.getItem("totalCorrectAnswers"))
const totalQuestions = parseInt(localStorage.getItem("totalQuestions"))
const wrongAnswers = totalQuestions - correctAnswers

let correctPercentage = 0.0;
let wrongPercentage = 0.0;
// Calcola le percentuali
if (totalQuestions > 0) {
  correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1)
  wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(1)
}
// Mostra i numeri e le percentuali nel testo
document.getElementById("correct-count").innerHTML = `
  <span class="percentage">${correctPercentage}%</span><br>
  ${correctAnswers}/${totalQuestions}
`

document.getElementById("wrong-count").innerHTML = `
  <span class="percentage">${wrongPercentage}%</span><br>
  ${wrongAnswers}/${totalQuestions}
`

// Definisci il messaggio finale come array di righe
const messageLines =
  correctAnswers >= totalQuestions / 2
    ? [
        "Congratulations!",
        "You passed the exam! You'll receive the certificate shortly.",
      ]
    : [
        "Unfortunately",
        "You didn't pass. Try again after reviewing the material.",
      ]

// Funzione per fare word wrap del testo
function drawCenterText(ctx, lines, x, y, maxWidth, lineHeight) {
  let totalLines = []

  // Suddivide ogni linea in più righe se supera maxWidth
  lines.forEach((line) => {
    const words = line.split(" ")
    let currentLine = ""

    words.forEach((word) => {
      const testLine = currentLine + word + " "
      if (ctx.measureText(testLine).width > maxWidth && currentLine !== "") {
        totalLines.push(currentLine.trim())
        currentLine = word + " "
      } else {
        currentLine = testLine
      }
    })
    totalLines.push(currentLine.trim())
  })

  const totalHeight = totalLines.length * lineHeight
  let startY = y - totalHeight / 2 + lineHeight / 2

  totalLines.forEach((l) => {
    ctx.fillText(l, x, startY)
    startY += lineHeight
  })
}

// Plugin per testo al centro del grafico (Chart.js 4.x)
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart
    ctx.save()

    const fontSize = Math.min(Math.round(height / 25), 18) // dimensione font dinamica
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const lineHeight = fontSize * 1.2
    const maxTextWidth = width * 0.6

    drawCenterText(
      ctx,
      messageLines,
      width / 2,
      height / 2,
      maxTextWidth,
      lineHeight
    )

    ctx.restore()
  },
}

// Crea il grafico a ciambella
const ctx = document.getElementById("resultsChart").getContext("2d")

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["#00ffff", "#d20094"],
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
        labels: { color: "white" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw
            const percent = ((value / totalQuestions) * 100).toFixed(1)
            return `${context.label}: ${value}/${totalQuestions} (${percent}%)`
          },
        },
      },
    },
  },
  plugins: [centerTextPlugin],
})

// Pulisci le risposte per nuovi tentativi
localStorage.removeItem("totalCorrectAnswers")
localStorage.removeItem("totalQuestions")
