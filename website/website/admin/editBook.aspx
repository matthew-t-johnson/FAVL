<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="editBook.aspx.cs" Inherits="website.admin.editBook" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Edit Book</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p>
            <input type="text" placeholder="Title" name="Title" required/>
        </p>
        <p>
            <input type="text" placeholder="Author First" name="AuthorFirst" required/>
        </p>
        <p>
            <input type="text" placeholder="Author Middle" name="AuthorMiddle"/>
        </p>
        <p>
            <input type="text" placeholder="Author Last" name="AuthorLast" required/>
        </p>
        <p>
            <uc1:librarySelect runat="server" ID="librarySelect"/>
        </p>
        <p>
            <input type="text" placeholder="Barcode" name="Barcode" required pattern="^\d{13}$" title="13-digit EAN_13 Barcode Number"/>
        </p>
        <p><input type="submit" value="Save Changes"/>&emsp;<input type="button" value="Cancel" onclick="location.href = 'books.aspx'"/>
        </p>
    </form>
    <asp:PlaceHolder ID="insertBook" runat="server"></asp:PlaceHolder>
    <script>
        /*
            Id = book.Id,
            Title = book.Title,
            AuthorFirst = book.AuthorFirst,
            AuthorMiddle = book.AuthorMiddle,
            AuthorLast = book.AuthorLast,
            Barcode = book.Barcode
        */
        document.querySelector("input[name='Title']").value = book.Title;
        document.querySelector("input[name='AuthorFirst']").value = book.AuthorFirst;
        document.querySelector("input[name='AuthorMiddle']").value = book.AuthorMiddle;
        document.querySelector("input[name='AuthorLast']").value = book.AuthorLast;
        document.querySelector("input[name='Barcode']").value = book.Barcode;
        var libraryOption = document.querySelector("option[value='" + book.LibraryID + "']");

        if (libraryOption)
            libraryOption.selected = true;

    </script>
</asp:Content>