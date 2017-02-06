document.getElementById("signInButton").addEventListener("click", function () {
    document.getElementById('index').setAttribute('hidden', '');
    document.getElementById('hub').removeAttribute('hidden');
    document.getElementById('headerLogoWrapper').removeAttribute('hidden');
});
document.getElementById("addUserButton").addEventListener("click", function () {
    document.getElementById('hub').setAttribute('hidden', '');
    document.getElementById('addUser').removeAttribute('hidden');
    document.getElementById('headerLogoWrapper').removeAttribute('hidden');
});
//# sourceMappingURL=main.js.map