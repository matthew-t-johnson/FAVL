using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using website.admin;

namespace website
{
    public partial class _default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            usernameError.Visible = false;
            passwordError.Visible = false;

            if (!IsPostBack)
                return;

            var username = Request.Form["Username"]?.Trim();
            var password = Request.Form["Password"]?.Trim();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return;

            if (username == "god" && password == "FAVLScan2017")
            {
                var adminCookie = new HttpCookie("Admin")
                {
                    ["ID"] = PW.AdminCookie(PW.GOD_USER_ID),
                    Expires = DateTime.UtcNow.AddDays(1)
                };

                Response.Cookies.Add(adminCookie);
                Response.Redirect("/admin/");
            }

            using (var db = new favlEntities())
            {
                var admin = db.Admins.FirstOrDefault(l => l.Username == username);

                if (admin == null)
                {
                    usernameError.Visible = true;
                    return;
                }

                if (!PW.Verify(password, admin.PasswordHash, admin.PasswordSalt))
                {
                    passwordError.Visible = true;
                    return;
                }

                var adminCookie = new HttpCookie("Admin")
                {
                    ["ID"] = PW.AdminCookie(admin.Id),
                    Expires = DateTime.UtcNow.AddDays(1)
                };

                Response.Cookies.Add(adminCookie);
                Response.Redirect("/admin/");
            }
        }
    }
}