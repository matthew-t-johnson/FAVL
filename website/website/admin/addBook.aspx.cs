using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class addBook : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                addLibraries();

                return;
            }
            using (var db = new favlEntities())
            {
                var barcode = Request.Form["Barcode"].Trim();
                db.Books.Add(new Book
                {
                    Title = Request.Form["Title"].Trim(),
                    AuthorFirst = Request.Form["AuthorFirst"].Trim(),
                    AuthorMiddle = Request.Form["AuthorMiddle"].Trim(),
                    AuthorLast = Request.Form["AuthorLast"].Trim(),
                    Barcode = string.IsNullOrEmpty(barcode) ? null : barcode,
                    LibraryID = int.Parse(Request.Form["LibraryID"])
                });

                db.SaveChanges();
            }

            Response.Redirect("books.aspx");
        }

        private void addLibraries()
        {
            using (var db = new favlEntities())
            {
                librarySelectOptions.Controls.Add(new HtmlGenericControl("option") {InnerText = "Choose Library"});

                foreach (var library in db.Libraries)
                {
                    var option = new HtmlGenericControl("option");
                    option.Attributes.Add("value", library.Id.ToString());
                    option.InnerText = library.Name;
                    librarySelectOptions.Controls.Add(option);
                }
            }
        }
    }
}