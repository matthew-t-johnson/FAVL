<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="readers.aspx.cs" Inherits="website.admin.readers" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script>
        function deleteReader(id, readerName) {
            if (window.confirm("Are you sure you want to delete " + readerName + "?")) {
                location.href = "deleteReader.aspx?id=" + id;
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Readers</h1>
    <ul id="insertList" class="readerList listAsTable" runat="server"></ul>
    <p>
        <button type="button" onclick="location.href='addReader.aspx'">Add Reader</button>
    </p>

</asp:Content>
