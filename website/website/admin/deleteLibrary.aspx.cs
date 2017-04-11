using System;
using System.Web.UI;

namespace website.admin
{
    public partial class deleteLibrary : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("libraries.aspx");
                return;
            }

            var libraryId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var library = db.Libraries.Find(libraryId);

                if (library != null)
                {
                    db.Libraries.Remove(library);
                    db.SaveChanges();
                }
            }
            ;

            Response.Redirect("libraries.aspx");
        }
    }
}