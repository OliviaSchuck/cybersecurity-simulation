let currentNodeId = "q1";
let totalScore = 0;
let answers = [];

/* ================= QUESTIONS (YOUR SYSTEM - UNCHANGED LOGIC) ================= */

const nodes = {

/* ================= PHASE 1 ================= */

q1: {
  text: "Have you ever received training on cybersecurity at school or work?",
  options: [
    { label: "Yes", score: 2, next: "q2" },
    { label: "No", score: 0, next: "q2" }
  ]
},

q2: {
  text: "Are you aware of these terms? (3+ selected / 1–2 / None)",
  options: [
    { label: "3+ selected", score: 2, next: "q3" },
    { label: "1–2 selected", score: 1, next: "q3" },
    { label: "None", score: 0, next: "q3" }
  ]
},

q3: {
  text: "Who is responsible for cybersecurity at a company?",
  options: [
    { label: "IT handles it", score: 0, next: "q4" },
    { label: "Security software handles it", score: 0, next: "q4" },
    { label: "Management handles it", score: 0, next: "q4" },
    { label: "Everyone shares responsibility", score: 2, next: "q4" }
  ]
},

q4: {
  text: "Do you use antivirus or endpoint protection?",
  options: [
    { label: "Always", score: 2, next: "q5" },
    { label: "Sometimes", score: 1, next: "q5" },
    { label: "Never", score: 0, next: "q5" },
    { label: "Not sure", score: 0, next: "q5" }
  ]
},

q5: {
  text: "Do you reuse passwords across accounts?",
  options: [
    { label: "Yes", score: 0, next: "q6" },
    { label: "No", score: 2, next: "q6" }
  ]
},

q6: {
  text: "Do you use a password manager?",
  options: [
    { label: "Yes", score: 2, next: "q7" },
    { label: "No", score: 1, next: "q7" }
  ]
},

q7: {
  text: "Do you click unknown email links?",
  options: [
    { label: "Yes", score: 3, next: "q8" },
    { label: "No", score: 0, next: "q8" }
  ]
},

q8: {
  text: "Do AI tools use user data to train models?",
  options: [
    { label: "True", score: 0, next: "f1" },
    { label: "False", score: 2, next: "f1" }
  ]
},

/* ================= PHASE 2 ================= */

f1: {
  text: "Create a work password:",
  options: [
    { label: "Reuse old", score: 3, next: "f2" },
    { label: "Modify old", score: 2, next: "f2" },
    { label: "New password", score: 1, next: "f2" },
    { label: "Password manager", score: 0, next: "f2" }
  ]
},

f2: {
  text: "Cookie banner appears:",
  options: [
    { label: "Accept all", score: 3, next: "f3" },
    { label: "Required only", score: 1, next: "f3" },
    { label: "Adjust settings", score: 0, next: "f3" },
    { label: "Close page", score: 0, next: "f3" }
  ]
},

f3: {
  text: "Public Wi-Fi at coffee shop:",
  options: [
    { label: "Use open Wi-Fi", score: 3, next: "f4" },
    { label: "Avoid sensitive logins", score: 1, next: "f4" },
    { label: "Use hotspot", score: 0, next: "f4" }
  ]
},

f4: {
  text: "Slow internet, consider public Wi-Fi:",
  options: [
    { label: "Always use public Wi-Fi", score: 3, next: "f5" },
    { label: "Sometimes use it", score: 1, next: "f5" },
    { label: "Never use it", score: 0, next: "f5" }
  ]
},

f5: {
  text: "Summarize confidential report in AI:",
  options: [
    { label: "Paste full report", score: 3, next: "end" },
    { label: "Remove names", score: 1, next: "end" },
    { label: "Outline only", score: 0, next: "end" },
    { label: "Check policy first", score: 0, next: "end" }
  ]
},

/* ================= END ================= */

end: {
  text: "Simulation complete.",
  options: []
}

};

/* ================= UI ================= */

function renderNode() {
  const node = nodes[currentNodeId];

  document.getElementById("question-box").innerHTML = `<h2>${node.text}</h2>`;
  document.getElementById("feedback-box").innerHTML = "";

  const box = document.getElementById("question-box");

  node.options.forEach(opt => {
    const btn = document.createElement("button");

    btn.textContent = opt.label;

    btn.onclick = () => {
      totalScore += opt.score;
      answers.push({
        question: node.text,
        answer: opt.label,
        score: opt.score
      });

      document.getElementById("feedback-box").innerText =
        `Selected: ${opt.label}`;

      currentNodeId = opt.next;
    };

    box.appendChild(btn);
  });

  document.getElementById("progress").innerText =
    `Current Score: ${totalScore}`;
}

/* ================= NEXT BUTTON ================= */

function nextQuestion() {
  if (nodes[currentNodeId].options.length === 0) {
    showResults();
    return;
  }

  renderNode();
}

/* ================= RESULTS ================= */

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let percent = Math.round((totalScore / 30) * 100);

  let level =
    percent >= 80 ? "Low Risk" :
    percent >= 50 ? "Moderate Risk" :
    "High Risk";

  document.getElementById("score").innerText = `Score: ${percent}%`;
  document.getElementById("level").innerText = level;

  saveResultsToFirebase();
}

/* ================= FIREBASE ================= */

function saveResultsToFirebase() {
  const id = Math.random().toString(36).substring(2, 10);

  db.collection("responses").add({
    participantId: id,
    answers: answers,
    totalScore: totalScore,
    riskLevel: totalScore,
    timestamp: new Date()
  });
}

/* ================= START ================= */

renderNode();
