import main = require("./main");
import view = require("../lib/view");

export function addUserInit(): void {
    document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
    document.getElementById("signInForm").addEventListener("submit", signInSubmit);
    document.getElementById("readers").addEventListener("view:show", initReaders);
    document.getElementById("editUser").addEventListener("view:show", showEditUser);
    document.getElementById("addBarcodeButton").addEventListener("click", onAddUserGetBarcode);
    document.getElementById("signInBarcode").addEventListener("click", onSignInGetBarcode);
    document.getElementById("addUserSuccess").addEventListener("view:show", showAddUserSuccess);
    document.getElementById("inventory").addEventListener("view:show", showInventory);
    document.getElementById("checkOut").addEventListener("view:show", showCheckOut);
    document.querySelector("#checkOut .scanReader").addEventListener("click", scanReader);
    document.querySelector("#checkOut .scanBook").addEventListener("click", scanBook);
    document.querySelector("#returnBook .scanBook").addEventListener("click", scanReturn);
    //document.getElementById("overdueButton").addEventListener("view:show", showCheckOutSuccess);

}

interface Book {
    Id: number;
    Title: string;
    AuthorFirst: string;
    AuthorMiddle: string;
    AuthorLast: string;
    Barcode: string;
}

function showEditUser(): void {
    (document.querySelector("#editUser input[name='FirstName']") as HTMLInputElement).value = currentEditUser.FirstName;
    (document.querySelector("#editUser input[name='MiddleName']") as HTMLInputElement).value =
        currentEditUser.MiddleName;
    (document.querySelector("#editUser input[name='LastName']") as HTMLInputElement).value = currentEditUser.LastName;
    (document.querySelector("#editUser input[name='Barcode']") as HTMLInputElement).value =
        currentEditUser.Barcode || "";
}

function showInventory(): void {
    const ul = document.getElementById("inventoryList");
    ul.textContent = "";

    const books = getData(`/api/books/${currentLibrary.Id}`) as Array<Book>;

    books.forEach(b => {
        const li = document.createElement("li");

        var span = document.createElement("span");
        span.className = "title";
        span.textContent = b.Title;
        li.appendChild(span);

        span = document.createElement("span");
        span.className = "author";
        span.textContent = `${b.AuthorFirst} ${b.AuthorMiddle} ${b.AuthorLast}`;
        li.appendChild(span);

        li.setAttribute("data-book-id", b.Id.toString());
        
        ul.appendChild(li);
    });

}

function showCheckOut(): void {
    view.hide("#checkOutError");
    view.hide("#checkOutReader");
    view.hide("#checkOutBook");
}

//function showCheckOutSuccess(): void {
//    var message = document.getElementById("checkOutSucessMessage");
//    message.textContent = "The Right Stuff");
//    main.viewSection("checkOutSuccess");
//}

var checkOutReader: Reader;

function scanReader(): void {
    view.hide("#checkOutError");
    scanBarcode(result => {
        checkOutReader = getData(`/api/reader/barcode/${result.text} (${result.format})`) as Reader;

        if (checkOutReader) {
            document.getElementById("checkOutReader").textContent =
                checkOutReader.FirstName + " " + checkOutReader.LastName;
            view.show("#checkOutReader");

            if (checkOutBook && checkOutReader) {
                checkOutTheBook(checkOutReader, checkOutBook);
            }
        } else {
            document.getElementById("checkOutReader").textContent = "";
            view.hide("#checkOutReader");
        }
    });
}

var checkOutBook: Book;

function scanBook(): void {
    view.hide("#checkOutError");
    scanBarcode(result => {
        checkOutBook = getData(`/api/book/barcode/${result.text} (${result.format})`) as Book;

        if (checkOutBook) {
            document.getElementById("checkOutBook").textContent = checkOutBook.Title;
            view.show("#checkOutBook");

            if (checkOutBook && checkOutReader) {
                checkOutTheBook(checkOutReader, checkOutBook);
            }
        } else {
            document.getElementById("checkOutBook").textContent = "";
            view.hide("#checkOutBook");
        }
    });
}

function checkOutTheBook(reader: Reader, book: Book) {
    view.hide("#checkOutError");
    const ok = getData(`/api/books/checkout/${book.Id}/${reader.Id}`) as string;

    if (ok === "ok") {
        main.viewSection("checkOutSuccess");
        document.querySelector("#checkOutSuccess .message").textContent =
            `${checkOutBook.Title} has been checked out to ${checkOutReader.FirstName} ${checkOutReader.LastName}`;
        document.getElementById("checkOutBook").textContent = "";
        checkOutBook = null;
    } else {
        document.getElementById("checkOutError").textContent = ok;
        view.show("#checkOutError");
    }
}

function scanReturn(): void {
    scanBarcode(result => {
        var returnBook = getData(`/api/book/barcode/${result.text} (${result.format})`) as Book;

        if (returnBook) {
            const ok = getData(`/api/books/return/${returnBook.Id}`) as string;

            if (ok === "ok") {
                document.querySelector("#returnBookSuccess .message").textContent =
                    returnBook.Title + " has been returned to inventory!";
                main.viewSection("returnBookSuccess");
            }
        }
    });
}

function addUserSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = prepField(field.value);
    }
    data["LibraryID"] = currentLibrary.Id;

    currentReader = postData("/api/reader/add", data) as Reader;

    if (currentReader) {
        main.viewSection("addUserSuccess");

        for (let i = 0; i < inputs.length; i++) {
            const field = inputs[i] as HTMLInputElement;
            field.value = "";
        }

        view.hide("#barcodeString");
    }

    return false;
}

var currentReader: Reader;

function encodeHTML(str: string): string {
    if (!str)
        return "";

    return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}

function showAddUserSuccess(): void {
    console.log(currentReader);

    document.getElementById("userInfo").innerHTML = `
<p>First name: ${encodeHTML(currentReader.FirstName)}</p>
<p>Last name: ${encodeHTML(currentReader.LastName)}</p>
<p>Barcode: ${encodeHTML(currentReader.Barcode)}</p>
<p>Total Checkouts: ${currentReader.TotalCheckouts}</p>`;

}

function prepField(str: string): string {
    if (!str)
        str = "";

    return str.trim();
}

interface Library {
    Id: number;
    Name: string;
    Village: string;
    Country: string;
}

var currentLibrary: Library;

function signInSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=password]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = prepField(field.value);
    }

    currentLibrary = postData("/api/signin", data) as Library;

    if (currentLibrary) {
        main.viewSection("hub");
    }

    return false;
}

//const serverURL = "http://localhost:51754";
const serverURL = "https://favl.azurewebsites.net";

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

interface Reader {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    TotalCheckouts: number;
    Barcode: string;
}

var currentEditUser: Reader;

function initReaders() {
    const ul = document.getElementById("readersList");
    ul.textContent = "";

    const readers = getData(`/api/readers/${currentLibrary.Id}`) as Array<Reader>;

    readers.forEach(r => {
        const li = document.createElement("li") as HTMLLIElement;
        li.addEventListener("click",
            () => {
                currentEditUser = r;
                main.viewSection("editUser");
            });

        var span = document.createElement("span");
        span.className = "name";
        span.textContent = r.FirstName + " " + r.MiddleName + " " + r.LastName;
        li.appendChild(span);

        span = document.createElement("span");
        span.className = "barcode";
        span.textContent = r.Barcode || "—";
        li.appendChild(span);

        ul.appendChild(li);
    });
}

const scannerSetUp = {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: false, // iOS and Android
    showTorchButton: true, // iOS and Android
    torchOn: false, // Android, launch with the torch switched on (if available)
    prompt: "Place a barcode inside the scan area", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS
};

function onAddUserGetBarcode(): void {
    scanBarcode(result => {
        var el = document.getElementById("barcodeString") as HTMLInputElement;
        el.value = result.text + " (" + result.format + ")";
        view.show(el);
    });
}

interface Librarian {
    FirstName: string;
    LastName: string;
    Id: number;
}

function onSignInGetBarcode(): void {
    scanBarcode(result => {
        currentLibrary = getData(`/api/signin/${result.text} (${result.format})`) as Library;

        if (currentLibrary) {
            main.viewSection("hub");
        }
    });
}

function scanBarcode(onSuccess): void {
    (cordova as any).plugins.barcodeScanner.scan(
        result => {
            if (!result.cancelled)
                onSuccess(result);
        },
        error => alert(`Scanning failed: ${error}`),
        scannerSetUp
    );
}