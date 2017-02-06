document.getElementById("signInButton").addEventListener("click", () => {
    document.getElementById('index').setAttribute('hidden', '');
    document.getElementById('hub').removeAttribute('hidden');
    document.getElementById('headerLogoWrapper').removeAttribute('hidden');
});

document.getElementById("addUserButton").addEventListener("click", () => {
    document.getElementById('hub').setAttribute('hidden', '');
    document.getElementById('addUser').removeAttribute('hidden');
    document.getElementById('headerLogoWrapper').removeAttribute('hidden');
});