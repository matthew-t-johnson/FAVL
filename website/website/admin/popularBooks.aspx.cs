using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class popularBooks : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int.TryParse(Request.QueryString["libraryID"], out int libraryID);

            using (var db = new favlEntities())
            {
                var list = db.Books.Where(b => b.TotalCheckouts > 0 && (libraryID == 0 || b.LibraryID == libraryID)).OrderByDescending(b => b.TotalCheckouts).Take(30)
                    .ToList();

                foreach (var book in list)
                {
                    var tr = new HtmlGenericControl("tr");
                    var td = new HtmlGenericControl("td") {InnerText = book.Title};
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = book.AuthorFirst + " " + book.AuthorMiddle + " " + book.AuthorLast
                    };
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = book.Library != null ? book.Library.Name : "—"
                    };
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = book.TotalCheckouts.ToString()
                    };
                    tr.Controls.Add(td);

                    popularBooksBody.Controls.Add(tr);
                }
            }
        }
    }
}