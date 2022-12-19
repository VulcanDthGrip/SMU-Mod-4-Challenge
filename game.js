const questions = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
// Not able to get timer to function
const timer = document.querySelector('#time-left')

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availablequestionsField= []
let time = 60
// questionsFieldare not being displayed when quiz starts
let question = [
    {
        prompt:"JavaScript is a   -side programming language?",
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Both',
        choice4: 'None',
        answer: 3
    },
    {
        prompt: "Which of the following will write the message 'Hello DataFlair!' in an alert box?",
        choice1: "alertbox('Hello DataFlar!')",
        choice2: "alert(Hello DataFlair!)",
        choice3: "msgAlert('Hello DataFlair!)",
        choice4: "alert('Hello DataFlair!)",
        answer: 4
    },
    {
        prompt: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        choice1: "if(x 2)",
        choice2: "if(x=2)",
        choice3: "if(x==2);",
        choice4: "if(x !=2);",
        answer: 3
    },
    {
        prompt: "How do you find the minimum of x and y using Javascript?",
        choice1: "min(x,y)",
        choice2: "Math.min(x,y)",
        choice3: "Math.min(xy)",
        choice4: "min(xy)",
        answer: 2
    }
]

//CONSTANTS
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 4
const TIMER_UP = 5
const TIMER_DOWN = 10

startGame = () => {
    countdown_start()
    questionCounter = 0
    score = 0
    availableQuestions = [...question]
    getNewQuestion()
}

countdown_start = () => {
    time = 60
        const gameTimer = setInterval(function() {
            time--
            timer.textContent = "Time: " + time
            // test w console log
            console.log(time)
            
            if (time <= 0) {
                clearInterval(gameTimer)
                localStorage.setItem('mostRecentScore', score)
                return window.location.assign("./end.html")
            }
        }, 1000)
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    
        localStorage.setItem('mostRecentScore', score)
        // go to the end page
        return window.location.assign('/end.html')
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    questions.innerText = currentQuestion.prompt
    console.log(currentQuestion.prompt)

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        const classtoApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        
        if(classtoApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }
        selectedChoice.parentElement.classList.add(classtoApply)

        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classtoApply)
          getNewQuestion()
        }, 1000)
      })
    })
    
    incrementScore = num => {
      score += num;
      scoreText.innerText = score
    }
// time countdown
    incrementTime = num => {
        time += num
        timer.innerText = time
    }

    decrementTime = num => {
        time -= num
        timer.innerText = time
    }
    startGame()