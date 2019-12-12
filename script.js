var questionHeader = document.getElementById("question-one");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterEl = document.getElementById("questionCounter");
var timerEl = document.getElementById("time-left");
var scoreEl = document.getElementById("score");
var currentQuestion = {};
var acceptingAnswer = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var questions = [{
    question: "Commonly used data types DO NOT include:",
    choice1: "strings", 
    choice2: "booleans", 
    choice3: "alerts", 
    choice4: "numbers",
    answer: 3,
  },
  {
    question: "The condition in an if / else statement is enclosed within:",
    choice1: "quotes", 
    choice2: "curly brackets", 
    choice3: "parentheses", 
    choice4: "square brackets",
    answer: 3,
  },
  {
   question: "A good use for local storage could include:",
  choice1: "social security numbers",
  choice2: "passwords", 
  choice3: "credit card info", 
  choice4: "user's styling preferences for a web page",
  answer: 4,
  },
  {
  question: "The symbol used to target an id in CSS is: ",
  choice1: "#",
  choice2: ".", 
  choice3: "::", 
  choice4: "*",
  answer: 2,
  }
];

var secondsLeft = 75;
var interval;

var correctScore = 1;
var totalQuestions = 4;

function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

   interval = setInterval(function() {
        secondsLeft = secondsLeft - 1;
        timerEl.innerText = secondsLeft;

        if(secondsLeft === 0){
            clearInterval(interval);
        }
        
    }, 1000);
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= totalQuestions){
        return window.location.assign("index.html");
    }
    questionCounter++; 
    questionCounterEl.innerText = questionCounter + "/" + totalQuestions;

   var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    questionHeader.innerText = currentQuestion.question;

    choices.forEach(choices => {
        var number = choices.dataset["number"];
        choices.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswer = true;
};

choices.forEach(choice =>{
    choice.addEventListener("click", e => {
        var selectedChoice = e.target;
        var selectedChoiceIndex = selectedChoice.dataset["number"];

        var classToApply = 
            selectedChoiceIndex === currentQuestion.answer.toString() ? "correct" : "incorrect";

        console.log(typeof selectedChoiceIndex, typeof currentQuestion.answer)
            

        if(classToApply === "correct"){
            incrementScore(correctScore);
        }

        else{
            secondsLeft = secondsLeft - 5;
        }

            selectedChoice.parentElement.classList.add(classToApply);

        
            

            setTimeout( () => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreEl.innerText = score;
}


startGame(); 

