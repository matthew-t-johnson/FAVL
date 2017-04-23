define(["require", "exports", "./addUser", "../lib/view"], function (require, exports, AddUser, view) {
    "use strict";
    function mainInit() {
        initClick();
        AddUser.addUserInit();
    }
    exports.mainInit = mainInit;
    function viewSection(id) {
        view("#" + id);
        if (id !== "index" && id !== "signIn" && id !== "checkOutSuccess" && id !== "returnSuccess" /* && id !== "hub" && id !== "inventory" && id !== "overDue" && id !== "readers"*/)
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
            viewSection("readers");
        });
        document.getElementById("returnButton").addEventListener("click", function () {
            viewSection("returnBook");
        });
        document.getElementById("goToHubButton").addEventListener("click", function () {
            viewSection("hub");
        });
        document.getElementById("inventoryButton").addEventListener("click", function () {
            viewSection("inventory");
        });
        document.getElementById("checkOutButton").addEventListener("click", function () {
            viewSection("checkOut");
        });
        document.getElementById("overdueButton").addEventListener("click", function () {
            viewSection("overDue");
        });
        document.getElementById("againButton").addEventListener("click", function () {
            viewSection("checkOut");
        });
        document.getElementById("successButton").addEventListener("click", function () {
            viewSection("hub");
        });
    }
});
//# sourceMappingURL=main.js.map