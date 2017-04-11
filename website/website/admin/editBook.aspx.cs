using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using Newtonsoft.Json;

namespace website.admin
{
    public partial class editBook : Page
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
                    if (IsPostBack)
                    {
                        var barcode = Request.Form["Barcode"].Trim();

                        book.Title = Request.Form["Title"].Trim();
                        book.AuthorFirst = Request.Form["AuthorFirst"].Trim();
                        book.AuthorMiddle = Request.Form["AuthorMiddle"].Trim();
                        book.AuthorLast = Request.Form["AuthorLast"].Trim();
                        book.Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (EAN_13)";
                        book.LibraryID = int.Parse(Request.Form["LibraryID"]);

                        db.SaveChanges();
                        Response.Redirect("books.aspx");
                        return;
                    }

                    var originalBarcode = book.Barcode;

                    if (!string.IsNullOrEmpty(originalBarcode) && originalBarcode.Length > 13)
                        originalBarcode = originalBarcode.Substring(0, 13);

                    var s = new HtmlGenericControl("script")
                    {
                        InnerHtml = "var book = " + JsonConvert.SerializeObject(
                                        new Book
                                        {
                                            Id = book.Id,
                                            Title = book.Title,
                                            AuthorFirst = book.AuthorFirst,
                                            AuthorMiddle = book.AuthorMiddle,
                                            AuthorLast = book.AuthorLast,
                                            Barcode = originalBarcode ?? string.Empty,
                                            LibraryID = book.LibraryID
                                        })
                    };

                    insertBook.Controls.Add(s);
                }
            }
            ;
        }
    }
}