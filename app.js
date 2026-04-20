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
const questions = [

{
  question: "Have you ever received training on cybersecurity at school or work?",
  options: [
    { text: "Yes", score: 2, feedback: "Nice, you’ve had some training! Now let’s see if it actually stuck 😏" },
    { text: "No", score: 0, feedback: "No worries! This simulation is basically your crash course. Welcome to cybersecurity 101." }
  ]
},

{
  question: "Are you aware of these terms? (Self-assess your familiarity)",
  options: [
    { text: "3 or more", score: 2, feedback: "Look at you! You know the basics of cybersecurity terms.\n\nPhishing: Fake messages that trick you\nMalware: Harmful software\nRansomware: Locks files for money\nVPN: Protects your connection\nMFA: Extra login security" },
    { text: "1–2", score: 1, feedback: "Good start, but there’s more to learn.\n\nPhishing: Fake messages\nMalware: Harmful software\nRansomware: Locks files\nVPN: Secure connection\nMFA: Extra protection" },
    { text: "None", score: 0, feedback: "No problem! This is where your learning begins.\n\nPhishing: Fake messages\nMalware: Harmful software\nRansomware: Locks files\nVPN: Secure connection\nMFA: Extra protection" }
  ]
},

{
  question: "Who is responsible for cybersecurity at a company?",
  options: [
    { text: "IT handles it", score: 0, feedback: "IT helps, but they can’t stop every risky click." },
    { text: "Security software", score: 0, feedback: "Tools help, but people are the biggest factor." },
    { text: "Management", score: 0, feedback: "Leadership matters, but everyone plays a role." },
    { text: "Everyone", score: 2, feedback: "Correct! Cybersecurity is a team effort 🤝" }
  ]
},

{
  question: "Do you use antivirus or endpoint protection?",
  options: [
    { text: "Always", score: 2, feedback: "Great! This adds an extra layer of protection." },
    { text: "Sometimes", score: 1, feedback: "Helpful, but consistency matters." },
    { text: "Never", score: 0, feedback: "Risky—your device is exposed." },
    { text: "Not sure", score: 0, feedback: "Worth checking your settings." }
  ]
},

{
  question: "Do you reuse passwords?",
  options: [
    { text: "Yes", score: 0, feedback: "One password reused = one breach affecting everything 😬" },
    { text: "No", score: 2, feedback: "Nice! Unique passwords make you safer." }
  ]
},

{
  question: "Do you use a password manager?",
  options: [
    { text: "Yes", score: 2, feedback: "Smart! One of the best habits." },
    { text: "No", score: 1, feedback: "They securely store passwords so you only remember one." }
  ]
},

{
  question: "How often do you change important passwords?",
  options: [
    { text: "Every few months", score: 2, feedback: "Great! Staying ahead." },
    { text: "Once a year", score: 1, feedback: "Decent, but more often is safer." },
    { text: "Rarely", score: 0, feedback: "Risky—could be compromised." },
    { text: "Never", score: 0, feedback: "That password might not be private 👀" }
  ]
},

{
  question: "Do you accept cookies without reading?",
  options: [
    { text: "Yes", score: 0, feedback: "You may be sharing more data than you think." },
    { text: "No", score: 2, feedback: "Nice! You care about privacy." }
  ]
},

{
  question: "Do you know what social engineering is?",
  options: [
    { text: "Yes", score: 2, feedback: "Good! Very common attack method." },
    { text: "No", score: 0, feedback: "Attackers often trick people instead of hacking systems." }
  ]
},

{
  question: "Do you click unknown links?",
  options: [
    { text: "Always", score: 0, feedback: "You’re a phishing target 😬" },
    { text: "Sometimes", score: 1, feedback: "Risky—one click is enough." },
    { text: "Never", score: 2, feedback: "Great instinct!" }
  ]
},

{
  question: "Do you check links before clicking?",
  options: [
    { text: "Always", score: 2, feedback: "Strong habit." },
    { text: "Sometimes", score: 1, feedback: "Be consistent." },
    { text: "Rarely", score: 0, feedback: "Risky behavior." },
    { text: "Never", score: 0, feedback: "Clicking blindfolded." }
  ]
},

{
  question: "Suspicious links can compromise accounts.",
  options: [
    { text: "True", score: 2, feedback: "Correct!" },
    { text: "False", score: 0, feedback: "They are a major risk." }
  ]
},

{
  question: "Do you know what phishing is?",
  options: [
    { text: "Yes", score: 2, feedback: "Let’s test that." },
    { text: "No", score: 0, feedback: "Fake messages that steal info." },
    { text: "Heard of it", score: 1, feedback: "Now learn to recognize it." }
  ]
},

{
  question: "Confidence in spotting phishing?",
  options: [
    { text: "Very confident", score: 2, feedback: "Let’s test that 😏" },
    { text: "Somewhat", score: 1, feedback: "Room to improve." },
    { text: "Not confident", score: 0, feedback: "Good honesty." }
  ]
},

{
  question: "Public Wi-Fi is safe for work logins.",
  options: [
    { text: "True", score: 0, feedback: "Not safe." },
    { text: "False", score: 2, feedback: "Correct!" }
  ]
},

{
  question: "Do you use public Wi-Fi for accounts?",
  options: [
    { text: "Always", score: 0, feedback: "Risky." },
    { text: "Sometimes", score: 1, feedback: "Be cautious." },
    { text: "Never", score: 2, feedback: "Safe choice." }
  ]
},

{
  question: "Do you use MFA?",
  options: [
    { text: "Always", score: 2, feedback: "Excellent." },
    { text: "Sometimes", score: 1, feedback: "Use it more." },
    { text: "Never", score: 0, feedback: "Important protection missing." }
  ]
},

{
  question: "MFA improves security.",
  options: [
    { text: "True", score: 2, feedback: "Correct!" },
    { text: "False", score: 0, feedback: "It greatly improves security." }
  ]
},

{
  question: "AI tools may store your data.",
  options: [
    { text: "True", score: 2, feedback: "Be careful what you share." },
    { text: "False", score: 0, feedback: "Assume it could be stored." }
  ]
},

{
  question: "Do you share info with AI?",
  options: [
    { text: "Always", score: 0, feedback: "High risk." },
    { text: "Sometimes", score: 1, feedback: "Be cautious." },
    { text: "Never", score: 2, feedback: "Safe approach." }
  ]
},

{
  question: "How often do you update devices?",
  options: [
    { text: "Avoid", score: 0, feedback: "Security risk." },
    { text: "Only when required", score: 1, feedback: "Better than nothing." },
    { text: "Important only", score: 1, feedback: "All devices matter." },
    { text: "Always", score: 2, feedback: "Perfect!" }
  ]
},

{
  question: "Do you read privacy policies?",
  options: [
    { text: "Always", score: 2, feedback: "Top 1% behavior." },
    { text: "Sometimes", score: 1, feedback: "Better than nothing." },
    { text: "Never", score: 0, feedback: "Very common 😅" }
  ]
},

{
  question: "App asks for permissions.",
  options: [
    { text: "Allow all", score: 0, feedback: "Too much access 😬" },
    { text: "Allow necessary", score: 1, feedback: "Better." },
    { text: "Deny most", score: 1, feedback: "Safe but limited." },
    { text: "Review all", score: 2, feedback: "Best choice." }
  ]
},

{
  question: "Unsafe website warning.",
  options: [
    { text: "Continue", score: 0, feedback: "Dangerous." },
    { text: "Close", score: 2, feedback: "Smart." }
  ]
},

{
  question: "New work laptop setup.",
  options: [
    { text: "Skip security", score: 0, feedback: "Risky." },
    { text: "Required only", score: 1, feedback: "Okay." },
    { text: "Recommended", score: 2, feedback: "Good." },
    { text: "Full + updates", score: 2, feedback: "Perfect." }
  ]
},

{
  question: "Create work password.",
  options: [
    { text: "Reuse", score: 0, feedback: "Bad idea." },
    { text: "Slight change", score: 1, feedback: "Still predictable." },
    { text: "New", score: 2, feedback: "Good." },
    { text: "Password manager", score: 2, feedback: "Best." }
  ]
},

{
  question: "Working from coffee shop.",
  options: [
    { text: "Open Wi-Fi", score: 0, feedback: "Unsafe." },
    { text: "Avoid sensitive", score: 1, feedback: "Better." },
    { text: "Hotspot", score: 2, feedback: "Good." },
    { text: "Hotspot + VPN", score: 2, feedback: "Best." }
  ]
},

{
  question: "Security update prompt.",
  options: [
    { text: "24 hrs", score: 0, feedback: "Too long." },
    { text: "1 hr", score: 1, feedback: "Better." },
    { text: "Ignore", score: 0, feedback: "Bad." },
    { text: "Update now", score: 2, feedback: "Best." }
  ]
},

{
  question: "Using AI for confidential data.",
  options: [
    { text: "Paste full", score: 0, feedback: "Data leak risk." },
    { text: "Partial", score: 1, feedback: "Still risky." },
    { text: "Outline", score: 2, feedback: "Safer." },
    { text: "Check policy", score: 2, feedback: "Best." }
  ]
},

{
  question: "HR email link.",
  options: [
    { text: "Click", score: 0, feedback: "Phishing risk." },
    { text: "Hover then click", score: 1, feedback: "Still risky." },
    { text: "Ignore", score: 1, feedback: "Okay." },
    { text: "Report", score: 2, feedback: "Best." }
  ]
},

{
  question: "Manager asks for payroll info.",
  options: [
    { text: "Send", score: 0, feedback: "Scam tactic." },
    { text: "Email back", score: 0, feedback: "Still risky." },
    { text: "Call", score: 2, feedback: "Good." },
    { text: "Contact HR", score: 2, feedback: "Best." }
  ]
},

{
  question: "Need paid software.",
  options: [
    { text: "Cracked", score: 0, feedback: "Dangerous 💀" },
    { text: "Random site", score: 0, feedback: "Malware risk." },
    { text: "Ask license", score: 2, feedback: "Good." },
    { text: "Free alt", score: 2, feedback: "Best." }
  ]
},

{
  question: "Virus popup.",
  options: [
    { text: "Download", score: 0, feedback: "Scam." },
    { text: "Close", score: 2, feedback: "Good." },
    { text: "Restart", score: 1, feedback: "Okay." },
    { text: "Report", score: 2, feedback: "Best." }
  ]
},

{
  question: "Urgent email warning.",
  options: [
    { text: "Click", score: 0, feedback: "Red flag." },
    { text: "Verify", score: 2, feedback: "Best." },
    { text: "Ignore", score: 1, feedback: "Okay." }
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
