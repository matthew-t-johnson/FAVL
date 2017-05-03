using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class checkOuts : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var checkOuts = db.CheckOutsByDays.ToList();
                if (checkOuts.Count == 0)
                    return;

                var firstDay = checkOuts.Min(d => d.Day);
                var lastDay = checkOuts.Max(d => d.Day);
                var spacing = 800 / ((lastDay - firstDay).TotalDays + 1);

                var svg = new HtmlGenericControl("svg");

                insertCheckOutChart.Controls.Add(svg);

                svg.Attributes.Add("width", "800");
                svg.Attributes.Add("height", "600");

                var libraryIDs = checkOuts.Select(c => c.LibraryID).Distinct().ToList();

                foreach (var libraryID in libraryIDs)
                {
                    var libraryCheckOuts = checkOuts.Where(c => c.LibraryID == libraryID).OrderBy(c => c.Day).ToList();

                    var points = new List<string>();

                    foreach (var libraryCheckOut in libraryCheckOuts)
                    {
                        var x = (libraryCheckOut.Day - firstDay).TotalDays * spacing;
                        var y = 600 - libraryCheckOut.CheckOuts;

                        points.Add($"{x},{y}");
                    }

                    var polyline = new HtmlGenericControl("polyline");

                    polyline.Attributes.Add("points", string.Join(" ", points));
                    polyline.Attributes.Add("stroke", "black");
                    polyline.Attributes.Add("stroke-width", "2");
                    polyline.Attributes.Add("fill", "none");

                    svg.Controls.Add(polyline);
                }
            }
        }
    }
}