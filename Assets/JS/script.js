var currentQuestionIndex = 0;
var time = 60;
var timerInterval;
var correctAnswersCount = 0;

// Questions
var questions = [
  {
    question: "Which of the following is NOT part of Javascript",
    options: ["Arrays", "If Else Statements", "Anchor Tags", "Booleans"],
    correctAnswer: "Anchor Tags"
  },
  {
    question: "How do you link an external Javascript file to an HTML document?",
    options: ["Place it in the same folder", "Use Script tags", "It is automatically applied in certain browsers", "Place it in the same repository"],
    correctAnswer: "Use Script tags"
  },
  {
    question: "What do you access to manipulate HTML with Javascript?",
    options: ["DOM", "ODM", "MOD", "MDO"],
    correctAnswer: "DOM"
  }
];

// Game Mechanics
function startQuiz() {
  displayQuestion();
  timerInterval = setInterval(updateTimer, 1000);
}

function displayQuestion() {
  var questionContainer = document.getElementById("question-container");
  var optionsContainer = document.getElementById("options-container");

  questionContainer.innerHTML = questions[currentQuestionIndex].question;
  optionsContainer.innerHTML = "";

  for (var i = 0; i < questions[currentQuestionIndex].options.length; i++) {
    var button = document.createElement("button");
    button.innerHTML = questions[currentQuestionIndex].options[i];
    button.onclick = checkAnswer;
    optionsContainer.appendChild(button);
  }
}

function checkAnswer() {
  var selectedOption = this.innerHTML;
  var correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedOption === correctAnswer) {
    alert("Correct!");
    correctAnswersCount++;
  } else {
    time -= 10;
    alert("Wrong! You lose 10 seconds!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

//Timer

function updateTimer() {
  var timerElement = document.getElementById("time");
  timerElement.textContent = time;
  
  if (time > 0) {
    time--;
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  alert("Quiz ended! You got " + correctAnswersCount + " correct answers.");
  
  // Prompt the user for a nickname
  var user = prompt("Please Enter Nickname", "");

  if (user == null || user == "") {
    user = "User Cancelled";
  }

  // Save the score to localStorage
  localStorage.setItem("userScore", correctAnswersCount);
  localStorage.setItem("userName", user);

  // Display the score
  displayUserScore(user);
}

function displayUserScore(userName) {
  var userScoreContainer = document.getElementById("user-score-container");
  userScoreContainer.innerHTML = "<h2>Your Score</h2>";
  var scoreEntry = document.createElement("div");
  scoreEntry.textContent = "Score: " + correctAnswersCount + " | User: " + userName;
  userScoreContainer.appendChild(scoreEntry);
}
// NOTE: I couldn't figure out how to display the leaderboard, but here are the methods i tried.
//var leaderboardData = [
//  { name: "Player1", score: 150 },
//  { name: "Player2", score: 120 },
//  { name: "Player3", score: 100 },
//  { name: "Player4", score: 80 },
//  { name: "Player5", score: 60 }
//];

//function displayLeaderboard() {
//  var scoresContainer = document.getElementById("scores");
 // scoresContainer.innerHTML = "";

  //leaderboardData.forEach(function(entry) {
  //  var listItem = document.createElement("li");
    //listItem.className = "score";
   // listItem.textContent = entry.user + ": " + entry.correctAnswersCount;
   // scoresContainer.appendChild(listItem);
 // });
//}

function addScoreToLeaderboard(user, correctAnswersCount) {
  leaderboardData.push({ name: user, score: correctAnswersCount });
  // Sort the leaderboard by score in descending order
  leaderboardData.sort(function(a, b) {
    return b.score - a.score;
  });
  displayLeaderboard();
}

document.addEventListener("DOMContentLoaded", startQuiz);