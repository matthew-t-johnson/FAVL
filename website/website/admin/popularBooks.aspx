<%@ Page Title="" Language="C#" MasterPageFile="~/admin/Admin.Master" AutoEventWireup="true" CodeBehind="popularBooks.aspx.cs" Inherits="website.admin.popularBooks" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Popular Books</h1>
    <div class="librarySelector">
        <p>Library: <uc1:librarySelect runat="server" ID="librarySelect" /></p>
        <script>
            var librarySelect = document.querySelector("[name=LibraryID]");

            librarySelect.options[0].text = "All Libraries";

            var libraryMatch = window.location.search.match(/libraryID=(\d+)/);

            if (libraryMatch) {
                var id = parseInt(libraryMatch[1]);

                librarySelect.querySelector(`option[value='${id}']`).setAttribute("selected", "");
            }

            function onLibraryChange() {

                if (librarySelect.selectedIndex > 0) {
                    window.location.search = "?libraryID=" + librarySelect.options[librarySelect.selectedIndex].value;
                } else {
                    window.location.search = "";
                }
            }

            librarySelect.addEventListener("change", onLibraryChange);
        </script>
    </div>
    <div class="tableWrapper">
        <table class="popularBooksTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Library</th>
                    <th class="lastTH">Total Checkouts</th>
                </tr>
            </thead>
            <tbody id="popularBooksBody" runat="server">
            </tbody>
        </table>
    </div>
</asp:Content>
