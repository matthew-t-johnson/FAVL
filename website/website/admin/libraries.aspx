<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="libraries.aspx.cs" Inherits="website.admin.libraries" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function deleteLibrary(id, name) {
            if (window.confirm("Are you sure you want to delete " + name + "?")) {
                location.href = "deleteLibrary.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Libraries</h1>
    <ul id="insertList" class="listAsTable" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addLibrary.aspx'">Add Library</button>
    </p>
</asp:Content>
