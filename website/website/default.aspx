<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="website._default" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>SCAN</title>
</head>
<body>
    <div class="formWrapper">
        <form id="signInForm" runat="server">
            <div>
                <input type="text" id="signInUsername" name="Username" placeholder="Username" spellcheck="false" required />
                <p id="usernameError" runat="server">Username not found</p>
            </div>
            <div>
                <input type="password" id="signInPassword" name="Password" placeholder="Password" required />
                <p id="passwordError" runat="server">Incorrect Password</p>

            </div>
            <div class="inputs">
                <button class="signInSubmitButton" type="submit">Sign In</button>
            </div>
        </form>
    </div>
</body>
</html>
