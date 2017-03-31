import main = require("./main");

export function addUserInit(): void {
    document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
    document.getElementById("signInForm").addEventListener("submit", signInSubmit);
    document.getElementById("returnButton").addEventListener("click", initReaders);

}

function addUserSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=hidden]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = field.value || "";
    }

    const response = postData("/api/reader/add", data);

    return false;
}

function signInSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=password]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = field.value || "";
    }

    const response = postData("/api/user/signin", data);


    if (response)
    {
        main.viewSection("hub");
    }

    return false;
}

const serverURL = "http://localhost:51754";

function postData(path: string, data: Object): string {
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

    if (xhr.status === 200)
    {
        return xhr.responseText;
    }
    alert("Error Received: " + xhr.statusText);
    return null;
}

function getData(path: string): Object {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", serverURL + path, false);
    xhr.send();

    if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
    }
    alert("Error Received: " + xhr.statusText);
    return null;
}

interface Reader {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Barcode: number;
    TotalCheckouts: number;
}


function initReaders() {
    const ul = document.getElementById("readersList");
    ul.textContent = "";

    const readers = getData("/api/readers") as Array<Reader>;

    readers.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r.FirstName + " " + r.LastName;
        ul.appendChild(li);
    });
}