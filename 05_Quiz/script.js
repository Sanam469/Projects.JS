document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];
  let currQuesIndex = 0;
  let marks = 0;
  startBtn.addEventListener("click", startQuiz);
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQues();
  }
  function showQues() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    questionText.innerHTML = questions[currQuesIndex].question;
    choicesList.innerHTML = "";
    questions[currQuesIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      choicesList.append(li);
      li.addEventListener("click", () => {
        const allChoices = choicesList.querySelectorAll("li");
        allChoices.forEach((item) => {
          item.style.pointerEvents = "none"; // prevents further clicking
        });
        if (choice === questions[currQuesIndex].answer) {
          li.classList.add("correct");
          marks++;
        } else {
          li.classList.add("incorrect");
        }
        nextBtn.classList.remove("hidden");
      });
    });
  }

  nextBtn.addEventListener("click", () => {
    currQuesIndex++;
    if (currQuesIndex < questions.length) {
      showQues();
    } else {
      showResult();
    }
  });
  function showResult() {
    nextBtn.classList.add("hidden");
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${marks} out of ${questions.length}`;
    restartBtn.classList.remove("hidden");
  }
  restartBtn.addEventListener("click", () => {
    currQuesIndex = 0;
    marks = 0;
    showQues();
  });
});
