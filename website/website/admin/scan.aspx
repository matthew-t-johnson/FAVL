<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="scan.aspx.cs" Inherits="website.admin.scan" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #interactive.viewport {
            height: 160px;
            overflow: hidden;
            width: 320px;
        }

        #interactive.viewport video { }

        #interactive.viewport canvas { display: none; }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Scan Barcode</h1>
    <p>
        <button type="button" id="btnScan">Scan Barcode</button><button type="button" id="btnStopScan" hidden>Stop Scanning</button>
    </p>
    <div id="interactive" class="viewport" hidden></div>

    <script src="../Scripts/quagga.min.js"></script>
    <script src="../js/scan-barcode.js"></script>
</asp:Content>