const questions = [
  { q: "Who is the CM of Telangana?", options: ["KCR", "KTR", "ARR", "KVR"], answer:2 },
  { q: "Capital of Telangana?", options: ["Kamareddy", "Hyderabad", "Sangareddy", "Rangareddy"], answer: 1 },
  { q: "Which planet is known as the green Planet?", options: ["Earth", "Mars", "Uranus", "Jupiter"], answer: 2 },
  { q: "which is the least polluted ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 0 },
  { q: "O2 is?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answer: 0 },
  { q: "king of the forest?", options: ["Lion", "Tiger", "Cheetah", "Leopard"], answer: 0 },
  { q: " Hyper text mark-up language stands for?", options: ["CSS", "HTML", "HTTP", "JS"], answer: 1 },
  { q: "Square root of 4?", options: ["6", "7", "2", "9"], answer: 2 },
  { q: "Color of the sun?", options: ["Blue", "Green", "Red", "Yellow"], answer: 2 },
  { q: "java is a?", options: ["Snake", "Language", "Car", "Bird"], answer: 1 },
  { q: "Who wrote Hamlet?", options: ["Shakespeare", "Dickens", "Austen", "Orwell"], answer: 0 },
  { q: "Sun rises in?", options: ["West", "East", "North", "South"], answer: 1 },
  { q: "Largest mammal?", options: ["Elephant", "Whale", "Hippo", "Giraffe"], answer: 1 },
  { q: "9 x 9?", options: ["15", "20", "81", "30"], answer: 2 },
  { q: "which color indicate purity?", options: ["Red", "Green", "Black", "White"], answer: 3 }
];

let currentQ = 0, score = 0, timer, timeLeft = 10;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const resultPopup = document.getElementById("result-popup");
const scoreEl = document.getElementById("score");
const ratingEl = document.getElementById("rating");

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();

  // Remove attempted class for new question
  document.querySelector("h1").classList.remove("attempted");

  const q = questions[currentQ];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.className = "option-label";
    label.innerHTML = `
      <input type="radio" name="option" value="${i}">
      ${opt}
    `;
    optionsEl.appendChild(label);
  });

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);

  updateProgress();
}

function updateTimer() {
  timeEl.textContent = timeLeft;
}

function updateProgress() {
  const progress = (currentQ) / questions.length;
  progressBar.style.transform = `scaleX(${progress})`;
}

const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

let selectedAnswer = null;

optionsEl.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    selectedAnswer = parseInt(e.target.value);
    // Add green background to selected option label
    const labels = optionsEl.querySelectorAll("label");
    labels.forEach((label, index) => {
      if (index === selectedAnswer) {
        label.style.backgroundColor = "#c8e6c9"; // light green
      } else {
        label.style.backgroundColor = "";
      }
    });
    // Add red border below Quiz App title after attempting
    document.querySelector("h1").classList.add("attempted");
  }
});

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("Please select an option before proceeding.");
    return;
  }
  if (selectedAnswer === questions[currentQ].answer) {
    score++;
  }
  selectedAnswer = null;
  currentQ++;
  if (currentQ < questions.length - 1) {
    showQuestion();
  } else if (currentQ === questions.length - 1) {
    showQuestion();
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  }
});

submitBtn.addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("Please select an option before submitting.");
    return;
  }
  if (selectedAnswer === questions[currentQ].answer) {
    score++;
  }
  showResult();
});


function nextQuestion() {
  clearInterval(timer);
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.transform = `scaleX(1)`;
  resultPopup.style.display = "flex";
  scoreEl.textContent = score;

  let ratingText = "";
  if (score >= 13) {
    ratingText = "🌟 Excellent!";
    ratingEl.style.color = "green";
  } else if (score >= 8) {
    ratingText = "👍 Good Job!";
    ratingEl.style.color = "orange";
  } else {
    ratingText = "😞 Better Luck Next Time!";
    ratingEl.style.color = "red";
  }
  ratingEl.textContent = ratingText;
}

showQuestion();