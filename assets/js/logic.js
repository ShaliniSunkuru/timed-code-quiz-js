var timeEl = document.querySelector("#time");
var startScreenDiv = document.querySelector("#start-screen");
var endScreenDiv = document.querySelector("#end-screen");
var finalScoreSpan = document.querySelector("#final-score")
var startBtn = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions")
var questionH2 = document.querySelector("#question-title")
var choicesDiv = document.querySelector("#choices");
var currentQuestionIndex = 0;
var currentQuestion;
var score = 0;
var timeLeft = 75;

function setTimer(){
    
    timeLeft = 75;
    //display time left before starting timer
    timeEl.textContent = timeLeft;

    //set time interval for countdown timer

    var timeInterval = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeEl.textContent = timeLeft;
        }else{ //Stop timer at 0
            clearInterval(timeInterval);
            endQuiz();
        }
        
    }, 1000);    
}

startBtn.addEventListener("click", function(){

    //Hide start screen
    startScreenDiv.className = "hide";
   
    //render first question
    currentQuestionIndex = 0;
    renderQuestion();

    //Start timer
    setTimer();
})

function renderQuestion(){
    
    //Show Question section: change class from hide to start
    questionsDiv.className = "start";

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
        score++;
       }else{
        timeLeft = timeLeft - 10;
       }
        
}

function endQuiz(){
    questionsDiv.className = "hide";
    endScreenDiv.className = "start";
    finalScoreSpan.textContent = score;
}
