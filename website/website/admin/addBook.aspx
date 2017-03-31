<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="addBook.aspx.cs" ClientIDMode="Static" Inherits="website.admin.addBook" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Add Book</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p><input type="text" placeholder="Title" name="Title" required /></p>
        <p><input type="text" placeholder="Author First" name="AuthorFirst" required /></p>
        <p><input type="text" placeholder="Author Middle" name="AuthorMiddle" /></p>
        <p><input type="text" placeholder="Author Last" name="AuthorLast" required /></p>
        <p><input type="text" placeholder="Barcode" name ="Barcode" /></p>
        <p>
            <select name="LibraryID" required>
                <asp:PlaceHolder runat="server" id="librarySelectOptions"></asp:PlaceHolder>
            </select>
        </p>
        <p><input type="submit" value="Submit"/></p>
    </form>

</asp:Content>
