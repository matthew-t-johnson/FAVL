using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class librarians : Page
    {
        private static readonly Regex rxBarcodeSuffix = new Regex(@"\s*\([^\)]+\)\s*$", RegexOptions.Compiled);

        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Librarians.Where(l => l.LibraryID != null).ToList();

                var listHeader = new HtmlGenericControl("li");
                listHeader.InnerHtml = "<span class='name'>Name</span><span class='village'>Community</span><span class='country'>Country</span><span class='barcode'>Barcode (CODE_128)</span><span></span><span></span>";
                listHeader.Attributes.Add("class", "listAsTableHeader");

                insertList.Controls.Add(listHeader);

                foreach (var librarian in list)
                {
                    var li = new HtmlGenericControl("li");
                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "name");
                    span.InnerText = librarian.LastName + ", " + librarian.FirstName;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "village");
                    span.InnerText = librarian.Library.Village;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "country");
                    span.InnerText = librarian.Library.Country;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "barcode");
                    span.InnerText = rxBarcodeSuffix.Replace(librarian.Barcode ?? "—", string.Empty);
                    li.Controls.Add(span);


                    li.Controls.Add(
                        new LiteralControl(
                            $"<span class='edit'><a href='editLibrarian.aspx?id={librarian.Id}'>Edit</a></span><span class='delete'><a href='javascript:deleteLibrarian({librarian.Id}, \"{librarian.Library.Name}\")'>Delete</a></span>")
                    );

                    insertList.Controls.Add(li);
                }
            }
        }
    }
}