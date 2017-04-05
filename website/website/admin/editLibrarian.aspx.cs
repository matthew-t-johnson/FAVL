using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Newtonsoft.Json;

namespace website.admin
{
    public partial class editLibrarian : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("librarians.aspx");
                return;
            }

            var librarianId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var librarian = db.Librarians.Find(librarianId);

                if (librarian != null)
                {
                    if (IsPostBack)
                    {
                        var barcode = Request.Form["Barcode"].Trim();
                        librarian.Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (CODE_128)";
                        librarian.LibraryID = int.Parse(Request.Form["LibraryID"]);

                        db.SaveChanges();
                        Response.Redirect("librarians.aspx");
                        return;
                    }

                    var originalBarcode = librarian.Barcode;

                    if (!string.IsNullOrEmpty(originalBarcode) && originalBarcode.Length > 7)
                    {
                        originalBarcode = originalBarcode.Substring(0, 7);
                    }

                    var s = new HtmlGenericControl("script")
                    {
                        InnerHtml = "var librarian = " + JsonConvert.SerializeObject(
                            new Librarian
                            {
                                Id = librarian.Id,
                                Barcode = originalBarcode ?? string.Empty,
                                LibraryID = librarian.LibraryID
                            })
                    };

                    insertLibrarian.Controls.Add(s);
                }
            };

        }
    }
}