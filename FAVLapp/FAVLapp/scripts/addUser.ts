import main = require("./main");

export function addUserInit(): void {
    document.getElementById("addUserForm").addEventListener("submit", addUserSubmit);
    document.getElementById("signInForm").addEventListener("submit", signInSubmit);
    document.getElementById("readers").addEventListener("view:show", initReaders);
    document.getElementById("addBarcodeButton").addEventListener("click", onAddUserGetBarcode);
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

    const response = postData("/api/reader/add", data);

    return false;
}

function prepField(str: string): string {
    if (!str)
        str = "";

    return str.trim();
}

function signInSubmit(ev: Event): boolean {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input[type=text], input[type=password]");
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i] as HTMLInputElement;
        data[field.name] = prepField(field.value);
    }

    const response = postData("/api/user/signin", data);


    if (response) {
        main.viewSection("hub");
    }

    return false;
}

//const serverURL = "http://localhost:51754";
const serverURL = "https://favl.azurewebsites.net";


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

    if (xhr.status === 200) {
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
        el.removeAttribute("hidden");
    });
}

function scanBarcode(onSuccess): void {
    (cordova as any).plugins.barcodeScanner.scan(
        result => {
            if (!result.cancelled)
                onSuccess(result);
        },
        error => alert("Scanning failed: " + error),
        scannerSetUp
    );
}