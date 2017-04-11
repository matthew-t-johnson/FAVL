using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class libraries : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Libraries.ToList();

                insertList.Controls.Add(
                    new HtmlGenericControl("li")
                    {
                        InnerHtml =
                            "<span class='name'>Name</span><span class='village'>Village</span><span class='country'>Country</span><span></span><span></span>"
                    }
                );


                foreach (var library in list)
                {
                    var li = new HtmlGenericControl("li");
                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "name");
                    span.InnerText = library.Name;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "village");
                    span.InnerText = library.Village;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "country");
                    span.InnerText = library.Country;
                    li.Controls.Add(span);

                    li.Controls.Add(
                        new LiteralControl(
                            $"<span class='edit'><a href='editLibrary.aspx?id={library.Id}'>Edit</a></span><span class='delete'><a href='javascript:deleteLibrary({library.Id}, \"{library.Name}\")'>Delete</a></span>")
                    );

                    insertList.Controls.Add(li);
                }
            }
        }
    }
}