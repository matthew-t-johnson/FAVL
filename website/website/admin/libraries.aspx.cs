using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class libraries : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var list = db.Libraries.ToList();

                foreach (var library in list)
                {
                    insertList.Controls.Add(new HtmlGenericControl("li")
                    {
                        InnerText = library.Name + ", " + library.Village + ", " + library.Country
                    });
                }
            }
        }
    }
}