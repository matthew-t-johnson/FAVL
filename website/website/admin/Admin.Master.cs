using System;
using System.Web.UI;

namespace website.admin
{
    public partial class Admin : MasterPage
    {
        public bool IsGod => PW.AdminIsGod(Request.Cookies["Admin"]?["ID"]);

        protected void Page_Init(object sender, EventArgs e)
        {
            var adminCookie = Request.Cookies["Admin"]?["ID"];

            if (string.IsNullOrEmpty(adminCookie) || !PW.VerifyAdminCookie(adminCookie))
                Response.Redirect("/");
        }
    }
}