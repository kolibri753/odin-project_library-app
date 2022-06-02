class Book {
  constructor(
    // cover = null,
    title = "Unknown",
    author = "Unknown",
    pages = 0,
    status = false
  ) {
    // this.cover = cover;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  bookExists(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  deleteBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }
}

const library = new Library();
const book = new Book();

const cardWrapper = document.querySelector(".card-wrapper");
const modalWindow = document.querySelector(".modal-overlay");
const card = document.querySelector(".card");
const btnAddNewBook = document.getElementById("add-btn");
const btnModalWindowClose = document.getElementById("modalClose");
const btnConfirmAddingNewBook = document.querySelector(".form__btn");

function openModalWindow() {
  modalWindow.classList.add("open-modal");
}

function closeModalWindow() {
  modalWindow.classList.remove("open-modal");
}

let id = 0;
const getBookFromInput = () => {
  // const cover = document.getElementById('book-cover').value
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  let status = document.getElementById("book-status").checked;

  if (title === "" || author === "" || pages === "") {
    alert("Empty fields!");
    return;
  }

  status === true ? (status = "Yes") : (status = "No");

  return new Book(title, author, pages, status);
};

function addBook() {
  try {
    const newBook = getBookFromInput();
    if (newBook === undefined) return;
    library.addBook(newBook);
    console.log(library.books);
    addBookToCanvas(newBook);
    id++;
    closeModalWindow();
  } catch (e) {
    alert(e);
  }
};

function addBookToCanvas(book) {
  // <img class="card-img" src="${book.cover}" alt="cover of a ${book.title}}"/>

  let code = `
  <div class="card">
    <button class="btn card__delete-btn" id="delete-btn${id}">
     <i class="fa-solid fa-trash"></i>
    </button>
    <h3 class="card__title">${book.title}</h2>
    <span class="card__author">${book.author}</span>
    <span class="card__pages">${book.pages}p.</span>
    <span class="card__status">${book.status}</span>
  </div>
  `;

  cardWrapper.innerHTML += code;
}

btnAddNewBook.addEventListener("click", openModalWindow);
btnModalWindowClose.addEventListener("click", closeModalWindow);
btnConfirmAddingNewBook.addEventListener("click", addBook);

document.addEventListener("click", e => {
  let removeEl;
  if (e.target.matches(".card__delete-btn")) { 
    removeEl = e.target.parentNode;
    cardWrapper.removeChild(removeEl);
  }
  else if (e.target.matches(".fa-trash")) {
    removeEl = e.target.parentNode.parentNode;
    cardWrapper.removeChild(removeEl);
    title = e.target.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML;
    console.log(title)
    library.deleteBook(title)
  }
})