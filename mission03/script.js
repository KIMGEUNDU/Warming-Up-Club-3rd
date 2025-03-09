// HTML 요소 가져오기
const questionContainer = document.getElementById('questionContainer');
const question = document.getElementById('question');
const options = document.getElementById('options');
const result = document.getElementById('result');
const correct = document.getElementById('correct');
const restart = document.getElementById('restart');
const body = document.body;

// 게임 상태 변수들
let currentQuestion = 0;
let correctAnswers = 0;

// 문제 보여주기
function showQuestion() {
  if (currentQuestion >= 5) {
    showResult();
    return;
  }

  // 두 자리 수 랜덤 생성
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  // 연산자 랜덤 선택
  const operators = ['+', '-', '×', '÷'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  // 정답 계산
  let correctAnswer;
  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case '×':
      correctAnswer = num1 * num2;
      break;
    case '÷':
      correctAnswer = (num1 / num2).toFixed(1);
      break;
  }

  // 문제 표시
  question.textContent = `${num1} ${operator} ${num2} = ?`;

  // 보기
  const answers = [correctAnswer];

  // 오답만들기
  while (answers.length < 4) {
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;

    if (operator === '÷') {
      answers.push(wrongAnswer.toFixed(1));
    } else if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer);
    }
  }

  // 보기 섞기
  answers.sort(() => Math.random() - 0.5);

  // 보기 버튼 만들기
  options.innerHTML = answers
    .map(
      (answer) => `
    <button 
      class="bg-gray-200 p-4 rounded-lg text-xl font-bold hover:bg-gray-300"
      onclick="window.checkAnswer(${answer}, ${correctAnswer})"
    >
      ${answer}
    </button>
  `
    )
    .join('');

  // questionContainer 보이기
  questionContainer.classList.remove('hidden');
  result.classList.add('hidden');
}

// 정답 체크 함수를 전역으로 설정
window.checkAnswer = function (selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
    body.style.backgroundColor = '#68e076';
    setTimeout(() => {
      body.style.backgroundColor = '#f3f4f6';
      currentQuestion++;
      showQuestion();
    }, 500);
  } else {
    body.style.backgroundColor = '#ff6b6b';
    setTimeout(() => {
      body.style.backgroundColor = '#f3f4f6';
      currentQuestion++;
      showQuestion();
    }, 500);
  }
};

// 결과 보여주기
function showResult() {
  questionContainer.classList.add('hidden');
  result.classList.remove('hidden');
  correct.textContent = correctAnswers;
}

// 게임 시작
function startGame() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}

// 다시 시작 버튼 이벤트
restart.addEventListener('click', startGame);

// 페이지 로드 시 게임 시작
document.addEventListener('DOMContentLoaded', startGame);
