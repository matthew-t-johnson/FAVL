<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="allOrOneLibrary.ascx.cs" Inherits="website.admin.allOrOneLibrary" %>

<%@ Register Src="~/admin/librarySelect.ascx" TagPrefix="uc1" TagName="librarySelect" %>

<div class="librarySelector">
    <p>Library: <uc1:librarySelect runat="server" ID="librarySelect" /></p>
    <script>
        (function() {
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
        })();
    </script>
</div>
