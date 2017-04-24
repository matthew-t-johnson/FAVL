define(["require", "exports", "./sections", "../lib/view"], function (require, exports, Sections, view) {
    "use strict";
    function mainInit() {
        initClick();
        Sections.init();
    }
    exports.mainInit = mainInit;
    function viewSection(id) {
        view("#" + id);
    }
    exports.viewSection = viewSection;
    function initClick() {
        document.getElementById("signInButton").addEventListener("click", function () {
            viewSection("signIn");
        });
        var imgs = document.querySelectorAll(".headerLogoWrapper img, .successButton");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener("click", function () { viewSection("hub"); });
        }
        document.getElementById("addUserButton").addEventListener("click", function () {
            viewSection("addUser");
        });
        document.getElementById("editUserButton").addEventListener("click", function () {
            viewSection("readers");
        });
        document.getElementById("returnButton").addEventListener("click", function () {
            viewSection("returnBook");
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
        document.getElementById("checkOutAgainButton").addEventListener("click", function () {
            viewSection("checkOut");
        });
        document.getElementById("addUserAgainButton").addEventListener("click", function () {
            viewSection("addUser");
        });
        document.getElementById("returnAgainButton").addEventListener("click", function () {
            viewSection("returnBook");
        });
    }
});
//# sourceMappingURL=main.js.map