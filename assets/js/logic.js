var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");

function setTimer(){
    var timeLeft = 60;

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
    //render first question

    //Start timer
    setTimer();
})


