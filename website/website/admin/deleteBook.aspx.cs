using System;
using System.Linq;
using System.Web.UI;

namespace website.admin
{
    public partial class deleteBook : Page
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
                    foreach (var checkOut in db.CheckOuts.Where(l => l.BookID == book.Id).ToList())
                    {
                        db.CheckOuts.Remove(checkOut);
                    }


                    db.Books.Remove(book);
                    db.SaveChanges();
                }
            }
            ;

            Response.Redirect("books.aspx");
        }
    }
}