import AddUser = require('./addUser');

export function mainInit(): void {
    initClick();
    AddUser.addUserInit();
}

function initClick(): void {
    document.getElementById("signInButton").addEventListener("click", () => {
        document.getElementById('index').setAttribute('hidden', '');
        document.getElementById('hub').removeAttribute('hidden');
        document.getElementById('headerLogoWrapper').removeAttribute('hidden');
    });

    document.getElementById("scanLogoHeader").addEventListener("click", () => {
        document.getElementById('index').setAttribute('hidden', '');
        document.getElementById('addUser').setAttribute('hidden', '');
        document.getElementById('editUser').setAttribute('hidden', '');
        document.getElementById('hub').removeAttribute('hidden');
        document.getElementById('headerLogoWrapper').removeAttribute('hidden');
    });

    document.getElementById("addUserButton").addEventListener("click", () => {
        document.getElementById('hub').setAttribute('hidden', '');
        document.getElementById('addUser').removeAttribute('hidden');
        document.getElementById('headerLogoWrapper').removeAttribute('hidden');
    });

    document.getElementById("editUserButton").addEventListener("click", () => {
        document.getElementById('hub').setAttribute('hidden', '');
        document.getElementById('editUser').removeAttribute('hidden');
        document.getElementById('headerLogoWrapper').removeAttribute('hidden');
    });
}