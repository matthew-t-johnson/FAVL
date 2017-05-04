using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class activeReaders : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Readers.Where(b => b.TotalCheckouts > 0).OrderByDescending(b => b.TotalCheckouts).Take(30)
                    .ToList();

                foreach (var reader in list)
                {
                    var tr = new HtmlGenericControl("tr");
                    var td = new HtmlGenericControl("td") {InnerText = reader.FirstName + " " + reader.LastName};
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = reader.Library.Name
                    };
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = reader.Barcode
                    };
                    tr.Controls.Add(td);

                    td = new HtmlGenericControl("td")
                    {
                        InnerText = reader.TotalCheckouts.ToString()
                    };
                    tr.Controls.Add(td);

                    activeReadersBody.Controls.Add(tr);
                }
            }
        }
    }
}