using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class user : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                var adminCookie = new HttpCookie("Admin")
                {
                    ["ID"] = string.Empty,
                    Expires = DateTime.Now.AddDays(-1)
                };

                Response.Cookies.Add(adminCookie);
                Response.Redirect("/");
                return;
            }

            var admin = PW.GetAdminFromCookie(Request.Cookies["Admin"]?["ID"]);

            adminFirst.InnerText = admin.FirstName;
            adminLast.InnerText = admin.LastName;
            adminUsername.InnerText = admin.Username;
        }
    }
}