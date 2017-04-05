<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="librarians.aspx.cs" Inherits="website.admin.librarians" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script>
        function deleteLibrarian(id, name) {
            if (window.confirm("Are you sure you want to delete the librarian for the " + name + " library?")) {
                location.href = "deleteLibrarian.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Librarians</h1>
    <ul id="insertList" class="listAsTable" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addLibrarian.aspx'">Add Librarian</button>
    </p>

</asp:Content>
