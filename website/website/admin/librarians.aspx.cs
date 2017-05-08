using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class librarians : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Librarians.Where(l => l.LibraryID != null).ToList();

                var listHeader = new HtmlGenericControl("li");
                listHeader.InnerHtml = "<span class='name'>Name</span><span class='village'>Community</span><span class='country'>Country</span><span class='barcode'>Barcode</span><span></span><span></span>";
                listHeader.Attributes.Add("class", "listAsTableHeader");

                insertList.Controls.Add(listHeader);


                //insertList.Controls.Add(
                //    new HtmlGenericControl("li")
                //    {
                //        InnerHtml =
                //        "<span class='barcode'>Barcode</span><span class='name'>Library Name</span><span class='village'>Village</span><span class='country'>Country</span><span></span><span></span>"
                //    }
                //);


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
                    span.InnerText = librarian.Barcode ?? "—";
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