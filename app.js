
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // Show Question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // Show Options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("bttn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your Score is : " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// Create Questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["XML1", "XHTML", "CSS", "HTML"], "HTML"),
    new Question("The Bootstrap grid system is based on how many columns?", ["3", "12", "6", "9"], "12"),
    new Question("Which HTML attribute is used to define inline styles?", ["class", "style", "styles", "font"], "style"),
    new Question("How to write an IF statement in JavaScript?", ["if i=5 then", "if i==5 then", "if i=5", "if(i==5)"], "if(i==5)"),
];

// Create Quiz
var quiz = new Quiz(questions);

// Display Quiz
populate();