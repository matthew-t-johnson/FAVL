<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="books.aspx.cs" Inherits="website.admin.books" %>

<%@ Register Src="~/admin/allOrOneLibrary.ascx" TagPrefix="uc1" TagName="allOrOneLibrary" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function deleteBook(id, title) {
            if (window.confirm("Are you sure you want to delete " + title + "?")) {
                location.href = "deleteBook.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Books        
        <button type="button" class="addNewButton" onclick="location.href = 'addBook.aspx'"><i class="fa fa-plus" aria-hidden="true"></i> Add Book</button>
    </h1>
    <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
    <ul id="insertList" class="bookList listAsTable" runat="server"></ul>

    <script>
        var style = window.getComputedStyle(document.querySelector(".contentWrapper ul"));
        console.log(style);
        document.querySelector(".contentWrapper h1").style.width = style.width;
    </script>
</asp:Content>
