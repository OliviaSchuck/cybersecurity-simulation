// START BUTTON
document.getElementById("startBtn").onclick = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("app").style.display = "block";
  renderQuestion();
};

// STATE
let currentIndex = 0;
let totalScore = 0;
let answers = [];

// QUESTIONS (you can paste all 33 here same format)
const questions = [
  {
    question: "Have you ever received cybersecurity training?",
    options: [
      { text: "Yes", score: 2, feedback: "Nice!" },
      { text: "No", score: 0, feedback: "This is your crash course." }
    ]
  },
  {
    question: "Do you reuse passwords?",
    options: [
      { text: "Yes", score: 0, feedback: "Risky." },
      { text: "No", score: 2, feedback: "Good job!" }
    ]
  },
  {
    question: "Do you click unknown links?",
    options: [
      { text: "Always", score: 0, feedback: "Dangerous." },
      { text: "Never", score: 2, feedback: "Smart." }
    ]
  }
];

// RENDER
function renderQuestion() {
  const q = questions[currentIndex];

  document.getElementById("progress").textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;

  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  document.getElementById("feedback").textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;

    btn.onclick = () => {
      totalScore += option.score;

      answers.push({
        question: q.question,
        answer: option.text,
        score: option.score
      });

      document.getElementById("feedback").textContent = option.feedback;

      setTimeout(() => {
        currentIndex++;

        if (currentIndex < questions.length) {
          renderQuestion();
        } else {
          showResults();
        }
      }, 800);
    };

    optionsDiv.appendChild(btn);
  });
}

// RESULTS
function showResults() {
  document.getElementById("app").style.display = "none";

  let level;
  if (totalScore >= 40) level = "Low Risk";
  else if (totalScore >= 20) level = "Moderate Risk";
  else level = "High Risk";

  document.getElementById("result").innerHTML = `
    <h2>Your Score: ${totalScore}</h2>
    <h3>Risk Level: ${level}</h3>
  `;

  saveResults();
}

// FIREBASE SAVE
function saveResults() {
  db.collection("responses").add({
    answers: answers,
    totalScore: totalScore,
    timestamp: new Date()
  })
  .then(() => console.log("Saved"))
  .catch(err => console.error(err));
}
