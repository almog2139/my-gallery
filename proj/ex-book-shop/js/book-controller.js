'use strict'
var gbookId;
function onInit() {
    renderBooks();
}

function renderBooks() {
    getSortForDisplay();
    var books = getBooksForDisplay();
    var strHtmlS = books.map(function (book) {
        console.log(book);
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td><img src="../img/${book.imgUrl}"></td>
        <td>${book.price}</td>
        <td>${book.rate}</td>
        <td><button onclick="onReadBook('${book.id}')" class="read">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" class="update">update</button></td>
       <td> <button onclick="onDeleteBook('${book.id}')" class="delete">Delete</button></td>
         </tr>
        `
    })
    var elTable = document.querySelector('.book-table');
    elTable.innerHTML = strHtmlS.join(' ');
}

function onDeleteBook(bookId) {
    if (!confirm('Are you sure?!')) return
    deleteBook(bookId);
    onCloseRead();
    renderBooks();
}
function onAddBook() {
    var elNameBook = document.querySelector('input[name=bookName]');;
    var elPriceBook = document.querySelector('input[name=bookPrice]');
    var elPic = document.querySelector('input[name=bookPic]');
    var elAuthorName = document.querySelector('input[name=authorBook]');
    var elYear = document.querySelector('input[name=yearBook]');

    var nameBook = elNameBook.value;
    var priceBook = +elPriceBook.value;
    var pic = elPic.value;
    var authorName = elAuthorName.value;
    var year = elYear.value;

    addBook(nameBook, priceBook, pic, authorName, year);
    renderBooks();
}
function onUpdateBook(bookId) {
    var elPrice = document.querySelector('input[name=bookPrice]');
    //   var bookPrice = +prompt('enter new price:');
    var bookPrice = +elPrice.value;
    updateBook(bookId, bookPrice);
    renderBooks();
}
function onReadBook(bookId) {
    gbookId = bookId;
    var book = gBooks.find(function (currBook) {
        return currBook.id === bookId
    })
    var elModal = document.querySelector('.modal');
    var elDetails = document.querySelector('.details');
    elDetails.innerHTML = `<img src="../img/${book.imgUrl}"><p>Author's name: ${book.authorName}</p>publishing year: ${book.year}<p>`
    elModal.style.display = 'block';

}
function onCloseRead() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}
function onSetSort(sortBy) {
    console.log('sort by', sortBy);
    setSort(sortBy);
    renderBooks();
}
function onChangeRate(sign) {
    var elRate = document.querySelector('.rate');
    var rateStart = elRate.innerText;
    // if (rateStart >= 10 || rateStart < 0) return
    console.log(rateStart);

    if (sign === '+'&&rateStart<10) rateStart++
    else  if(sign==='-'&&rateStart>0)--rateStart;
    elRate.innerText = rateStart;
    updateRate(gbookId, rateStart)
    renderBooks();
}
function onChangePage(diff){
    changePage(diff)
    renderBooks();
}

// function onNextPage() {
//     nextPage();
//     renderBooks();
// }
// function onPrevPage() {
//     prevPage();
//     renderBooks();
// }