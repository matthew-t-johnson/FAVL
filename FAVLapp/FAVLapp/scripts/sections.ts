import main = require("./main");
import view = require("../lib/view");

export function init(): void {
    document.getElementById("readers").addEventListener("view:show", initReaders);
    document.getElementById("addUser").addEventListener("view:show", showAddUser);
    document.getElementById("editUser").addEventListener("view:show", showEditUser);
    document.getElementById("addUserSuccess").addEventListener("view:show", showAddUserSuccess);
    document.getElementById("inventory").addEventListener("view:show", showInventory);
    document.getElementById("overDue").addEventListener("view:show", showOverDue);
    document.getElementById("checkOut").addEventListener("view:show", showCheckOut);
    


    document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
    document.getElementById("editUserForm").addEventListener("submit", editUserSubmit);

    document.getElementById("signInForm").addEventListener("submit", signInSubmit);


    document.getElementById("addBarcodeButton").addEventListener("click", onAddUserGetBarcode);
    document.getElementById("editBarcodeButton").addEventListener("click", onEditUserGetBarcode);

    document.getElementById("signInBarcode").addEventListener("click", onSignInGetBarcode);
    document.querySelector("#checkOut .scanReader").addEventListener("click", scanReader);
    document.querySelector("#checkOut .scanBook").addEventListener("click", scanBook);
    document.querySelector("#returnBook .scanBook").addEventListener("click", scanReturn);
}

interface Book {
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
    DaysOverDue?: number;
}

function showAddUser(): void {
    (document.querySelector("#addUser input[name='FirstName']") as HTMLInputElement).value =  "";
    (document.querySelector("#addUser input[name='MiddleName']") as HTMLInputElement).value = "";
    (document.querySelector("#addUser input[name='LastName']") as HTMLInputElement).value = "";
    (document.querySelector("#addUser input[name='Barcode']") as HTMLInputElement).value = "";
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

    view.show("#loadingOverlay");

    getDataAsync<Array<Book>>(`/api/books/${currentLibrary.Id}`,
        books => {

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

            HideLoading();
        },
        errorCode => {
            HideLoading();
        });
}

const MonthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function showOverDue(): void {
    const ul = document.getElementById("overDueList");
    ul.textContent = "";

    view.show("#loadingOverlay");


    getDataAsync<Array<Book>>(`/api/books/overdue/${currentLibrary.Id}`,
        books => {
            books.forEach(b => {
                const li = document.createElement("li") as HTMLElement;

                if (b.DaysOverDue < 0) {
                    li.classList.add("notOverdue");
                } else if (b.DaysOverDue > 7) {
                    li.classList.add("veryOverdue");
                } else {
                    li.classList.add("slightlyOverdue");
                }

                const bookInfo = document.createElement("div");
                bookInfo.className = "bookInfo";
                li.appendChild(bookInfo);

                var span = document.createElement("span");
                span.className = "title";
                span.textContent = b.Title;
                bookInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "author";
                span.textContent = `${b.AuthorFirst} ${b.AuthorMiddle} ${b.AuthorLast}`;
                bookInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "reader";
                span.textContent = `${b.ReaderFirst} ${b.ReaderMiddle} ${b.ReaderLast}`;
                bookInfo.appendChild(span);

                const dueDate = new Date(b.DueDate);

                var dueDateDiv = document.createElement("div");
                dueDateDiv.className = "dueDateDiv";
                li.appendChild(dueDateDiv);

                span = document.createElement("span");
                span.className = "month";
                span.textContent = `${MonthNames[dueDate.getMonth()]}`;
                dueDateDiv.appendChild(span);

                span = document.createElement("span");
                span.className = "date";
                span.textContent = `${dueDate.getDate()}`;
                dueDateDiv.appendChild(span);

                span = document.createElement("span");
                span.className = "year";
                span.textContent = `${dueDate.getFullYear()}`;
                dueDateDiv.appendChild(span);


                li.setAttribute("data-book-id", b.Id.toString());

                ul.appendChild(li);
            });

            HideLoading();
        },
        errorCode => {
            HideLoading();
        });
}

var checkOutBook: Book;
var checkOutReader: Reader;

function showCheckOut(): void {
    checkOutReader = null;
    checkOutBook = null;
    (document.querySelector("#checkOut .scanReader") as HTMLButtonElement).disabled = false;
    (document.querySelector("#checkOut .scanBook") as HTMLButtonElement).disabled = false;

    view.hide("#checkOutReader");
    view.hide("#checkOutBook");
    view.hide("#checkOutError");
}

function scanReader(): void {
    view.hide("#checkOutError");
    scanBarcode(result => {
        getDataAsync<Reader>(`/api/reader/barcode/${result.text} (${result.format})`,
            reader => {

                checkOutReader = reader;

                if (checkOutReader) {
                    document.querySelector("#checkOutReader span").textContent =
                        checkOutReader.FirstName + " " + checkOutReader.LastName;
                    view.show("#checkOutReader");
                    (document.querySelector("#checkOut .scanReader") as HTMLButtonElement).disabled = true;

                    if (checkOutBook && checkOutReader) {
                        checkOutTheBook(checkOutReader, checkOutBook);
                    }
                } else {
                    view.hide("#checkOutReader");
                }
            },
        errorCode => {
            if (errorCode === 404) {
                document.querySelector("#checkOutError span").textContent = "Reader not found";
            } else {
                document.querySelector("#checkOutError span").textContent = `Error ${errorCode}`;
            }
            view.show("#checkOutError");
        });
    });
}

function scanBook(): void {
    view.hide("#checkOutError");
    scanBarcode(result => {
        getDataAsync<Book>(`/api/book/barcode/${result.text} (${result.format})`,
            book => {

                checkOutBook = book;

                if (checkOutBook) {
                    document.querySelector("#checkOutBook span").textContent = checkOutBook.Title;
                    view.show("#checkOutBook");
                    (document.querySelector("#checkOut .scanBook") as HTMLButtonElement).disabled = true;

                    if (checkOutBook && checkOutReader) {
                        checkOutTheBook(checkOutReader, checkOutBook);
                    }
                } else {
                    document.getElementById("checkOutBook").textContent = "";
                    view.hide("#checkOutBook");
                }
            },
            errorCode => {
                if (errorCode === 404) {
                    document.querySelector("#checkOutError span").textContent = "Book not found";
                } else {
                    document.querySelector("#checkOutError span").textContent = `Error ${errorCode}`;
                }
                view.show("#checkOutError");
            });
    });
}

function checkOutTheBook(reader: Reader, book: Book) {
    view.hide("#checkOutError");
    getDataAsync<string>(`/api/books/checkout/${book.Id}/${reader.Id}`,
        status => {

            if (status === "ok") {
                main.viewSection("checkOutSuccess");
                document.querySelector("#checkOutSuccess .message .topRow .bookMessage").textContent = checkOutBook.Title;
                document.querySelector("#checkOutSuccess .message .bottomRow .readerMessage").textContent =
                    checkOutReader.FirstName + " " + checkOutReader.LastName;

                checkOutBook = null;
            } else {
                document.querySelector("#checkOutError span").textContent = status;
                view.show("#checkOutError");
            }
        },
        errorCode => {
            document.querySelector("#checkOutError span").textContent = `Error ${errorCode}`;
            view.show("#checkOutError");
        });
}

function scanReturn(): void {
    scanBarcode(result => {
        getDataAsync<Book>(`/api/book/barcode/${result.text} (${result.format})`,
            returnBook => {
                getDataAsync<Book>(`/api/books/return/${returnBook.Id}`,
                    book => {
                        document.querySelector("#returnBookSuccess .message .topRow .bookMessage").textContent =
                            returnBook.Title;
                        //document.querySelector("#returnBookSuccess .message .bottomRow .readerInfo").textContent =
                        //    checkOutReader.FirstName + " " + checkOutReader.LastName;

                        main.viewSection("returnBookSuccess");
                    },
                    errorCode => {
                        if (errorCode === 404) {
                            document.querySelector("#returnError span").textContent = "Book not found";
                        } else {
                            document.querySelector("#returnError span").textContent = `Error ${errorCode}`;
                        }
                        view.show("#returnError");
                    });
            },
            errorCode => {
                if (errorCode === 404) {
                    document.querySelector("#returnError span").textContent = "Book not found";
                } else {
                    document.querySelector("#returnError span").textContent = `Error ${errorCode}`;
                }
                view.show("#returnError");
            });
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
        document.querySelector("#addUserSuccess .message .userName").textContent =
            currentReader.FirstName + " " + currentReader.LastName;
        document.querySelector("#addUserSuccess .message .userLibrary").textContent = currentLibrary.Name;
        document.querySelector("#addUserSuccess .message .userBarcode").textContent = currentReader.Barcode;
        main.viewSection("addUserSuccess");

        for (let i = 0; i < inputs.length; i++) {
            const field = inputs[i] as HTMLInputElement;
            field.value = "";
        }
    }

    return false;
}

function editUserSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = prepField(field.value);
    }
    data["LibraryID"] = currentLibrary.Id;

    currentEditUser = postData(`/api/reader/${currentEditUser.Id}`, data) as Reader;

    if (currentEditUser) {
        document.querySelector("#editUserSuccess .message .userName").textContent =
            currentEditUser.FirstName + " " + currentEditUser.LastName;
        document.querySelector("#editUserSuccess .message .userLibrary").textContent = currentLibrary.Name;
        document.querySelector("#editUserSuccess .message .userBarcode").textContent = currentEditUser.Barcode;
        main.viewSection("editUserSuccess");

        for (let i = 0; i < inputs.length; i++) {
            const field = inputs[i] as HTMLInputElement;
            field.value = "";
        }
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
        document.querySelector("#hub .libraryName").textContent = currentLibrary.Name;
        document.querySelector("#addUser .libraryName").textContent = currentLibrary.Name;
        document.querySelector("#editUser .libraryName").textContent = currentLibrary.Name;

        //document.querySelector("#editUser .libraryName").textContent = currentLibrary.Name;
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

    view.show("#loadingOverlay");
    xhr.send(JSON.stringify(data));
    view.hide("#loadingOverlay");

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function getData(path: string): Object {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", serverURL + path, false);

    view.show("#loadingOverlay");
    xhr.send();
    view.hide("#loadingOverlay");

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function getDataAsync<T>(path: string, onSuccess: (response: T) => void, onError?: (errorCode: number) => void): void {
    getOrPostDataAsync<T>(path, null, onSuccess, onError);
}

function postDataAsync<T>(path: string, data: Object, onSuccess: (response: T) => void, onError?: (errorCode: number) => void): void {
    getOrPostDataAsync<T>(path, null, onSuccess, onError);
}

function getOrPostDataAsync<T>(path: string, data: Object, onSuccess : (response: T) => void, onError? : (errorCode: number) => void) : void {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                onSuccess(JSON.parse(xhr.responseText) as T);
            } else {
                onError(xhr.status);
            }
        }
    };

    xhr.open(data ? "POST" : "GET", serverURL + path, true);
    xhr.send(data);
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

    view.show("#loadingOverlay");

    getDataAsync<Array<Reader>>(`/api/readers/${currentLibrary.Id}`,
        readers => {

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

            HideLoading();
        },
        errorCode => {
            HideLoading();
        });
}

function HideLoading(): void {
    var loading = document.querySelector("#loadingOverlay") as HTMLElement;

    function LoadingEnd(): void {
        loading.removeEventListener("transitionend", LoadingEnd);
        view.hide("#loadingOverlay");
        loading.style.removeProperty("transition");
        loading.style.removeProperty("opacity");
    }

    loading.addEventListener("transitionend", LoadingEnd);
    loading.style.transition = "opacity 200ms linear";
    loading.style.opacity = "0";
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
        var table = document.getElementById("addBarcodeStringTable") as HTMLElement;
        var el = document.getElementById("addBarcodeString") as HTMLInputElement;
        el.value = result.text + " (" + result.format + ")";
        view.show(table);
    });
}

function onEditUserGetBarcode(): void {
    scanBarcode(result => {
        var el = document.getElementById("editBarcodeString") as HTMLInputElement;
        el.value = result.text + " (" + result.format + ")";
    });
}

interface Librarian {
    FirstName: string;
    LastName: string;
    Id: number;
}

function onSignInGetBarcode(): void {
    scanBarcode(result => {
        getDataAsync<Library>(`/api/signin/${result.text} (${result.format})`,
            library => {

                currentLibrary = library;

                if (currentLibrary) {
                    document.querySelector("#hub .libraryName").textContent = currentLibrary.Name;
                    document.querySelector("#addUser .libraryName").textContent = currentLibrary.Name;
                    document.querySelector("#editUser .libraryName").textContent = currentLibrary.Name;

                    main.viewSection("hub");
                }
            });
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