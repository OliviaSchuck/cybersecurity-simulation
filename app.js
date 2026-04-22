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

let phishingScore = 0;
let passwordScore = 0;
let wifiScore = 0;
let aiScore = 0;
let deviceScore = 0;

let phishingCount = 0;
let passwordCount = 0;
let wifiCount = 0;
let aiCount = 0;
let deviceCount = 0;


// QUESTIONS (you can paste all 33 here same format)
const questions = [

{
  question: "Have you ever received training on cybersecurity at school or work?",
  options: [
    { text: "Yes", score: 2, feedback: "Nice, you’ve had some training! Now let’s see if it actually stuck 😏" },
    { text: "No", score: 0, feedback: "No worries! This simulation is basically your crash course. Welcome to cybersecurity 101." }
  ]
},

{
  question: "Are you aware of these terms? (Select all that apply)",
  type: "multi", 
  options: [
    "Phishing",
    "Malware/Virus",
    "Ransomware",
    "VPN",
    "Multi-factor authentication (MFA)"
  ]
},

{
  question: "Who do you think is responsible for cybersecurity at a company?",
  options: [
    { text: "IT handles cybersecurity", score: 0, feedback: "IT helps, but they can’t stop every risky click." },
    { text: "Security software handles it", score: 0, feedback: "Tools help, but people are the biggest factor." },
    { text: "Management handles it", score: 0, feedback: "Leadership matters, but everyone plays a role." },
    { text: "Everyone shares responsibility", score: 2, feedback: "Correct! Cybersecurity is a team effort 🤝" }
  ]
},

{
  question: "Do you use antivirus or endpoint protection on your device?",
  category: "device",
  options: [
    { text: "Always", score: 2, feedback: "Great! This adds an extra layer of protection." },
    { text: "Sometimes", score: 1, feedback: "Helpful, but consistency matters." },
    { text: "Never", score: 0, feedback: "Risky—your device is exposed." },
    { text: "Not sure", score: 0, feedback: "If you're not sure, it's worth checking your device settings." }
  ]
},

{
  question: "Do you use the same password for more than one account?",
  category: "password",
  options: [
    { text: "Yes", score: 0, feedback: "One password reused = one breach affecting everything 😬" },
    { text: "No", score: 2, feedback: "Nice! Unique passwords make you much harder to hack even though they may be inconvenient." }
  ]
},

{
  question: "Do you use a password manager to keep your passwords safe?",
  category: "password",
  options: [
    { text: "Yes", score: 2, feedback: "Smart! This is one of the best security habits." },
    { text: "No", score: 1, feedback: "Understandable, but password managers make life easier and safer. It is a tool that securely stores and automatically fills in your passwords so you only have to remember one master password." }
  ]
},

{
  question: "How often do you change passwords for important accounts (email, banking, school/work)?",
  category: "password",
  options: [
    { text: "Every few months", score: 2, feedback: "Great! You're staying ahead of potential breaches." },
    { text: "Once a year", score: 1, feedback: "Decent, but more often is safer." },
    { text: "Rarely", score: 0, feedback: "Risky—old passwords can be compromised." },
    { text: "Never", score: 0, feedback: "That password might not be as private as you think 👀" }
  ]
},

{
  question: "When a website asks you to accept cookies, do you usually click 'Accept' without reading?",
  category: "device",
  options: [
    { text: "Yes", score: 0, feedback: "Quick click...but you might be sharing more data than you realize." },
    { text: "No", score: 2, feedback: "Nice! You're paying attention to your privacy." }
  ]
},

{
  question: "Do you know what 'social engineering' means in cybersecurity?",
  options: [
    { text: "Yes", score: 2, feedback: "Good! This is one of the most common attack methods." },
    { text: "No", score: 0, feedback: "This is important! Many attacks rely on tricking people into giving away sensitive information instead of hacking systems directly." }
  ]
},

{
  question: "Do you click on links in emails or messages from unknown senders?",
  category: "phishing",
  options: [
    { text: "Always", score: 0, feedback: "You’re a prime target for phishing 😬" },
    { text: "Sometimes", score: 1, feedback: "Risky—one click is all it takes." },
    { text: "Never", score: 2, feedback: "Great instinct! Keep avoiding unknown links" }
  ]
},

{
  question: "How often do you check where a link goes (hover over it) before clicking in emails from unknown sources?",
  category: "phishing",
  options: [
    { text: "Always", score: 2, feedback: "Yes! This is a simple but powerful habit." },
    { text: "Sometimes", score: 1, feedback: "Good, but consistency matters." },
    { text: "Rarely", score: 0, feedback: "You're taking a risk by not checking links." },
    { text: "Never", score: 0, feedback: "You're basically clicking blindfolded." }
  ]
},

{
  question: "Clicking a suspicious link in an email can put your account or company at risk.",
  category: "phishing",
  options: [
    { text: "True", score: 2, feedback: "Correct! One bad click can compromise accounts" },
    { text: "False", score: 0, feedback: "Actually, suspicious links are a major risk." }
  ]
},

{
  question: "Do you know what phishing is?",
  options: [
    { text: "Yes", score: 2, feedback: "Good! Now let's see if you can spot it in action." },
    { text: "No", score: 0, feedback: "Phishing is one of the most common attacks. It is when scammers send fake messages (like emails or texts) that look real to trick you into giving up personal information like passwords or credit card details." },
    { text: "Heard of it", score: 1, feedback: "Good start! recognizing it is the next step. Phishing is when scammers send fake messages (like emails or texts) that look real to trick you into giving up personal information like passwords or credit card details." }
  ]
},

{
  question: "How confident are you in spotting phishing emails?",
  options: [
    { text: "Very confident", score: 2, feedback: "Confident... let’s test that 😏" },
    { text: "Somewhat confident", score: 1, feedback: "Not bad—there’s room to improve." },
    { text: "Not confident", score: 0, feedback: "Good honesty—this is where people get caught." }
  ]
},

{
  question: "It is safe to log into work accounts on any public Wi-Fi network.",
  category: "wifi",
  options: [
    { text: "True", score: 0, feedback: "Not quite. Public Wi-Fi isn’t secure for sensitive logins. Attackers on the same network can intercept your data or trick you into connecting to fake hotspots." },
    { text: "False", score: 2, feedback: "Correct! Public Wi-Fi can expose your data." }
  ]
},

{
  question: "Do you use public Wi‑Fi (like at a coffee shop or library) to log into work or school accounts?",
  category: "wifi",
  options: [
    { text: "Always", score: 0, feedback: "Convenient, but risky for important accounts." },
    { text: "Sometimes", score: 1, feedback: "Depends what you’re doing—still be cautious." },
    { text: "Never", score: 2, feedback: "Safe choice—you’re avoiding common risks." }
  ]
},

{
  question: "How do you feel about using two-factor or multi-factor authentication (MFA) for your accounts when it’s available?",
  options: [
    { text: "Always", score: 2, feedback: "Great! This is one of the best protections you can have." },
    { text: "Sometimes", score: 1, feedback: "Good, but why not use it everywhere?" },
    { text: "Never", score: 0, feedback: "Skipping MFA makes accounts much easier to break into." }
  ]
},

{
  question: "Using two-factor or multi-factor authentication (MFA) makes your accounts more secure.",
  category: "device",
  options: [
    { text: "True", score: 2, feedback: "Correct! MFA adds a strong layer of security." },
    { text: "False", score: 0, feedback: "Actually, MFA significantly improves account security." }
  ]
},

{
  question: "AI companies like ChatGPT keep the information users type into their tools and use it to train their models.",
  category: "ai",
  options: [
    { text: "True", score: 2, feedback: "Correct! Be mindful of what you share." },
    { text: "False", score: 0, feedback: "Not quite. Assume anything you type could be stored." }
  ]
},

{
  question: "Do you ever share personal or work information with AI tools (like ChatGPT)?",
  category: "ai",
  options: [
    { text: "Always", score: 0, feedback: "Careful—this could expose sensitive information." },
    { text: "Sometimes", score: 1, feedback: "Depends what you’re sharing—be cautious." },
    { text: "Never", score: 2, feedback: "Safe approach, especially for confidential data." }
  ]
},

{
  question: "How often do you update your computer, phone, or other devices when they prompt you to?",
  category: "device",
  options: [
    { text: "Avoid it", score: 0, feedback: "Security risk." },
    { text: "Only when required", score: 1, feedback: "Better than nothing." },
    { text: "Important only", score: 1, feedback: "All devices matter." },
    { text: "Always", score: 2, feedback: "Perfect!" }
  ]
},

{
  question: "How often do you read a privacy policy or terms of service before using an app or AI tool?",
  category: "ai",
  options: [
    { text: "Always", score: 2, feedback: "Respect—you're in the top 1%." },
    { text: "Sometimes", score: 1, feedback: "Better than nothing." },
    { text: "Never", score: 0, feedback: "No one reads them... but maybe skim a little 😅" }
  ]
},

{
  question: "You download a new productivity app, and it shows an app permission pop-up that asks for access to your camera, location, and contacts. Would you:",
  category: "device",
  options: [
    { text: "Allow all", score: 0, feedback: "Why does this app need ALL that access 😬" },
    { text: "Allow what seems necessary", score: 1, feedback: "Good! You're limiting exposure." },
    { text: "Deny most permissions", score: 1, feedback: "Safe, but some apps may not function fully." },
    { text: "Review each permission carefully", score: 2, feedback: "Best choice—you stay in control." }
  ]
},

{
  question: "A webpage you’re trying to open blocks you with a warning: 'This link may be unsafe. Continue anyway?'  Would you:",
  category: "device",
  options: [
    { text: "Click 'Continue (Unsafe)'", score: 0, feedback: "You saw ‘unsafe’ and still went for it 😭" },
    { text: "Close", score: 2, feedback: "Smart! Warnings exist for a reason." }
  ]
},

{
  question: "IT gives you your new work laptop and asks you to configure it.  Would you:",
  category: "device",
  options: [
    { text: "Skip optional security settings to finish faster", score: 0, feedback: "Fast now, risky later." },
    { text: "Enable only required settings", score: 1, feedback: "Okay, but more protection is better." },
    { text: "Enable recommended protections", score: 2, feedback: "Good setup." },
    { text: "Enable protections + automatic updates", score: 2, feedback: "Perfect—secure from the start." }
  ]
},

{
  question: "Your company account setup asks you to create your first work password. Would You:",
  category: "password",
  options: [
    { text: "Use a password you already use elsewhere so it’s easy to remember", score: 0, feedback: "Convenient… until one breach unlocks everything." },
    { text: "Slightly change an old password", score: 1, feedback: "Better, but still predictable." },
    { text: "Make a brand-new password you can remember", score: 2, feedback: "Good! Unique is better!" },
    { text: "Use a password manager to generate a strong password for you to use", score: 2, feedback: "Best choice! Strong and secure!" }
  ]
},

{
  question: "You are working remotely from a coffee shop. Would you:",
  category: "wifi",
  options: [
    { text: "Use the open Wi-Fi", score: 0, feedback: "Free Wi-Fi… and free access to your data 😬" },
    { text: "Use Wi-Fi but avoid logging into important accounts", score: 1, feedback: "Safer, but still some risk." },
    { text: "Use your phone’s hotspot", score: 2, feedback: "Good—more secure than public Wi-Fi." },
    { text: "Use your hotspot and a VPN for extra security", score: 2, feedback: "Best! Extra protection layer." }
  ]
},

{
  question: "Your computer asks you to install a security update while you’re busy. Would you:",
  category: "device",
  options: [
    { text: "'Remind me in 24 hours'", score: 0, feedback: "Delaying leaves you exposed longer." },
    { text: "'Remind me in 1 hour'", score: 1, feedback: "Better, but sooner is safer." },
    { text: "Ignore", score: 0, feedback: "Hackers love outdated systems." },
    { text: "Update now", score: 2, feedback: "Best choice—quick update, better security." }
  ]
},

{
  question: "You need to quickly summarize a confidential report using AI. Would you:",
  category: "ai",
  options: [
    { text: "Paste full report into an AI tool", score: 0, feedback: "That’s a data leak waiting to happen." },
    { text: "Remove names and paste most of it into an AI tool", score: 1, feedback: "Better, but still risky." },
    { text: "Ask AI to create an outline only", score: 2, feedback: "Safer approach." },
    { text: "Check company AI policy first", score: 2, feedback: "Best choice! Always follow guidelines." }
  ]
},

{
  question: "You get an email that looks like it’s from HR, asking you to click a link to a 'required form'. Would you:",
  category: "phishing",
  options: [
    { text: "Click it right away", score: 0, feedback: "And just like that… credentials gone." },
    { text: "Hover over the link first, then click", score: 1, feedback: "Still risky—verification matters." },
    { text: "Ignore the email", score: 1, feedback: "Safe, but verify through official channels." },
    { text: "Report it to IT/security", score: 2, feedback: "Best choice! Protects you and others." }
  ]
},

{
  question: "You get a voicemail or message from someone claiming to be your manager asking for your payroll info urgently. Would you:",
  category: "phishing",
  options: [
    { text: "Send the info immediately", score: 0, feedback: "Urgency is a classic scam tactic." },
    { text: "Reply by email", score: 0, feedback: "Still risky—could be compromised." },
    { text: "Call them directly to verify", score: 2, feedback: "Good! Verify identity first." },
    { text: "Contact HR/security first", score: 2, feedback: "Best! Safe and verified." }
  ]
},

{
  question: "You need a paid tool for a project but don’t want to pay. Would you:",
  options: [
    { text: "Download a cracked version", score: 0, feedback: "Free software, expensive consequences 💀" },
    { text: "Download a free version from a random website", score: 0, feedback: "High malware risk." },
    { text: "Ask your manager or instructor about licenses", score: 2, feedback: "Good—use official resources." },
    { text: "Find a legitimate free alternative", score: 2, feedback: "Best choice! Safe and legal." }
  ]
},

{
  question: "A pop-up says your computer is infected and offers a “free scan.” You:",
  category: "device",
  options: [
    { text: "Download the recommended software", score: 0, feedback: "That ‘fix’ is probably the problem." },
    { text: "Close the pop-up", score: 2, feedback: "Safer. Don’t trust random pop-ups." },
    { text: "Restart your computer", score: 1, feedback: "Okay, but not a full solution." },
    { text: "Report it to IT/security", score: 2, feedback: "Best choice! Handled safely." }
  ]
},

{
  question: "You get an email saying you need to take urgent action (like account closure), you:",
  category: "phishing",
  options: [
    { text: "Click immediately", score: 0, feedback: "Urgency is a phishing red flag." },
    { text: "Verify the sender first", score: 2, feedback: "Best choice! Pause and check." },
    { text: "Ignore", score: 1, feedback: "Safe, but always verify if unsure." }
  ]
}

];

// RENDER
function renderQuestion() {
  const q = questions[currentIndex];

  // Progress text
  document.getElementById("progress-text").textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;

  // Progress bar
  const progressPercent = ((currentIndex) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progressPercent + "%";

  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  document.getElementById("feedback").textContent = "";
  document.getElementById("nextBtn").style.display = "none";

// 👇 ONLY runs for Question 2
if (q.type === "multi") {

  const selected = new Set();

  q.options.forEach(optionText => {
    const btn = document.createElement("button");
    btn.textContent = optionText;

    btn.onclick = () => {
      if (selected.has(optionText)) {
        selected.delete(optionText);
        btn.classList.remove("selected");
      } else {
        selected.add(optionText);
        btn.classList.add("selected");
      }
    };

    optionsDiv.appendChild(btn);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.classList.add("submit-btn");

  submitBtn.onclick = () => {
    const count = selected.size;

    let score = 0;
    let feedback = "";

    if (count >= 3) {
      score = 2;
      feedback = "Look at you! You know the basics of cybersecurity terms.";
    } else if (count >= 1) {
      score = 1;
      feedback = "Good start, but there’s more to learn.";
    } else {
      score = 0;
      feedback = "No problem! This is where your learning begins.";
    }

   feedback = `
  <div class="feedback-title">
    Good start, but there’s more to learn.
  </div>

  <ul class="feedback-list">
    <li><strong>Phishing:</strong> Fake emails or messages that trick you into clicking links or sharing information</li>
    <li><strong>Malware/Virus:</strong> Harmful software that can damage your device or steal data</li>
    <li><strong>Ransomware:</strong> A type of malware that locks your files and demands payment</li>
    <li><strong>VPN:</strong> A tool that protects your internet connection, especially on public Wi-Fi</li>
    <li><strong>MFA:</strong> Extra security step (like a code or app) to verify your identity</li>
  </ul>
`;

    totalScore += score;
    
  
    answers.push({
      question: q.question,
      answer: Array.from(selected),
      score: score
    });

    document.getElementById("feedback").innerHTML = feedback;
    document.getElementById("nextBtn").style.display = "block";
  };

  optionsDiv.appendChild(submitBtn);

} else {
  
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;

    btn.onclick = () => {
      totalScore += option.score;

      // CATEGORY TRACKING (correct place)
if (q.category === "phishing") {
  phishingScore += option.score;
  phishingCount++;
}
if (q.category === "password") {
  passwordScore += option.score;
  passwordCount++;
}
if (q.category === "wifi") {
  wifiScore += option.score;
  wifiCount++;
}
if (q.category === "ai") {
  aiScore += option.score;
  aiCount++;
}
if (q.category === "device") {
  deviceScore += option.score;
  deviceCount++;
}

      answers.push({
        question: q.question,
        answer: option.text,
        score: option.score
      });

      document.getElementById("feedback").textContent = option.feedback;

      // remove "selected" from all buttons first
  Array.from(optionsDiv.children).forEach(b => {
    b.classList.remove("selected");
  });

  // add selected style to clicked button
  btn.classList.add("selected");

  // disable buttons after selection (locks in answer)
  Array.from(optionsDiv.children).forEach(b => b.disabled = true);

  document.getElementById("nextBtn").style.display = "block";
};
    optionsDiv.appendChild(btn);
  });
}

//NEXT BTN
document.getElementById("nextBtn").onclick = () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
};


function getIcon(category) {
  switch (category) {
    case "phishing awareness": return "🎣";
    case "password security": return "🔐";
    case "public Wi-Fi safety": return "📡";
    case "AI/data privacy": return "🤖";
    case "device security": return "💻";
    default: return "🛡️";
  }
}
// RESULTS
function showResults() {
  document.getElementById("app").style.display = "none";

  let level, color, message;

  if (totalScore >= 55) {
    level = "LOW RISK";
    color = "#00ff88";
    message = "You demonstrate strong cybersecurity awareness and safe habits.";
  } else if (totalScore >= 30) {
    level = "MODERATE RISK";
    color = "#ffcc00";
    message = "You have a solid foundation, but some behaviors could expose you to risk.";
  } else {
    level = "HIGH RISK";
    color = "#ff3b3b";
    message = "Your current habits make you vulnerable to cyber threats.";
  }

  
  // Results by section
const categories = [
  {
    name: "phishing awareness",
    score: phishingCount ? phishingScore / phishingCount : 0
  },
  {
    name: "password security",
    score: passwordCount ? passwordScore / passwordCount : 0
  },
  {
    name: "public Wi-Fi safety",
    score: wifiCount ? wifiScore / wifiCount : 0
  },
  {
    name: "AI/data privacy",
    score: aiCount ? aiScore / aiCount : 0
  },
  {
    name: "device security",
    score: deviceCount ? deviceScore / deviceCount : 0
  }
];

// sort lowest → highest
categories.sort((a, b) => a.score - b.score);

// assign areas
let weakestArea = categories[0].name;
let strongestArea = categories[categories.length - 1].name;

// handle tie
if (categories[0].score === categories[categories.length - 1].score) {
  weakestArea = "balanced awareness across categories";
  strongestArea = "balanced awareness across categories";
}

  
  // Generate tips
  let tips = new Set();

  answers.forEach(a => {
    if (a.question.includes("same password") && a.score === 0) {
      tips.add("Use a unique password for every account.");
    }
    if (a.question.includes("MFA") && a.score === 0) {
      tips.add("Enable multi-factor authentication wherever possible.");
    }
    if (a.question.includes("unknown senders") && a.score === 0) {
      tips.add("Avoid clicking links from unknown senders.");
    }
    if (a.question.includes("public Wi-Fi") && a.score === 0) {
      tips.add("Avoid logging into sensitive accounts on public Wi-Fi.");
    }
  });

  // 🎯 SMART RECOMMENDATIONS BASED ON WEAKEST AREA
if (weakestArea === "phishing awareness") {
  tips.add("Be more cautious with emails and messages—always verify the sender before clicking links.");
  tips.add("Hover over links before clicking to check where they actually lead.");
}

if (weakestArea === "password security") {
  tips.add("Use a unique password for every account to prevent chain breaches.");
  tips.add("Consider using a password manager to securely store and generate strong passwords.");
}

if (weakestArea === "public Wi-Fi safety") {
  tips.add("Avoid logging into sensitive accounts on public Wi-Fi networks.");
  tips.add("Use a VPN or personal hotspot when accessing important information.");
}

if (weakestArea === "AI/data privacy") {
  tips.add("Avoid sharing personal or sensitive information with AI tools.");
  tips.add("Always review company policies before using AI for work-related tasks.");
}

if (weakestArea === "device security") {
  tips.add("Keep your devices updated to protect against vulnerabilities.");
  tips.add("Enable antivirus or endpoint protection for an extra layer of security.");
}
  

  const percent = Math.round((totalScore / (questions.length * 2)) * 100);

  document.getElementById("result").innerHTML = `
<div class="dashboard">

  <!-- TOP SUMMARY -->
  <div class="card summary">
    <div class="risk-header">
      <h2>Cybersecurity Risk Assessment</h2>
      <div class="score">${percent}%</div>
    </div>

    <h3 class="risk-level" style="color:${color}">${level}</h3>
    <p>${message}</p>
  </div>

  <!-- CATEGORY SCORES -->
  <div class="card categories">
    <h3>Category Scores</h3>

  ${categories.map(c => {
  const icon = getIcon(c.name);
  const pct = Math.round((c.score / 2) * 100);

  let status = "";
  let color = "";

  if (pct < 40) {
    status = "Needs Work";
    color = "#ff4d4d";
  } else if (pct < 75) {
    status = "Moderate";
    color = "#facc15";
  } else {
    status = "Strong";
    color = "#00ff88";
  }

  return `
    <div class="category-row">

      <div class="cat-left">
        <span class="icon">${icon}</span>
        <span>${c.name}</span>
      </div>

      <div class="status-line">
        <span style="color:${color}; font-weight:600">${status}</span>
        <span>${pct}%</span>
      </div>

      <div class="bar-bg">
        <div class="bar-fill" style="width:${pct}%; background:${color}"></div>
      </div>

        </div>
      `;
    }).join("")}

  </div>

  <!-- PROFILE -->
  <div class="card profile">
  <h3>Personalized Security Profile</h3>

  <div class="good">
    🟢 Strongest: <b>${strongestArea}</b>
    <div class="sub-label">Good habits in this category reduce overall risk.</div>
  </div>

  <div class="bad">
    🔴 Weakest: <b>${weakestArea}</b>
    <div class="sub-label">This is your highest vulnerability area.</div>
  </div>
</div>

  <!-- RECOMMENDATIONS -->
  <div class="card tips">
    <h3>Smart Recommendations</h3>
    <ul>
      ${[...tips].map(t => `<li>🎯 ${t}</li>`).join("")}
    </ul>
  </div>

  <button onclick="location.reload()" class="restart">
    Restart Assessment
  </button>

</div>
`;

    const radarCtx = document.getElementById("radarChart");

const radarLabels = categories.map(c => c.name);

const radarData = categories.map(c => Math.round((c.score / 2) * 100));

new Chart(radarCtx, {
  type: "radar",
  data: {
    labels: radarLabels,
    datasets: [{
      label: "Security Score",
      data: radarData,
      fill: true,
      backgroundColor: "rgba(0,255,200,0.2)",
      borderColor: "#00ffcc",
      pointBackgroundColor: "#00ffcc"
    }]
  },
  options: {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false }
      }
    }
  }
});

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
}
