<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="addBook.aspx.cs" ClientIDMode="Static" Inherits="website.admin.addBook" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Add Book</h1>
    <form id="dbForm" class="dbForm" runat="server">
        <p>
            <input type="text" placeholder="Title" name="Title" required/>
        </p>
        <p>
            <input type="text" placeholder="Author First" name="AuthorFirst" required/>
        </p>
        <p>
            <input type="text" placeholder="Author Middle" name="AuthorMiddle"/>
        </p>
        <p>
            <input type="text" placeholder="Author Last" name="AuthorLast" required/>
        </p>
        <p>
            <uc1:librarySelect runat="server" id="librarySelect"/>
        </p>
        <p>
            <input type="text" placeholder="Barcode" name="Barcode" required pattern="^\d{13}$" title="13-digit EAN_13 Barcode Number"/>
        </p>
        <p>
            <button type="submit" class="addNewButton"><i class="fa fa-plus" aria-hidden="true"></i> Add Book</button>
        </p>
    </form>
</asp:Content>