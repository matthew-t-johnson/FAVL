using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class deleteLibrarian : System.Web.UI.Page
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
            };

            Response.Redirect("librarians.aspx");
        }
    }
}