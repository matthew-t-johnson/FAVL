define(["require", "exports", "./addUser", "../lib/view"], function (require, exports, AddUser, view) {
    "use strict";
    function mainInit() {
        initClick();
        AddUser.addUserInit();
    }
    exports.mainInit = mainInit;
    function viewSection(id) {
        view("#" + id);
        if (id !== "index")
            view.show("#headerLogoWrapper");
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
        document.getElementById("returnButton").addEventListener("click", function () {
            viewSection("readers");
        });
        document.getElementById("goToHubButton").addEventListener("click", function () {
            viewSection("hub");
        });
        document.getElementById("inventoryButton").addEventListener("click", function () {
            viewSection("inventory");
        });
    }
});
//# sourceMappingURL=main.js.map