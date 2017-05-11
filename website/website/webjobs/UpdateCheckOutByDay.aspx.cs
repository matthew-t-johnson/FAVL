using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.webjobs
{
    public partial class UpdateCheckOutByDay : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var lastDay = db.CheckOutsByDays.Any()
                    ? db.CheckOutsByDays.Max(d => d.Day)
                    : DateTime.UtcNow.Date.AddDays(-30);

                for (var day = lastDay.AddDays(1); day <= DateTime.UtcNow.Date; day = day.AddDays(1))
                {
                    db.UpdateCheckOutsByDay(day);
                    update.Controls.Add(new HtmlGenericControl("p")
                    {
                        InnerText = $"Updated CheckOutsByDay for day ending {day:F}"
                    });
                }
            }
        }
    }
}