<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="activeReaders.aspx.cs" Inherits="website.admin.activeReaders" %>

<%@ Register Src="~/admin/allOrOneLibrary.ascx" TagPrefix="uc1" TagName="allOrOneLibrary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Active Readers</h1>
    <uc1:allOrOneLibrary runat="server" ID="allOrOneLibrary" />
    <div class="tableWrapper">
        <table class="activeReadersTable">
            <thead>
            <tr>
                <th>Name</th>
                <th>Library</th>
                <th>Barcode</th>
                <th class="lastTH">Total Checkouts</th>
            </tr>
            </thead>
            <tbody id="activeReadersBody" runat="server">
            </tbody>
        </table>
    </div>

</asp:Content>
