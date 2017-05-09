using System;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;

namespace website.admin
{
    public partial class printBookLabels : Page
    {
        private const int COLUMNS = 2;
        private const int ROWS = 7;
        private const double CARD_HEIGHT = 8.0 / 6;
        private const double CARD_WIDTH = 4.0;
        private const double GUTTER = 3.0 / 16;
        private const double TOP_MARGIN = (11.0 - CARD_HEIGHT * ROWS) / 2 - 1 / 32.0;
        private const double LEFT_MARGIN = (8.5 - (CARD_WIDTH * COLUMNS + GUTTER * (COLUMNS - 1))) / 2;
        private static readonly Regex rxBarcodeSuffix = new Regex(@"\s*\([^\)]+\)\s*$", RegexOptions.Compiled);

        private static readonly int[] weights = {1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3};

        protected void Page_Load(object sender, EventArgs e)
        {
            var sb = new StringBuilder();

            int.TryParse(Request.QueryString["libraryID"], out int libraryId);

            using (var db = new favlEntities())
            {
                var books = db.Books.Where(b => libraryId == 0 || b.LibraryID == libraryId)
                    .OrderBy(b => b.Id)
                    .Take(ROWS * COLUMNS)
                    .ToList();

                var corrected = 0;

                for (var i = 0; i < books.Count; ++i)
                {
                    corrected += CorrectBarCode(books[i]);

                    var x = i % COLUMNS == 0 ? LEFT_MARGIN : LEFT_MARGIN + CARD_WIDTH + GUTTER;
                    var row = i / COLUMNS;
                    var y = TOP_MARGIN + row * CARD_HEIGHT;

                    var BookTitle = HttpUtility.HtmlEncode(rxBarcodeSuffix.Replace(books[i].Title, string.Empty));
                    var BookAuthor = HttpUtility.HtmlEncode(
                        $"{books[i].AuthorFirst} {books[i].AuthorMiddle} {books[i].AuthorLast}".Trim());
                    var LibraryName = HttpUtility.HtmlEncode(books[i].Library.Name);
                    var BookBarcode = HttpUtility.HtmlEncode(rxBarcodeSuffix.Replace(books[i].Barcode, string.Empty));

                    sb.AppendLine($@"<div class='card' style='top: {y:0.00}in; left: {x:0.00}in;'><table><tr><td>
                        <h1>{BookTitle}</h1>
                        <h2>{BookAuthor}</h2>
                        <h3>{LibraryName}</h3>
                    </td></tr></table><div class='barcode'><svg data-barcode='{
                            BookBarcode
                        }' xmlns='http://www.w3.org/2000/svg' version='1.1'></svg></div></div>");
                }

                if (corrected > 0)
                    db.SaveChanges();
            }

            insertCards.InnerHtml = sb.ToString();
        }

        private static int CorrectBarCode(Book book)
        {
            var barcode = rxBarcodeSuffix.Replace(book.Barcode, string.Empty);

            if (barcode.Length == 13)
            {
                var sum = 0;
                for (var i = 0; i < 12; ++i)
                    sum += int.Parse(barcode.Substring(i, 1)) * weights[i];

                var checkdigit = (int) Math.Ceiling(sum / 10.0) * 10 - sum;

                if (int.Parse(barcode.Substring(12, 1)) != checkdigit)
                {
                    var newBarcode = barcode.Remove(12) + checkdigit.ToString().Substring(0, 1) +
                                     rxBarcodeSuffix.Match(book.Barcode).Value;
                    Debug.WriteLine($"Changing {book.Barcode} to {newBarcode} in {book.Title}");
                    book.Barcode = newBarcode;
                    return 1;
                }
            }

            return 0;
        }
    }
}