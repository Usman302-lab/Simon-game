var userClickedPattern = [];

var gamePattren = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  if (started === true) {
    playsound(buttonColours[randomNumber]);
    level++;
    $("#level-title").text("Level " + level);
  }
  var randomChosenColour = buttonColours[randomNumber];

  gamePattren.push(randomChosenColour);
  console.log(gamePattren);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  return randomNumber;
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
  }
  nextSequence();
});

function startOver() {
  level = 0;
  gamePattren = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattren[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
