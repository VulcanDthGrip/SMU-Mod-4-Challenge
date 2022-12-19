const highScoresList = document.getElementById("highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []
// High score and user name are logged and displaced when the high scores button is clicked
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
    console.log('true value')
  })
  .join("")