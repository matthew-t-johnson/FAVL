<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="librarySelect.ascx.cs" Inherits="website.admin.librarySelect" %>
<select name="LibraryID" required>
    <asp:PlaceHolder runat="server" ID="librarySelectOptions"></asp:PlaceHolder>
</select>