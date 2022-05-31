const addNewBook = document.getElementById('addNewBook');
const modal = document.querySelector('.modal-overlay');
const btnClose = document.getElementById('modalClose');

addNewBook.addEventListener('click', function(){
  modal.classList.add('open-modal');
})

btnClose.addEventListener('click', function(){
  modal.classList.remove('open-modal');
})