define(["require", "exports", "./main", "../lib/view"], function (require, exports, main, view) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init() {
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
        document.querySelector("#signOutButton").addEventListener("click", signOut);
        document.querySelector("#errorOverlay button").addEventListener("click", clearErrorMessage);
    }
    exports.init = init;
    // Global State Variables
    var currentLibrary;
    var currentEditUser;
    var currentReader;
    function showAddUser() {
        document.querySelector("#addUser input[name='FirstName']").value = "";
        document.querySelector("#addUser input[name='MiddleName']").value = "";
        document.querySelector("#addUser input[name='LastName']").value = "";
        document.querySelector("#addUser input[name='Barcode']").value = "";
    }
    function showEditUser() {
        document.querySelector("#editUser input[name='FirstName']").value = currentEditUser.FirstName;
        document.querySelector("#editUser input[name='MiddleName']").value =
            currentEditUser.MiddleName;
        document.querySelector("#editUser input[name='LastName']").value = currentEditUser.LastName;
        document.querySelector("#editUser input[name='Barcode']").value =
            currentEditUser.Barcode || "";
    }
    function showInventory() {
        var ul = document.getElementById("inventoryList");
        ul.textContent = "";
        showLoading();
        getDataAsync("/api/books/" + currentLibrary.Id, function (books) {
            books.forEach(function (b) {
                var li = document.createElement("li");
                var span = document.createElement("span");
                span.className = "title";
                span.textContent = b.Title;
                li.appendChild(span);
                span = document.createElement("span");
                span.className = "author";
                span.textContent = b.AuthorFirst + " " + b.AuthorMiddle + " " + b.AuthorLast;
                li.appendChild(span);
                li.setAttribute("data-book-id", b.Id.toString());
                ul.appendChild(li);
            });
            hideLoading();
        }, function (httpStatus) {
            hideLoading();
            showErrorMessage(httpStatus);
        });
    }
    var MonthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function showOverDue() {
        var ul = document.getElementById("overDueList");
        ul.textContent = "";
        showLoading();
        getDataAsync("/api/books/overdue/" + currentLibrary.Id, function (books) {
            books.forEach(function (b) {
                var li = document.createElement("li");
                if (b.DaysOverDue < 0) {
                    li.classList.add("notOverdue");
                }
                else if (b.DaysOverDue > 7) {
                    li.classList.add("veryOverdue");
                }
                else {
                    li.classList.add("slightlyOverdue");
                }
                var bookInfo = document.createElement("div");
                bookInfo.className = "bookInfo";
                li.appendChild(bookInfo);
                var span = document.createElement("span");
                span.className = "title";
                span.textContent = b.Title;
                bookInfo.appendChild(span);
                span = document.createElement("span");
                span.className = "author";
                span.textContent = b.AuthorFirst + " " + b.AuthorMiddle + " " + b.AuthorLast;
                bookInfo.appendChild(span);
                span = document.createElement("span");
                span.className = "reader";
                span.textContent = b.ReaderFirst + " " + b.ReaderMiddle + " " + b.ReaderLast;
                bookInfo.appendChild(span);
                var dueDate = new Date(b.DueDate);
                var dueDateDiv = document.createElement("div");
                dueDateDiv.className = "dueDateDiv";
                li.appendChild(dueDateDiv);
                span = document.createElement("span");
                span.className = "month";
                span.textContent = "" + MonthNames[dueDate.getMonth()];
                dueDateDiv.appendChild(span);
                span = document.createElement("span");
                span.className = "date";
                span.textContent = "" + dueDate.getDate();
                dueDateDiv.appendChild(span);
                span = document.createElement("span");
                span.className = "year";
                span.textContent = "" + dueDate.getFullYear();
                dueDateDiv.appendChild(span);
                li.setAttribute("data-book-id", b.Id.toString());
                ul.appendChild(li);
            });
            hideLoading();
        }, function (httpStatus) {
            hideLoading();
            showErrorMessage(httpStatus);
        });
    }
    var checkOutBook;
    var checkOutReader;
    function showCheckOut() {
        checkOutReader = null;
        checkOutBook = null;
        document.querySelector("#checkOut .scanReader").disabled = false;
        document.querySelector("#checkOut .scanBook").disabled = false;
        view.hide("#checkOutReader");
        view.hide("#checkOutBook");
        view.hide("#checkOutError");
    }
    function scanReader() {
        view.hide("#checkOutError");
        scanBarcode(function (result) {
            getDataAsync("/api/reader/barcode/" + result.text + " (" + result.format + ")", function (reader) {
                checkOutReader = reader;
                if (checkOutReader) {
                    document.querySelector("#checkOutReader span").textContent =
                        checkOutReader.FirstName + " " + checkOutReader.LastName;
                    view.show("#checkOutReader");
                    document.querySelector("#checkOut .scanReader").disabled = true;
                    if (checkOutBook && checkOutReader) {
                        checkOutTheBook(checkOutReader, checkOutBook);
                    }
                }
                else {
                    view.hide("#checkOutReader");
                }
            }, function (httpStatus) {
                if (httpStatus === HTTPStatusCodes.NOT_FOUND) {
                    document.querySelector("#checkOutError span").textContent = "Reader not found";
                }
                else {
                    document.querySelector("#checkOutError span").textContent = errorMessageText(httpStatus);
                }
                view.show("#checkOutError");
            });
        });
    }
    function scanBook() {
        view.hide("#checkOutError");
        scanBarcode(function (result) {
            getDataAsync("/api/book/barcode/" + result.text + " (" + result.format + ")", function (book) {
                checkOutBook = book;
                if (checkOutBook) {
                    document.querySelector("#checkOutBook span").textContent = checkOutBook.Title;
                    view.show("#checkOutBook");
                    document.querySelector("#checkOut .scanBook").disabled = true;
                    if (checkOutBook && checkOutReader) {
                        checkOutTheBook(checkOutReader, checkOutBook);
                    }
                }
                else {
                    document.getElementById("checkOutBook").textContent = "";
                    view.hide("#checkOutBook");
                }
            }, function (httpStatus) {
                if (httpStatus === HTTPStatusCodes.NOT_FOUND) {
                    document.querySelector("#checkOutError span").textContent = "Book not found";
                }
                else {
                    document.querySelector("#checkOutError span").textContent = errorMessageText(httpStatus);
                }
                view.show("#checkOutError");
            });
        });
    }
    function checkOutTheBook(reader, book) {
        view.hide("#checkOutError");
        getDataAsync("/api/books/checkout/" + book.Id + "/" + reader.Id, function (status) {
            if (status === "ok") {
                main.viewSection("checkOutSuccess");
                document.querySelector("#checkOutSuccess .message .topRow .bookMessage").textContent = checkOutBook.Title;
                document.querySelector("#checkOutSuccess .message .bottomRow .readerMessage").textContent =
                    checkOutReader.FirstName + " " + checkOutReader.LastName;
                checkOutBook = null;
            }
            else {
                document.querySelector("#checkOutError span").textContent = status;
                view.show("#checkOutError");
            }
        }, function (httpStatus) {
            document.querySelector("#checkOutError span").textContent = errorMessageText(httpStatus);
            view.show("#checkOutError");
        });
    }
    function scanReturn() {
        scanBarcode(function (result) {
            getDataAsync("/api/book/barcode/" + result.text + " (" + result.format + ")", function (returnBook) {
                getDataAsync("/api/books/return/" + returnBook.Id, function () {
                    document.querySelector("#returnBookSuccess .message .topRow .bookMessage").textContent =
                        returnBook.Title;
                    main.viewSection("returnBookSuccess");
                }, function (httpStatus) {
                    if (httpStatus === HTTPStatusCodes.NOT_FOUND) {
                        document.querySelector("#returnError span").textContent = "Book not found";
                    }
                    else {
                        document.querySelector("#returnError span").textContent = errorMessageText(httpStatus);
                    }
                    view.show("#returnError");
                });
            }, function (httpStatus) {
                if (httpStatus === HTTPStatusCodes.NOT_FOUND) {
                    document.querySelector("#returnError span").textContent = "Book not found";
                }
                else {
                    document.querySelector("#returnError span").textContent = errorMessageText(httpStatus);
                }
                view.show("#returnError");
            });
        });
    }
    function addUserSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        data["LibraryID"] = currentLibrary.Id;
        postDataAsync("/api/reader/add", data, function (addedReader) {
            currentReader = addedReader;
            if (currentReader) {
                document.querySelector("#addUserSuccess .message .userName").textContent =
                    currentReader.FirstName + " " + currentReader.LastName;
                document.querySelector("#addUserSuccess .message .userLibrary").textContent = currentLibrary.Name;
                document.querySelector("#addUserSuccess .message .userBarcode").textContent = currentReader.Barcode;
                main.viewSection("addUserSuccess");
                for (var i = 0; i < inputs.length; i++) {
                    var field = inputs[i];
                    field.value = "";
                }
            }
        }, function (httpStatus) {
            if (httpStatus === HTTPStatusCodes.CONFLICT) {
                showErrorMessage("Barcode in use");
            }
            else {
                showErrorMessage(httpStatus);
            }
        });
        return false;
    }
    function editUserSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        data["LibraryID"] = currentLibrary.Id;
        postDataAsync("/api/reader/" + currentEditUser.Id, data, function (user) {
            currentEditUser = user;
            if (currentEditUser) {
                document.querySelector("#editUserSuccess .message .userName").textContent =
                    currentEditUser.FirstName + " " + currentEditUser.LastName;
                document.querySelector("#editUserSuccess .message .userLibrary").textContent = currentLibrary.Name;
                document.querySelector("#editUserSuccess .message .userBarcode").textContent = currentEditUser.Barcode;
                main.viewSection("editUserSuccess");
                for (var i = 0; i < inputs.length; i++) {
                    var field = inputs[i];
                    field.value = "";
                }
            }
        }, function (httpStatus) {
            if (httpStatus === HTTPStatusCodes.NOT_FOUND) {
                showErrorMessage("User not found");
            }
            else if (httpStatus === HTTPStatusCodes.CONFLICT) {
                showErrorMessage("Barcode in use");
            }
            else {
                showErrorMessage(httpStatus);
            }
        });
        return false;
    }
    function encodeHTML(str) {
        if (!str)
            return "";
        return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
    function showAddUserSuccess() {
        console.log(currentReader);
        document.getElementById("userInfo").innerHTML = "\n<p>First name: " + encodeHTML(currentReader.FirstName) + "</p>\n<p>Last name: " + encodeHTML(currentReader.LastName) + "</p>\n<p>Barcode: " + encodeHTML(currentReader.Barcode) + "</p>\n<p>Total Checkouts: " + currentReader.TotalCheckouts + "</p>";
    }
    function prepField(str) {
        if (!str)
            str = "";
        return str.trim();
    }
    function signInSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=password]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        showLoading();
        postDataAsync("/api/signin", data, function (library) {
            hideLoading();
            currentLibrary = library;
            if (currentLibrary) {
                document.querySelector("#hub .libraryName").textContent = currentLibrary.Name;
                document.querySelector("#addUser .libraryName").textContent = currentLibrary.Name;
                document.querySelector("#editUser .libraryName").textContent = currentLibrary.Name;
                //document.querySelector("#editUser .libraryName").textContent = currentLibrary.Name;
                main.viewSection("hub");
            }
        }, function (httpStatus) {
            hideLoading();
            if (httpStatus === HTTPStatusCodes.NOT_FOUND)
                showErrorMessage("Username not found");
            else if (httpStatus === HTTPStatusCodes.UNAUTHORIZED)
                showErrorMessage("Incorrect password");
            else
                showErrorMessage(httpStatus);
        });
        return false;
    }
    //const serverURL = "http://localhost:51754";
    var serverURL = "https://favl.azurewebsites.net";
    function getDataAsync(path, onSuccess, onError) {
        getOrPostDataAsync(path, null, onSuccess, onError);
    }
    function postDataAsync(path, data, onSuccess, onError) {
        getOrPostDataAsync(path, data, onSuccess, onError);
    }
    function getOrPostDataAsync(path, data, onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === HTTPStatusCodes.OK) {
                    onSuccess(JSON.parse(xhr.responseText));
                }
                else {
                    onError(xhr.status);
                }
            }
        };
        xhr.open(data ? "POST" : "GET", serverURL + path, true);
        if (data)
            xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data ? JSON.stringify(data) : null);
    }
    function initReaders() {
        var ul = document.getElementById("readersList");
        ul.textContent = "";
        showLoading();
        getDataAsync("/api/readers/" + currentLibrary.Id, function (readers) {
            readers.forEach(function (r) {
                var li = document.createElement("li");
                li.addEventListener("click", function () {
                    currentEditUser = r;
                    main.viewSection("editUser");
                });
                var span = document.createElement("span");
                span.className = "name";
                span.textContent = r.LastName + ", " + r.FirstName + " " + r.MiddleName;
                li.appendChild(span);
                span = document.createElement("span");
                span.className = "barcode";
                span.textContent = r.Barcode || "—";
                li.appendChild(span);
                ul.appendChild(li);
            });
            hideLoading();
        }, function (httpStatus) {
            hideLoading();
            showErrorMessage(httpStatus);
        });
    }
    function showLoading() {
        view.show("#loadingOverlay");
    }
    function hideLoading() {
        var loading = document.querySelector("#loadingOverlay");
        function LoadingEnd() {
            loading.removeEventListener("transitionend", LoadingEnd);
            view.hide("#loadingOverlay");
            loading.style.removeProperty("transition");
            loading.style.removeProperty("opacity");
        }
        loading.addEventListener("transitionend", LoadingEnd);
        loading.style.transition = "opacity 200ms linear";
        loading.style.opacity = "0";
    }
    function errorMessageText(error) {
        var statusText = HTTPStatusCodes[error] ? " \u2013 " + HTTPStatusCodes[error].replace(/_/g, " ").toLocaleLowerCase().replace(/\b[a-z]/g, function (m) { return m.toLocaleUpperCase(); }) : "";
        return "Unexpected error " + error + statusText;
    }
    function showErrorMessage(error) {
        if (typeof error == "number") {
            document.querySelector("#errorOverlay .errorMessage").textContent = errorMessageText(error);
        }
        else {
            document.querySelector("#errorOverlay .errorMessage").textContent = "" + error;
        }
        view.show("#errorOverlay");
    }
    function clearErrorMessage() {
        view.hide("#errorOverlay");
    }
    var scannerSetUp = {
        preferFrontCamera: false,
        showFlipCameraButton: false,
        showTorchButton: true,
        torchOn: false,
        prompt: "Place a barcode inside the scan area",
        resultDisplayDuration: 500,
        //formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true,
        disableSuccessBeep: false // iOS
    };
    function onAddUserGetBarcode() {
        scanBarcode(function (result) {
            var table = document.getElementById("addBarcodeStringTable");
            var el = document.getElementById("addBarcodeString");
            el.value = result.text + " (" + result.format + ")";
            view.show(table);
        });
    }
    function onEditUserGetBarcode() {
        scanBarcode(function (result) {
            var el = document.getElementById("editBarcodeString");
            el.value = result.text + " (" + result.format + ")";
        });
    }
    function onSignInGetBarcode() {
        scanBarcode(function (result) {
            getDataAsync("/api/signin/" + result.text + " (" + result.format + ")", function (library) {
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
    function scanBarcode(onSuccess) {
        cordova.plugins.barcodeScanner.scan(function (result) {
            if (!result.cancelled)
                onSuccess(result);
        }, function (error) { return showErrorMessage("Scanning failed: " + error); }, scannerSetUp);
    }
    function signOut() {
        currentLibrary = null;
        currentEditUser = null;
        currentReader = null;
        view("#index");
    }
    // HTTP Status codes 
    var HTTPStatusCodes;
    (function (HTTPStatusCodes) {
        HTTPStatusCodes[HTTPStatusCodes["CONTINUE"] = 100] = "CONTINUE";
        HTTPStatusCodes[HTTPStatusCodes["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
        HTTPStatusCodes[HTTPStatusCodes["OK"] = 200] = "OK";
        HTTPStatusCodes[HTTPStatusCodes["CREATED"] = 201] = "CREATED";
        HTTPStatusCodes[HTTPStatusCodes["ACCEPTED"] = 202] = "ACCEPTED";
        HTTPStatusCodes[HTTPStatusCodes["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
        HTTPStatusCodes[HTTPStatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
        HTTPStatusCodes[HTTPStatusCodes["RESET_CONTENT"] = 205] = "RESET_CONTENT";
        HTTPStatusCodes[HTTPStatusCodes["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
        HTTPStatusCodes[HTTPStatusCodes["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
        HTTPStatusCodes[HTTPStatusCodes["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
        HTTPStatusCodes[HTTPStatusCodes["FOUND"] = 302] = "FOUND";
        HTTPStatusCodes[HTTPStatusCodes["SEE_OTHER"] = 303] = "SEE_OTHER";
        HTTPStatusCodes[HTTPStatusCodes["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
        HTTPStatusCodes[HTTPStatusCodes["USE_PROXY"] = 305] = "USE_PROXY";
        HTTPStatusCodes[HTTPStatusCodes["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
        HTTPStatusCodes[HTTPStatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
        HTTPStatusCodes[HTTPStatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
        HTTPStatusCodes[HTTPStatusCodes["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
        HTTPStatusCodes[HTTPStatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
        HTTPStatusCodes[HTTPStatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
        HTTPStatusCodes[HTTPStatusCodes["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
        HTTPStatusCodes[HTTPStatusCodes["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
        HTTPStatusCodes[HTTPStatusCodes["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
        HTTPStatusCodes[HTTPStatusCodes["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
        HTTPStatusCodes[HTTPStatusCodes["CONFLICT"] = 409] = "CONFLICT";
        HTTPStatusCodes[HTTPStatusCodes["GONE"] = 410] = "GONE";
        HTTPStatusCodes[HTTPStatusCodes["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
        HTTPStatusCodes[HTTPStatusCodes["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
        HTTPStatusCodes[HTTPStatusCodes["REQUEST_ENTITY_TOO_LARGE"] = 413] = "REQUEST_ENTITY_TOO_LARGE";
        HTTPStatusCodes[HTTPStatusCodes["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
        HTTPStatusCodes[HTTPStatusCodes["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
        HTTPStatusCodes[HTTPStatusCodes["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
        HTTPStatusCodes[HTTPStatusCodes["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
        HTTPStatusCodes[HTTPStatusCodes["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
        HTTPStatusCodes[HTTPStatusCodes["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
        HTTPStatusCodes[HTTPStatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
        HTTPStatusCodes[HTTPStatusCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
        HTTPStatusCodes[HTTPStatusCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
        HTTPStatusCodes[HTTPStatusCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
        HTTPStatusCodes[HTTPStatusCodes["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
        HTTPStatusCodes[HTTPStatusCodes["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    })(HTTPStatusCodes || (HTTPStatusCodes = {}));
});
//# sourceMappingURL=sections.js.map