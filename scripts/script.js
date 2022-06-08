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
    if (library.bookExists(newBook)) {
      alert("This book is already on the shelf");
      return;
    }
    library.addBook(newBook);
    console.log(library.books);
    addBookToCanvas(newBook);
    id++;
    closeModalWindow();
  } catch (e) {
    alert(e);
  }
};

function deleteBook(book, bookTitle) {
  cardWrapper.removeChild(book);
  console.log(bookTitle)
  library.deleteBook(bookTitle)
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

const updateBooksGrid = () => {
  resetBooksGrid()
  for (let book of library.books) {
    addBookToCanvas(book)
    console.log(book.title + " is added");
  }
}

const resetBooksGrid = () => {
  cardWrapper.innerHTML = ''
  console.log("Shelf cleared");
}

btnAddNewBook.addEventListener("click", openModalWindow);
btnModalWindowClose.addEventListener("click", closeModalWindow);
btnConfirmAddingNewBook.addEventListener("click", addBook);
// cardStatus.addEventListener("click", toggleRead);

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
    // const title = e.target.parentNode.innerHTML.replaceAll(
    //   '"',
    //   ''
    // )
    // let status = e.target.parentNode.getElementsByTagName("span")[2].innerHTML;

    // status === "Yes" ? (e.target.parentNode.getElementsByTagName("span")[2].innerHTML.replaceAll("No")) : (status = "No");
    // const book = library.getBook(title)
    const curBook = library.getBook(title);
    curBook.status === "Yes" ? (curBook.status = "No") : (curBook.status = "Yes");
    updateBooksGrid();
    console.log(library.books);
  }
})