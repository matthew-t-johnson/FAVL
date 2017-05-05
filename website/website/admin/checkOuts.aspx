<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="checkOuts.aspx.cs" Inherits="website.admin.checkOuts" %>

<%@ Register Src="~/admin/allOrOneLibrary.ascx" TagPrefix="uc1" TagName="allOrOneLibrary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Checkouts by Day</h1>
    <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
    <div id="insertCheckOutChart" runat="server"></div>
    <h2 id="libraryKeyTitle" class="libraryKey" runat="server">Library Key</h2>
    <div id="insertKey" runat="server"></div>
</asp:Content>
