define(["require", "exports", "./main"], function (require, exports, main) {
    "use strict";
    function addUserInit() {
        document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
        document.getElementById("signInForm").addEventListener("submit", signInSubmit);
        document.getElementById("returnButton").addEventListener("click", initReaders);
    }
    exports.addUserInit = addUserInit;
    function addUserSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = prepField(field.value);
        }
        var response = postData("/api/reader/add", data);
        return false;
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
        var response = postData("/api/user/signin", data);
        if (response) {
            main.viewSection("hub");
        }
        return false;
    }
    var serverURL = "http://localhost:51754";
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
            return xhr.responseText;
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
});
//# sourceMappingURL=addUser.js.map