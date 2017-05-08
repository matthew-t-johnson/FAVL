using System;
using System.Web.UI;

namespace website.admin
{
    public partial class addLibrarian : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;

            if (Request.Form["Password"] != Request.Form["Password2"])
            {
                passwordError.Visible = true;
                return;
            }

            passwordError.Visible = false;

            using (var db = new favlEntities())
            {
                string hash, salt;
                PW.Encrypt(Request.Form["Password"], out hash, out salt);
                var barcode = Request.Form["Barcode"].Trim();

                var librarian = new Librarian
                {
                    FirstName = Request.Form["FirstName"].Trim(),
                    LastName = Request.Form["LastName"].Trim(),
                    Username = Request.Form["Username"].Trim(),
                    IsAdmin = false,
                    PasswordHash = hash,
                    PasswordSalt = salt,


                    Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (CODE_128)",
                    LibraryID = int.Parse(Request.Form["LibraryID"])
                };

                db.Librarians.Add(librarian);
                db.SaveChanges();
            }

            Response.Redirect("librarians.aspx");
        }
    }
}