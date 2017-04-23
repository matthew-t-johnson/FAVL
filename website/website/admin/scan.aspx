<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="scan.aspx.cs" Inherits="website.admin.scan" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #viewportWrapper {
            padding: 96px;
            background-color: rgba(0, 0, 0, 0.5);
            position: relative;
        }

         #interactive.viewport {
             position: absolute;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
             overflow: hidden;
         }

        #interactive.viewport canvas { display: none; }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Scan Barcode</h1>
    <p>
        <button type="button" id="btnScan">Scan Barcode</button><button type="button" id="btnStopScan" hidden>Stop Scanning</button>
    </p>
    <div id="viewportWrapper" hidden>
        <div id="interactive" class="viewport"></div>
    </div>

    <script src="../Scripts/quagga.min.js"></script>
    <script src="../js/scan-barcode.js"></script>
    <script src="../js/createTestData.js"></script>
</asp:Content>