// 변수 및 점수
let playerScore = 0;
let computerScore = 0;
let savedTries = 10;

const playerScoreElement = document.querySelector('.playerScore');
const computerScoreElement = document.querySelector('.computerScore');
const savedTriesElement = document.querySelector('.savedTries');
const buttons = document.querySelectorAll('button');

// 버튼 클릭 이벤트 설정
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playGame(button.textContent);
  });
});

// 컴퓨터 랜덤선택 함수
function getComputerChoice() {
  const choices = ['가위', '바위', '보'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// 승자 결정 함수
function decideWinner(player, cumputer) {
  if (player === cumputer) return 'draw';

  if (
    (player === '가위' && cumputer === '보') ||
    (player === '바위' && cumputer === '가위') ||
    (player === '보' && cumputer === '바위')
  ) {
    return 'player';
  }

  return 'computer';
}

// 게임 진행 함수
function playGame(playerChoice) {
  if (savedTries <= 0) return;

  const computerChoice = getComputerChoice();
  const winner = decideWinner(playerChoice, computerChoice);
  const resultMessage = document.querySelector('.resultMessage');

  console.log(playerChoice, computerChoice, winner);

  if (winner === 'player') {
    playerScore++;
    playerScoreElement.textContent = playerScore;
    resultMessage.textContent = '플레이어 승리!';
  } else if (winner === 'computer') {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    resultMessage.textContent = '컴퓨터 승리!';
  } else {
    resultMessage.textContent = '무승부';
  }

  savedTries--;
  savedTriesElement.textContent = savedTries;

  // 게임 종료
  if (savedTries === 0) {
    const hidden = document.querySelector('.playGame');
    hidden.classList.add('hidden');

    const view = document.querySelector('.view');
    view.classList.remove('hidden');

    const restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}
