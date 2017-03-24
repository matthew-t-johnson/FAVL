import AddUser = require('./addUser');

export function mainInit(): void {
    initClick();
    AddUser.addUserInit();
}

export function viewSection(id: string): void {
    var sections = document.querySelectorAll("#mainbody > section");

    for (var i = 0; i < sections.length; i++) {
        sections[i].setAttribute("hidden", "");
    }

    document.getElementById(id).removeAttribute("hidden");

    if (id !== "index")
    {
        document.getElementById('headerLogoWrapper').removeAttribute('hidden');
    }

}

function initClick(): void {
    document.getElementById("signInButton").addEventListener("click", () => {
        viewSection("signIn");
    });

    document.getElementById("scanLogoHeader").addEventListener("click", () => {
        viewSection("hub");
    });

    document.getElementById("addUserButton").addEventListener("click", () => {
        viewSection("addUser");
    });

    document.getElementById("editUserButton").addEventListener("click", () => {
        viewSection("editUser");
    });
}