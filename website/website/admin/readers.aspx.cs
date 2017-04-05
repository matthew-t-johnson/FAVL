using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class readers : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Readers.ToList();

                insertList.Controls.Add(
                    new HtmlGenericControl("li") { InnerHtml = "<span class='reader'>Name</span><span class='barcode'>Barcode</span><span class='checkouts'>Checkouts</span><span></span><span></span>" }
                    );

                foreach (var reader in list)
                {
                    var li = new HtmlGenericControl("li");

                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "reader");
                    var readerName = reader.FirstName + " " + reader.MiddleName + " " + reader.LastName;
                    span.InnerText = readerName;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "barcode");
                    span.InnerText = reader.Barcode ?? string.Empty;
                    li.Controls.Add(span);


                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "checkouts");
                    span.InnerText = reader.TotalCheckouts.ToString("#,###;;None");
                    li.Controls.Add(span);

                    li.Controls.Add(
                        new LiteralControl($"<span class='edit'><a href='editReader.aspx?id={reader.Id}'>Edit</a></span><span class='delete'><a href='javascript:deleteReader({reader.Id}, \"{readerName}\")'>Delete</a></span>")
                    );


                    insertList.Controls.Add(li);
                }
            }
        }
    }
}