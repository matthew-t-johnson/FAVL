<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="editReader.aspx.cs" Inherits="website.admin.editReader" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Edit Reader</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p><input type="text" placeholder="First" name="ReaderFirst" required /></p>
        <p><input type="text" placeholder="Middle" name="ReaderMiddle" /></p>
        <p><input type="text" placeholder="Last" name="ReaderLast" required /></p>
        <p>
            <uc1:librarySelect runat="server" ID="librarySelect" />
        </p>
        <p><input type="text" placeholder="Barcode" name="Barcode" required pattern="^\d{7}$" title="7-digit CODE_128 Barcode Number" /></p>
        <p><input type="submit" value="Save Changes"/>&emsp;<input type="button" value="Cancel" onclick="location.href='readers.aspx'" /></p>
    </form>
    <asp:PlaceHolder ID="insertReader" runat="server"></asp:PlaceHolder>
    <script>
        document.querySelector("input[name='ReaderFirst']").value = reader.FirstName;
        document.querySelector("input[name='ReaderMiddle']").value = reader.MiddleName;
        document.querySelector("input[name='ReaderLast']").value = reader.LastName;
        document.querySelector("input[name='Barcode']").value = reader.Barcode;
        var libraryOption = document.querySelector("option[value='" + reader.LibraryID + "']");

        if (libraryOption)
            libraryOption.selected = true;

    </script>

</asp:Content>
