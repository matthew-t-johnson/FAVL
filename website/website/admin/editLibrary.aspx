<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="editLibrary.aspx.cs" Inherits="website.admin.editLibrary" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Edit Library</h1>
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
            <input type="submit" value="Submit"/>
        </p>
    </form>
    <asp:PlaceHolder ID="insertLibrary" runat="server"></asp:PlaceHolder>
    <script>
        document.querySelector("input[name='Name']").value = library.Name;
        document.querySelector("input[name='Village']").value = library.Village;
        document.querySelector("input[name='Country']").value = library.Country;
    </script>

</asp:Content>