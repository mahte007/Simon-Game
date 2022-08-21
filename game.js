var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var firstKeyPress = false;
var level = 0;



$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});



$(document).on("keydown", function(){
    if(!firstKeyPress){
        nextSequence();
        firstKeyPress = true;
    }
});


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(soundName){
    var sound = new Audio("sounds/" + soundName + ".mp3")
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    firstKeyPress = false;
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart!")

        $(document).on("keypress", startOver());

    }
}
