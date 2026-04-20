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
  options: [
    { text: "Always", score: 2, feedback: "Great! This adds an extra layer of protection." },
    { text: "Sometimes", score: 1, feedback: "Helpful, but consistency matters." },
    { text: "Never", score: 0, feedback: "Risky—your device is exposed." },
    { text: "Not sure", score: 0, feedback: "If you're not sure, it's worth checking your device settings." }
  ]
},

{
  question: "Do you use the same password for more than one account?",
  options: [
    { text: "Yes", score: 0, feedback: "One password reused = one breach affecting everything 😬" },
    { text: "No", score: 2, feedback: "Nice! Unique passwords make you much harder to hack even though they may be inconvenient." }
  ]
},

{
  question: "Do you use a password manager to keep your passwords safe?",
  options: [
    { text: "Yes", score: 2, feedback: "Smart! This is one of the best security habits." },
    { text: "No", score: 1, feedback: "Understandable, but password managers make life easier and safer. It is a tool that securely stores and automatically fills in your passwords so you only have to remember one master password." }
  ]
},

{
  question: "How often do you change passwords for important accounts (email, banking, school/work)?",
  options: [
    { text: "Every few months", score: 2, feedback: "Great! You're staying ahead of potential breaches." },
    { text: "Once a year", score: 1, feedback: "Decent, but more often is safer." },
    { text: "Rarely", score: 0, feedback: "Risky—old passwords can be compromised." },
    { text: "Never", score: 0, feedback: "That password might not be as private as you think 👀" }
  ]
},

{
  question: "When a website asks you to accept cookies, do you usually click 'Accept' without reading?",
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
  options: [
    { text: "Always", score: 0, feedback: "You’re a prime target for phishing 😬" },
    { text: "Sometimes", score: 1, feedback: "Risky—one click is all it takes." },
    { text: "Never", score: 2, feedback: "Great instinct! Keep avoiding unknown links" }
  ]
},

{
  question: "How often do you check where a link goes (hover over it) before clicking in emails from unknown sources?",
  options: [
    { text: "Always", score: 2, feedback: "Yes! This is a simple but powerful habit." },
    { text: "Sometimes", score: 1, feedback: "Good, but consistency matters." },
    { text: "Rarely", score: 0, feedback: "You're taking a risk by not checking links." },
    { text: "Never", score: 0, feedback: "You're basically clicking blindfolded." }
  ]
},

{
  question: "Clicking a suspicious link in an email can put your account or company at risk.",
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
  options: [
    { text: "True", score: 0, feedback: "Not quite. Public Wi-Fi isn’t secure for sensitive logins. Attackers on the same network can intercept your data or trick you into connecting to fake hotspots." },
    { text: "False", score: 2, feedback: "Correct! Public Wi-Fi can expose your data." }
  ]
},

{
  question: "Do you use public Wi‑Fi (like at a coffee shop or library) to log into work or school accounts?",
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
  options: [
    { text: "True", score: 2, feedback: "Correct! MFA adds a strong layer of security." },
    { text: "False", score: 0, feedback: "Actually, MFA significantly improves account security." }
  ]
},

{
  question: "AI companies like ChatGPT keep the information users type into their tools and use it to train their models.",
  options: [
    { text: "True", score: 2, feedback: "Correct! Be mindful of what you share." },
    { text: "False", score: 0, feedback: "Not quite. Assume anything you type could be stored." }
  ]
},

{
  question: "Do you ever share personal or work information with AI tools (like ChatGPT)?",
  options: [
    { text: "Always", score: 0, feedback: "Careful—this could expose sensitive information." },
    { text: "Sometimes", score: 1, feedback: "Depends what you’re sharing—be cautious." },
    { text: "Never", score: 2, feedback: "Safe approach, especially for confidential data." }
  ]
},

{
  question: "How often do you update your computer, phone, or other devices when they prompt you to?",
  options: [
    { text: "Avoid it", score: 0, feedback: "Security risk." },
    { text: "Only when required", score: 1, feedback: "Better than nothing." },
    { text: "Important only", score: 1, feedback: "All devices matter." },
    { text: "Always", score: 2, feedback: "Perfect!" }
  ]
},

{
  question: "How often do you read a privacy policy or terms of service before using an app or AI tool?",
  options: [
    { text: "Always", score: 2, feedback: "Respect—you're in the top 1%." },
    { text: "Sometimes", score: 1, feedback: "Better than nothing." },
    { text: "Never", score: 0, feedback: "No one reads them... but maybe skim a little 😅" }
  ]
},

{
  question: "You download a new productivity app, and it shows an app permission pop-up that asks for access to your camera, location, and contacts. Would you:",
  options: [
    { text: "Allow all", score: 0, feedback: "Why does this app need ALL that access 😬" },
    { text: "Allow what seems necessary", score: 1, feedback: "Good! You're limiting exposure." },
    { text: "Deny most permissions", score: 1, feedback: "Safe, but some apps may not function fully." },
    { text: "Review each permission carefully", score: 2, feedback: "Best choice—you stay in control." }
  ]
},

{
  question: "A webpage you’re trying to open blocks you with a warning: 'This link may be unsafe. Continue anyway?'  Would you:",
  options: [
    { text: "Click 'Continue (Unsafe)'", score: 0, feedback: "You saw ‘unsafe’ and still went for it 😭" },
    { text: "Close", score: 2, feedback: "Smart! Warnings exist for a reason." }
  ]
},

{
  question: "IT gives you your new work laptop and asks you to configure it.  Would you:",
  options: [
    { text: "Skip optional security settings to finish faster", score: 0, feedback: "Fast now, risky later." },
    { text: "Enable only required settings", score: 1, feedback: "Okay, but more protection is better." },
    { text: "Enable recommended protections", score: 2, feedback: "Good setup." },
    { text: "Enable protections + automatic updates", score: 2, feedback: "Perfect—secure from the start." }
  ]
},

{
  question: "Your company account setup asks you to create your first work password. Would You:",
  options: [
    { text: "Use a password you already use elsewhere so it’s easy to remember", score: 0, feedback: "Convenient… until one breach unlocks everything." },
    { text: "Slightly change an old password", score: 1, feedback: "Better, but still predictable." },
    { text: "Make a brand-new password you can remember", score: 2, feedback: "Good! Unique is better!" },
    { text: "Use a password manager to generate a strong password for you to use", score: 2, feedback: "Best choice! Strong and secure!" }
  ]
},

{
  question: "You are working remotely from a coffee shop. Would you:",
  options: [
    { text: "Use the open Wi-Fi", score: 0, feedback: "Free Wi-Fi… and free access to your data 😬" },
    { text: "Use Wi-Fi but avoid logging into important accounts", score: 1, feedback: "Safer, but still some risk." },
    { text: "Use your phone’s hotspot", score: 2, feedback: "Good—more secure than public Wi-Fi." },
    { text: "Use your hotspot and a VPN for extra security", score: 2, feedback: "Best! Extra protection layer." }
  ]
},

{
  question: "Your computer asks you to install a security update while you’re busy. Would you:",
  options: [
    { text: "'Remind me in 24 hours'", score: 0, feedback: "Delaying leaves you exposed longer." },
    { text: "'Remind me in 1 hour'", score: 1, feedback: "Better, but sooner is safer." },
    { text: "Ignore", score: 0, feedback: "Hackers love outdated systems." },
    { text: "Update now", score: 2, feedback: "Best choice—quick update, better security." }
  ]
},

{
  question: "You need to quickly summarize a confidential report using AI. Would you:",
  options: [
    { text: "Paste full report into an AI tool", score: 0, feedback: "That’s a data leak waiting to happen." },
    { text: "Remove names and paste most of it into an AI tool", score: 1, feedback: "Better, but still risky." },
    { text: "Ask AI to create an outline only", score: 2, feedback: "Safer approach." },
    { text: "Check company AI policy first", score: 2, feedback: "Best choice! Always follow guidelines." }
  ]
},

{
  question: "You get an email that looks like it’s from HR, asking you to click a link to a 'required form'. Would you:",
  options: [
    { text: "Click it right away", score: 0, feedback: "And just like that… credentials gone." },
    { text: "Hover over the link first, then click", score: 1, feedback: "Still risky—verification matters." },
    { text: "Ignore the email", score: 1, feedback: "Safe, but verify through official channels." },
    { text: "Report it to IT/security", score: 2, feedback: "Best choice! Protects you and others." }
  ]
},

{
  question: "You get a voicemail or message from someone claiming to be your manager asking for your payroll info urgently. Would you:",
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
  options: [
    { text: "Download the recommended software", score: 0, feedback: "That ‘fix’ is probably the problem." },
    { text: "Close the pop-up", score: 2, feedback: "Safer. Don’t trust random pop-ups." },
    { text: "Restart your computer", score: 1, feedback: "Okay, but not a full solution." },
    { text: "Report it to IT/security", score: 2, feedback: "Best choice! Handled safely." }
  ]
},

{
  question: "You get an email saying you need to take urgent action (like account closure), you:",
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

  const progressPercent = ((currentIndex) / questions.length) * 100;
document.getElementById("progressBar").style.width = progressPercent + "%";

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
      }, 1200);
    };

    optionsDiv.appendChild(btn);
  });
}

// RESULTS
function showResults() {
  document.getElementById("app").style.display = "none";

  let level;
  let message;

  if (totalScore >= 55) {
    level = "Low Risk ✅";
    message = "You demonstrate strong cybersecurity awareness and safe habits. Keep it up.";
  } else if (totalScore >= 30) {
    level = "Moderate Risk ⚠️";
    message = "You have a good foundation, but some behaviors could expose you to risk.";
  } else {
    level = "High Risk ❌";
    message = "Your current habits make you vulnerable to cyber threats. Improvement is strongly recommended.";
  }

  document.getElementById("result").innerHTML = `
    <h2>Your Score: ${totalScore}</h2>
    <h3>${level}</h3>
    <p>${message}</p>
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
