<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="addLibrarian.aspx.cs" Inherits="website.admin.addLibrarian" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Add Librarian</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p><input type="text" placeholder="First Name" name="FirstName" required /></p>
        <p><input type="text" placeholder="Last Name" name="LastName" required /></p>
        <p><input type="text" placeholder="Username" name="Username" required /></p>
        <p><input type="password" placeholder="Password" name="PassWord" required /></p>
        <p><input type="password" placeholder="Confirm Password" name="PassWord2" required /></p>
        <p id="passwordError" runat="server" visible="false">Passwords must match</p>
        <p><label><input type="checkbox" name="IsAdmin" /> Check box for administrator</label></p>

        <p><input type="submit" value="Submit"/></p>
    </form>

</asp:Content>
