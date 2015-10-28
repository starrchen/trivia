$(document).ready(function(){
  addQuestion();
  addAnswers();
  setScore();
  chooseAnswer();
});

var clickCount = 0; //clicks per question should never exceed 1
var questionCount = 0;
var score = 0;
var setScore = function() {
  if (clickCount < 1) {
    $(".score").html("<p>" + score + " points</p>");
  }
};

var triviaPrompts = [
  // Format: [ question, answer choices[A, B, C], right answer, wrong answers[1, 2] ]
  [ "What was the first animated film to be nominated at the Academy Awards for Best Picture?", ["Fantasia (1940)", "Beauty and the Beast (1991)", "The Lion King (1994)"], "B", ["A", "C"] ],
  [ "Which of these is not a Disney animated film heroine?", ["Anastasia", "Bianca", "Eilonwy"], "A", ["B", "C"] ],
  [ "What was the last film to use the storybook introduction sequence?", ["The Sword in the Stone (1963)", "Robin Hood (1973)", "The Little Mermaid (1989)"], "B", ["A", "C"] ],
  [ "What is the name of Alice's cat in Alice in Wonderland (1951)?", ["Dana", "Diana", "Dinah"], "C", ["A", "B"] ],
  [ "Which of these is not one of the Seven Dwarves in Snow White and the Seven Dwarfs (1937)?", ["Bashful", "Wheezy", "Happy"], "B", ["A", "C"] ],
  [ "What was the first film released during the 'Disney Renaissance'?", ["The Little Mermaid (1989)", "Lilo & Stitch (2002)", "The Princess & the Frog (2009)"], "A", ["B", "C"] ],
  [ "What film is the inspiration for the Disney theme park ride Splash Mountain?", ["Make Mine Music (1946)", "Song of the South (1946)", "The Adventures of Ichabod and Mr. Toad (1949)"], "B", ["A", "C"] ],
  [ "In which film can you find a character named Lucifer?", ["Cinderella (1950)", "The Sword in the Stone (1963)", "The Rescuers (1977)"], "A", ["B", "C"] ],
  [ "In Aladdin (1992), how long did Genie spend in his lamp?", ["100 years", "1,000 years", "10,000 years"], "C", ["A", "B"] ],
  [ "What is the name of Max Goof's pop idol in _A Goofy Movie_ (1995)?", ["Powerline", "Megawatt", "I2I"], "A", ["B", "C"] ]
];

// adds the question string to the question div
var addQuestion = function() {
  console.log(questionCount);
  $(".question").text(triviaPrompts[questionCount][0]);
};

// adds the answer choices to 3 answer divs
var addAnswers = function(){
  $("#A").text( triviaPrompts[questionCount][1][0] );
  $("#B").text( triviaPrompts[questionCount][1][1] );
  $("#C").text( triviaPrompts[questionCount][1][2] );
};

var chooseAnswer = function(){

  // clicking a CORRECT answer div:
  // (1) changes the text color to white,
  // (2) changes other answers to grey,
  // (3) shows if right/wrong & score
  var rightAnswer = function() {
    if (clickCount < 1) {
    $(this).css("color", "white"); // (1)
      //change other answers to grey
      $("#" + triviaPrompts[questionCount][3][0]).css("color", "grey");
      $("#" + triviaPrompts[questionCount][3][1]).css("color", "grey"); //(2)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Right!");
      score = score + 10;
    }
    setScore();
    clickCount++;
    $(".next").show();
  };

  // clicking on a WRONG answer div: (1), (2), and (3) remain the same with different right-or-wrong text and different score
  var wrongAnswer = function () {
    if (clickCount < 1) {
    $(".answer").css("color", "grey"); //(2)
    $(this).css("color", "white"); // (1)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Nope, it was " +  $("#" + triviaPrompts[questionCount][2]).text() + ".");
    clickCount++;
    $(".next").show();
    }
  };

  // right/wrong changes occur when one of the answer choice divs is clicked
  var answerChoices = function() {
    $(".answer").off("click"); // removes any previously bound click event listeners
    $("#" + triviaPrompts[questionCount][2]).on("click", rightAnswer);
    $("#" + triviaPrompts[questionCount][3][0]).on("click", wrongAnswer);
    $("#" + triviaPrompts[questionCount][3][1]).on("click", wrongAnswer);
  };

  answerChoices();
};

// clicking next div will progress to the next question and reset for each question, which will:
// (1) hide the right/wrong box
// (2) change answer choice text color back to black
// (3) hide the next box, etc.
var onNext = function(){
  questionCount++;
  if ( questionCount <= (triviaPrompts.length-1)) {
    addQuestion();
    addAnswers();
    $(".right-or-wrong").hide();
    $(".next").hide();
    $(".answer").css("color", "black");
    clickCount = 0;
    chooseAnswer();
  }

// on last question, text in next div changes to "Game over!"
// clicking the div opens spoopy video (at game over)
  if ( questionCount == (triviaPrompts.length-1 ) ) {
      $(".next").html("Game over! " + " <p class = 'fa fa-play-circle'></p>");
  } else if ( questionCount > (triviaPrompts.length-1 ) ) {
    console.log("game over!");
    window.open("https://www.youtube.com/v/nlM60Nwc6CE&autoplay=1", "_blank");
  }

};

// goes to next question on click AND on keydown - enter key
$(".next").on("click", onNext);
$("html").on("keydown", function(e){
  if ($(".next").css("display") !== "none"){
    if (e.keyCode == 13) {
      onNext();
    }
  }
});
