<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="readers.aspx.cs" Inherits="website.admin.readers" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Readers</h1>
    <ul id="insertList" class="readerList" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addReader.aspx'">Add Reader</button>
    </p>

</asp:Content>
