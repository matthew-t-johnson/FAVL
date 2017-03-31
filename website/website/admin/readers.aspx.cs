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

                foreach (var reader in list)
                {
                    var li = new HtmlGenericControl("li");

                    var span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "reader");
                    span.InnerText = reader.FirstName + " " + reader.MiddleName + " " + reader.LastName;
                    li.Controls.Add(span);

                    if (reader.Barcode != null)
                    {
                        span = new HtmlGenericControl("span");
                        span.Attributes.Add("class", "barcode");
                        span.InnerText = reader.Barcode;
                        li.Controls.Add(span);
                    }

                    span = new HtmlGenericControl("span");
                    span.Attributes.Add("class", "checkouts");
                    span.InnerText = reader.TotalCheckouts.ToString("#,###;;None");
                    li.Controls.Add(span);

                    insertList.Controls.Add(li);
                }
            }
        }
    }
}