var timeEl = document.querySelector("#time");

function setTimer(){
    var timeLeft = 60;

    //set time interval for countdown timer

    var timeInterval = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeEl.textContent = timeLeft;
        }else{
            clearInterval(timeInterval);

        }
        
    }, 1000);
    
}

