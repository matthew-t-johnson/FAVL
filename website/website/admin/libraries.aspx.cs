using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using Microsoft.SqlServer.Server;

namespace website.admin
{
    public partial class libraries : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var WeAreGod = (Master as Admin)?.IsGod ?? false;

            using (var db = new favlEntities())
            {
                var list = db.Libraries.ToList();

                var listHeader = new HtmlGenericControl("li");

                listHeader.InnerHtml =
                    "<span class='name'>Community</span><span class='country'>Country</span><span></span>" + (WeAreGod ? "<span></span>" : string.Empty);
                listHeader.Attributes.Add("class", "listAsTableHeader");

                insertList.Controls.Add(listHeader);

                foreach (var library in list)
                {
                    var li = new HtmlGenericControl("li");
                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "name");
                    span.InnerText = library.Name;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "country");
                    span.InnerText = library.Country;
                    li.Controls.Add(span);

                    li.Controls.Add(
                        new LiteralControl(
                            $"<span class='edit'><a href='editLibrary.aspx?id={library.Id}'>Edit</a></span>" + (WeAreGod
                                ? $"<span class='delete'><a href='javascript:deleteLibrary({library.Id}, \"{library.Name}\")'>Delete</a></span>"
                                : string.Empty))
                    );

                    insertList.Controls.Add(li);
                }
            }
        }
    }
}