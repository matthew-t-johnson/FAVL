<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="checkOuts.aspx.cs" Inherits="website.admin.checkOuts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Checkouts by Day</h1>
    <div id="insertCheckOutChart" runat="server"></div>
    <h2 class="libraryKey">Library Key</h2>
    <div id="insertKey" runat="server"></div>
</asp:Content>
