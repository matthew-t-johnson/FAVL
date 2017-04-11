"use strict";
var Quagga;
(function () {
    var onDetectedSet = false;
    var viewport = document.querySelector("#interactive.viewport");
    //const isbndbApiKey = "RIZ5L70Q";
    //const isbndbApiUrl = "http://isbndb.com/api/v2/json/RIZ5L70Q/book/?q=";
    var scannerState = {
        inputStream: {
            type: "LiveStream",
            constraints: {
                width: { min: 200, max: 320 },
                height: { min: 112, max: 160 },
                facingMode: "environment" // or user
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: window.navigator.hardwareConcurrency || 1,
        decoder: {
            readers: ["code_128_reader", "ean_reader"]
        },
        locate: true
    };
    var stopScan = function () {
        Quagga.stop();
        viewport.setAttribute("hidden", "");
        document.getElementById("btnStopScan").setAttribute("hidden", "");
        document.getElementById("btnScan").removeAttribute("hidden");
    };
    var LookupISBN = function (code) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var p = document.createElement("p");
            var bi = JSON.parse(xhr.responseText);
            if (bi.error)
                p.textContent = "Error \"" + bi.error + "\" looking up " + code;
            else
                p.textContent = "Found ISBN " + bi.isbn13 + ": " + bi.title + " by " + bi.authorFirst + " " + bi.authorMiddle + " " + bi.authorLast;
            document.querySelector("div.contentWrapper").appendChild(p);
        };
        xhr.onerror = function () {
            var p = document.createElement("p");
            p.textContent = "Failed to get book info from barcode";
            document.querySelector("div.contentWrapper").appendChild(p);
        };
        xhr.open("GET", "/api/isbndb/" + code, true);
        xhr.send();
    };
    var onDetected = function (data) {
        stopScan();
        var p = document.createElement("p");
        if (data.codeResult && data.codeResult.code) {
            p.className = "detectedCode";
            var format = data.codeResult.format.toUpperCase();
            p.textContent = "Detected barcode: " + data.codeResult.code + " (" + format + ")";
            if (format === "EAN_13")
                LookupISBN(data.codeResult.code);
        }
        else {
            p.className = "scanError";
            p.textContent = "No barcode detected";
        }
        document.querySelector("div.contentWrapper").appendChild(p);
    };
    function startScan() {
        viewport.removeAttribute("hidden");
        Quagga.init(scannerState, function (err) {
            if (err) {
                window.alert("Error initialzing Quagga: " + err);
                return;
            }
            if (!onDetectedSet) {
                onDetectedSet = true;
                Quagga.onDetected(onDetected);
            }
            var videoStyle = window.getComputedStyle(viewport.querySelector("video"));
            viewport.style.width = videoStyle.width;
            viewport.style.height = videoStyle.height;
            Quagga.start();
            document.getElementById("btnScan").setAttribute("hidden", "");
            document.getElementById("btnStopScan").removeAttribute("hidden");
        });
    }
    document.getElementById("btnScan").addEventListener("click", startScan);
    document.getElementById("btnStopScan").addEventListener("click", stopScan);
})();
