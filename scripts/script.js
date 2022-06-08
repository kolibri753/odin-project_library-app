import Library from '/scripts/Library.js';
import Book from '/scripts/Book.js';

const library = new Library();
const book = new Book();

const cardWrapper = document.querySelector(".card-wrapper");
const modalWindow = document.querySelector(".modal-overlay");
const card = document.querySelector(".card");
const btnAddNewBook = document.getElementById("add-btn");
const btnModalWindowClose = document.getElementById("modalClose");
const btnConfirmAddingNewBook = document.querySelector(".form__btn");
// const cardStatus = document.querySelector(".card__status");

function saveInLocal() {
  localStorage.setItem('library', JSON.stringify(library.books));
}

function loadFromLocal() {
  const books = JSON.parse(localStorage.getItem('library'));
  if (books) {
    library.books = books.map((book) => JSONToBook(book));
    updateBooksGrid();
  } else {
    library.books = [];
  }
  console.log(library.books);
}

function JSONToBook(book) {
  return new Book(book.title, book.author, book.pages, book.status);
}

function openModalWindow() {
  modalWindow.classList.add("open-modal");
}

function closeModalWindow() {
  modalWindow.classList.remove("open-modal");
}

const getBookFromInput = () => {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  let status = document.getElementById("book-status").checked;

  if (title === "" || author === "" || pages === "") {
    alert("Empty fields!");
    return;
  }

  return new Book(title, author, pages, status);
};

function addBook() {
  try {
    const newBook = getBookFromInput();
    if (newBook === undefined) 
      return;
    if (library.bookExists(newBook)) {
      alert("This book is already on the shelf!");
      return;
    }
    library.addBook(newBook);
    saveInLocal();
    console.log(library.books);
    addBookToCanvas(newBook);
    closeModalWindow();
  } catch (e) {
    alert(e);
  }
};

function deleteBook(book, bookTitle) {
  cardWrapper.removeChild(book);
  library.deleteBook(bookTitle);
  saveInLocal();
};

function addBookToCanvas(newBook) {

  let code = `
  <div class="card">
    <button class="btn card__delete-btn" id="delete-btn">
     <i class="fa-solid fa-trash"></i>
    </button>
    <h3 class="card__title">${newBook.title}</h2>
    <span class="card__author">${newBook.author}</span>
    <span class="card__pages">${newBook.pages}p.</span>
    <span class="card__status">${newBook.status === true ? ("Yes") : ("No")}</span>
  </div>
  `;

  cardWrapper.innerHTML += code;
}

function updateBooksGrid() {
  resetBooksGrid()
  for (let book of library.books) {
    addBookToCanvas(book)
    console.log(book.title + " is added");
  }
}

function resetBooksGrid() {
  cardWrapper.innerHTML = ''
  console.log("Shelf is cleared");
}

btnAddNewBook.addEventListener("click", openModalWindow);
btnModalWindowClose.addEventListener("click", closeModalWindow);
btnConfirmAddingNewBook.addEventListener("click", addBook);

document.addEventListener("DOMContentLoaded", loadFromLocal);

document.addEventListener("click", e => {
  let removeEl;
  let title;
  if (e.target.matches(".card__delete-btn")) { 
    removeEl = e.target.parentNode;
    title = e.target.parentNode.getElementsByTagName("h3")[0].innerHTML;
    deleteBook(removeEl, title)
  }
  else if (e.target.matches(".fa-trash")) {
    removeEl = e.target.parentNode.parentNode;
    title = e.target.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML;
    deleteBook(removeEl, title)
  }

  else if(e.target.matches(".card__status")) {
    title = e.target.parentNode.getElementsByTagName("h3")[0].innerHTML;
    const currBook = library.getBook(title);
    currBook.status = !currBook.status;
    saveInLocal();
    updateBooksGrid();
    console.log(library.books);
  }
})