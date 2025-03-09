// JSON 파일에서 데이터 불러오기
let books = [];

async function loadBooks() {
  try {
    const response = await fetch('book.json');
    const data = await response.json();
    books = data.books;
    displayBooks();
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

// 책 목록 표시 함수
function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const bookElement = document.createElement('div');

    bookElement.className =
      'flex justify-between items-center p-3 bg-gray-50 rounded';
    bookElement.innerHTML = `
            <div class="flex items-center gap-2">
            <img class="w-16" src="./img/${book.number}.png" alt="북적북적 아이콘"/>
                <section>
                  <h3 class="font-bold">${book.title}</h3>
                  <p class="text-gray-600">${book.author}</p>
                </section>
            </div>
            <button onclick="deleteBook(${index})" 
                class="bg-[#ECD680] text-white px-3 py-1 rounded hover:bg-[#E8BD53] focus:outline-none">
                삭제
            </button>
        `;

    bookList.appendChild(bookElement);
  });
}

// JSON 파일에 데이터 저장
async function saveBooks() {
  try {
    const response = await fetch('book.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ books: books }),
    });

    if (!response.ok) {
      throw new Error('저장하지 못했습니다.');
    }
  } catch (error) {
    console.error(error);
  }
}

// 랜덤 함수
function randomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}

// 책 추가 함수
async function addBook(title, author) {
  books.push({ title, author, number: randomNumber() });
  await saveBooks();
  displayBooks();
  Toastify({
    text: '책이 추가되었습니다.',
    duration: 2000,
    gravity: 'top',
    position: 'center',
    stopOnFocus: false,
  }).showToast();
}

// 책 삭제 함수
async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooks();
  displayBooks();
  Toastify({
    text: '책이 삭제되었습니다.',
    duration: 2000,
    gravity: 'top',
    position: 'center',
    stopOnFocus: false,
  }).showToast();
}

// 폼 제출 이벤트 처리
const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById('bookTitle');
  const bookAuthor = document.getElementById('bookAuthor');

  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();

  if (title && author) {
    await addBook(title, author);
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});

// 페이지 로드 시 책 목록 불러오기
loadBooks();
