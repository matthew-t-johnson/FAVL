<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="books.aspx.cs" Inherits="website.admin.books" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Books</h1>
    <ul id="insertList" class="bookList" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addBook.aspx'">Add Book</button>
    </p>

</asp:Content>
