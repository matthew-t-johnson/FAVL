<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="website._default" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>SCAN</title>
    <link href="Content/font-awesome.min.css" rel="stylesheet" />
    <link href="css/default.css" rel="stylesheet" />
</head>
<body class="signInBody">
    <div class="bodyWrapper">
        <div class="formWrapper">
            <div class="innerWrapper">
                <div class="signInLogo">
                    <img src="/images/logos/scan_logo_light2.svg"/>
                </div>
                <form id="signInForm" runat="server">
                    <div>
                        <input type="text" id="signInUsername" name="Username" placeholder="Username" spellcheck="false" required />
                        <p id="usernameError" runat="server"><i class="fa fa-exclamation-triangle" aria-hidden="true" visible="false"></i> Username not found</p>
                    </div>
                    <div>
                        <input type="password" id="signInPassword" name="Password" placeholder="Password" required />
                        <p id="passwordError" runat="server"><i class="fa fa-exclamation-triangle" aria-hidden="true" visible="false"></i> Incorrect Password</p>

                    </div>
                    <div class="inputs">
                        <button class="signInSubmitButton" type="submit"><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        <footer style="border-top: 1px solid #333;">
            <div class="container">
                <div class="col-xs-6 footer-left">
                    Friends of African Village Libraries<br />
                    Copyright &copy; 2017<br />
                    All Rights Reserved
                </div>
                <div class="col-xs-6 footer-right">
                    <span class="socicons">
                        <i class="fa fa-facebook-square" aria-hidden="true"></i><i class="fa fa-instagram" aria-hidden="true"></i><i class="fa fa-twitter" aria-hidden="true"></i><i class="fa fa-youtube" aria-hidden="true"></i><i class="fa fa-snapchat-ghost" aria-hidden="true"></i>
                    </span>
                    <br />
                    <a href="#">Site Terms</a> | <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>

    </div>
</body>
</html>
