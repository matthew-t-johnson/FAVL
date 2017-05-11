using System;
using System.Linq;
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
                    foreach (var checkOut in db.CheckOuts.Where(l => l.ReaderID == reader.Id).ToList())
                    {
                        db.CheckOuts.Remove(checkOut);
                    }

                    foreach (var book in db.Books.Where(l => l.CheckedOutTo == reader.Id).ToList())
                    {
                        book.CheckedOutTo = null;
                        book.CheckedOutDate = null;
                    }


                    db.Readers.Remove(reader);
                    db.SaveChanges();
                }
            }
            ;

            Response.Redirect("readers.aspx");
        }
    }
}