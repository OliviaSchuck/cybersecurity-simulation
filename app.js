let current = 0;
let totalScore = 0;

let categories = {
  password: 0,
  phishing: 0,
  wifi: 0,
  ai: 0,
  device: 0
};

/* ================= QUESTIONS (YOUR EXACT CONTENT) ================= */

const questions = [

/* 1 */
{
question: "Have you ever received training on cybersecurity at school or work?",
category: "device",
options: [
{ text: "Yes", score: 2, feedback: "Nice, you’ve had some training! Now let’s see if it actually stuck 😏" },
{ text: "No", score: 0, feedback: "No worries! This simulation is basically your crash course. Welcome to cybersecurity 101." }
]
},

/* 2 */
{
question: "Are you aware of these terms? (Select all that apply)",
category: "device",
options: [
{ text: "3+ selected", score: 2, feedback: "Look at you! You know the basics of cybersecurity terms." },
{ text: "1–2 selected", score: 1, feedback: "Good start, but there’s more to learn." },
{ text: "None", score: 0, feedback: "No problem! This is where your learning begins." }
]
},

/* 3 */
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

/* 4 */
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

/* 5 */
{
question: "Do you use the same password for more than one account?",
category: "password",
options: [
{ text: "Yes", score: 0, feedback: "One password reused = one breach affecting everything 😬" },
{ text: "No", score: 2, feedback: "Nice! Unique passwords make you much harder to hack." }
]
},

/* 6 */
{
question: "Do you use a password manager to keep your passwords safe?",
category: "password",
options: [
{ text: "Yes", score: 2, feedback: "Smart! This is one of the best security habits." },
{ text: "No", score: 1, feedback: "Password managers store passwords securely so you only remember one master password." }
]
},

/* 7 */
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

/* 8 */
{
question: "When a website asks you to accept cookies, do you usually click “Accept” without reading?",
category: "device",
options: [
{ text: "Yes", score: 0, feedback: "Quick click… but you might be sharing more data than you realize." },
{ text: "No", score: 2, feedback: "Nice! You’re paying attention to your privacy." }
]
},

/* 9 */
{
question: "Do you know what “social engineering” means in cybersecurity?",
category: "phishing",
options: [
{ text: "Yes", score: 2, feedback: "Good! This is one of the most common attack methods." },
{ text: "No", score: 0, feedback: "Many attacks rely on tricking people instead of hacking systems." }
]
},

/* 10 */
{
question: "Do you click on links in emails or messages from unknown senders?",
category: "phishing",
options: [
{ text: "Always", score: 0, feedback: "You’re a prime target for phishing 😬" },
{ text: "Sometimes", score: 1, feedback: "Risky—one click is all it takes." },
{ text: "Never", score: 2, feedback: "Great instinct!" }
]
},

/* 11 */
{
question: "How often do you check where a link goes (hover over it) before clicking in emails from unknown sources?",
category: "phishing",
options: [
{ text: "Always", score: 2, feedback: "Yes! This is a powerful habit." },
{ text: "Sometimes", score: 1, feedback: "Good, but be consistent." },
{ text: "Rarely", score: 0, feedback: "You’re taking a risk." },
{ text: "Never", score: 0, feedback: "You’re basically clicking blindfolded." }
]
},

/* 12 */
{
question: "Clicking a suspicious link in an email can put your account or company at risk.",
category: "phishing",
options: [
{ text: "True", score: 2, feedback: "Correct! One bad click can compromise accounts." },
{ text: "False", score: 0, feedback: "Actually, this is a major cybersecurity risk." }
]
},

/* 13 */
{
question: "Do you know what phishing is?",
category: "phishing",
options: [
{ text: "Yes", score: 2, feedback: "Good! Let’s test that knowledge." },
{ text: "No", score: 0, feedback: "Phishing is fake messages trying to steal your info." },
{ text: "Heard of it, but unsure", score: 1, feedback: "Good start! Now recognize it in action." }
]
},

/* 14 */
{
question: "How confident are you in spotting phishing emails?",
category: "phishing",
options: [
{ text: "Very confident", score: 2, feedback: "Let’s test that 😏" },
{ text: "Somewhat confident", score: 1, feedback: "Not bad—room to improve." },
{ text: "Not confident", score: 0, feedback: "Good honesty—this is where people get caught." }
]
},

/* 15 */
{
question: "It is safe to log into work accounts on any public Wi-Fi network.",
category: "wifi",
options: [
{ text: "True", score: 0, feedback: "Not safe—public Wi-Fi can expose your data." },
{ text: "False", score: 2, feedback: "Correct!" }
]
},

/* 16 */
{
question: "Do you use public Wi-Fi (like at a coffee shop or library) to log into work or school accounts?",
category: "wifi",
options: [
{ text: "Always", score: 0, feedback: "Convenient, but risky." },
{ text: "Sometimes", score: 1, feedback: "Depends on activity." },
{ text: "Never", score: 2, feedback: "Safe choice." }
]
},

/* 17 */
{
question: "How do you feel about using two-factor or multi-factor authentication (MFA) for your accounts when it’s available?",
category: "device",
options: [
{ text: "Always", score: 2, feedback: "Great! One of the best protections." },
{ text: "Sometimes", score: 1, feedback: "Good, but use it more." },
{ text: "Never", score: 0, feedback: "MFA is very important." }
]
},

/* 18 */
{
question: "Using two-factor authentication makes accounts more secure.",
category: "device",
options: [
{ text: "True", score: 2, feedback: "Correct!" },
{ text: "False", score: 0, feedback: "MFA significantly improves security." }
]
},

/* 19 */
{
question: "AI companies like ChatGPT keep the information users type into their tools and use it to train their models.",
category: "ai",
options: [
{ text: "True", score: 2, feedback: "Correct—be careful what you share." },
{ text: "False", score: 0, feedback: "Assume data may be stored." }
]
},

/* 20 */
{
question: "Do you ever share personal or work information with AI tools (like ChatGPT)?",
category: "ai",
options: [
{ text: "Always", score: 0, feedback: "High risk—be careful." },
{ text: "Sometimes", score: 1, feedback: "Depends what you share." },
{ text: "Never", score: 2, feedback: "Safe approach." }
]
},

/* 21 */
{
question: "How often do you update your computer, phone, or other devices when they prompt you to?",
category: "device",
options: [
{ text: "Avoid it", score: 0, feedback: "Risky—updates fix security flaws." },
{ text: "Only when required", score: 1, feedback: "Better than nothing." },
{ text: "Important accounts only", score: 1, feedback: "Good but not enough." },
{ text: "Enable it everywhere", score: 2, feedback: "Perfect!" }
]
},

/* 22 */
{
question: "How often do you read a privacy policy or terms of service before using an app or AI tool?",
category: "device",
options: [
{ text: "Always", score: 2, feedback: "Rare but excellent habit." },
{ text: "Sometimes", score: 1, feedback: "Better than most." },
{ text: "Never", score: 0, feedback: "Very common—but risky." }
]
},

/* 23 */
{
question: "You download a new productivity app with camera/location/contacts permissions. You:",
category: "device",
options: [
{ text: "Allow everything", score: 0, feedback: "Too much access 😬" },
{ text: "Allow what seems necessary", score: 1, feedback: "Better." },
{ text: "Deny most permissions", score: 1, feedback: "Safe but limited functionality." },
{ text: "Review carefully", score: 2, feedback: "Best choice." }
]
},

/* 24 */
{
question: "A webpage shows: 'This link may be unsafe. Continue anyway?'",
category: "phishing",
options: [
{ text: "Continue", score: 0, feedback: "Dangerous." },
{ text: "Close", score: 2, feedback: "Smart choice." }
]
},

/* 25 */
{
question: "IT gives you a new laptop. You:",
category: "device",
options: [
{ text: "Skip security", score: 0, feedback: "Risky." },
{ text: "Basic only", score: 1, feedback: "Okay." },
{ text: "Full protection", score: 2, feedback: "Best choice." }
]
},

/* 26 */
{
question: "You are working from a coffee shop. You:",
category: "wifi",
options: [
{ text: "Open Wi-Fi", score: 0, feedback: "Unsafe." },
{ text: "Avoid sensitive logins", score: 1, feedback: "Safer." },
{ text: "Hotspot", score: 2, feedback: "Good." },
{ text: "Hotspot + VPN", score: 2, feedback: "Best." }
]
},

/* 27 */
{
question: "You get a security update prompt. You:",
category: "device",
options: [
{ text: "Delay", score: 0, feedback: "Risky." },
{ text: "1 hour", score: 1, feedback: "Better." },
{ text: "Ignore", score: 0, feedback: "Bad." },
{ text: "Update now", score: 2, feedback: "Best." }
]
},

/* 28 */
{
question: "You need to summarize a confidential report using AI. You:",
category: "ai",
options: [
{ text: "Paste full report", score: 0, feedback: "Dangerous." },
{ text: "Partial", score: 1, feedback: "Still risky." },
{ text: "Outline only", score: 2, feedback: "Safer." },
{ text: "Check policy", score: 2, feedback: "Best." }
]
},

/* 29 */
{
question: "You receive an HR email with a link. You:",
category: "phishing",
options: [
{ text: "Click", score: 0, feedback: "Phishing risk." },
{ text: "Hover", score: 1, feedback: "Better." },
{ text: "Ignore", score: 1, feedback: "Okay." },
{ text: "Report", score: 2, feedback: "Best." }
]
},

/* 30 */
{
question: "Manager asks for payroll info urgently. You:",
category: "phishing",
options: [
{ text: "Send", score: 0, feedback: "Risky." },
{ text: "Email back", score: 0, feedback: "Still unsafe." },
{ text: "Call to verify", score: 2, feedback: "Good." },
{ text: "Contact HR", score: 2, feedback: "Best." }
]
},

/* 31 */
{
question: "Need paid software. You:",
category: "device",
options: [
{ text: "Cracked version", score: 0, feedback: "Dangerous." },
{ text: "Random site", score: 0, feedback: "Unsafe." },
{ text: "Ask for license", score: 2, feedback: "Good." },
{ text: "Free alternative", score: 2, feedback: "Best." }
]
},

/* 32 */
{
question: "Pop-up says virus detected. You:",
category: "device",
options: [
{ text: "Download tool", score: 0, feedback: "Scam." },
{ text: "Close", score: 2, feedback: "Good." },
{ text: "Restart", score: 1, feedback: "Okay." },
{ text: "Report IT", score: 2, feedback: "Best." }
]
},

/* 33 */
{
question: "Urgent email about account closure. You:",
category: "phishing",
options: [
{ text: "Click", score: 0, feedback: "Danger." },
{ text: "Verify sender", score: 2, feedback: "Best." },
{ text: "Ignore", score: 1, feedback: "Okay." }
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
      totalScore += opt.score;
      categories[q.category] += opt.score;
      document.getElementById("feedback-box").innerText = opt.feedback;
    };

    box.appendChild(btn);
  });
}

function nextQuestion() {
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

  document.getElementById("summary").innerHTML =
    "<p>You’re building real-world cybersecurity awareness.</p>";
}

window.onload = function () {
  loadQuestion();
};
