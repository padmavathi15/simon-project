var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when a keyboard key is pressed and start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect button clicks and handle them
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);  // Check the user's answer after each click
});

function nextSequence() {
  userClickedPattern = [];  // Reset the userClickedPattern for the next level
  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // Animate the chosen button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Check if the user's answer is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // If the user has finished the sequence, move to the next level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");  // Play the wrong sound

    // Apply the "game-over" class and remove it after 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Change the title to "Game Over" and prompt the user to restart
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset the game
    startOver();  // Call startOver() to reset the game variables
  }
}

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(function(error) {
    console.log("Error playing sound: " + error);
  });
}

// Animate button presses
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}