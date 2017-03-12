define(["require", "exports", "./addUser"], function (require, exports, AddUser) {
    "use strict";
    function mainInit() {
        initClick();
        AddUser.addUserInit();
    }
    exports.mainInit = mainInit;
    function initClick() {
        document.getElementById("signInButton").addEventListener("click", function () {
            document.getElementById('index').setAttribute('hidden', '');
            document.getElementById('hub').removeAttribute('hidden');
            document.getElementById('headerLogoWrapper').removeAttribute('hidden');
        });
        document.getElementById("scanLogoHeader").addEventListener("click", function () {
            document.getElementById('index').setAttribute('hidden', '');
            document.getElementById('addUser').setAttribute('hidden', '');
            document.getElementById('editUser').setAttribute('hidden', '');
            document.getElementById('hub').removeAttribute('hidden');
            document.getElementById('headerLogoWrapper').removeAttribute('hidden');
        });
        document.getElementById("addUserButton").addEventListener("click", function () {
            document.getElementById('hub').setAttribute('hidden', '');
            document.getElementById('addUser').removeAttribute('hidden');
            document.getElementById('headerLogoWrapper').removeAttribute('hidden');
        });
        document.getElementById("editUserButton").addEventListener("click", function () {
            document.getElementById('hub').setAttribute('hidden', '');
            document.getElementById('editUser').removeAttribute('hidden');
            document.getElementById('headerLogoWrapper').removeAttribute('hidden');
        });
    }
});
//# sourceMappingURL=main.js.map