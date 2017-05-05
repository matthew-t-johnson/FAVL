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
                var list = db.Readers.OrderBy(r => r.LastName).ThenBy(r => r.FirstName).ToList();

                var listHeader = new HtmlGenericControl("li");
                listHeader.InnerHtml = "<span class='reader'>Name</span><span class='barcode'>Barcode</span><span class='library'>Library</span><span class='checkouts'>Checkouts</span><span></span><span></span>";
                listHeader.Attributes.Add("class", "listAsTableHeader");

                insertList.Controls.Add(listHeader);

                foreach (var reader in list)
                {
                    var li = new HtmlGenericControl("li");

                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "reader");
                    var readerName = $"{reader.LastName}, {reader.FirstName} {reader.MiddleName}";
                    span.InnerText = readerName;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "barcode");
                    span.InnerText = reader.Barcode ?? string.Empty;
                    li.Controls.Add(span);

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "library");
                    span.InnerText = reader.Library?.Name ?? string.Empty;
                    li.Controls.Add(span);


                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "checkouts");
                    span.InnerText = reader.TotalCheckouts.ToString("#,###;;None");
                    li.Controls.Add(span);

                    li.Controls.Add(
                        new LiteralControl(
                            $"<span class='edit'><a href='editReader.aspx?id={reader.Id}'>Edit</a></span><span class='delete'><a href='javascript:deleteReader({reader.Id}, \"{readerName}\")'>Delete</a></span>")
                    );


                    insertList.Controls.Add(li);
                }
            }
        }
    }
}