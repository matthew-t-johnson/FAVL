import Sections = require("./sections");
import view = require("../lib/view");

export function mainInit(): void {
    initClick();
    Sections.init();
}

export function viewSection(id: string): void {
    var newPanel = document.querySelector(`#${id}`) as HTMLElement;
    var currentPanel = document.querySelector("section:not([hidden])") as HTMLElement;

    var suffix = "";

    if (newPanel.id === "hub") {
        suffix = "hub";
    }

    newPanel.classList.add(`incoming${suffix}`);

    setTimeout(() => {
        newPanel.classList.remove(`incoming${suffix}`);
        newPanel.classList.add(`current${suffix}`);
        currentPanel.classList.add(`outgoing${suffix}`);

        setTimeout(() => {
            view(`#${id}`);
            newPanel.classList.remove(`current${suffix}`);
            currentPanel.classList.remove(`outgoing${suffix}`);
        }, 200);
    }, 0);
}

function initClick(): void {
    document.getElementById("signInButton").addEventListener("click", () => {
        viewSection("signIn");
    });

    document.getElementById("signInCancelButton").addEventListener("click", () => {
        viewSection("index");
    });


    const imgs = document.querySelectorAll(".headerLogoWrapper .logoIcon, .successButton");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", () => { viewSection("hub"); });
    }

    document.getElementById("addUserButton").addEventListener("click", () => {
        viewSection("addUser");
    });

    document.getElementById("editUserButton").addEventListener("click", () => {
        viewSection("readers");
    });

    document.getElementById("returnButton").addEventListener("click", () => {
        viewSection("returnBook");
    });

    document.getElementById("inventoryButton").addEventListener("click", () => {
        viewSection("inventory");
    });

    document.getElementById("checkOutButton").addEventListener("click", () => {
        viewSection("checkOut");
    });

    document.getElementById("overdueButton").addEventListener("click", () => {
        viewSection("overDue");
    });

    document.getElementById("checkOutAgainButton").addEventListener("click", () => {
        viewSection("checkOut");
    });

    document.getElementById("addUserAgainButton").addEventListener("click", () => {
        viewSection("addUser");
    });

    document.getElementById("returnAgainButton").addEventListener("click", () => {
        viewSection("returnBook");
    });

    document.getElementById("editUserAgainButton").addEventListener("click", () => {
        viewSection("readers");
    });

    document.getElementById("addUserCancelButton").addEventListener("click", () => {
        viewSection("hub");
    });

    document.getElementById("editUserCancelButton").addEventListener("click", () => {
        viewSection("hub");
    });

    const userIcons = document.querySelectorAll(".headerLogoWrapper .fa-user-circle");
    for (let i = 0; i < userIcons.length; i++) {
        userIcons[i].addEventListener("click", () => { viewSection("userDetails"); });
    }



}