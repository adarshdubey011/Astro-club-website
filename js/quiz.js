let questions = [], current = 0, score = 0, answered = false;

const introEl = document.getElementById('quiz-intro');
const questionEl = document.getElementById('quiz-question');
const resultEl = document.getElementById('quiz-result');
const startBtn = document.getElementById('quiz-start');
const nextBtn = document.getElementById('quiz-next');
const restartBtn = document.getElementById('quiz-restart');
const optionsEl = document.getElementById('quiz-options');
const qNumEl = document.getElementById('q-num');
const qTextEl = document.getElementById('q-text');
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const explanationEl = document.getElementById('q-explanation');
const scoreNumEl = document.getElementById('score-num');
const scoreTotalEl = document.getElementById('score-total');
const scoreRingEl = document.getElementById('score-ring');
const resultMsgEl = document.getElementById('result-message');

async function loadQuestions() {
  try {
    const res = await fetch('data/quizData.json');
    questions = await res.json();
    // Shuffle
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
  } catch (err) {
    console.error('Failed to load quiz data', err);
  }
}

startBtn?.addEventListener('click', () => {
  if (!questions.length) return;
  introEl.style.display = 'none';
  questionEl.style.display = 'block';
  showQuestion();
});

nextBtn?.addEventListener('click', () => {
  if (!answered) return;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn?.addEventListener('click', () => {
  current = 0; score = 0; answered = false;
  questions = questions.sort(() => Math.random() - 0.5);
  resultEl.style.display = 'none';
  questionEl.style.display = 'block';
  showQuestion();
});

function showQuestion() {
  answered = false;
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? 'See Results' : 'Next Question →';

  const q = questions[current];
  qNumEl.textContent = `Question ${current + 1} of ${questions.length}`;
  qTextEl.textContent = q.question;
  if (explanationEl) { explanationEl.textContent = ''; explanationEl.style.display = 'none'; }

  const pct = (current / questions.length) * 100;
  progressFill.style.width = pct + '%';
  progressLabel && (progressLabel.textContent = `${current + 1} / ${questions.length}`);

  optionsEl.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-option" data-index="${i}">${opt}</button>`).join('');

  optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(btn, q));
  });
}

function selectAnswer(btn, q) {
  if (answered) return;
  answered = true;
  const chosen = +btn.dataset.index;

  optionsEl.querySelectorAll('.quiz-option').forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });

  if (chosen === q.answer) score++;

  if (explanationEl && q.explanation) {
    explanationEl.textContent = `💡 ${q.explanation}`;
    explanationEl.style.display = 'block';
  }

  nextBtn.disabled = false;
}

function showResult() {
  questionEl.style.display = 'none';
  resultEl.style.display = 'block';

  scoreNumEl.textContent = score;
  scoreTotalEl.textContent = `/ ${questions.length}`;

  const pct = Math.round((score / questions.length) * 100);
  scoreRingEl.style.setProperty('--score-pct', pct + '%');
  progressFill.style.width = '100%';

  const msgs = [
    [0, 30, "Keep exploring the cosmos! 🌑", "Every great astronomer started from zero."],
    [30, 60, "You're orbiting the truth! 🌙", "Good effort — the stars await your continued study."],
    [60, 80, "Stellar performance! ⭐", "You clearly have a passion for astronomy."],
    [80, 101, "Cosmic genius! 🚀", "Exceptional knowledge — the universe holds no secrets from you."]
  ];

  const m = msgs.find(([min, max]) => pct >= min && pct < max);
  resultMsgEl && m && (resultMsgEl.innerHTML = `<strong>${m[2]}</strong><br><span>${m[3]}</span>`);
}

loadQuestions();
