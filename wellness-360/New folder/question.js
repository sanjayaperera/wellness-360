
const startButton = document.getElementById('start');
const score = document.getElementById('score');
const timerLabel = document.getElementById('timer-label');
const timerLabel2 = document.getElementById('timer-label-2');
// helper functions
function setHTML(el, text) {
  el.innerHTML = text;
}
startButton.addEventListener('click', (event) => {
  ob.start();
});
// create Object
const ob = new Object;
ob.score = 0;
ob.no = 0;
ob.inProgress = false;
ob.countDown = false;
ob.countDownStart = Date.now();
ob.startTime = Date.now();
// Object Methods
ob.start = function () {
  if (ob.inProgress) return;
  if (ob.countDown) return;
//  if (ob.no == 0) nextButton.disabled = false;
//  slide(false);
  ob.countDownStart = Date.now();
  ob.countDown = true;
}
ob.begin = function () {
//  if (ob.no == 0) nextButton.disabled = false;
  if (ob.inProgress) return;
  ob.score = 0;
  ob.no = 0;
  setHTML(score, ob.score);
  ob.countDown = false;
  currentSlide(2);  
  ob.startTime = Date.now()
  ob.inProgress = true;
}
ob.end = function () {
  ob.inProgress = false;
  showScores();
}
// Timer functions
function checkTimers() {
  if (ob.countDown) {
    const diff = 3 - Math.floor((Date.now() - ob.countDownStart) / 1000);
    if (diff > 0) {
      setHTML(timerLabel, "Starting in: "+ diff);
    } else {
      ob.begin();
    }
  }
  // 5 sec per question 10 question have to answer
  if (ob.inProgress) {
    const diff = (6 * 10) - Math.floor((Date.now() - ob.startTime) / 1000);
    if (diff > -1) {
      setHTML(timerLabel2, "Remaining: " + diff);
    } else {
      ob.end();
    }
  }
}
setInterval(checkTimers, 100);
var correct=[];
var incorrect=[];
var correctAnswers = "";
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("grid");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
  question = this.getQuestionIndex();
  if(question.isCorrectAnswer(answer)) {
    this.score = this.score + 1;
    correct.push(question);
  }
  else{
    //this.score = this.score - 1;
    //correctAnswers += question.text + "<br><font color='red'>"+ question.answer + "</font><br>";
  }
  this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
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
    gameOverHTML += "<h2 id='score'><font color='white'> Your score: " + quiz.score + "</font> </h2>";
    var found = false;
    for (i = 0; i < questions.length; i++) {
      for (j = 0; j < correct.length; j++) {
        if (questions[i].text == correct[j].text) {
          found = true;
          break;
        }else {
          found = false;
        }
      };
      if (!found){
        correctAnswers += questions[i].text + "<br><font color='red'>"+ questions[i].answer + "</font><br>";           
      }
    };
    
    if (quiz.score >= 0 && quiz.score < 10){
      gameOverHTML += "<h5 id='answers'> <u>The correct answers are:</u> " + "<br>" + correctAnswers + "</h5>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    if (quiz.score >= 7 && quiz.score <= 10) {
      document.getElementById("score").style.backgroundColor = "green";
    } else if (quiz.score >= 5 && quiz.score < 7) {
      document.getElementById("score").style.backgroundColor = "yellow";
    } else {
      document.getElementById("score").style.backgroundColor = "red";
    }
};
// create questions here

var questions = [
    new Question("Which of the following is a key component of maintaining overall wellness?", ["Regular exercise", "Skipping meals", "Smoking", "Sedentary lifestyle"], "Regular exercise"),
    new Question("What type of food should be included in a healthy, balanced diet?", ["DaProcessed foods and sugary beverages", "Fruits, vegetables, whole grains, and lean proteins", "Fast food and deep-fried items", "High-calorie desserts and snacks"], "SFruits, vegetables, whole grains, and lean proteins"),
    new Question("How can exercise contribute to a healthy life?", ["By increasing stress levels", " By reducing energy levels", "By improving cardiovascular health and mood", " By promoting weight gain"], "By improving cardiovascular health and mood"),
    new Question("What role does sleep play in maintaining wellness?", ["It has no impact on overall health."," It helps in reducing stress and anxiety", "It can lead to weight loss.",  "It weakens the immune system."], " It helps in reducing stress and anxiety"),
    new Question("Which nutrient is essential for proper brain function and cognitive health?", ["Vitamin C","Calcium", "Omega-3 fatty acids", "Iron"], "Omega-3 fatty acids"),
    new Question("Question: How can social connections influence mental health?", ["They have no impact on mental health.","Social connections can lead to increased stress", "Social isolation can improve mental well-being.", "Social connections provide support and reduce feelings of loneliness."], "Social connections provide support and reduce feelings of loneliness."),
    new Question(" What can excessive stress do to our physical health?", [" Improve immune function","Increase risk of chronic diseases", "Aid in weight loss", "Enhance memory and concentration"], "Increase risk of chronic diseases"),
    new Question("How much water should a person ideally drink daily for overall wellness?", [" 1-2 cups","4-6 cups", " 8-10 cups", " 12-15 cups"], "8-10 cups"),
    new Question("Which type of exercise helps improve flexibility and balance?", [" Cardio exercises","Yoga", " Weightlifting", "Running"], " Yoga"),
    new Question("Which of the following is a healthy way to cope with stress and maintain good mental health?", ["Isolating oneself from others"," Engaging in regular physical activity", "Relying on alcohol or drugs for relaxation", "Overeating unhealthy foods"], "Engaging in regular physical activity")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();