<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="books.aspx.cs" Inherits="website.admin.books" %>

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
    <h1>Books</h1>
    <ul id="insertList" class="bookList listAsTable" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addBook.aspx'">Add Book</button>
    </p>

</asp:Content>
