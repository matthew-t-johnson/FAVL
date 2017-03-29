using System;
using System.Linq;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class books : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Books.ToList();

                foreach (var book in list)
                {
                    var li = new HtmlGenericControl("li");
                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "title");
                    span.InnerText = book.Title;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "author");
                    span.InnerText = book.Author;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "library");
                    span.InnerText = book.Libraries != null ? book.Libraries.Name : "UNASSIGNED";
                    li.Controls.Add(span);

                    if (book.Readers != null)
                    {
                        span = new HtmlGenericControl("span");
                        span.Attributes.Add("class", "reader");
                        span.InnerText = book.Readers.FirstName + " " + book.Readers.LastName;
                        li.Controls.Add(span);

                    }

                    insertList.Controls.Add(li);
                }
            }

        }
    }
}