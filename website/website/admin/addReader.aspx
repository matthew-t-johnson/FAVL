<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="addReader.aspx.cs" Inherits="website.admin.addReader" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Add Reader</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p><input type="text" placeholder="First" name="ReaderFirst" required /></p>
        <p><input type="text" placeholder="Middle" name="ReaderMiddle" /></p>
        <p><input type="text" placeholder="Last" name="ReaderLast" required /></p>
        <p><input type="text" placeholder="Barcode" name ="Barcode" /></p>
        <p><input type="submit" value="Submit"/></p>
    </form>

</asp:Content>
