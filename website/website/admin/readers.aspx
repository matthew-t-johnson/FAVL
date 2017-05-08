<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="readers.aspx.cs" Inherits="website.admin.readers" %>

<%@ Register Src="~/admin/allOrOneLibrary.ascx" TagPrefix="uc1" TagName="allOrOneLibrary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function deleteReader(id, readerName) {
            if (window.confirm("Are you sure you want to delete " + readerName + "?")) {
                location.href = "deleteReader.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Readers        
        <button type="button" class="addNewButton" onclick="location.href = 'addReader.aspx'"><i class="fa fa-plus" aria-hidden="true"></i> Add Reader</button>
    </h1>
    <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
    <ul id="insertList" class="readerList listAsTable" runat="server"></ul>
    
    <script>
        var style = window.getComputedStyle(document.querySelector(".contentWrapper ul"));
        console.log(style);
        document.querySelector(".contentWrapper h1").style.width = style.width;
    </script>
</asp:Content>
