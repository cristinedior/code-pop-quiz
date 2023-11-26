const quizQuestions = [
    {
      question: "Where do you find the javascript file on the web browser dev tool?",
      options: ["A. in Elements", "B. in Styles", "C. in Console", "D. It is not possible"],
      correctAnswer: "C. in Console"
    },
    {
      question: "Are Java and Javascript the same thing?",
      options: ["A. True", "B. False"],
      correctAnswer: "B. False"
    },
    {
      question: "What does HTML stand for?",
      options: ["A. Hyper Text Markup Language", "B. Hello There Mate Larry", "C. Hyperlink and Text Markup Language", "D. How To Make Lentils"],
      correctAnswer: "A. Hyper Text Markup Language"
    },
    {
      question: "What would this be considered within a variable: sixteen?",
      options: ["A. Number", "B. Object", "C. Boolean", "D. String"],
      correctAnswer: "D. String"
    }
  ];
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let timer;
  let timeLeft = 0;
  
  const questionContainer = document.getElementById("question-container");
  const choiceContainer = document.querySelector(".choice-container");
  const timerElement = document.getElementById("timer");
  const highscoreElement = document.getElementById("highscore");
  const scoreForm = document.getElementById("score-initals");
  
  scoreForm.style.display = "none";
  
  document.addEventListener("DOMContentLoaded", startQuiz);
  
  function startQuiz() {
    displayQuestion();
    startTimer();
  
    choiceContainer.addEventListener("click", handleChoiceClick);
    scoreForm.addEventListener("submit", handleFormSubmit);
  }
  
  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    questionContainer.textContent = currentQuestion.question;
  
    choiceContainer.innerHTML = "";
    currentQuestion.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      choiceContainer.appendChild(optionButton);
    });
  }
  
  function startTimer() {
    timer = setInterval(function () {
      timerElement.textContent = timeLeft++;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
  }
  
  function handleChoiceClick(event) {
    if (event.target.matches("button")) {
      const selectedOption = event.target.textContent;
  
      if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
        // Handle correct answer
        showResult("Correct!");
        correctAnswers++;
      } else {
        // Handle incorrect answer
        showResult("Wrong!");
        // Increase the timer by 5 seconds for a wrong answer
        timeLeft += 5;
        incorrectAnswers++;
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < quizQuestions.length) {
        showResult("");
        displayQuestion();
      } else {
        stopTimer();
        endQuiz();
      }
    }
  }
  
  function showResult(message) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.textContent = message;
  }
  
  function endQuiz() {
    clearInterval(timer);
  
    questionContainer.textContent = `You completed the quiz! You got ${correctAnswers} correct and ${incorrectAnswers} incorrect.`;
  
    const storedHighscore = localStorage.getItem("highscore") || 0;
    const storedInitials = localStorage.getItem("initials") || "N/A";
  
    highscoreElement.textContent = `High Score: ${storedHighscore} by ${storedInitials}`;
  
    scoreForm.style.display = "block";
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const initials = document.getElementById("initials").value;
    const storedHighscore = localStorage.getItem("highscore") || 0;
    const highscore = Math.max(correctAnswers, storedHighscore);
    localStorage.setItem("highscore", highscore);
    localStorage.setItem("initials", initials);
  
    location.reload();
  }