"use strict";
function createTestData() {
    var libraries = getData("/api/libraries");
    if (libraries.length === 0) {
        alert("No Libraries");
        return;
    }
    //addBooks(libraries[0].Id);
    //addReaders(libraries[0].Id);
    checkOutBooks(libraries[0].Id);
}
//const serverURL = "https://favl.azurewebsites.net";
var serverURL = "http://localhost:51754";
var Book = (function () {
    function Book() {
    }
    return Book;
}());
var Library = (function () {
    function Library() {
    }
    return Library;
}());
var Reader = (function () {
    function Reader() {
    }
    return Reader;
}());
function postData(path, data) {
    var xhr = new XMLHttpRequest();
    //xhr.onreadystatechange = function () {
    //    if (xhr.readyState === XMLHttpRequest.DONE) {
    //        alert(xhr.responseText);
    //    }
    //}
    //xhr.onerror = () => alert("XHR Error");
    xhr.open("POST", serverURL + path, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert("Error Received: " + xhr.statusText);
    return null;
}
function getData(path) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", serverURL + path, false);
    xhr.send();
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert("Error Received: " + xhr.statusText);
    return null;
}
function addBooks(libraryId) {
    for (var i = 0; i < 100; i++) {
        var book = new Book();
        book.Title = "Sample Title" + i;
        book.AuthorFirst = "Some";
        book.AuthorMiddle = "Sample";
        book.AuthorLast = "Name";
        book.Barcode = i.toString() + Date.now().toString() + " (EAN_13)";
        book.LibraryID = libraryId;
        postData("/api/book/add", book);
    }
}
function addReaders(libraryId) {
    for (var i = 0; i < 100; i++) {
        var reader = new Reader();
        reader.Barcode = i.toString() + Date.now().toString() + " (EAN_13)";
        reader.FirstName = "Random";
        reader.MiddleName = "Reader";
        reader.LastName = "Name";
        reader.LibraryID = libraryId;
        postData("/api/reader/add", reader);
    }
}
function checkOutBooks(libraryId) {
    var readers = getData("/api/readers/" + libraryId);
    var books = getData("/api/books/" + libraryId);
    for (var i = 0; i < 50; i++) {
        var reader = readers[Math.floor(Math.random() * readers.length)];
        var book = books[Math.floor(Math.random() * books.length)];
        getData("/api/books/checkout/" + book.Id + "/" + reader.Id);
    }
}
