<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="libraries.aspx.cs" Inherits="website.admin.libraries" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Libraries</h1>
    <ul id="insertList" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addLibrary.aspx'">Add Library</button>
    </p>
</asp:Content>
