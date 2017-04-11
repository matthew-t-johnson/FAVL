using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using Newtonsoft.Json;

namespace website.admin
{
    public partial class editLibrary : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["id"]))
            {
                Response.Redirect("libraries.aspx");
                return;
            }

            var libraryId = int.Parse(Request.QueryString["id"]);
            using (var db = new favlEntities())
            {
                var library = db.Libraries.Find(libraryId);

                if (library != null)
                {
                    if (IsPostBack)
                    {
                        library.Name = Request.Form["Name"].Trim();
                        library.Village = Request.Form["Village"].Trim();
                        library.Country = Request.Form["Country"].Trim();

                        db.SaveChanges();
                        Response.Redirect("libraries.aspx");
                        return;
                    }

                    var s = new HtmlGenericControl("script")
                    {
                        InnerHtml = "var library = " + JsonConvert.SerializeObject(
                                        new Library
                                        {
                                            Id = library.Id,
                                            Name = library.Name,
                                            Village = library.Village,
                                            Country = library.Country
                                        })
                    };

                    insertLibrary.Controls.Add(s);
                }
            }
            ;
        }
    }
}