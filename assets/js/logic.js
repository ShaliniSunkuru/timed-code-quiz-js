var timeEl = document.querySelector("#time");
var sctartScreenDiv = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions")
var questionH2 = document.querySelector("#question-title")
var choicesDiv = document.querySelector("#choices");

function setTimer(){
    var timeLeft = 75;

    //display time left before starting timer
    timeEl.textContent = timeLeft;

    //set time interval for countdown timer

    var timeInterval = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeEl.textContent = timeLeft;
        }else{ //Stop timer at 0
            clearInterval(timeInterval);

        }
        
    }, 1000);    
}

startBtn.addEventListener("click", function(){

    //Hide start screen
    sctartScreenDiv.className = "hide";
   
    //render first question
    renderQuestion(questions[0]);

    //Start timer
    setTimer();
})

function renderQuestion(question){
    
    //Show Question section: change class from hide to start
    questionsDiv.className = "start";

    //Question title
    questionH2.textContent = question.questionTitle;

    // Choice buttons for the question
    choicesDiv.setAttribute("style", "display: block");
    question.choices.forEach((element, index) => {
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent = (index + 1) + ". " + element;
        choicesDiv.append(choiceBtn);
        
    });
}
