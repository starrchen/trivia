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
  // [ question, answer choices[A, B, C], right answer, wrong answers[1, 2] ]
  [ "Question 1", ["Answer 1A", "Answer 1B", "Answer 1C"], "C", ["A", "B"] ],
  [ "Question 2", ["Answer 2A", "Answer 2B", "Answer 2C"], "B", ["A", "C"] ],
  [ "Question 3", ["Answer 3A", "Answer 3B", "Answer 3C"], "C", ["A", "B"] ],
  [ "Question 4", ["Answer 4A", "Answer 4B", "Answer 4C"], "A", ["B", "C"] ],
  [ "Question 5", ["Answer 5A", "Answer 5B", "Answer 5C"], "B", ["A", "C"] ],
];

// adds the question string to the question div
var addQuestion = function() {
  $(".question").text(triviaPrompts[questionCount][0]);
};

// adds the answer choices to 3 answer divs
var addAnswers = function(){
  $("#A").text( triviaPrompts[questionCount][1][0] );
  $("#B").text( triviaPrompts[questionCount][1][1] );
  $("#C").text( triviaPrompts[questionCount][1][2] );
};

// clicking a CORRECT answer div:
// (1) changes the text color to white,
// (2) changes other answers to grey,
// (3) shows if right/wrong & score

var chooseAnswer = function(){

  var rightAnswer = function() {
    $(this).css("color", "white"); // (1)
      //change other answers to grey
      $("#" + triviaPrompts[questionCount][3][0]).css("color", "grey");
      $("#" + triviaPrompts[questionCount][3][1]).css("color", "grey"); //(2)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Right!");
    if (clickCount < 1) {
      score = score + 10;
    }
    setScore();
    clickCount++;
    $(".next").show();
  };


  // clicking on a WRONG answer div: (1), (2), and (3) remain the same with different right-or-wrong text and different score

  var wrongAnswer = function () {
    $(".answer").css("color", "grey"); //(2)
    $(this).css("color", "white"); // (1)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Wrong, it was " +  $("#" + triviaPrompts[questionCount][2]).text());
    clickCount++;
    $(".next").show();
  };


  var answerChoices = function() {
    $(".answer").off("click");
    $("#" + triviaPrompts[questionCount][2]).on("click", rightAnswer);
    $("#" + triviaPrompts[questionCount][3][0]).on("click", wrongAnswer);
    $("#" + triviaPrompts[questionCount][3][1]).on("click", wrongAnswer);
  };

  answerChoices();
};


$(".next").on("click", function(){
  questionCount++;
  addQuestion();
  addAnswers();
  $(".right-or-wrong").hide();
  $(".answer").css("color", "black");
  clickCount = 0;
  chooseAnswer();

  // if (questionCount >= (triviaPrompts.length - 1)) {
  //   $(".next").text("Game over!")
  // }
});
