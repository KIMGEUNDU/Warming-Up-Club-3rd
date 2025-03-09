// GitHub API
const SEARCH_API = 'https://api.github.com/search/users?q=';

// 변수 아이디
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('result');
let searchResult = [];

// 검색 결과 보이기
const displayResults = (users) => {
  if (users.length === 0) {
    result.innerHTML = '';
    Toastify({
      text: '검색결과가 없습니다.',
      duration: 2000,
      gravity: 'top',
      position: 'center',
      stopOnFocus: false,
    }).showToast();

    return;
  }

  result.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      ${users
        .map(
          (user) => `
        <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <img 
            src="${user.avatar_url}" 
            alt="${user.login}" 
            class="w-16 h-16 rounded-full"
          >
          <div>
            <h3 class="text-lg font-bold">${user.login}</h3>
            <a 
              href="${user.html_url}" 
              target="_blank" 
              class="text-blue-500 hover:underline"
            >
              프로필 방문
            </a>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;
};

// 검색 이벤트
const searchUser = async () => {
  const response = await fetch(
    `${SEARCH_API}${searchInput.value.trim()}+in:login`
  );
  const data = await response.json();
  return data.items;
};

searchInput.addEventListener('input', async (e) => {
  if (!searchInput.value.trim()) {
    searchResult = [];
    result.innerHTML = '';
    Toastify({
      text: '사용자명을 입력해주세요.',
      duration: 2000,
      gravity: 'top',
      position: 'center',
      stopOnFocus: false,
    }).showToast();
    return;
  }

  try {
    searchResult = await searchUser();
    displayResults(searchResult);
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
  }
});
