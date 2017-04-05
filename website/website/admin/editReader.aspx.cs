using System;
using System.Web.UI.HtmlControls;
using Newtonsoft.Json;

namespace website.admin
{
    public partial class editReader : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("readers.aspx");
                return;
            }

            var readerId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var reader = db.Readers.Find(readerId);

                if (reader != null)
                {
                    if (IsPostBack)
                    {
                        var barcode = Request.Form["Barcode"].Trim();

                        reader.FirstName = Request.Form["ReaderFirst"].Trim();
                        reader.MiddleName = Request.Form["ReaderMiddle"].Trim();
                        reader.LastName = Request.Form["ReaderLast"].Trim();
                        reader.Barcode = string.IsNullOrEmpty(barcode) ? null : barcode;

                        db.SaveChanges();
                        Response.Redirect("reader.aspx");
                        return;
                    }

                    var s = new HtmlGenericControl("script")
                    {
                        InnerHtml = "var reader = " + JsonConvert.SerializeObject(
                            new Reader
                            {
                                Id = reader.Id,
                                FirstName = reader.FirstName,
                                MiddleName = reader.MiddleName,
                                LastName = reader.LastName,
                                Barcode = reader.Barcode
                            })
                    };

                    insertReader.Controls.Add(s);
                }
            };

        }
    }
}