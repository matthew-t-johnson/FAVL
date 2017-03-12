define(["require", "exports"], function (require, exports) {
    "use strict";
    function addUserInit() {
        document.getElementById('addUserForm').addEventListener('submit', addUserSubmit);
    }
    exports.addUserInit = addUserInit;
    function addUserSubmit(ev) {
        ev.preventDefault();
        var form = ev.target;
        var inputs = form.querySelectorAll('input[type=text], input[type=tel]');
        var data = {};
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];
            data[field.name] = field.value;
        }
        var dataString = JSON.stringify(data);
        alert('Submitting: ' + dataString);
        var response = postData("/api/user/add", data);
        return false;
    }
    function postData(path, data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                alert(xhr.responseText);
            }
        };
        xhr.onerror = function () { return alert("XHR Error"); };
        xhr.open('POST', 'http://localhost:51754' + path, true);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
        return "hello";
    }
});
//# sourceMappingURL=addUser.js.map