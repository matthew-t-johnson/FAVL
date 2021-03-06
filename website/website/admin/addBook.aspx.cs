﻿using System;
using System.Web.UI;

namespace website.admin
{
    public partial class addBook : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;

            using (var db = new favlEntities())
            {
                var barcode = Request.Form["Barcode"].Trim();
                db.Books.Add(new Book
                {
                    Title = Request.Form["Title"].Trim(),
                    AuthorFirst = Request.Form["AuthorFirst"].Trim(),
                    AuthorMiddle = Request.Form["AuthorMiddle"].Trim(),
                    AuthorLast = Request.Form["AuthorLast"].Trim(),
                    Barcode = string.IsNullOrEmpty(barcode) ? null : barcode + " (EAN_13)",
                    LibraryID = int.Parse(Request.Form["LibraryID"])
                });

                db.SaveChanges();
            }

            Response.Redirect("books.aspx");
        }
    }
}