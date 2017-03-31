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
    }
    exports.addUserInit = addUserInit;
    function showInventory() {
        var ul = document.getElementById("inventoryList");
        ul.textContent = "";
        var books = getData("/api/books");
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
    var currentLibrarian;
    function signInSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=password]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        currentLibrarian = postData("/api/user/signin", data);
        if (currentLibrarian) {
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
        var readers = getData("/api/readers");
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
            var response = getData("/api/user/signin/" + result.text + " (" + result.format + ")");
            if (response) {
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