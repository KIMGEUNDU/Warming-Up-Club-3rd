function createHomeButton() {
  const homeButton = document.createElement('button');
  homeButton.textContent = '홈으로 이동';
  Object.assign(homeButton.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    backgroundColor: '#79c0f4',
    color: 'white',
    padding: '1rem',
    borderRadius: '40px',
    zIndex: '10',
    cursor: 'pointer',
    border: 'none',
  });

  homeButton.addEventListener('mouseover', () => {
    homeButton.style.backgroundColor = '#68e076';
  });

  homeButton.addEventListener('mouseout', () => {
    homeButton.style.backgroundColor = '#79c0f4';
  });

  homeButton.addEventListener('click', () => {
    window.location.href = './index.html';
  });

  document.body.appendChild(homeButton);
}

document.addEventListener('DOMContentLoaded', () => {
  createHomeButton();
});
