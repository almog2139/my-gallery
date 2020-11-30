'use strict'
const KEY = 'books';
var gSortBy = 'name';
const PAGE_SIZE = 3;
// var gCars;
 var gPageIdx = 0;
// var gVendors = ['audi', 'fiat', 'suzuki', 'honda'];
var gBooks;
_createBooks()

function _createBooks() {
    var books = loadFromStorage(KEY)
    console.log(books);
    if (!books || !books.length) {
        books = []

        // for (let i = 0; i < 3; i++) {
        books.push(_createBook('Harry Potter', 150, 'hari', 'puki been david', 1997))
        books.push(_createBook('Twilight', 230, 'twilight', 'shuki shalom', 2002))
        books.push(_createBook('The Incredible Hulk', 120, 'green', 'almog balila', 2016))
        // }
    }
    gBooks = books
    _saveBooksToStorage();
}
console.log(gBooks);

function _createBook(name, price, imgName, authorName, year) {
    return {
        id: makeId(),
        title: name,
        imgUrl: `${imgName}.png`,
        price,
        authorName,
        year,
        rate: 0
    }
}
// function getBooksForDisplay() {
//     return gBooks;
// }
function getBooksForDisplay(){
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}
function addBook(name, price, pic, authorName, year) {
    if (!name || !price || !pic || !authorName || !year) {
        alert('you must fill all the details!!!')
        return
    }
    var book = _createBook(name, price, pic, authorName, year)
    gBooks.unshift(book);
    _saveBooksToStorage();

}
function updateBook(bookId, bookPrice) {
    var book = gBooks.find(function (cellBook) {
        return bookId === cellBook.id
    })
    book.price = bookPrice;
    _saveBooksToStorage();

}
function updateRate(bookId, rate) {
    var book = gBooks.find(function (currBook) {
        return bookId === currBook.id
    })
    book.rate = rate;
    _saveBooksToStorage();
}
function getSortForDisplay() {
    if (gSortBy === 'name') sortByBookName(gBooks)
    else sortByPrice(gBooks)
}

function sortByBookName(books) {
    books.sort(function (book1, book2) {
        if (book1.title.toLowerCase() > book2.title.toLowerCase() ) return 1
        else if (book1.title.toLowerCase()  < book2.title.toLowerCase() ) return -1;
        else return 0;
    })
}

function sortByPrice(books) {
    books.sort(function (book1, book2) {
        return book1.price - book2.price
    })
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}
function changePage(diff){
    gPageIdx+=diff;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
    if(gPageIdx*PAGE_SIZE<0)gPageIdx=Math.floor((gBooks.length-1)/PAGE_SIZE)
    console.log(gPageIdx);
}
// function nextPage() {
//     gPageIdx++;
//     
// }
// function prevPage() {
//     --gPageIdx;
//     if (gPageIdx <= 0) gPageIdx = 0;
// }  