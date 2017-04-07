define(["require", "exports", "./main", "../lib/view"], function (require, exports, main, view) {
    "use strict";
    function addUserInit() {
        document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
        document.getElementById("signInForm").addEventListener("submit", signInSubmit);
        document.getElementById("readers").addEventListener("view:show", initReaders);
        document.getElementById("addBarcodeButton").addEventListener("click", onAddUserGetBarcode);
        document.getElementById("signInBarcode").addEventListener("click", onSignInGetBarcode);
        document.getElementById("addUserSuccess").addEventListener("view:show", showAddUserSuccess);
        document.getElementById("inventory").addEventListener("view:show", showInventory);
        document.getElementById("checkOut").addEventListener("view:show", showCheckOut);
        document.querySelector("#checkOut .scanReader").addEventListener("click", scanReader);
        document.querySelector("#checkOut .scanBook").addEventListener("click", scanBook);
        document.querySelector("#returnBook .scanBook").addEventListener("click", scanReturn);
    }
    exports.addUserInit = addUserInit;
    function showInventory() {
        var ul = document.getElementById("inventoryList");
        ul.textContent = "";
        var books = getData("/api/books/" + currentLibrary.Id);
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
    }
    function showCheckOut() {
        view.hide("#checkOutError");
        view.hide("#checkOutReader");
        view.hide("#checkOutBook");
    }
    var checkOutReader;
    function scanReader() {
        view.hide("#checkOutError");
        scanBarcode(function (result) {
            checkOutReader = getData("/api/reader/barcode/" + result.text + " (" + result.format + ")");
            if (checkOutReader) {
                document.getElementById("checkOutReader").textContent = checkOutReader.FirstName + " " + checkOutReader.LastName;
                view.show("#checkOutReader");
                if (checkOutBook && checkOutReader) {
                    checkOutTheBook(checkOutReader, checkOutBook);
                }
            }
            else {
                document.getElementById("checkOutReader").textContent = "";
                view.hide("#checkOutReader");
            }
        });
    }
    var checkOutBook;
    function scanBook() {
        view.hide("#checkOutError");
        scanBarcode(function (result) {
            checkOutBook = getData("/api/book/barcode/" + result.text + " (" + result.format + ")");
            if (checkOutBook) {
                document.getElementById("checkOutBook").textContent = checkOutBook.Title;
                view.show("#checkOutBook");
                if (checkOutBook && checkOutReader) {
                    checkOutTheBook(checkOutReader, checkOutBook);
                }
            }
            else {
                document.getElementById("checkOutBook").textContent = "";
                view.hide("#checkOutBook");
            }
        });
    }
    function checkOutTheBook(reader, book) {
        view.hide("#checkOutError");
        var ok = getData("/api/books/checkout/" + book.Id + "/" + reader.Id);
        if (ok === "ok") {
            main.viewSection("checkOutSuccess");
            document.querySelector("#checkOutSuccess .message").textContent = checkOutBook.Title + " has been checked out to " + checkOutReader.FirstName + " " + checkOutReader.LastName;
            document.getElementById("checkOutBook").textContent = "";
            checkOutBook = null;
        }
        else {
            document.getElementById("checkOutError").textContent = ok;
            view.show("#checkOutError");
        }
    }
    function scanReturn() {
        scanBarcode(function (result) {
            var returnBook = getData("/api/book/barcode/" + result.text + " (" + result.format + ")");
            if (returnBook) {
                var ok = getData("/api/books/return/" + returnBook.Id);
                if (ok === "ok") {
                    document.querySelector("#returnBookSuccess .message").textContent = returnBook.Title + " has been returned to inventory!";
                    main.viewSection("returnBookSuccess");
                }
            }
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
        currentReader = postData("/api/reader/add", data);
        if (currentReader) {
            main.viewSection("addUserSuccess");
            for (var i = 0; i < inputs.length; i++) {
                var field = inputs[i];
                field.value = "";
            }
            view.hide("#barcodeString");
        }
        return false;
    }
    var currentReader;
    function showAddUserSuccess() {
        console.log(currentReader);
        document.getElementById("userInfo").innerHTML = "\n<p>First name: " + currentReader.FirstName + "</p>\n<p>Last name: " + currentReader.LastName + "</p>\n<p>Barcode: " + currentReader.Barcode + "</p>\n<p>Total Checkouts: " + currentReader.TotalCheckouts + "</p>";
    }
    function prepField(str) {
        if (!str)
            str = "";
        return str.trim();
    }
    var currentLibrary;
    function signInSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=password]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        currentLibrary = postData("/api/signin", data);
        if (currentLibrary) {
            main.viewSection("hub");
        }
        return false;
    }
    //const serverURL = "http://localhost:51754";
    var serverURL = "https://favl.azurewebsites.net";
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
    function initReaders() {
        var ul = document.getElementById("readersList");
        ul.textContent = "";
        var readers = getData("/api/readers/" + currentLibrary.Id);
        readers.forEach(function (r) {
            var li = document.createElement("li");
            li.textContent = r.FirstName + " " + r.LastName;
            ul.appendChild(li);
        });
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
            var el = document.getElementById("barcodeString");
            el.value = result.text + " (" + result.format + ")";
            view.show(el);
        });
    }
    function onSignInGetBarcode() {
        scanBarcode(function (result) {
            currentLibrary = getData("/api/signin/" + result.text + " (" + result.format + ")");
            if (currentLibrary) {
                main.viewSection("hub");
            }
        });
    }
    function scanBarcode(onSuccess) {
        cordova.plugins.barcodeScanner.scan(function (result) {
            if (!result.cancelled)
                onSuccess(result);
        }, function (error) { return alert("Scanning failed: " + error); }, scannerSetUp);
    }
});
//# sourceMappingURL=addUser.js.map