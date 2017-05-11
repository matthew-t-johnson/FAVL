using System;
using System.Linq;
using System.Web.UI;

namespace website.admin
{
    public partial class deleteLibrary : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]) || !((Master as Admin)?.IsGod ?? false))               
            {
                Response.Redirect("libraries.aspx");
                return;
            }

            var libraryId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var library = db.Libraries.Find(libraryId);

                if (library == null)
                {
                    Response.Redirect("libraries.aspx");
                    return;
                }

                foreach (var reader in db.Readers.Where(r => r.LibraryID == library.Id).ToList())
                {
                    db.Readers.Remove(reader);
                }

                foreach (var book in db.Books.Where(b => b.LibraryID == library.Id).ToList())
                {
                    db.Books.Remove(book);
                }

                foreach (var librarian in db.Librarians.Where(l => l.LibraryID == library.Id).ToList())
                {
                    db.Librarians.Remove(librarian);
                }

                foreach (var checkOut in db.CheckOuts.Where(l => l.LibraryID == library.Id).ToList())
                {
                    db.CheckOuts.Remove(checkOut);
                }

                foreach (var checkOut in db.CheckOutsByDays.Where(l => l.LibraryID == library.Id).ToList())
                {
                    db.CheckOutsByDays.Remove(checkOut);
                }

                db.Libraries.Remove(library);
                db.SaveChanges();

            }

            Response.Redirect("libraries.aspx");
        }
    }
}