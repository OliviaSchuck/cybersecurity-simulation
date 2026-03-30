// app.js

// Intro screen → Simulation transition
document.getElementById("startBtn").onclick = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("app").style.display = "block";
  renderNode();
};

// Simulation state
let currentNodeId = "q1";
let totalScore = 0;
let answers = [];

// All questions + scenarios
const nodes = {
  // -------------------------
  // PHASE 1 — STARTER QUESTIONS
  // -------------------------
  
  q1: {
    id: "q1",
    text: "Do you reuse passwords across multiple accounts?",
    options: [
      { label: "Yes", score: 2, next: "q2" },
      { label: "No", score: 0, next: "q2" }
    ]
  },

  q2: {
    id: "q2",
    text: "Do you often click “Accept All Cookies” without reading them?",
    options: [
      { label: "Yes", score: 2, next: "q3" },
      { label: "No", score: 0, next: "q3" }
    ]
  },

  q3: {
    id: "q3",
    text: "Do you use public Wi‑Fi to access important accounts (email, banking, work)?",
    options: [
      { label: "Yes", score: 2, next: "q4" },
      { label: "No", score: 0, next: "q4" }
    ]
  },

  q4: {
    id: "q4",
    text: "When using public Wi‑Fi, which best describes you?",
    options: [
      { label: "I log into anything I need", score: 2, next: "q5" },
      { label: "I avoid sensitive accounts", score: 1, next: "q5" },
      { label: "I never use public Wi‑Fi", score: 0, next: "q5" }
    ]
  },

  q5: {
    id: "q5",
    text: "Do you ever paste personal or work information into AI tools (like ChatGPT)?",
    options: [
      { label: "Yes", score: 2, next: "q6" },
      { label: "No", score: 0, next: "q6" }
    ]
  },

  q6: {
    id: "q6",
    text: "Do you click on links in emails or messages from people you don’t know?",
    options: [
      { label: "Yes", score: 3, next: "q7" },
      { label: "No", score: 0, next: "q7" }
    ]
  },

  q7: {
    id: "q7",
    text: "If a webpage required you to click a link that might be unsafe, would you still click it?",
    options: [
      { label: "Yes", score: 3, next: "q8" },
      { label: "No", score: 0, next: "q8" }
    ]
  },

  q8: {
    id: "q8",
    text: "AI companies use user‑submitted data to train their models.",
    options: [
      { label: "True", score: 0, next: "f1" },
      { label: "False", score: 2, next: "f1" }
    ]
  },

  // -------------------------
  // PHASE 2 — FOLLOW‑UP SCENARIOS
  // -------------------------

  f1: {
    id: "f1",
    text: "Your company account setup asks you to create your first work password.",
    options: [
      { label: "Reuse a password you already use", score: 3, next: "f2" },
      { label: "Slightly change an old password", score: 2, next: "f2" },
      { label: "Create a brand‑new password you can remember", score: 1, next: "f2" },
      { label: "Use a password manager to generate one", score: 0, next: "f2" }
    ]
  },

  f2: {
    id: "f2",
    text: "A site blocks you with a cookie banner before you can continue.",
    options: [
      { label: "Accept all cookies", score: 3, next: "f3" },
      { label: "Accept only required cookies", score: 1, next: "f3" },
      { label: "Open settings and adjust tracking", score: 0, next: "f3" },
      { label: "Close the page and leave", score: 0, next: "f3" }
    ]
  },

  f3: {
    id: "f3",
    text: "You’re at a coffee shop and need to log into your work dashboard.",
    options: [
      { label: "Use the open public Wi‑Fi", score: 3, next: "f4" },
      { label: "Use public Wi‑Fi but avoid sensitive accounts", score: 1, next: "f4" },
      { label: "Use your phone’s hotspot instead", score: 0, next: "f4" }
    ]
  },

  f4: {
    id: "f4",
    text: "Your home internet is slow, and you consider switching to public Wi‑Fi to finish a task.",
    options: [
      { label: "Always use public Wi‑Fi when it’s faster", score: 3, next: "f5" },
      { label: "Sometimes use it for non‑sensitive work", score: 1, next: "f5" },
      { label: "Never use public Wi‑Fi for work", score: 0, next: "f5" }
    ]
  },

  f5: {
    id: "f5",
    text: "You need to summarize a confidential report quickly and have an AI tool open.",
    options: [
      { label: "Paste the entire report into the AI", score: 3, next: "f6" },
      { label: "Remove names and paste most of it", score: 1, next: "f6" },
      { label: "Ask AI for a generic outline instead", score: 0, next: "f6" },
      { label: "Check your company’s AI policy first", score: 0, next: "f6" }
    ]
  },

  f6: {
    id: "f6",
    text: "You get an email from someone claiming to be HR with a link to a 'required form'.",
    options: [
      { label: "Click the link immediately", score: 3, next: "f7" },
      { label: "Hover over the link, then click", score: 2, next: "f7" },
      { label: "Ignore the email", score: 0, next: "f7" },
      { label: "Report the email to IT", score: 0, next: "f7" }
    ]
  },

  f7: {
    id: "f7",
    text: "A webpage blocks you with a warning: 'This link may be unsafe. Continue anyway?'",
    options: [
      { label: "Click 'Continue (Unsafe)'", score: 3, next: "f8" },
      { label: "Close the page", score: 0, next: "f8" }
    ]
  },

  f8: {
    id: "f8",
    text: "Your team debates whether AI tools keep and use the data people type into them.",
    options: [
      { label: "They definitely don’t keep the data", score: 2, next: "s1" },
      { label: "They probably do keep and use it", score: 0, next: "s1" }
    ]
  },

  // -------------------------
  // PHASE 3 — DEEPER SCENARIOS (VARIED)
  // -------------------------

  s1: {
    id: "s1",
    text: "You receive an email saying your password setup failed and you must click a link to fix it.",
    options: [
      { label: "Click the link", score: 3, next: "s2" },
      { label: "Hover to inspect the link first", score: 1, next: "s2" },
      { label: "Go directly to the official company site instead", score: 0, next: "s2" },
      { label: "Report the email to IT", score: 0, next: "s2" }
    ]
  },

  s2: {
    id: "s2",
    text: "You start seeing ads that look like login pages for tools your company uses.",
    options: [
      { label: "Click one of the ads to log in", score: 3, next: "s3" },
      { label: "Hover and check the URL before deciding", score: 1, next: "s3" },
      { label: "Ignore the ads and use official links only", score: 0, next: "s3" }
    ]
  },

  s3: {
    id: "s3",
    text: "While on public Wi‑Fi, your screen flickers and logs you out of your account.",
    options: [
      { label: "Log back in on the same network", score: 3, next: "s4" },
      { label: "Switch to a more secure network first", score: 0, next: "s4" },
      { label: "Change your password afterward", score: 1, next: "s4" }
    ]
  },

  s4: {
    id: "s4",
    text: "Two Wi‑Fi networks appear with the same name. One has a stronger signal.",
    options: [
      { label: "Pick the stronger one", score: 3, next: "s5" },
      { label: "Ask an employee which network is official", score: 0, next: "s5" }
    ]
  },

  s5: {
    id: "s5",
    text: "Your manager notices internal phrases from your report appear in an AI tool’s examples.",
    options: [
      { label: "Deny that you used AI with the report", score: 2, next: "s6" },
      { label: "Admit what you did and explain", score: 1, next: "s6" },
      { label: "Report the issue to your security team", score: 0, next: "s6" }
    ]
  },

  s6: {
    id: "s6",
    text: "IT alerts you that your account was accessed from another country.",
    options: [
      { label: "Ignore the alert", score: 3, next: "s7" },
      { label: "Reset your password immediately", score: 1, next: "s7" },
      { label: "Call IT to confirm the alert", score: 0, next: "s7" }
    ]
  },

  s7: {
    id: "s7",
    text: "A vendor emails you asking to update payment details using a link in the message.",
    options: [
      { label: "Click the link and update the info", score: 3, next: "s8" },
      { label: "Verify the request with your manager or finance", score: 0, next: "s8" }
    ]
  },

  s8: {
    id: "s8",
    text: "You see a highly personalized email referencing your department and a 'secure document' link.",
    options: [
      { label: "Click the link to view the document", score: 3, next: "end", },
      { label: "Verify the email with IT or your manager first", score: 0, next: "end" }
    ]
  },

  // -------------------------
  // END NODE
  // -------------------------

  end: {
    id: "end",
    text: "Thanks for completing your first month. View your cybersecurity risk summary below.",
    options: []
  }
};

// -------------------------
// RENDERING + LOGIC
// -------------------------

function renderNode() {
  const node = nodes[currentNodeId];
  const questionDiv = document.getElementById("question");
  const optionsDiv = document.getElementById("options");
  const resultDiv = document.getElementById("result");

  questionDiv.textContent = node.text;
  optionsDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  if (!node.options || node.options.length === 0) {
    showResult();
    return;
  }

  node.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.label;
    btn.onclick = () => handleChoice(option);
    optionsDiv.appendChild(btn);
  });
}

function handleChoice(option) {
  totalScore += option.score;
answers.push({
  questionId: currentNodeId,
  answer: option.label,
  score: option.score
});
  currentNodeId = option.next;
  renderNode();
}

function showResult() {
  saveResultsToFirebase();
  const resultDiv = document.getElementById("result");
  let profile;

  if (totalScore >= 30) profile = "High Risk";
  else if (totalScore >= 15) profile = "Moderate Risk";
  else profile = "Low Risk";

  resultDiv.innerHTML = `
    <h3>Your Total Risk Score: ${totalScore}</h3>
    <p>Risk Level: <strong>${profile}</strong></p>
  `;
}


function getRiskLevel(score) {
  if (score >= 30) return "High Risk";
  if (score >= 15) return "Moderate Risk";
  return "Low Risk";
}

function saveResultsToFirebase() {
  const participantId = Math.random().toString(36).substring(2, 10);

  db.collection("responses").add({
    participantId: participantId,
    answers: answers, // full array of {questionId, answer, score}
    totalScore: totalScore,
    riskLevel: getRiskLevel(totalScore),
    timestamp: new Date()
  })
  .then(() => {
    console.log("Saved to Firebase");
  })
  .catch((error) => {
    console.error("Error saving data:", error);
  });
}
