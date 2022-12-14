const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const timer = document.querySelector('#time-left');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let time = 15;

let questions = [
    {
        question:  'JavaScript is a   -side programming language?',
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Both',
        choice4: 'None',
        answer: 3,
    },
    {
        question:
            "Which of the following will write the message 'Hello DataFlair!' in an alert box?",
        choice1: "alertbox('Hello DataFlar!');",
        choice2: "alert(Hello DataFlair!);",
        choice3: "msgAlert('Hello DataFlair!);",
        choice4: "alert('Hello DataFlair!);",
        answer: 4,
    },
    {
        question: " Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        choice1: "if(x 2)",
        choice2: "if(x=2)",
        choice3: "if(x==2);",
        choice4: "if(x !=2);",
        answer: 3,
    },
    {
        question: " How do you find the minimum of x and y using Javascript?",
        choice1: "min(x,y)",
        choice2: "Math.min(x,y)",
        choice3: "Math.min(xy)",
        choice4: "min(xy)",
        answer: 2,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion()
    countdown_start();
};
countdown_start = () => {
    time = 15
        const gameTimer = setInterval(function() {
            time--
            timer.textContent = "Time: " + time
            
            if (time <= 0) {
                clearInterval(gameTimer)
                localStorage.setItem('mostRecentScore', score)
                return window.location.assign("./end.html")
            }
        }, 1000)
}
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        getNewQuestion();
    });
});

startGame();