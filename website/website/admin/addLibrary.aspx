<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="addLibrary.aspx.cs" Inherits="website.admin.addLibrary" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Add Library</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p>
            <input type="text" placeholder="Library Name" name="Name" required/>
        </p>
        <p>
            <input type="text" placeholder="Village" name="Village" required/>
        </p>
        <p>
            <input type="text" placeholder="Country" name="Country" required/>
        </p>
        <p>
            <button type="submit" class="addNewButton"><i class="fa fa-plus" aria-hidden="true"></i> Add Library</button>
        </p>
    </form>
</asp:Content>