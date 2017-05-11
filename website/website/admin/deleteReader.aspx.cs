using System;
using System.Web.UI;

namespace website.admin
{
    public partial class deleteReader : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("readers.aspx");
                return;
            }

            var readerId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var reader = db.Readers.Find(readerId);

                if (reader != null)
                {
                    db.Readers.Remove(reader);
                    db.SaveChanges();
                }
            }
            ;

            Response.Redirect("readers.aspx");
        }
    }
}