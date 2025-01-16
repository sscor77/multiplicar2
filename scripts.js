import { shuffleArray } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { question: '2 x 1', correct: 2, options: [1, 2, 3] },
    { question: '2 x 2', correct: 4, options: [2, 4, 5] },
    { question: '2 x 3', correct: 6, options: [3, 6, 9] },
    { question: '2 x 4', correct: 8, options: [8, 6, 10] },
    { question: '2 x 5', correct: 10, options: [10, 12, 14] },
    { question: '2 x 6', correct: 12, options: [12, 14, 16] },
    { question: '2 x 7', correct: 14, options: [14, 16, 18] },
    { question: '2 x 8', correct: 16, options: [14, 16, 18] },
    { question: '2 x 9', correct: 18, options: [16, 18, 20] },
    { question: '2 x 10', correct: 20, options: [18, 20, 22] },
  ];

  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const correctCounter = document.getElementById('correct-count');
  const wrongCounter = document.getElementById('wrong-count');
  const percentageCounter = document.getElementById('percentage-count');
  const resultScreen = document.getElementById('result-screen');
  const finalCorrectCount = document.getElementById('final-correct-count');
  const finalWrongCount = document.getElementById('final-wrong-count');
  const finalPercentageCount = document.getElementById('final-percentage-count');
  const finalMessage = document.getElementById('final-message');
  const restartButton = document.getElementById('restart-button');

  if (!questionContainer || !optionsContainer || !correctCounter || !wrongCounter || !percentageCounter || !resultScreen || !finalCorrectCount || !finalWrongCount || !finalPercentageCount || !finalMessage || !restartButton) {
    console.error("Elements are missing in the HTML document.");
    return;
  }

  let correctCount = 0;
  let wrongCount = 0;
  let totalQuestions = 0;
  let answeredQuestions = 0;
  let lastQuestionIndex = null;

  function updateScore() {
    correctCounter.innerText = `Correctas: ${correctCount}`;
    wrongCounter.innerText = `Incorrectas: ${wrongCount}`;
    const percentage = totalQuestions ? ((correctCount / totalQuestions) * 100).toFixed(2) : 0;
    percentageCounter.innerText = `Precisión: ${percentage}%`;
  }

  function createQuestion() {
    if (answeredQuestions >= 20) {
      showResults();
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (randomIndex === lastQuestionIndex);

    lastQuestionIndex = randomIndex;
    const currentQuestion = questions[randomIndex];
    questionContainer.innerText = currentQuestion.question;

    optionsContainer.innerHTML = '';
    const shuffledOptions = shuffleArray([...currentQuestion.options]);
    shuffledOptions.forEach((option) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('option-button');
      button.onclick = () => checkAnswer(option, currentQuestion.correct);
      optionsContainer.appendChild(button);
    });

    totalQuestions++;
    updateScore();
  }

  function checkAnswer(selected, correct) {
    if (selected === correct) {
      correctCount++;
      animateCorrect();
      setTimeout(createQuestion, 2000);
    } else {
      wrongCount++;
      animateWrong();
      setTimeout(createQuestion, 1000);
    }
    answeredQuestions++;
    updateScore();
  }

  function animateCorrect() {
    questionContainer.style.animation = 'correctAnimation 0.5s ease-out';
    setTimeout(() => {
      questionContainer.style.animation = '';
    }, 500);
  }

  function animateWrong() {
    questionContainer.style.animation = 'wrongAnimation 0.5s ease-in-out';
    setTimeout(() => {
      questionContainer.style.animation = '';
    }, 500);
  }

  function showResults() {
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);
    finalCorrectCount.innerText = `Correctas: ${correctCount}`;
    finalWrongCount.innerText = `Incorrectas: ${wrongCount}`;
    finalPercentageCount.innerText = `Precisión: ${percentage}%`;

    if (percentage >= 90) {
      finalMessage.innerText = '¡Eres un genio, la NASA quiere que trabajes para ellos!';
    } else {
      finalMessage.innerText = '¡Sigue practicando, estás haciendo un gran trabajo!';
    }

    document.querySelector('main').classList.add('hidden');
    resultScreen.classList.remove('hidden');
  }

  function restartGame() {
    correctCount = 0;
    wrongCount = 0;
    totalQuestions = 0;
    answeredQuestions = 0;
    lastQuestionIndex = null;

    updateScore();
    resultScreen.classList.add('hidden');
    document.querySelector('main').classList.remove('hidden');

    createQuestion();
  }

  restartButton.addEventListener('click', restartGame);

  createQuestion();
});