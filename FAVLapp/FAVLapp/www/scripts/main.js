define(["require", "exports", "./addUser"], function (require, exports, AddUser) {
    "use strict";
    function mainInit() {
        initClick();
        AddUser.addUserInit();
    }
    exports.mainInit = mainInit;
    function viewSection(id) {
        var sections = document.querySelectorAll("#mainbody > section");
        for (var i = 0; i < sections.length; i++) {
            sections[i].setAttribute("hidden", "");
        }
        document.getElementById(id).removeAttribute("hidden");
        if (id !== "index") {
            document.getElementById('headerLogoWrapper').removeAttribute('hidden');
        }
    }
    exports.viewSection = viewSection;
    function initClick() {
        document.getElementById("signInButton").addEventListener("click", function () {
            viewSection("signIn");
        });
        document.getElementById("scanLogoHeader").addEventListener("click", function () {
            viewSection("hub");
        });
        document.getElementById("addUserButton").addEventListener("click", function () {
            viewSection("addUser");
        });
        document.getElementById("editUserButton").addEventListener("click", function () {
            viewSection("editUser");
        });
    }
});
//# sourceMappingURL=main.js.map