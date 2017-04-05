using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class deleteReader : System.Web.UI.Page
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
            };

            Response.Redirect("readers.aspx");

        }
    }
}