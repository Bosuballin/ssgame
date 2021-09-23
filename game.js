//Variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0

//Simon Says

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  userClickedPattern = [];                                                        //this forces the user to remember all previous entries to match the pattern
  level++;
  $("#level-title").text("Level " + level);

  playSound(randomChosenColor);
}

//Audio

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// User Says

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);                                    // THIS DEFINES THE VALUE AND CALLS THE checkAnswer() function BELOW. Value Defined By Last Position in the UserClickedPattern ARRAY

});

// Animating the Pressed Button

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
};

// Game Start. Keydown begins level changed started = true

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("Body").removeClass("game-over");
  }
});

//Check User's Answers Against Game Sequence

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {         // IF THE GAME PATTERN [ARRAY POSITION X] === IS EQUAL TO === THE USERCLICKEDPATTERN [ARRAY POSITION X]
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {                     // IF THE GAME PATTERN LENGTH ==== THE USERCLICKEDPATTERN LENGTH .... START THE NEXT ROUND....
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("Body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart.")
    started = false;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
  }
}
