# Project-1

## Self-scoring Trivia

### User Stories:

As a player, I should be able to:

* tell the difference between my question and answer choices so I can submit an answer choice
* choose my answer on the same screen as the question so I can refer to the question while answering
* be able to tell which answer choice I selected
* immediately see the correct answer after choosing so I can know if I chose correctly
* see my score so I can keep track of my performance (# of questions correct) while I play
* progress to the next question after answering so I can complete the entire quiz without skipping questions

Bonus features:
* switch between trivia modes
* see a fun video at the conclusion of the quiz

### How It's Made:

This trivia game is a Javascript-based site (run on the jQuery library). The gist of the approach to developing the game was storing all questions in an array (`triviaPrompts`) and storing the following information for each question:
1. The question (a string)
2. An array of three (3) answer choices (strings)
3. The correct answer choice ("A" / "B" / "C")
4. An array of the wrong answer choices ("A" / "B" / "C")

This made each of the 4 components of every question easy to call. The question and answer choice strings were inserted into their respective HTML `<div>` elements, and functions for `rightAnswer` and `wrongAnswer` were written with the correct answer and wrong answer arrays, running behaviors that depended on which answer `<div>` was clicked. If right, the score would increase by 10 points and a box would appear saying "Right!" If wrong, the score would remain the same and a box would appear saying "Nope, it was " + the correct answer choice.

Regardless of which answer choice was selected, the selected choice text color would change to white while the other choices would change to grey, and then a "Next" box would appear to advance to the next question. (Hitting "enter" on the keyboard would also advance, but only after selecting an answer choice.)

On the final question, the "Next" box changes to a "Game over" box and will open a fun video in a new tab on click/hitting "enter".

At the top, there is a small icon that allows the user to go to the other trivia set - Halloween if there is a pumpkin or Disney if there is Mickey Mouse. Each trivia set has its own background image, color scheme, favicon, and fun video.

Features that would be added given more time include:
* Randomized question order
* Randomized answer choice order
* Toggle music option (click to play music, click to stop)
* Timed game option and/or time-based scoring
* Konami code

### Original Prompt

Pre-load your app with some questions and answers.

Test the user's wits & knowledge with whatever-the-heck you know about (so you can actually win). Guess answers, have the computer tell you how right you are!

Bonus:
* Add time-based scoring
* Track scores across games (even if the page is reloaded)
* Allow users to compete against each other on a high-score board.
