export default class Library {
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
