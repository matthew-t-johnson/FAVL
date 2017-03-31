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
                    span.InnerText = book.AuthorFirst + " " + book.AuthorMiddle + " " + book.AuthorLast;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "library");
                    span.InnerText = book.Library != null ? book.Library.Name : "UNASSIGNED";
                    li.Controls.Add(span);

                    if (book.Reader != null)
                    {
                        span = new HtmlGenericControl("span");
                        span.Attributes.Add("class", "reader");
                        span.InnerText = book.Reader.FirstName + " " + book.Reader.LastName;
                        li.Controls.Add(span);

                    }

                    insertList.Controls.Add(li);
                }
            }

        }
    }
}