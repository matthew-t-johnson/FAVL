using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class deleteBook : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("books.aspx");
                return;
            }

            var bookId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookId);

                if (book != null)
                {
                    db.Books.Remove(book);
                    db.SaveChanges();
                }
            };

            Response.Redirect("books.aspx");
        }
    }
}