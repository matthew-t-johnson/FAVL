<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="libraries.aspx.cs" Inherits="website.admin.libraries" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function deleteLibrary(id, name) {
            if (window.confirm("Are you sure you want to delete library " + name + "?")) {
                location.href = "deleteLibrary.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Libraries        
        <button type="button" class="addNewButton" onclick="location.href = 'addLibrary.aspx'"><i class="fa fa-plus" aria-hidden="true"></i> Add Library</button>
    </h1>
    <ul id="insertList" class="listAsTable" runat="server"></ul>

    <script>
        var style = window.getComputedStyle(document.querySelector(".contentWrapper ul"));
        console.log(style);
        document.querySelector(".contentWrapper h1").style.width = style.width;
    </script>
</asp:Content>
