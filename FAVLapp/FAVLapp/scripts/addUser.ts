import main = require('./main');

export function addUserInit(): void {
    document.getElementById('addUserForm').addEventListener('submit', addUserSubmit);
    document.getElementById('signInForm').addEventListener('submit', signInSubmit);

}

function addUserSubmit(ev: Event): boolean {
    ev.preventDefault();

    var form = ev.target as HTMLFormElement;
    var inputs = form.querySelectorAll('input[type=text], input[type=hidden]');
    var data = {};

    for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i] as HTMLInputElement;
            data[field.name] = field.value || "";
    }

    var response = postData("/api/user/add", data);

    return false;
}

function signInSubmit(ev: Event): boolean {
    ev.preventDefault();

    var form = ev.target as HTMLFormElement;
    var inputs = form.querySelectorAll('input[type=text], input[type=password]');
    var data = {};

    for (var i = 0; i < inputs.length; i++) {
        var field = inputs[i] as HTMLInputElement;
        data[field.name] = field.value || "";
    }

    var response = postData("/api/user/signin", data);


    if (response)
    {
        main.viewSection("hub");
    }

    return false;
}


function postData(path: string, data: Object): string {
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

    if (xhr.status === 200)
    {
        return xhr.responseText;
    }
    alert("Error Received: " + xhr.statusText);
    return null;
}