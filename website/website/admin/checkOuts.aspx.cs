using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace website.admin
{
    public partial class checkOuts : Page
    {
        private readonly string[] colorArray = new[]
        {
            "blue",
            "darkcyan",
            "chocolate",
            "orange",
            "red"
        };

        private const double chartHeight = 600;
        private const double chartWidth = 800;

        protected void Page_Load(object sender, EventArgs e)
        {
            using (var db = new favlEntities())
            {
                var checkOuts = db.CheckOutsByDays.Where(b => allOrOneLibrary.LibraryID == 0 || b.LibraryID == allOrOneLibrary.LibraryID).ToList();
                if (checkOuts.Count == 0)
                {
                    var name = allOrOneLibrary.LibraryID == 0 ? "any library" : db.Libraries.Single(l => l.Id == allOrOneLibrary.LibraryID).Name;
                    insertCheckOutChart.Controls.Add(new HtmlGenericControl("h2")
                    {
                        InnerText = $"No checkouts for {name}"
                    });
                    libraryKeyTitle.Visible = false;
                    return;
                }

                var firstDay = checkOuts.Min(d => d.Day);
                var lastDay = checkOuts.Max(d => d.Day);
                var totalDays = (lastDay - firstDay).TotalDays;
                var spacing = totalDays >0 ? chartWidth / totalDays : 0;
                var maxCheckouts = checkOuts.Max(d => d.CheckOuts);
                maxCheckouts = (int)Math.Ceiling(maxCheckouts / 5.0) * 5;

                var svg = new HtmlGenericControl("svg");
                svg.Attributes.Add("class", "svgChart");

                insertCheckOutChart.Controls.Add(svg);

                svg.Attributes.Add("width", $"{chartWidth}");
                svg.Attributes.Add("height", $"{chartHeight}");

                LayDownGrid(svg, spacing, maxCheckouts, firstDay, lastDay);

                var libraryIDs = checkOuts.Select(c => c.LibraryID).Distinct().ToList();

                foreach (var libraryID in libraryIDs)
                {
                    var libraryCheckOuts = checkOuts.Where(c => c.LibraryID == libraryID).OrderBy(c => c.Day).ToList();

                    var points = new List<string>();

                    for (var day = firstDay; day <= lastDay; day = day.AddDays(1))
                    {
                        var dayCheckOuts = libraryCheckOuts.FirstOrDefault(c => c.Day == day);
                        var x = (day - firstDay).TotalDays * spacing;

                        if (dayCheckOuts != null)
                        {
                            var y = dayCheckOuts.CheckOuts * (chartHeight - 1) / maxCheckouts;

                            points.Add($"{x:0.0},{chartHeight - 1 - y:0.0}");
                        }
                        else
                        {
                            points.Add($"{x:0.0},{chartHeight - 1}");
                        }
                    }

                    var polyline = new HtmlGenericControl("polyline");

                    var color = colorArray[(libraryID - 1) % colorArray.Length];

                    polyline.Attributes.Add("points", string.Join(" ", points));
                    polyline.Attributes.Add("stroke", color);
                    polyline.Attributes.Add("stroke-width", "2");
                    polyline.Attributes.Add("fill", "none");

                    svg.Controls.Add(polyline);
                }

                InsertKey(libraryIDs, db);
            }
        }

        private void InsertKey(List<int> libraryIDs, favlEntities db)
        {
            var key = new HtmlGenericControl("table");
            key.Attributes.Add("class", "keyTable");
            insertKey.Controls.Add(key);

            foreach (var libraryID in libraryIDs)
            {
                var row = new HtmlGenericControl("tr");
                key.Controls.Add(row);

                var colorCell = new HtmlGenericControl("td");
                row.Controls.Add(colorCell);

                var colorSample = new HtmlGenericControl("span");
                colorSample.Style.Add("background-color", colorArray[(libraryID - 1) % colorArray.Length]);
                colorCell.Controls.Add(colorSample);
                
                var nameCell = new HtmlGenericControl("td");
                nameCell.InnerText = db.Libraries.Single(l => l.Id == libraryID).Name;
                row.Controls.Add(nameCell);
            }
        }

        private void LayDownGrid(HtmlGenericControl svg, double spacing, int maxCheckouts, DateTime firstDay, DateTime lastDay)
        {
            for (var day = firstDay; day <= lastDay; day = day.AddDays(1))
            {
                var x = (day - firstDay).TotalDays * spacing;

                var line = new HtmlGenericControl("line");
                line.Attributes.Add("x1", $"{x:0.0}");
                line.Attributes.Add("x2", $"{x:0.0}");
                line.Attributes.Add("y1", $"{0:0.0}");
                line.Attributes.Add("y2", $"{chartHeight + 5:0.0}");
                svg.Controls.Add(line);

                var text = new HtmlGenericControl("text");
                text.Attributes.Add("x", "0");
                text.Attributes.Add("y", "0");
                text.InnerText = $"{day:d MMM yyyy}";
                text.Attributes.Add("style", $"text-anchor: start; transform: translate({x - 6:0.0}px, 615px) rotate(45deg)");
                svg.Controls.Add(text);


                //text - anchor: start;
                //transform: rotate(90deg) translate(600px, 5px);

            }

            for (double i = 0; i <= maxCheckouts; i += 5)
            {
                var y = (chartHeight - 1) - i * (chartHeight - 1) / maxCheckouts;
                var line = new HtmlGenericControl("line");
                line.Attributes.Add("x1", $"{-5:0.0}");
                line.Attributes.Add("x2", $"{chartWidth - 1:0.0}");
                line.Attributes.Add("y1", $"{y:0.0}");
                line.Attributes.Add("y2", $"{y:0.0}");
                svg.Controls.Add(line);

                var text = new HtmlGenericControl("text");
                text.Attributes.Add("x", "-8");
                text.Attributes.Add("y", $"{y + 4:0.0}");
                text.Attributes.Add("style", "text-anchor: end");
                text.InnerText = $"{i:0}";

                svg.Controls.Add(text);
            }
        }
    }
}