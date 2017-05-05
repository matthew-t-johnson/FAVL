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
    <h1>Librarians        
        <button type="button" onclick="location.href = 'addLibrarian.aspx'">Add Librarian</button>
    </h1>
    <ul id="insertList" class="listAsTable" runat="server"></ul>

    <script>
        var style = window.getComputedStyle(document.querySelector(".contentWrapper ul"));
        console.log(style);
        document.querySelector(".contentWrapper h1").style.width = style.width;
    </script>
</asp:Content>
