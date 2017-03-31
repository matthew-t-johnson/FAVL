using System;

namespace website.admin
{
    public partial class addLibrary : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;

            using (var db = new favlEntities())
            {
                db.Libraries.Add(new Library
                {
                    Name = Request.Form["Name"],
                    Village = Request.Form["Village"],
                    Country = Request.Form["Country"]
                });

                db.SaveChanges();
            }

            Response.Redirect("libraries.aspx");

        }
    }
}