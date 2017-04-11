using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class books : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Books.ToList();

                insertList.Controls.Add(
                    new HtmlGenericControl("li")
                    {
                        InnerHtml =
                            "<span class='title'>Title</span><span class='author'>Author</span><span class='library'>Library</span><span class='barcode'>Barcode</span><span class='reader'>Checked Out To</span><span></span><span></span>"
                    }
                );

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
                    span.InnerText = book.Library != null ? book.Library.Name : "—";
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "barcode");
                    span.InnerText = book.Barcode ?? "—";
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "reader");
                    span.InnerText = book.Reader != null ? book.Reader.FirstName + " " + book.Reader.LastName : "—";
                    li.Controls.Add(span);

                    li.Controls.Add(
                        new LiteralControl(
                            $"<span class='edit'><a href='editBook.aspx?id={book.Id}'>Edit</a></span><span class='delete'><a href='javascript:deleteBook({book.Id}, \"{book.Title}\")'>Delete</a></span>")
                    );


                    insertList.Controls.Add(li);
                }
            }
        }
    }
}