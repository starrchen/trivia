$(document).ready(function(){
  // One thing that I noticed is that you have 2 separate trivia applications. Seems that much of the code and logic is consistent and repeated. I encourage you to refactor this site to incorporate themes and combine all the functionality of both sets into one application.
  addQuestion();
  addAnswers();
  setScore();
  chooseAnswer();
});

var clickCount = 0; //clicks per question should never exceed 1
var questionCount = 0;
var score = 0;
// this is small, but were not really setting the score here, were updating the display with the score.
// I see some other on the fence variable names throughout the application, but I'll address it for the first one. Naming is one of the hardest things to do in programming. Seriously though it is. Providing semantic variable names is very helpful to the collaborative process and in your own development.
var setScore = function() {
  if (clickCount < 1) {
    $(".score").html("<p>" + score + " points</p>");
  }
};

var triviaPrompts = [
  // Format: [ question, answer choices[A, B, C], right answer, wrong answers[1, 2] ]
  // So there's 2 ways we can represent this data. One is the way you did it with arrays. Another is to use objects. When using arrays, it forces us to use integers to index because it's an ordered list. That can become cryptic as we start to scale our applications. We're better of having an array of trivia prompt objects. In that way we have semantic indexing. Something like this:
  // {
  //   question: "What is the name of the cat in Hocus Pocus (1993)?",
  //   choices: ["Elijah Binx", "Zachary Binx", "Thackery Binx"],
  //   answer: "C",
  //   wrongAnswers: ["A", "B"]
  // }
  // In this way, if we need to add another property just add another key value pair.. I don't need to remember hmm what was the index of the last property I created. This might get tricky when we deal with something that might have 15 or 20 properties.

  [ "What is the name of the cat in Hocus Pocus (1993)?", ["Elijah Binx", "Zachary Binx", "Thackery Binx"], "C", ["A", "B"] ],
  [ "It's just a jump to the left. And then a step to the right. With your hands on your hips, you...", ["kick your feet up high", "bring your knees in tight", "jump towards the sky"], "B", ["A", "C"] ],
  [ "Who is not a member of the Addams Family?", ["Lurch", "Pugsley", "Uncle Pester"], "C", ["A", "B"] ],
  [ "What is Casper the Friendly Ghosts's last name?", ["McFadden", "Wessel", "Harvey"], "A", ["B", "C"] ],
  [ "How do you actually spell Beetlejuice's name?", ["Beateljuse", "Betelgeuse", "Bietlegeuss"], "B", ["A", "C"] ],
  [ "The mask in the slasher film Halloween (1978) is actually a painted mask of whose face?", ["William Shatner", "Richard Nixon", "John Lennon"], "A", ["B", "C"] ],
  [ "Which actress stars in Disney's Halloweentown franchise?", ["Debbie Reynolds", "Janet Leigh", "Jamie Lee Curtis"], "A", ["B", "C"] ],
  [ "What did NOT happen at the 'Monster Mash'?", ["A graveyard smash", "Caught on in a flash", "Caused quite a splash"], "C", ["A", "B"] ],
  [ "What kind of monster is Michael Jackson by the end of 'Thriller'?", ["Vampire", "Werewolf", "Zombie"], "B", ["A", "C"] ],
  [ "Which superstition does Stevie Wonder mention in his song 'Superstition'?", ["Black cat", "Broken mirror", "Spilled salt"], "B", ["A", "C"] ]
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
  // this is potentially dangerous. what was the rationale for defining these functions within the chooseAnswer function? the reason this could be potentially dangerous is about scope and context. Read comment below where you invoked chooseAnswer. I would seperate these functionalities a litte more.
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
    // Here, we invoke chooseAnswer. Every time onNext occurs, we redefine 3 new functions, every time.
  }

// on last question, text in next div changes to "Game over!"
// clicking the div opens spoopy video (at game over)
  if ( questionCount == (triviaPrompts.length-1 ) ) {
      $(".next").html("Game over! " + " <p class = 'fa fa-play-circle'></p>");
  } else if ( questionCount > (triviaPrompts.length-1 ) ) {
    console.log("game over!");
    window.open("https://www.youtube.com/v/v4IC7qaNr7I&autoplay=1", "_blank");
  }
// think it would be cool if you gave the user an option to reset the game.

};

// very cool
// goes to next question on click AND on keydown - enter key
$(".next").on("click", onNext);
$("html").on("keydown", function(e){
  if ($(".next").css("display") !== "none"){
    if (e.keyCode == 13) {
      onNext();
    }
  }
});
