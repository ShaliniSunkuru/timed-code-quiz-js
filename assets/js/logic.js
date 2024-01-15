var timeEl = document.querySelector("#time");
var startScreenDiv = document.querySelector("#start-screen");
var endScreenDiv = document.querySelector("#end-screen");
var startBtn = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions")
var questionH2 = document.querySelector("#question-title")
var choicesDiv = document.querySelector("#choices");
var feedbackDiv = document.querySelector("#feedback");
var finalScoreSpan = document.querySelector("#final-score")
var initalsIp = document.querySelector("#initials")
var submitBtn = document.querySelector("#submit")
var currentQuestionIndex = 0;
var currentQuestion;
var score = 0;
var timeLeft = 75;
var timeInterval;
var highscores = [];
var correctSnd = new Audio("../assets/sfx/correct.wav");
var incorrectSnd = new Audio("../assets/sfx/incorrect.wav");

function setTimer(){
    
    timeLeft = 75;
    //display time left before starting timer
    timeEl.textContent = timeLeft;

    //set time interval for countdown timer

    timeInterval = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeEl.textContent = timeLeft;
        }else{ //Stop timer and end quiz at 0
            endQuiz();
        }
        
    }, 1000);    
}

startBtn.addEventListener("click", function(){

    //Hide start screen
    startScreenDiv.classList.toggle("hide");
   
    //render first question
    currentQuestionIndex = 0;
    renderQuestion();

    //Start timer
    setTimer();
})

function renderQuestion(){
    
    //Show Question section: change class from hide to start
    questionsDiv.classList.remove("hide");

    //current question
    currentQuestion = questions[currentQuestionIndex];

    //Question title
    questionH2.textContent = currentQuestion.questionTitle;

    // Choice buttons for the question
    choicesDiv.innerHTML ="";
    choicesDiv.setAttribute("style", "display: block");
    currentQuestion.choices.forEach((element, index) => {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("data-index", index + 1);
        choiceBtn.textContent = (index + 1) + ". " + element;
        choicesDiv.append(choiceBtn);
        
    });    
}

//click event for question choice    
choicesDiv.addEventListener("click", function(e){

    var element = e.target;
    var elementIndex = element.getAttribute("data-index");
    
    //check if chosen answer is correct
    checkAnswer(elementIndex);
    feedbackDiv.classList.remove("hide");
    setTimeout(function(){
        feedbackDiv.classList.add("hide");
    }, 400);
    
    
    //render next question
    if(currentQuestionIndex < questions.length - 1){
        currentQuestionIndex++;
        renderQuestion();
    }else{
        endQuiz();
        
    }
       
    })
function checkAnswer(index){
       if(index === currentQuestion.correctChoice){
        score += 5;
        feedbackDiv.textContent = "Correct"
        correctSnd.play();
       }else{
        feedbackDiv.textContent = "Wrong"
        timeLeft = timeLeft - 10;
        incorrectSnd.play();
       }
        
}

function endQuiz(){
    questionsDiv.classList.toggle("hide");
    endScreenDiv.classList.toggle("hide");
    finalScoreSpan.textContent = score;
    clearInterval(timeInterval);
}

submitBtn.addEventListener("click", function(){
    //save highscores to localStorage
    if(localStorage.length > 0){
        highscores = JSON.parse(localStorage.getItem("highscores"));
    }
    if(initalsIp.value.length === 0){
        alert("Please enter initials to save score!")
        return;
    }else if(initalsIp.value.length > 3){ //check if length of initials is max 3
        alert("Please enter up to 3 letters for intials!"); 
        return; //stop execution if length of initials exceeds 3
    }else{ //capture initials and score
        var highscore = {
            initials: initalsIp.value,
            score: score
        }
    }

    highscores.push(highscore);
    localStorage.setItem("highscores", JSON.stringify(highscores)); 

    //open highscores page
    loadHighscoresPage();

})

//To load View highscores page
function loadHighscoresPage(){
    window.location = "highscores.html";
}

