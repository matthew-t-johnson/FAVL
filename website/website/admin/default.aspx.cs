using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class _default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var overDueIfCheckedOutBefore = DateTime.UtcNow.AddDays(-7);

            using (var db = new favlEntities())
            {
                var libraries = db.Libraries.OrderBy(l => l.Id).ToList();

                foreach (var library in libraries)
                {
                    var tile = new HtmlGenericControl("div");
                    tile.Attributes.Add("class", "libraryTile");
                    tile.Controls.Add(new HtmlGenericControl("h2") {InnerText = library.Name});
                    tile.Style[HtmlTextWriterStyle.BackgroundColor] = admin.checkOuts.colorArray[(library.Id - 1) % admin.checkOuts.colorArray.Length];


                    var books = library.Books.Count;
                    var readers = library.Readers.Count;
                    var librarians = string.Join(", ", library.Librarians.Select(l => l.FirstName + " " + l.LastName));
                    var checkOuts = db.CheckOuts.Count(c => c.LibraryID == library.Id);
                    double overDueBooks =
                        db.CheckOuts.Count(c => c.LibraryID == library.Id &&
                                                c.CheckOutDate < overDueIfCheckedOutBefore);
                    overDueBooks = checkOuts != 0 ? overDueBooks / checkOuts : 0;

                    tile.Controls.Add(new HtmlGenericControl("h3") {InnerHtml = $"<i class='fa fa-book fa-fw'></i> Books: {books}"});
                    tile.Controls.Add(new HtmlGenericControl("h3") {InnerHtml = $"<i class='fa fa-user fa-fw'></i> Readers: {readers}"});
                    tile.Controls.Add(new HtmlGenericControl("h3")
                    {
                        InnerHtml = $"<i class='fa fa-shopping-bag fa-fw'></i> Checkouts: {checkOuts}"
                    });
                    tile.Controls.Add(new HtmlGenericControl("h3")
                    {
                        InnerHtml = $"<i class='fa fa-hourglass-end fa-fw'></i> Overdue: {overDueBooks:0%}"
                    });
                    tile.Controls.Add(new HtmlGenericControl("p") {InnerHtml = $"Librarians: {librarians}"});

                    insertData.Controls.Add(tile);
                }
            }
        }
    }
}