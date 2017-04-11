using System;
using System.Web.UI;

namespace website.admin
{
    public partial class deleteLibrarian : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("librarians.aspx");
                return;
            }

            var librarianId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var librarian = db.Librarians.Find(librarianId);

                if (librarian != null)
                {
                    db.Librarians.Remove(librarian);
                    db.SaveChanges();
                }
            }
            ;

            Response.Redirect("librarians.aspx");
        }
    }
}