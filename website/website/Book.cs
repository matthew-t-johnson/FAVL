//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace website
{
    using System;
    using System.Collections.Generic;
    
    public partial class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string AuthorFirst { get; set; }
        public string AuthorMiddle { get; set; }
        public string AuthorLast { get; set; }
        public int LibraryID { get; set; }
        public string Barcode { get; set; }
        public Nullable<int> CheckedOutTo { get; set; }
        public int TotalCheckouts { get; set; }
        public Nullable<System.DateTime> CheckedOutDate { get; set; }
    
        public virtual Library Library { get; set; }
        public virtual Reader Reader { get; set; }
    }
}
