define(["require", "exports", "./main"], function (require, exports, main) {
    "use strict";
    function addUserInit() {
        document.getElementById('addUserForm').addEventListener('submit', addUserSubmit);
        document.getElementById('signInForm').addEventListener('submit', signInSubmit);
    }
    exports.addUserInit = addUserInit;
    function addUserSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll('input[type=text], input[type=hidden]');
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = field.value || "";
        }
        var response = postData("/api/user/add", data);
        return false;
    }
    function signInSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll('input[type=text], input[type=password]');
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = field.value || "";
        }
        var response = postData("/api/user/signin", data);
        if (response) {
            main.viewSection("hub");
        }
        return false;
    }
    function postData(path, data) {
        var xhr = new XMLHttpRequest();
        //xhr.onreadystatechange = function () {
        //    if (xhr.readyState === XMLHttpRequest.DONE) {
        //        alert(xhr.responseText);
        //    }
        //}
        //xhr.onerror = () => alert("XHR Error");
        xhr.open('POST', 'http://localhost:51754' + path, false);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
        if (xhr.status === 200) {
            return xhr.responseText;
        }
        alert("Error Received: " + xhr.statusText);
        return null;
    }
});
//# sourceMappingURL=addUser.js.map