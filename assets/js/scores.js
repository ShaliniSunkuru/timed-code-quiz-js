var highscoresOl = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");
var savedHighscores = [];

displayHighscores();

clearBtn.addEventListener("click", function(){
    localStorage.clear();
    displayHighscores();
})

function displayHighscores(){
    if(localStorage.length > 0){
        savedHighscores = JSON.parse(localStorage.getItem("highscores")).reverse();

    for(var i = 0; i < savedHighscores.length; i ++){
        var highscoreLi = document.createElement("li");
        highscoreLi.textContent = savedHighscores[i].initials;
        var highscoreSpan = document.createElement("span")
        highscoreSpan.textContent = savedHighscores[i].score;
        highscoreSpan.setAttribute("style", "float:right");
        highscoresOl.setAttribute("style", "width: 300px");
        highscoreLi.append(highscoreSpan);    
        highscoresOl.append(highscoreLi);
        }
    }else{
        highscoresOl.innerHTML ="";
    }
    
}



