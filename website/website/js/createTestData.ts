function createTestData(): void {
    const libraries = getData("/api/libraries") as Array<Library>;
    if (libraries.length === 0) {
        alert("No Libraries");
        return;
    }

    //addBooks(libraries[0].Id);
    //addReaders(libraries[0].Id);
    checkOutBooks(libraries[0].Id);

}

//const serverURL = "https://favl.azurewebsites.net";
const serverURL = "http://localhost:51754";


class Book {
    Id: number;
    Title: string;
    AuthorFirst: string;
    AuthorMiddle: string;
    AuthorLast: string;
    Barcode: string;
    CheckedOutDate: string;
    DueDate: string;
    ReaderFirst: string;
    ReaderMiddle: string;
    ReaderLast: string;
    LibraryID: number;
}

class Library {
    Id: number;
    Name: string;
    Village: string;
    Country: string;
}

class Reader {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    TotalCheckouts: number;
    Barcode: string;
    LibraryID: number;
}


function postData(path: string, data: Object): Object {
    const xhr = new XMLHttpRequest();

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
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function getData(path: string): Object {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", serverURL + path, false);
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function addBooks(libraryId: number): void {
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

function addReaders(libraryId: number): void {
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

function checkOutBooks(libraryId: number): void {
    var readers = getData(`/api/readers/${libraryId}`) as Array<Reader>;
    var books = getData(`/api/books/${libraryId}`) as Array<Book>;

    for(var i = 0; i < 50; i++)
    {
        var reader = readers[Math.floor(Math.random() * readers.length)];
        var book = books[Math.floor(Math.random() * books.length)];

        getData(`/api/books/checkout/${book.Id}/${reader.Id}`);
    }
}

