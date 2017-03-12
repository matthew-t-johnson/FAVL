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
                db.Books.Add(new Books
                {
                    Title = Request.Form["Title"],
                    Author = Request.Form["Author"],
                    Barcode = Request.Form["Barcode"],
                });

                db.SaveChanges();
            }

            Response.Redirect("books.aspx");
        }

    }
}
