<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="editLibrarian.aspx.cs" Inherits="website.admin.editLibrarian" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Edit Librarian</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p>
            <input type="text" placeholder="First Name" name="FirstName" required />
        </p>
        <p>
            <input type="text" placeholder="Last Name" name="LastName" required />
        </p>
        <p>
            <input type="text" placeholder="Username" name="Username" required />
        </p>
        <p>
            <uc1:librarySelect runat="server" ID="librarySelect" />
        </p>
        <p>
            <input type="text" placeholder="Barcode" name="Barcode" required pattern="^\d{7}$" title="7-digit CODE_128 Barcode Number" />
        </p>
        <p>
            <input type="submit" value="Save Changes" />&emsp;<input type="button" value="Cancel" onclick="location.href = 'librarians.aspx'" />
        </p>
    </form>
    <asp:PlaceHolder ID="insertLibrarian" runat="server"></asp:PlaceHolder>
    <script>
        document.querySelector("input[name='Barcode']").value = librarian.Barcode;
        document.querySelector("input[name='FirstName']").value = librarian.FirstName;
        document.querySelector("input[name='LastName']").value = librarian.LastName;
        document.querySelector("input[name='Username']").value = librarian.Username;
        var libraryOption = document.querySelector("option[value='" + librarian.LibraryID + "']");

        if (libraryOption)
            libraryOption.selected = true;
    </script>

</asp:Content>
