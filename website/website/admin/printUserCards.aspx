<%@ Page Title="" Language="C#" AutoEventWireup="true" CodeBehind="printUserCards.aspx.cs" Inherits="website.admin.printUserCards" ClientIDMode="Static" %>

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
            background-image: url(/images/logos/scan_header_logo.svg);
            background-repeat: no-repeat;
            background-size: 120px 40px;
            background-position: left 13px top 15px;
            width: 3.5in;
            height: 2in;
            box-sizing: border-box;
            border: 1px solid red;
        }

        table {
            border-spacing: 0;
            border: 0;
            border-collapse: collapse;
            position: absolute;
            left: 20px;
            top: 50px;
            width: 1.5in;
        }

        td {
            text-align: left;
            vertical-align: middle;
            height: calc(2in - 50px);
            padding: 0;
        }

        h1, h2, h3 {
            text-align: left;
            padding: 0;
            margin: 0;
            line-height: 1;
        }

        h1 {
            font-size: 20pt;
        }

        h1, h2 {
            padding-bottom: 4px;
            margin-bottom: 4px;
        }

        h3 {
            text-transform: uppercase;
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
            padding-top: 10px;
            top: -156px;
            right: 0;
            background-color: white;
            transform-origin: right bottom;
            transform: rotate(-90deg) scale(0.95);
        }

        .barcode svg {
            transform-origin: center center;
            transform: scale(0.90);
        }

        .whitestripe1, .whitestripe2 {
            position: absolute;
            top: 0;
            width: 149px;
            height: 10.5in;
            background-color: white;
            transform: translateX(-100%);
        }

        .whitestripe1 {
            left: 4in;
        }

        .whitestripe2 {
            left: 8in;
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
<div class="whitestripe1"></div>
<div class="whitestripe2"></div>
<div id="instructions">
    Print in Chrome on Avery<sup>&reg;</sup> 8869<sup>&trade;</sup> &bull; Under &ldquo;More settings&rdquo; set Margins to &ldquo;None&rdquo; &amp; enable &ldquo;Background graphics&rdquo; &bull; These instructions and the card borders won&lsquo;t print
    &bull;&nbsp; <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
    &nbsp;&bull;&nbsp; <p>Role: <label><input type="radio" value="reader" name="role" checked />Reader</label>&ensp;<label><input type="radio" value="librarian" name="role" />Librarian</label></p>
    <script>
        var roleMatch = window.location.search.match(/[?&]role=(reader|librarian)\b/);
        if (roleMatch !== null) {
            document.querySelector("input[type=radio][value='" + roleMatch[1] + "']").checked = true;
        }

        function changeRole(ev)
        {
            var role = ev.target.value;

            if (/([?&]role=)(reader|librarian)\b/.test(location.search)) {
                location.search = location.search.replace(/([?&]role=)(reader|librarian)\b/, "$1" + role);            } else if (location.search.length <= 1) {
                location.search = "?role=" + role;
            } else {
                location.search += "&role=" + role;
            }
        }

        document.querySelector("input[type=radio][value=reader]").addEventListener("click", changeRole);
        document.querySelector("input[type=radio][value=librarian]").addEventListener("click", changeRole);
    </script>
</div>
<div id="insertCards" runat="server"></div>
<script src="https://cdn.jsdelivr.net/jsbarcode/3.5.9/barcodes/JsBarcode.code128.min.js"></script>
<script>
    var svgs = document.querySelectorAll("svg[data-barcode]");

    for (var i = 0; i < svgs.length; ++i) {
        var bc = svgs[i].getAttribute("data-barcode");
        JsBarcode(`svg[data-barcode='${bc}']`, bc);
    }

    setTimeout(() => {
        for (var i = 0; i < svgs.length; ++i) {
            svgs[i].style.transform = "";
        }
    }, 500);
</script>
</body>
</html>
