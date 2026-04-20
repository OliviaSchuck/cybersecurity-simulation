// app.js

// Intro screen → Simulation transition
document.getElementById("startBtn").onclick = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("app").style.display = "block";
  renderNode();
};

let current = 0;
let totalScore = 0;

// CATEGORY TRACKING (IMPORTANT UPGRADE)
let categories = {
  password: 0,
  phishing: 0,
  wifi: 0,
  ai: 0,
  device: 0
};

const questions = [

/* ================= PASSWORDS ================= */

{
  question: "Do you reuse passwords across accounts?",
  category: "password",
  options: [
    { text: "Yes", score: 0, feedback: "One password reused = one breach affects everything 😬" },
    { text: "No", score: 2, feedback: "Nice! Unique passwords keep you safer." }
  ]
},

{
  question: "Do you use a password manager?",
  category: "password",
  options: [
    { text: "Yes", score: 2, feedback: "Smart choice—this is best practice." },
    { text: "No", score: 1, feedback: "Manageable, but password managers are safer and easier." }
  ]
},

{
  question: "How often do you change important passwords?",
  category: "password",
  options: [
    { text: "Every few months", score: 2, feedback: "Great habit!" },
    { text: "Once a year", score: 1, feedback: "Decent, but more frequent is safer." },
    { text: "Rarely/Never", score: 0, feedback: "Old passwords increase risk." }
  ]
},

/* ================= PHISHING ================= */

{
  question: "Do you click links from unknown senders?",
  category: "phishing",
  options: [
    { text: "Always", score: 0, feedback: "High risk—this is how phishing works 😬" },
    { text: "Sometimes", score: 1, feedback: "Be careful—one click is enough." },
    { text: "Never", score: 2, feedback: "Great instinct!" }
  ]
},

{
  question: "Do you check links before clicking?",
  category: "phishing",
  options: [
    { text: "Always", score: 2, feedback: "Perfect habit." },
    { text: "Sometimes", score: 1, feedback: "Good, but be consistent." },
    { text: "Never", score: 0, feedback: "You’re clicking blindfolded 😭" }
  ]
},

{
  question: "Do you know what phishing is?",
  category: "phishing",
  options: [
    { text: "Yes", score: 2, feedback: "Good awareness." },
    { text: "No", score: 0, feedback: "Phishing is fake messages trying to steal your info." },
    { text: "Heard of it", score: 1, feedback: "Good start—now recognize it in practice." }
  ]
},

/* ================= WIFI ================= */

{
  question: "Do you use public Wi-Fi for important accounts?",
  category: "wifi",
  options: [
    { text: "Always", score: 0, feedback: "Risky—data can be intercepted." },
    { text: "Sometimes", score: 1, feedback: "Be cautious depending on activity." },
    { text: "Never", score: 2, feedback: "Safe choice." }
  ]
},

{
  question: "Public Wi-Fi is safe for logins.",
  category: "wifi",
  options: [
    { text: "True", score: 0, feedback: "Not safe—data can be exposed." },
    { text: "False", score: 2, feedback: "Correct—avoid sensitive logins." }
  ]
},

/* ================= AI ================= */

{
  question: "Do you share sensitive info with AI tools?",
  category: "ai",
  options: [
    { text: "Always", score: 0, feedback: "High risk—assume data may be stored." },
    { text: "Sometimes", score: 1, feedback: "Be selective with what you share." },
    { text: "Never", score: 2, feedback: "Safe approach." }
  ]
},

{
  question: "Do AI tools use user data?",
  category: "ai",
  options: [
    { text: "True", score: 2, feedback: "Correct—be mindful what you input." },
    { text: "False", score: 0, feedback: "Not quite—assume data may be used." }
  ]
},

/* ================= DEVICE ================= */

{
  question: "Do you install updates when prompted?",
  category: "device",
  options: [
    { text: "Always", score: 2, feedback: "Perfect—updates fix vulnerabilities." },
    { text: "Sometimes", score: 1, feedback: "Better than nothing." },
    { text: "Never", score: 0, feedback: "Outdated systems are easy targets." }
  ]
},

{
  question: "Do you use MFA?",
  category: "device",
  options: [
    { text: "Always", score: 2, feedback: "Excellent protection." },
    { text: "Sometimes", score: 1, feedback: "Good, but use it everywhere." },
    { text: "Never", score: 0, feedback: "MFA greatly improves security." }
  ]
}
/* AI */
{
  question: "Do AI tools use your data?",
  category: "ai",
  options: [
    { text: "True", score: 2, feedback: "Correct." },
    { text: "False", score: 0, feedback: "Assume data may be used." }
  ]
},

{
  question: "Do you share info with AI tools?",
  category: "ai",
  options: [
    { text: "Always", score: 0, feedback: "High risk." },
    { text: "Sometimes", score: 1, feedback: "Be cautious." },
    { text: "Never", score: 2, feedback: "Safe approach." }
  ]
},

/* UPDATES */
{
  question: "Do you install updates?",
  category: "device",
  options: [
    { text: "Always", score: 2, feedback: "Perfect." },
    { text: "Sometimes", score: 1, feedback: "Okay." },
    { text: "Never", score: 0, feedback: "Risky." }
  ]
},

/* PRIVACY */
{
  question: "Do you read privacy policies?",
  category: "device",
  options: [
    { text: "Always", score: 2, feedback: "Rare but excellent." },
    { text: "Sometimes", score: 1, feedback: "Better than most." },
    { text: "Never", score: 0, feedback: "Very common." }
  ]
},

/* PERMISSIONS */
{
  question: "App requests camera/location/contacts. You:",
  category: "device",
  options: [
    { text: "Allow all", score: 0, feedback: "Too much access." },
    { text: "Allow needed", score: 1, feedback: "Okay." },
    { text: "Review carefully", score: 2, feedback: "Best choice." }
  ]
},

/* UNSAFE LINK */
{
  question: "Warning: unsafe link. Continue?",
  category: "phishing",
  options: [
    { text: "Continue", score: 0, feedback: "Dangerous." },
    { text: "Close", score: 2, feedback: "Smart." }
  ]
},

/* LAPTOP SETUP */
{
  question: "Laptop setup choice:",
  category: "device",
  options: [
    { text: "Skip security", score: 0, feedback: "Risky." },
    { text: "Basic only", score: 1, feedback: "Okay." },
    { text: "Full protection", score: 2, feedback: "Best." }
  ]
},

/* PASSWORD SETUP */
{
  question: "Create password:",
  category: "password",
  options: [
    { text: "Reuse", score: 0, feedback: "Bad habit." },
    { text: "Modify old", score: 1, feedback: "Still weak." },
    { text: "New", score: 2, feedback: "Good." },
    { text: "Manager", score: 2, feedback: "Best." }
  ]
},

/* WIFI SCENARIO */
{
  question: "Coffee shop Wi-Fi:",
  category: "wifi",
  options: [
    { text: "Open Wi-Fi", score: 0, feedback: "Unsafe." },
    { text: "Avoid sensitive", score: 1, feedback: "Okay." },
    { text: "Hotspot", score: 2, feedback: "Good." },
    { text: "VPN + hotspot", score: 2, feedback: "Best." }
  ]
},

/* UPDATES */
{
  question: "Security update:",
  category: "device",
  options: [
    { text: "Delay", score: 0, feedback: "Risky." },
    { text: "1 hour", score: 1, feedback: "Better." },
    { text: "Ignore", score: 0, feedback: "Bad." },
    { text: "Update now", score: 2, feedback: "Best." }
  ]
},

/* AI REPORT */
{
  question: "AI summary of confidential report:",
  category: "ai",
  options: [
    { text: "Full paste", score: 0, feedback: "Dangerous." },
    { text: "Partial", score: 1, feedback: "Still risky." },
    { text: "Outline", score: 2, feedback: "Safer." },
    { text: "Check policy", score: 2, feedback: "Best." }
  ]
},

/* HR EMAIL */
{
  question: "HR email:",
  category: "phishing",
  options: [
    { text: "Click", score: 0, feedback: "Phishing risk." },
    { text: "Hover", score: 1, feedback: "Better." },
    { text: "Ignore", score: 1, feedback: "Okay." },
    { text: "Report", score: 2, feedback: "Best." }
  ]
},

/* MANAGER REQUEST */
{
  question: "Manager asks for payroll info:",
  category: "phishing",
  options: [
    { text: "Send", score: 0, feedback: "Scam risk." },
    { text: "Email", score: 0, feedback: "Unsafe." },
    { text: "Call", score: 2, feedback: "Verify first." },
    { text: "HR", score: 2, feedback: "Best." }
  ]
},

/* CRACKED SOFTWARE */
{
  question: "Need paid software:",
  category: "device",
  options: [
    { text: "Cracked", score: 0, feedback: "Malware risk." },
    { text: "Random site", score: 0, feedback: "Unsafe." },
    { text: "Ask manager", score: 2, feedback: "Good." },
    { text: "Free alternative", score: 2, feedback: "Best." }
  ]
},

/* POPUP */
{
  question: "Virus pop-up:",
  category: "device",
  options: [
    { text: "Download", score: 0, feedback: "Scam." },
    { text: "Close", score: 2, feedback: "Good." },
    { text: "Restart", score: 1, feedback: "Okay." },
    { text: "Report", score: 2, feedback: "Best." }
  ]
},

/* FINAL EMAIL */
{
  question: "Urgent account email:",
  category: "phishing",
  options: [
    { text: "Click", score: 0, feedback: "Danger." },
    { text: "Verify", score: 2, feedback: "Best." },
    { text: "Ignore", score: 1, feedback: "Okay." }
  ]
}

];

/* ================= UI ================= */

function loadQuestion() {
  let q = questions[current];

  document.getElementById("progress").innerText =
    `Question ${current + 1} of ${questions.length}`;

  document.getElementById("question-box").innerHTML =
    `<h2>${q.question}</h2>`;

  document.getElementById("feedback-box").innerHTML = "";

  q.options.forEach(opt => {
    document.getElementById("question-box").innerHTML +=
      `<button onclick="selectAnswer(${opt.score}, '${opt.feedback}', '${q.category}')">
        ${opt.text}
      </button>`;
  });
}

function selectAnswer(score, feedback, category) {
  totalScore += score;
  categories[category] += score;

  document.getElementById("feedback-box").innerText = feedback;
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

/* ================= RESULTS ================= */

function showResults() {

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let maxScore = questions.length * 2;
  let percent = Math.round((totalScore / maxScore) * 100);

  document.getElementById("score").innerText = `Score: ${percent}%`;

  let level = "";
  if (percent >= 80) level = "🟢 Low Risk";
  else if (percent >= 50) level = "🟡 Moderate Risk";
  else level = "🔴 High Risk";

  document.getElementById("level").innerText = level;

  // CATEGORY FEEDBACK
  let feedbackText = "<h3>Personalized Recommendations</h3>";

  if (categories.password <= 2) {
    feedbackText += "<p>🔐 Passwords: Use unique passwords and a password manager.</p>";
  }

  if (categories.phishing <= 2) {
    feedbackText += "<p>🎣 Phishing: Be careful with emails and unknown links.</p>";
  }

  if (categories.wifi <= 2) {
    feedbackText += "<p>📶 Wi-Fi: Avoid public Wi-Fi for sensitive logins.</p>";
  }

  if (categories.ai <= 2) {
    feedbackText += "<p>🤖 AI: Avoid sharing sensitive or confidential data.</p>";
  }

  if (categories.device <= 2) {
    feedbackText += "<p>💻 Device Security: Keep updates and MFA enabled.</p>";
  }

  document.getElementById("category-feedback").innerHTML = feedbackText;

  document.getElementById("summary").innerHTML =
    "<p>You’re developing real-world cybersecurity awareness. Small changes can significantly improve your digital safety.</p>";
}

loadQuestion();
