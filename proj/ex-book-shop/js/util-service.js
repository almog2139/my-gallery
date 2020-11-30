'use strict';

function makeId(length = 4) {
    var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}

function bookName() {
    var books = ['The sky', 'Twilight','Harry Potter',' The Incredible Hulk'];
    var bookTitle;
    bookTitle = books[Math.floor(Math.random() * books.length)];
    return bookTitle;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function getRandomPic(){
    
}