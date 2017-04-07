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
                        reader.Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (CODE_128)";
                        reader.LibraryID = int.Parse(Request.Form["LibraryID"]);

                        db.SaveChanges();
                        Response.Redirect("readers.aspx");
                        return;
                    }

                    var originalBarcode = reader.Barcode;

                    if (!string.IsNullOrEmpty(originalBarcode) && originalBarcode.Length > 7)
                    {
                        originalBarcode = originalBarcode.Substring(0, 7);
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
                                Barcode = originalBarcode ?? string.Empty,
                                LibraryID = reader.LibraryID
                            })
                    };

                    insertReader.Controls.Add(s);
                }
            };

        }
    }
}