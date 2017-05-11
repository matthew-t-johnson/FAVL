using System;
using System.Web.UI;

namespace website.admin
{
    public partial class addReader : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;

            using (var db = new favlEntities())
            {
                var barcode = Request.Form["Barcode"].Trim();
                db.Readers.Add(new Reader
                {
                    FirstName = Request.Form["ReaderFirst"].Trim(),
                    MiddleName = Request.Form["ReaderMiddle"].Trim(),
                    LastName = Request.Form["ReaderLast"].Trim(),
                    Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (CODE_128)",
                    LibraryID = int.Parse(Request.Form["LibraryID"])
                });

                db.SaveChanges();
            }

            Response.Redirect("readers.aspx");
        }
    }
}