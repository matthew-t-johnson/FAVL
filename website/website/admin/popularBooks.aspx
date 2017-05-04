<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="popularBooks.aspx.cs" Inherits="website.admin.popularBooks" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Popular Books</h1>
    <div class="tableWrapper">
        <table class="popularBooksTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Library</th>
                    <th>Total Checkouts</th>
                </tr>
            </thead>
            <tbody id="popularBooksBody" runat="server">
            </tbody>
        </table>
    </div>
</asp:Content>
