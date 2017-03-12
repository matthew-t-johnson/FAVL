<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="librarians.aspx.cs" Inherits="website.admin.librarians" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Librarians</h1>
    <ul id="insertList" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addLibrarian.aspx'">Add Librarians</button>
    </p>

</asp:Content>
