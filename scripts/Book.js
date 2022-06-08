export default class Book {
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
