$(document).ready(function(){
  addQuestion();
  addAnswers();
  setScore();
  chooseAnswer();
});

var clickCount = 0; //clicks per question should never exceed 1
var questionCount = 1;
var score = 0;
var setScore = function() {
  $(".score").html("<p>" + score + " points</p>");
};

var halloween = [
  // question : answer choices
  [ "Question 1", ["Answer 1A", "Answer 1B", "Answer 1C"] ],
  [ "Question 2", ["Answer 2A", "Answer 2B", "Answer 2C"] ],
  [ "Question 3", ["Answer 3A", "Answer 3B", "Answer 3C"] ],
  [ "Question 4", ["Answer 4A", "Answer 4B", "Answer 4C"] ],
  [ "Question 5", ["Answer 5A", "Answer 5B", "Answer 5C"] ],
];

// console.log(halloween[0]);
// console.log(halloween[0][0]); //prints "Question 1"
// console.log(halloween[0][1][2]); //prints "Answer 1C"

// adds "Question 1" to the question div
var addQuestion = function() {
  $(".question").append(halloween[0][0]);
};
// addQuestion();

// adds the answer choices to 3 answer divs
var addAnswers = function(){
  $("#A").text( halloween[0][1][0] );
  $("#B").text( halloween[0][1][1] );
  $("#C").text( halloween[0][1][2] );
};
// addAnswers();

// clicking a CORRECT answer div:
// (1) changes the text color to white,
// (2) changes other answers to grey,
// (3) shows if right/wrong & score

var chooseAnswer = function(){


  var rightAnswer = function() {
    $(this).css("color", "white"); // (1)
    $("#B").css("color", "grey"); $("#C").css("color", "grey"); //(2)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Right!");
    score = score + 10;
    setScore();
    questionCount++;
  };

  $("#A").on("click", rightAnswer);

  // // clicking on a WRONG answer div: (1), (2), and (3) remain the same with different right-or-wrong text and different score

  var wrongAnswer = function () {
    console.log(this);

    $(".answer").css("color", "grey"); //(2)
    $(this).css("color", "white"); // (1)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Wrong, it was " + $("#A").text());
    questionCount++;
  };

  $("#B").on("click", wrongAnswer);
  $("#C").on("click", wrongAnswer);

};

if (questionCount >= 2) {

}
