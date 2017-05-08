using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;

namespace website.admin
{
    public partial class printUserCards : Page
    {
        private static readonly Regex rxBarcodeSuffix = new Regex(@"\s*\([^\)]+\)\s*$", RegexOptions.Compiled);

        private class NameBarcode
        {
            public string Name;
            public string Barcode;
            public string Library;
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            var sb = new StringBuilder();

            //var random = new Random();

            int.TryParse(Request.QueryString["libraryID"], out int libraryId);

            List<NameBarcode> users;

            using (var db = new favlEntities())
            {
                if (Request.QueryString["role"] == "librarian")
                {
                    users = db.Librarians.Where(r => libraryId == 0 || r.LibraryID == libraryId)
                        .OrderBy(r => r.Id)
                        .Take(8)
                        .ToList()
                        .Select(r => new NameBarcode()
                        {
                            Name = $"{r.FirstName} {r.LastName}".Trim(),
                            Barcode = rxBarcodeSuffix.Replace(r.Barcode, string.Empty),
                            Library = r.Library.Name
                        })
                        .ToList();
                }
                else
                {
                    users = db.Readers.Where(r => libraryId == 0 || r.LibraryID == libraryId)
                        .OrderBy(r => r.Id)
                        .Take(8)
                        .ToList()
                        .Select(r => new NameBarcode()
                        {
                            Name = $"{r.FirstName} {r.LastName}".Trim(),
                            Barcode = rxBarcodeSuffix.Replace(r.Barcode, string.Empty),
                            Library = r.Library.Name
                        })
                        .ToList();
                }
            }

            for (var i = 0; i < users.Count; ++i)
            {
                var x = i % 2 == 0 ? 0.5 : 4.5;
                var row = i / 2;
                var y = 0.75 + row * 2.5;

                var ReaderName = HttpUtility.HtmlEncode(users[i].Name);
                var Role = Request.QueryString["role"] == "librarian" ? "Librarian" : "Reader";
                var LibraryName = HttpUtility.HtmlEncode(users[i].Library);

                //var s = "";

                //var check = 0;

                //for (var j = 0; j < 6; ++j)
                //{
                //    var d = (int) Math.Ceiling(random.NextDouble() * 9);
                //    s += d.ToString();
                //    check += d;
                //}
                //s += (check % 10).ToString();

                var ReaderBarcode = HttpUtility.HtmlEncode(users[i].Barcode);

                sb.AppendLine($@"<div class='card' style='top: {y:0.00}in; left: {x:0.00}in;'><table><tr><td>
                        <h1>{ReaderName}</h1>
                        <h2>{Role}</h2>
                        <h3>{LibraryName}</h3>
                    </td></tr></table><div class='barcode'><svg data-barcode='{
                        ReaderBarcode
                    }' xmlns='http://www.w3.org/2000/svg' version='1.1'></svg></div></div>");
            }

            insertCards.InnerHtml = sb.ToString();
        }
    }
}