<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="user.aspx.cs" Inherits="website.admin.user" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Admin Information</h1>
    <div>
        <form id="dbForm" class="dbForm adminInfo" runat="server">
            <p>First Name: <span id="adminFirst" runat="server"></span></p>
            <p>Last Name: <span id="adminLast" runat="server"></span></p>
            <p>Username: <span id="adminUsername" runat="server"></span></p>
            <button type="submit" class="addNewButton" id="signOutButton">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Sign Out

            </button>
        </form>
    </div>
</asp:Content>
