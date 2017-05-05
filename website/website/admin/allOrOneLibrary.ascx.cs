using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace website.admin
{
    public partial class allOrOneLibrary : System.Web.UI.UserControl
    {
        public int LibraryID
        {
            get
            {
                int.TryParse(Request.QueryString["libraryID"], out int id);
                return id;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }
    }
}