import AddUser = require("./addUser");
import view = require("../lib/view");

export function mainInit(): void {
    initClick();
    AddUser.addUserInit();
}

export function viewSection(id: string): void {
    view(`#${id}`);

    if (id !== "index" && id !== "signIn" && id !== "checkOutSuccess" && id !== "returnSuccess" && id !== "hub") // maybe take out the hub check later
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
        viewSection("readers");
    });

    document.getElementById("returnButton").addEventListener("click", () => {
        viewSection("returnBook");
    });

    document.getElementById("goToHubButton").addEventListener("click", () => {
        viewSection("hub");
    });

    document.getElementById("inventoryButton").addEventListener("click", () => {
        viewSection("inventory");
    });

    document.getElementById("checkOutButton").addEventListener("click", () => {
        viewSection("checkOut");
    });

    //document.getElementById("overdueButton").addEventListener("click", () => {
    //    viewSection("checkOutSuccess");
    //});

    document.getElementById("againButton").addEventListener("click", () => {
        viewSection("checkOut");
    });

    document.getElementById("successButton").addEventListener("click", () => {
        viewSection("hub");
    });

}