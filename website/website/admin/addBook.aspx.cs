using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class addBook : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;
            
            using (var db = new favlEntities())
            {
                db.Books.Add(new Book
                {
                    Title = Request.Form["Title"],
                    AuthorFirst = Request.Form["AuthorFirst"],
                    AuthorMiddle = Request.Form["AuthorMiddle"],
                    AuthorLast = Request.Form["AuthorLast"],
                    Barcode = Request.Form["Barcode"],
                });

                db.SaveChanges();
            }

            Response.Redirect("books.aspx");
        }

    }
}
