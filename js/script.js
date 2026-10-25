/*
  Drop by Drop — interactive CEP website
  This file runs entirely in the browser. The feedback form is in DEMO MODE:
  it saves responses to localStorage on the current device only.
*/

const journeyStages = [
  {
    number: '01', title: 'Before your visit', subtitle: 'Get familiar with the centre process', short: 'Know what to expect.', icon: '⌂', visual: '↗',
    captionTitle: 'A clear start to your visit', captionText: 'Check official instructions and ask questions before you go.',
    description: 'Start with the information published by Dr. Hedgewar Blood Centre, Nagpur. Its process page describes the journey from arrival until leaving, so you can understand the main steps before visiting.',
    points: [
      'The centre says a typical visit from arrival to leaving takes around an hour; the actual duration can vary.',
      'The centre says the donation itself averages about 5–10 minutes.',
      'Read the centre’s current instructions and contact staff if you have questions about a visit.',
      'If you use online donor registration, enter personal details only on the centre’s official website—not on this student project.'
    ],
    remember: 'The published timing is a general guide, not a guarantee for every visit. Check current instructions directly with the centre.'
  },
  {
    number: '02', title: 'Registration & counselling', subtitle: 'Sign in and understand the process', short: 'Learn how the visit begins.', icon: '▤', visual: '▤',
    captionTitle: 'A conversation comes first', captionText: 'The centre describes registration, information and counselling.',
    description: 'Hedgewar’s published process page says donors are signed in, given information about blood donation and guided through basic eligibility criteria. It also describes a private and confidential interview about health history.',
    points: [
      'Staff sign the donor in and go over the centre’s basic eligibility criteria.',
      'The donor reads information about blood donation before proceeding.',
      'A private, confidential interview covers relevant health-history questions.',
      'Answer questions honestly and ask staff to explain anything you do not understand.'
    ],
    remember: 'The centre’s online consent says donation should be voluntary and without payment or compulsion. Make your own informed decision after speaking with the team.'
  },
  {
    number: '03', title: 'Health screening', subtitle: 'Checks are carried out by staff', short: 'Understand why checks matter.', icon: '✚', visual: '✓',
    captionTitle: 'Checks help inform the decision', captionText: 'The published page lists four routine measurements.',
    description: 'The centre’s public process page says its team checks temperature, pulse, blood pressure and haemoglobin as part of the registration and counselling stage. These checks are part of the centre’s assessment before donation.',
    points: [
      'Temperature is checked.',
      'Pulse and blood pressure are checked.',
      'Haemoglobin level is checked.',
      'The team reviews screening information and decides whether donation can proceed under current guidance.'
    ],
    remember: 'Only authorised staff can assess eligibility. An online guide, checklist or quiz cannot confirm whether a person is medically eligible to donate.'
  },
  {
    number: '04', title: 'Blood donation', subtitle: 'A trained team guides the procedure', short: 'Know what the procedure involves.', icon: '♥', visual: '♥',
    captionTitle: 'Supported by the donation team', captionText: 'The centre says counsellors and doctors attend donors throughout.',
    description: 'If staff confirm that you may proceed and you choose to continue, the centre’s published description says you will sit comfortably or lie down. The staff clean an area on your arm and use a new sterile needle to collect blood, then place a bandage after donation.',
    points: [
      'The donor is seated comfortably or lying down.',
      'The skin area is cleaned and a new sterile needle is used to collect blood.',
      'A bandage is placed on the arm when donation is complete.',
      'The centre says its counsellors and doctors attend donors throughout the procedure.'
    ],
    remember: 'Tell the team straight away if you feel worried, uncomfortable or unwell. Follow their instructions during the procedure.'
  },
  {
    number: '05', title: 'Refreshment & recovery', subtitle: 'Pause and follow the team’s advice', short: 'Take time to recover.', icon: '☕', visual: '♡',
    captionTitle: 'A short pause after donation', captionText: 'The centre describes snacks and a refreshment area.',
    description: 'The centre’s public page describes snacks after donation and a refreshment cubicle attached to the donor room. It says donors usually leave after a 10–15 minute refreshment and recovery period, with post-donation advice from staff.',
    points: [
      'The centre’s page says snacks are provided after donation.',
      'The page describes a donor room with recliners, air conditioning and a music system, plus an attached refreshment cubicle.',
      'Staff give post-donation advice before the donor leaves.',
      'Remain with the team and follow their instructions rather than treating the published time as a personal clearance.'
    ],
    remember: 'The published 10–15 minute period is the centre’s general description. Recovery needs vary, and the staff will guide you on when it is appropriate to leave.'
  },
  {
    number: '06', title: 'Aftercare & follow-up', subtitle: 'Keep the advice for afterwards', short: 'Know what to do after leaving.', icon: '✚', visual: '✓',
    captionTitle: 'The process continues afterwards', captionText: 'Use the aftercare guidance given by the blood centre.',
    description: 'Before leaving, make sure you understand the aftercare instructions provided by the team. Hedgewar’s published process page includes guidance on hydration, food, the bandage, activity and what to do if you feel unwell.',
    points: [
      'The centre’s page advises extra water and nutritious food after donation.',
      'It advises keeping the bandage on and dry for 10–12 hours.',
      'Its published guidance says to avoid heavy lifting and vigorous exercise for the rest of the day, and to avoid smoking or alcohol after donation.',
      'Tell staff about concerns before leaving and contact the centre or an appropriate health professional if you have concerns later.'
    ],
    remember: 'This is a summary of the centre’s public guidance, not individual medical advice. Follow the instructions given to you by qualified staff.'
  }
];

const journeyList = document.getElementById('journeyStepList');
const stageLabel = document.getElementById('stageLabel');
const stageTitle = document.getElementById('stageTitle');
const stageDescription = document.getElementById('stageDescription');
const stagePoints = document.getElementById('stagePoints');
const stageRemember = document.getElementById('stageRemember');
const detailIcon = document.getElementById('detailIcon');
const detailVisual = document.getElementById('detailVisual');
const visualCaptionTitle = document.getElementById('visualCaptionTitle');
const visualCaptionText = document.getElementById('visualCaptionText');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const prevStepButton = document.getElementById('prevStep');
const nextStepButton = document.getElementById('nextStep');
let activeStage = 0;

function renderJourneyButtons() {
  journeyList.innerHTML = journeyStages.map((stage, index) => `
    <button type="button" class="journey-step-button ${index === activeStage ? 'is-active' : ''}" data-stage="${index}" aria-pressed="${index === activeStage}" ${index === activeStage ? 'aria-current="step"' : ''}>
      <span class="step-number">${stage.number}</span>
      <span class="step-copy"><strong>${stage.title}</strong><small>${stage.subtitle}</small></span>
      <span class="step-chevron" aria-hidden="true">›</span>
    </button>
  `).join('');
}

function renderJourneyStage() {
  const stage = journeyStages[activeStage];
  stageLabel.textContent = `STAGE ${stage.number} / 06`;
  stageTitle.textContent = stage.title;
  stageDescription.textContent = stage.description;
  stagePoints.innerHTML = stage.points.map(point => `<li>${point}</li>`).join('');
  stageRemember.textContent = stage.remember;
  detailIcon.textContent = stage.icon;
  const visualNumber = detailVisual.querySelector('.visual-number');
  const visualIllustration = detailVisual.querySelector('.visual-illustration');
  if (visualNumber) visualNumber.textContent = stage.number;
  if (visualIllustration) visualIllustration.textContent = stage.visual;
  if (visualCaptionTitle) visualCaptionTitle.textContent = stage.captionTitle;
  if (visualCaptionText) visualCaptionText.textContent = stage.captionText;
  progressText.textContent = `${activeStage + 1} of ${journeyStages.length}`;
  progressFill.style.width = `${((activeStage + 1) / journeyStages.length) * 100}%`;
  prevStepButton.disabled = activeStage === 0;
  nextStepButton.disabled = activeStage === journeyStages.length - 1;
  nextStepButton.innerHTML = activeStage === journeyStages.length - 1 ? 'Journey complete ✓' : 'Next stage →';
  renderJourneyButtons();
}

journeyList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-stage]');
  if (!button) return;
  activeStage = Number(button.dataset.stage);
  renderJourneyStage();
});
prevStepButton.addEventListener('click', () => {
  if (activeStage > 0) {
    activeStage -= 1;
    renderJourneyStage();
  }
});
nextStepButton.addEventListener('click', () => {
  if (activeStage < journeyStages.length - 1) {
    activeStage += 1;
    renderJourneyStage();
  }
});
renderJourneyStage();

/* Quiz: one question at a time, with immediate feedback and a final score. */
const quizQuestions = [
  {
    question: 'According to Hedgewar’s published page, how long does the donation itself take on average?',
    options: ['About 5–10 minutes', 'Exactly one hour', 'A full day'],
    answer: 0,
    explanation: 'The centre says the full visit usually takes around an hour, while the actual donation itself averages about 5–10 minutes. Individual visits can vary.'
  },
  {
    question: 'Which checks are listed on the centre’s published process page?',
    options: ['Height, eyesight and shoe size', 'Temperature, pulse, blood pressure and haemoglobin', 'Only the donor’s blood group'],
    answer: 1,
    explanation: 'The published description lists temperature, pulse, blood pressure and haemoglobin checks. Staff—not this quiz—assess eligibility.'
  },
  {
    question: 'What does the centre describe during registration and counselling?',
    options: ['A public interview in front of other donors', 'A private and confidential health-history interview', 'No questions before donation'],
    answer: 1,
    explanation: 'The centre’s published process describes a private, confidential interview about health history along with registration and donation information.'
  },
  {
    question: 'Which is consistent with the centre’s published aftercare guidance?',
    options: ['Ignore instructions given by staff', 'Follow the centre’s advice on hydration, the bandage and activity', 'Do heavy exercise straight away'],
    answer: 1,
    explanation: 'Follow the advice provided by qualified staff. Hedgewar’s public page includes instructions about water, food, keeping the bandage dry and avoiding vigorous activity that day.'
  },
  {
    question: 'Which screening tests are listed on the centre’s donor consent page?',
    options: ['HIV 1 & 2, hepatitis B and C, syphilis, malaria', 'Only a temperature check', 'Only an eyesight test'],
    answer: 0,
    explanation: 'Those five screening categories are listed in the online donor consent information. The page distinguishes screening tests from confirmatory diagnostic tests.'
  },
  {
    question: 'Which set matches blood components or services listed by the centre?',
    options: ['Packed red cells, platelet concentrate, fresh frozen plasma and single-donor platelet concentrate', 'Only bottled water and snacks', 'Only whole blood and no components'],
    answer: 0,
    explanation: 'The centre’s home page lists whole blood and services involving packed red cells, platelet concentrate, fresh frozen plasma and single-donor platelet concentrate. Not every whole-blood donation produces every listed item.'
  }
];
let quizIndex = 0;
let quizAnswers = Array(quizQuestions.length).fill(null);
let quizChecked = Array(quizQuestions.length).fill(false);
let quizView = 'question';
const quizContent = document.getElementById('quizContent');
const quizCounter = document.getElementById('quizQuestionCounter');
const quizProgress = document.getElementById('quizProgress');
const quizFeedback = document.getElementById('quizFeedback');
const quizBack = document.getElementById('quizBack');
const quizNext = document.getElementById('quizNext');

function renderQuiz() {
  quizFeedback.className = 'quiz-feedback';
  quizFeedback.textContent = '';
  if (quizView === 'result') {
    const score = quizQuestions.reduce((total, question, i) => total + (quizAnswers[i] === question.answer ? 1 : 0), 0);
    quizCounter.textContent = 'QUIZ COMPLETE';
    quizProgress.style.width = '100%';
    quizContent.innerHTML = `
      <div class="quiz-result-mark" aria-hidden="true" style="display:grid;place-items:center;width:54px;height:54px;border-radius:17px;background:#fce9e8;color:#b91c1c;font-size:28px;margin-top:24px">${score === quizQuestions.length ? '✓' : '✦'}</div>
      <h3 class="quiz-question">You scored ${score} out of ${quizQuestions.length}.</h3>
      <p style="color:#687270;font-size:11px;line-height:1.8;margin-bottom:7px">${score === quizQuestions.length ? 'Great work—you remembered the key points.' : 'Good effort. Review the explanations and try again to reinforce what you learned.'}</p>
      <p style="color:#687270;font-size:10px;line-height:1.8">Remember: this quiz checks general awareness only. It does not assess health or donation eligibility.</p>
    `;
    quizBack.disabled = true;
    quizNext.disabled = false;
    quizNext.textContent = 'Try again ↻';
    return;
  }

  const question = quizQuestions[quizIndex];
  quizCounter.textContent = `QUESTION ${quizIndex + 1} OF ${quizQuestions.length}`;
  quizProgress.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
  quizContent.innerHTML = `
    <h3 class="quiz-question">${question.question}</h3>
    <div class="quiz-options" role="radiogroup" aria-label="Answer choices">
      ${question.options.map((option, i) => `
        <label class="quiz-option ${quizChecked[quizIndex] && i === question.answer ? 'is-correct' : ''} ${quizChecked[quizIndex] && quizAnswers[quizIndex] === i && i !== question.answer ? 'is-wrong' : ''}">
          <input type="radio" name="quizAnswer" value="${i}" ${quizAnswers[quizIndex] === i ? 'checked' : ''} ${quizChecked[quizIndex] ? 'disabled' : ''} />
          <span>${option}</span>
        </label>
      `).join('')}
    </div>
  `;

  if (quizChecked[quizIndex]) {
    const correct = quizAnswers[quizIndex] === question.answer;
    quizFeedback.className = `quiz-feedback ${correct ? 'correct' : 'incorrect'}`;
    quizFeedback.textContent = `${correct ? '✓ Well done. ' : 'Not quite. '}${question.explanation}`;
  }
  quizBack.disabled = quizIndex === 0;
  quizNext.disabled = !quizChecked[quizIndex] && quizAnswers[quizIndex] === null;
  quizNext.textContent = quizChecked[quizIndex] ? (quizIndex === quizQuestions.length - 1 ? 'See results →' : 'Next question →') : 'Check answer →';
}

quizContent.addEventListener('change', (event) => {
  if (event.target.name === 'quizAnswer' && !quizChecked[quizIndex]) {
    quizAnswers[quizIndex] = Number(event.target.value);
    quizNext.disabled = false;
  }
});
quizNext.addEventListener('click', () => {
  if (quizView === 'result') {
    quizIndex = 0;
    quizAnswers = Array(quizQuestions.length).fill(null);
    quizChecked = Array(quizQuestions.length).fill(false);
    quizView = 'question';
    renderQuiz();
    return;
  }
  if (!quizChecked[quizIndex]) {
    if (quizAnswers[quizIndex] === null) return;
    quizChecked[quizIndex] = true;
    renderQuiz();
  } else if (quizIndex < quizQuestions.length - 1) {
    quizIndex += 1;
    renderQuiz();
  } else {
    quizView = 'result';
    renderQuiz();
  }
});
quizBack.addEventListener('click', () => {
  if (quizView === 'question' && quizIndex > 0) {
    quizIndex -= 1;
    renderQuiz();
  }
});
renderQuiz();

/* Feedback form — sends responses to the shared Google Apps Script endpoint. */
const feedbackForm = document.getElementById('feedbackForm');
const formStatus = document.getElementById('formStatus');
const FEEDBACK_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwJEu4ZgRxHMs4Gmk1e8wRldYg0OXjMXbAVOZFr4DkT6YU7TWqZ-nnJTDQWVObQmHzY/exec';

feedbackForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = '';
  if (!feedbackForm.reportValidity()) return;

  const formData = new FormData(feedbackForm);
  const payload = new URLSearchParams();
  payload.append('visitorType', String(formData.get('visitorType') || ''));
  payload.append('rating', String(formData.get('rating') || ''));
  payload.append('helpfulSection', String(formData.get('helpfulSection') || ''));
  payload.append('clarity', String(formData.get('clarity') || ''));
  payload.append('suggestions', String(formData.get('suggestions') || '').trim().slice(0, 700));

  const submitButton = feedbackForm.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  formStatus.className = 'form-status is-visible';
  formStatus.textContent = 'Sending your feedback…';

  try {
    // Apps Script does not expose a readable cross-origin response to this page.
    // no-cors lets the browser send the form-encoded POST; verify the first test in Sheets.
    await fetch(FEEDBACK_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: payload
    });
    formStatus.className = 'form-status is-visible';
    formStatus.textContent = 'Your feedback request was sent. For this first test, please check the Google Sheet to confirm that a new row appeared. This page cannot read the service response to verify the save automatically.';
    // Keep the submitted answers visible until you confirm that the test row reached Sheets.
  } catch (error) {
    formStatus.className = 'form-status is-visible is-error';
    formStatus.textContent = 'We could not send the request. Check your internet connection and the deployed Apps Script URL, then try again.';
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

/* Small-screen navigation */
const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');
menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

/* Keep the nav's active link roughly in sync with the section in view. */
const navLinks = [...document.querySelectorAll('.nav-link')];
const observedSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .1, .25, .5] });
  observedSections.forEach(section => observer.observe(section));
}

document.getElementById('currentYear').textContent = new Date().getFullYear();
