using System;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class librarySelect : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                librarySelectOptions.Controls.Add(new HtmlGenericControl("option") { InnerText = "Choose Library" });

                foreach (var library in db.Libraries)
                {
                    var option = new HtmlGenericControl("option");
                    option.Attributes.Add("value", library.Id.ToString());
                    option.InnerText = library.Name;
                    librarySelectOptions.Controls.Add(option);
                }
            }
        }
    }
}