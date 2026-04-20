let current = 0;
let totalScore = 0;

let categories = {
  password: 0,
  phishing: 0,
  wifi: 0,
  ai: 0,
  device: 0
};

/* ================= QUESTIONS ================= */

const questions = [
{
question: "Have you ever received training on cybersecurity at school or work?",
category: "device",
options: [
{ text: "Yes", score: 2, feedback: "Nice, you’ve had some training! Now let’s see if it actually stuck 😏" },
{ text: "No", score: 0, feedback: "No worries! This simulation is basically your crash course. Welcome to cybersecurity 101." }
]
},

{
question: "Are you aware of these terms? (Select all that apply)",
category: "device",
options: [
{ text: "3+ selected", score: 2, feedback: "Look at you! You know the basics of cybersecurity terms." },
{ text: "1–2 selected", score: 1, feedback: "Good start, but there’s more to learn." },
{ text: "None", score: 0, feedback: "No problem! This is where your learning begins." }
]
},

{
question: "Who do you think is responsible for cybersecurity at a company?",
category: "device",
options: [
{ text: "IT handles cybersecurity", score: 0, feedback: "IT helps, but they can’t stop every risky click." },
{ text: "Security software handles it", score: 0, feedback: "Tools help, but people are the biggest factor." },
{ text: "Management handles it", score: 0, feedback: "Leadership matters, but everyone plays a role." },
{ text: "Everyone shares responsibility", score: 2, feedback: "Correct! Cybersecurity is a team effort 🤝" }
]
},

{
question: "Do you use antivirus or endpoint protection on your devices?",
category: "device",
options: [
{ text: "Always", score: 2, feedback: "Great! This adds an extra layer of protection." },
{ text: "Sometimes", score: 1, feedback: "Helpful, but consistency matters." },
{ text: "Never", score: 0, feedback: "Risky—your device is more exposed to threats." },
{ text: "Not sure", score: 0, feedback: "If you’re not sure, it’s worth checking your device settings." }
]
},

{
question: "Do you use the same password for more than one account?",
category: "password",
options: [
{ text: "Yes", score: 0, feedback: "One password reused = one breach affecting everything 😬" },
{ text: "No", score: 2, feedback: "Nice! Unique passwords make you much harder to hack." }
]
},

{
question: "Do you use a password manager to keep your passwords safe?",
category: "password",
options: [
{ text: "Yes", score: 2, feedback: "Smart! This is one of the best security habits." },
{ text: "No", score: 1, feedback: "Password managers help store passwords safely and securely." }
]
},

{
question: "How often do you change your passwords for important accounts (email, banking, school/work)?",
category: "password",
options: [
{ text: "Every few months", score: 2, feedback: "Great! You’re staying ahead of potential breaches." },
{ text: "Once a year", score: 1, feedback: "Decent, but more frequent updates are safer." },
{ text: "Rarely", score: 0, feedback: "Risky—old passwords can be compromised." },
{ text: "Never", score: 0, feedback: "That password might not be as private as you think 👀" }
]
},

{
question: "When a website asks you to accept cookies, do you usually click “Accept” without reading?",
category: "device",
options: [
{ text: "Yes", score: 0, feedback: "Quick click… but you might be sharing more data than you realize." },
{ text: "No", score: 2, feedback: "Nice! You’re paying attention to your privacy." }
]
},

{
question: "Do you know what “social engineering” means in cybersecurity?",
category: "phishing",
options: [
{ text: "Yes", score: 2, feedback: "Good! This is one of the most common attack methods." },
{ text: "No", score: 0, feedback: "Many attacks rely on tricking people instead of hacking systems." }
]
},

{
question: "Do you click on links in emails or messages from unknown senders?",
category: "phishing",
options: [
{ text: "Always", score: 0, feedback: "You’re a prime target for phishing 😬" },
{ text: "Sometimes", score: 1, feedback: "Risky—one click is all it takes." },
{ text: "Never", score: 2, feedback: "Great instinct!" }
]
},

{
question: "How often do you check where a link goes before clicking?",
category: "phishing",
options: [
{ text: "Always", score: 2, feedback: "Yes! This is a powerful habit." },
{ text: "Sometimes", score: 1, feedback: "Good, but be consistent." },
{ text: "Rarely", score: 0, feedback: "You’re taking a risk." },
{ text: "Never", score: 0, feedback: "You’re basically clicking blindfolded." }
]
},

{
question: "Clicking a suspicious link can put your account at risk.",
category: "phishing",
options: [
{ text: "True", score: 2, feedback: "Correct!" },
{ text: "False", score: 0, feedback: "Actually, it’s a major risk." }
]
},

{
question: "Do you know what phishing is?",
category: "phishing",
options: [
{ text: "Yes", score: 2, feedback: "Good! Let’s test it." },
{ text: "No", score: 0, feedback: "Fake messages trying to steal your info." },
{ text: "Heard of it", score: 1, feedback: "Good start!" }
]
},

{
question: "How confident are you in spotting phishing emails?",
category: "phishing",
options: [
{ text: "Very confident", score: 2, feedback: "Let’s test that 😏" },
{ text: "Somewhat confident", score: 1, feedback: "Not bad." },
{ text: "Not confident", score: 0, feedback: "Good honesty." }
]
},

{
question: "It is safe to log into work accounts on public Wi-Fi.",
category: "wifi",
options: [
{ text: "True", score: 0, feedback: "Not safe." },
{ text: "False", score: 2, feedback: "Correct!" }
]
},

{
question: "Do you use public Wi-Fi for work accounts?",
category: "wifi",
options: [
{ text: "Always", score: 0, feedback: "Risky." },
{ text: "Sometimes", score: 1, feedback: "Be careful." },
{ text: "Never", score: 2, feedback: "Good choice." }
]
},

{
question: "Using MFA makes accounts more secure.",
category: "device",
options: [
{ text: "True", score: 2, feedback: "Correct!" },
{ text: "False", score: 0, feedback: "MFA improves security." }
]
},

{
question: "Do you share personal info with AI tools?",
category: "ai",
options: [
{ text: "Always", score: 0, feedback: "High risk." },
{ text: "Sometimes", score: 1, feedback: "Be cautious." },
{ text: "Never", score: 2, feedback: "Safe approach." }
]
},

{
question: "Do you install updates when prompted?",
category: "device",
options: [
{ text: "Always", score: 2, feedback: "Perfect." },
{ text: "Sometimes", score: 1, feedback: "Okay." },
{ text: "Never", score: 0, feedback: "Risky." }
]
},

{
question: "How often do you read privacy policies?",
category: "device",
options: [
{ text: "Always", score: 2, feedback: "Rare but great." },
{ text: "Sometimes", score: 1, feedback: "Better than most." },
{ text: "Never", score: 0, feedback: "Very common." }
]
}

];

/* ================= FUNCTIONS ================= */

function loadQuestion() {
  let q = questions[current];

  document.getElementById("progress").innerText =
    `Question ${current + 1} of ${questions.length}`;

  let box = document.getElementById("question-box");
  box.innerHTML = `<h2>${q.question}</h2>`;

  document.getElementById("feedback-box").innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");

    btn.innerText = opt.text;

    btn.onclick = () => {
      if (btn.dataset.clicked) return;

      btn.dataset.clicked = true;

      totalScore += opt.score;
      categories[q.category] += opt.score;

      document.getElementById("feedback-box").innerText = opt.feedback;

      document.querySelectorAll("#question-box button").forEach(b => {
        b.disabled = true;
      });
    };

    box.appendChild(btn);
  });
}

function nextQuestion() {
  let answered = Array.from(document.querySelectorAll("#question-box button"))
    .some(b => b.dataset.clicked);

  if (!answered) {
    alert("Please select an answer first.");
    return;
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let percent = Math.round((totalScore / (questions.length * 2)) * 100);

  document.getElementById("score").innerText = `Score: ${percent}%`;

  let level =
    percent >= 80 ? "🟢 Low Risk" :
    percent >= 50 ? "🟡 Moderate Risk" :
    "🔴 High Risk";

  document.getElementById("level").innerText = level;
}

window.onload = loadQuestion;
