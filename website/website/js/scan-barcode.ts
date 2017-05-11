
var Quagga: any;

(() => {

    let onDetectedSet = false;

    const viewport = document.querySelector("#interactive.viewport") as HTMLDivElement;
    const viewportWrapper = document.querySelector("#viewportWrapper") as HTMLDivElement;

    const scannerState = {
        inputStream: {
            type: "LiveStream",
            constraints: {
                width: { min: 320, max: 640 },
                height: { min: 180, max: 360 },
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

    const stopScan = () => {
        Quagga.stop();
        viewportWrapper.setAttribute("hidden", "");
        document.getElementById("btnStopScan").setAttribute("hidden", "");
        document.getElementById("btnScan").removeAttribute("hidden");
    };

    interface BookInfo {
        authorFirst: string;
        authorMiddle: string;
        authorLast: string;
        title: string;
        isbn13: string;
        error: string;
    }

    const LookupISBN = (code: string) : void => {
        var xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const p = document.createElement("p");

            var bi = JSON.parse(xhr.responseText) as BookInfo;

            if (bi.error)
                p.textContent = `Error "${bi.error}" looking up ${code}`;
            else
                p.textContent = `Found ISBN ${bi.isbn13}: ${bi.title} by ${bi.authorFirst} ${bi.authorMiddle} ${bi.authorLast}`;

            document.querySelector("div.contentWrapper").appendChild(p);
        };

        xhr.onerror = () => {
            const p = document.createElement("p");
            p.textContent = "Failed to get book info from barcode";
            document.querySelector("div.contentWrapper").appendChild(p);
        };

        //  use our api in APIController to work around cross-origin problems with isbndb
        xhr.open("GET", `/api/isbndb/${code}`, true);
        xhr.send();
    }

    const onDetected = (data) => {

        stopScan();

        const p = document.createElement("p");

        if (data.codeResult && data.codeResult.code) {
            p.className = "detectedCode";
            const format = data.codeResult.format.toUpperCase();
            p.textContent = `Detected barcode: ${data.codeResult.code} (${format})`;

            if (format === "EAN_13")
                LookupISBN(data.codeResult.code);

        } else {
            p.className = "scanError";
            p.textContent = "No barcode detected";
        }

        document.querySelector("div.contentWrapper").appendChild(p);
    };

    function startScan() {

        Quagga.init(scannerState,
            err => {
                if (err) {
                    window.alert(`Error initialzing Quagga: ${err}`);
                    return;
                }

                if (!onDetectedSet) {
                    onDetectedSet = true;
                    Quagga.onDetected(onDetected);
                }

                viewportWrapper.removeAttribute("hidden");
                var videoStyle = window.getComputedStyle(viewport.querySelector("video"));
                viewport.style.width = videoStyle.width;
                viewport.style.height = videoStyle.height;
                viewportWrapper.style.height = `calc(${videoStyle.height} + 96px * 2)`;

                Quagga.start();
                document.getElementById("btnScan").setAttribute("hidden", "");
                document.getElementById("btnStopScan").removeAttribute("hidden");
            }
        );
    }


    document.getElementById("btnScan").addEventListener("click", startScan);
    document.getElementById("btnStopScan").addEventListener("click", stopScan);
})();
