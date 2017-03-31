﻿import AddUser = require('./addUser');
import view = require('../lib/view');

export function mainInit(): void {
    initClick();
    AddUser.addUserInit();
}

export function viewSection(id: string): void {
    view(`#${id}`);

    if (id !== "index")
        view.show("#headerLogoWrapper");
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

    document.getElementById("returnButton").addEventListener("click", () => {
        viewSection("readers");
    });

    document.getElementById("goToHubButton").addEventListener("click", () => {
        viewSection("hub");
    });

    document.getElementById("inventoryButton").addEventListener("click", () => {
        viewSection("inventory");
    });
}