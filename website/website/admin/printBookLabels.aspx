<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="printBookLabels.aspx.cs" Inherits="website.admin.printBookLabels" %>

<%@ Register Src="~/admin/allOrOneLibrary.ascx" TagPrefix="uc1" TagName="allOrOneLibrary" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Print Reader Cards</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Segoe UI Light", sans-serif;
            background-color: #eee;
            position: relative;
        }

        #instructions {
            padding: 9pt 0.5in 0;
            font-family: sans-serif;
            font-size: 9pt;
            color: red;
            background-color: #eee;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }

            #instructions div, #instructions p {
                margin: 0;
                display: inline-block;
            }

        .card {
            position: absolute;
            width: 4in;
            height: 1.3333in;
            box-sizing: border-box;
            border: 1px solid red;
        }

        table {
            border-spacing: 0;
            border: 0;
            border-collapse: collapse;
            position: absolute;
            left: 10px;
            top: 0;
            height: 100%;
        }

        td {
            text-align: left;
            vertical-align: middle;
            height: 100%;
            padding: 0;
            width: 167px;
        }

        h1, h2, h3 {
            text-align: left;
            padding: 0;
            margin: 0;
            line-height: 1.25;
            font-size: 12pt;
        }

        h1 {
            font-size: 14pt;
            font-style: italic;
            margin-bottom: 8px;
        }

        h1, h2 {
            text-indent: -1em;
            margin-left: 1em;
        }

        h2 {
            font-size: 12pt;
        }

            h2:before {
                content: "By ";
            }

        h3 {
            font-size: 10pt;
            margin-top: 8px;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 167px;
        }

            h1:empty, h3:empty {
                border-bottom: 1px solid #666;
            }

                h1:empty:after, h3:empty:after {
                    content: "\00A0";
                }

        .barcode {
            display: inline-block;
            position: absolute;
            padding-top: 22px;
            padding-right: 12px;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: white;
        }

        .whitestripe1, .whitestripe2 {
            position: absolute;
            top: 0;
            width: 149px;
            height: 10.5in;
            background-color: white;
            transform: translateX(-100%);
        }

        @media print {
            #instructions {
                display: none;
            }

            .card {
                border: none;
            }
        }
    </style>
</head>
<body>
    <div id="instructions">
        Print in Chrome on Avery<sup>&reg;</sup> 5262<sup>&trade;</sup> Address Labels &bull; Under &ldquo;More settings&rdquo; set Margins to &ldquo;None&rdquo; &amp; enable &ldquo;Background graphics&rdquo; &bull; These instructions and the card borders won&lsquo;t print
    &bull;&nbsp;
        <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
        <script>
            (function () {
                var librarySelect = document.querySelector("[name=LibraryID]");
                var opt = document.createElement("option");
                opt.setAttribute("value", "-1");
                if (location.search.indexOf("libraryID=-1") !== -1)
                    opt.setAttribute("selected", "");
                opt.textContent = "None – Print blank cards";
                librarySelect.appendChild(opt);
            })();
        </script>
    </div>
    <div id="insertCards" runat="server"></div>
    <script src="https://cdn.jsdelivr.net/jsbarcode/3.5.9/barcodes/JsBarcode.ean-upc.min.js"></script>
    <script>
        var svgs = document.querySelectorAll("svg[data-barcode]");

        for (var i = 0; i < svgs.length; ++i) {
            var bc = svgs[i].getAttribute("data-barcode");
            JsBarcode(`svg[data-barcode='${bc}']`, bc,
                {
                    width: 1.5,
                    height: 50,
                    fontSize: 15
                });
        }

        setTimeout(() => {
            for (var i = 0; i < svgs.length; ++i) {
                svgs[i].style.transform = "";
            }
        }, 500);
    </script>
</body>
</html>
