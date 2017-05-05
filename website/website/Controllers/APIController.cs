using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Newtonsoft.Json;
using website.admin;

namespace website.Controllers
{
    public class APIController : ApiController
    {
        [HttpGet]
        [Route("api/reader/{userID}")]
        public Reader GetReader(int userID)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.Find(userID);

                if (reader == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return new Reader
                {
                    Id = reader.Id,
                    FirstName = reader.FirstName,
                    MiddleName = reader.MiddleName,
                    LastName = reader.LastName,
                    Barcode = reader.Barcode,
                    TotalCheckouts = reader.TotalCheckouts
                };
            }
        }

        [HttpGet]
        [Route("api/reader/barcode/{barcode}")]
        public Reader GetReaderByBarcode(string barcode)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.FirstOrDefault(r => r.Barcode == barcode);

                if (reader == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return new Reader
                {
                    Id = reader.Id,
                    FirstName = reader.FirstName,
                    MiddleName = reader.MiddleName,
                    LastName = reader.LastName,
                    Barcode = reader.Barcode,
                    TotalCheckouts = reader.TotalCheckouts
                };
            }
        }

        [HttpGet]
        [Route("api/readers")]
        public List<Reader> GetReaders()
        {
            using (var db = new favlEntities())
            {
                var readers = db.Readers.ToList();
                return readers.Select(reader => new Reader
                {
                    Id = reader.Id,
                    FirstName = reader.FirstName,
                    MiddleName = reader.MiddleName,
                    LastName = reader.LastName,
                    Barcode = reader.Barcode,
                    TotalCheckouts = reader.TotalCheckouts
                })
                    .ToList();
            }
        }

        [HttpGet]
        [Route("api/readers/{libraryID}")]
        public IEnumerable<Reader> GetReaders(int libraryID)
        {
            using (var db = new favlEntities())
            {
                var readers = db.Readers.Where(r => r.LibraryID == libraryID).ToList();
                return readers.Select(reader => new Reader
                {
                    Id = reader.Id,
                    FirstName = reader.FirstName,
                    MiddleName = reader.MiddleName,
                    LastName = reader.LastName,
                    Barcode = reader.Barcode,
                    TotalCheckouts = reader.TotalCheckouts
                })
                    .ToList();
            }
        }

        [HttpPost]
        [Route("api/reader/add")]
        public Reader AddReader([FromBody] Reader reader)
        {
            using (var db = new favlEntities())
            {
                if (string.IsNullOrEmpty(reader.Barcode))
                {
                    reader.Barcode = null;
                }
                else
                {
                    // throw error if another reader has same barcode
                    if(db.Readers.FirstOrDefault(r => r.Barcode == reader.Barcode) != null)
                        throw new HttpResponseException(HttpStatusCode.Conflict);
                }

                var addedReader = db.Readers.Add(reader);

                db.SaveChanges();

                return new Reader
                {
                    Id = addedReader.Id,
                    FirstName = addedReader.FirstName,
                    MiddleName = addedReader.MiddleName,
                    LastName = addedReader.LastName,
                    Barcode = addedReader.Barcode,
                    TotalCheckouts = addedReader.TotalCheckouts
                };
            }
        }

        [HttpPost]
        [Route("api/reader/{userID}")]
        public Reader EditReader(int userID, [FromBody] Reader reader)
        {
            using (var db = new favlEntities())
            {
                var existingReader = db.Readers.Find(userID);

                if (existingReader == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                // check if new barcode is different from existing barcode
                if (existingReader.Barcode != reader.Barcode && !string.IsNullOrEmpty(reader.Barcode))
                {
                    // throw error if another reader has same barcode
                    if (db.Readers.FirstOrDefault(r => r.Barcode == reader.Barcode) != null)
                        throw new HttpResponseException(HttpStatusCode.Conflict);
                }

                existingReader.FirstName = reader.FirstName;
                existingReader.MiddleName = reader.MiddleName;
                existingReader.LastName = reader.LastName;
                existingReader.Barcode = string.IsNullOrEmpty(reader.Barcode) ? null : reader.Barcode;
                existingReader.LibraryID = reader.LibraryID;

                db.SaveChanges();

                return new Reader
                {
                    Id = existingReader.Id,
                    FirstName = existingReader.FirstName,
                    MiddleName = existingReader.MiddleName,
                    LastName = existingReader.LastName,
                    Barcode = existingReader.Barcode,
                    TotalCheckouts = existingReader.TotalCheckouts
                };
            }
        }


        [HttpDelete]
        [Route("api/reader/{userID}")]
        public void DeleteReader(int userID)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.Find(userID);

                if (reader == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                db.Readers.Remove(reader);
                db.SaveChanges();
            }
        }

        [HttpGet]
        [Route("api/libraries")]
        public IEnumerable<Library> GetLibraries()
        {
            using (var db = new favlEntities())
            {
                var libraries = db.Libraries.ToList();

                return libraries.Select(library => new Library
                {
                    Id = library.Id,
                    Name = library.Name,
                    Village = library.Village,
                    Country = library.Country
                })
                    .ToList();
            }
        }

        [HttpPost]
        [Route("api/signin")]
        public Library SignIn([FromBody] SignInArgs args)
        {
            using (var db = new favlEntities())
            {
                var librarian = db.Librarians.FirstOrDefault(l => l.Username == args.username);

                if (librarian == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                if (!PW.Verify(args.password, librarian.PasswordHash, librarian.PasswordSalt))
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);

                return new Library
                {
                    Id = librarian.Library.Id,
                    Name = librarian.Library.Name,
                    Village = librarian.Library.Village,
                    Country = librarian.Library.Country
                };
            }
        }

        [HttpGet]
        [Route("api/signin/{barcode}")]
        public Library SignIn(string barcode)
        {
            using (var db = new favlEntities())
            {
                var librarian = db.Librarians.FirstOrDefault(l => l.Barcode == barcode);

                if (librarian == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return new Library
                {
                    Id = librarian.Library.Id,
                    Name = librarian.Library.Name,
                    Village = librarian.Library.Village,
                    Country = librarian.Library.Country
                };
            }
        }

        [HttpGet]
        [Route("api/books")]
        public IEnumerable<Book> GetBooks()
        {
            using (var db = new favlEntities())
            {
                var books = db.Books.ToList();

                return books.Select(book => new Book
                {
                    Id = book.Id,
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode
                })
                    .ToList();
            }
        }

        [HttpGet]
        [Route("api/books/{libraryID}")]
        public IEnumerable<Book> GetLibraryBooks(int libraryID)
        {
            using (var db = new favlEntities())
            {
                var books = db.Books.Where(b => b.LibraryID == libraryID).ToList();

                return books.Select(book => new Book
                {
                    Id = book.Id,
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode
                })
                    .ToList();
            }
        }

        [HttpGet]
        [Route("api/book/barcode/{barcode}")]
        public Book GetBookByBarcode(string barcode)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.FirstOrDefault(b => b.Barcode == barcode);

                if (book == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return new Book
                {
                    Id = book.Id,
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode
                };
            }
        }

        [HttpPost]
        [Route("api/book/add")]
        public Book AddBook([FromBody] Book book)
        {
            using (var db = new favlEntities())
            {
                if (string.IsNullOrEmpty(book.Barcode))
                    book.Barcode = string.Empty;

                var addedBook = db.Books.Add(book);

                db.SaveChanges();

                return new Book
                {
                    Id = addedBook.Id,
                    AuthorFirst = addedBook.AuthorFirst,
                    AuthorMiddle = addedBook.AuthorMiddle,
                    AuthorLast = addedBook.AuthorLast,
                    Barcode = addedBook.Barcode,
                    LibraryID = addedBook.LibraryID,                    
                };
            }
        }


        [HttpGet]
        [Route("api/books/checkout/{bookID}/{readerID}")]
        public string CheckOutBook(int bookID, int readerID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);
                if (book == null)
                    return "Book not found";

                var reader = db.Readers.Find(readerID);
                if (reader == null)
                    return "Reader not found";

                book.CheckedOutTo = readerID;
                book.CheckedOutDate = DateTime.UtcNow;
                book.TotalCheckouts += 1;
                reader.TotalCheckouts += 1;

                db.CheckOuts.Add(new CheckOut()
                {
                    BookID = bookID,
                    ReaderID = readerID,
                    LibraryID = book.LibraryID,
                    CheckOutDate = DateTime.UtcNow
                });

                db.SaveChanges();

                return "ok";
            }
        }

        [HttpGet]
        [Route("api/books/testCheckout/{bookID}/{readerID}")]
        public string TestCheckOutBook(int bookID, int readerID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);
                if (book == null)
                    return "Book not found";

                var reader = db.Readers.Find(readerID);
                if (reader == null)
                    return "Reader not found";

                book.CheckedOutTo = readerID;
                var random = new Random();
                var bookCheckedOutDate = DateTime.UtcNow.AddMinutes(-Math.Floor(random.NextDouble() * 21600));
                book.CheckedOutDate = bookCheckedOutDate;
                book.TotalCheckouts += 1;
                reader.TotalCheckouts += 1;

                db.CheckOuts.Add(new CheckOut()
                {
                    BookID = bookID,
                    ReaderID = readerID,
                    LibraryID = book.LibraryID,
                    CheckOutDate = bookCheckedOutDate
                });

                db.SaveChanges();

                return "ok";
            }
        }


        [HttpGet]
        [Route("api/books/return/{bookID}")]
        public string ReturnBook(int bookID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);

                if (book == null)
                    return "Book not found";

                book.CheckedOutTo = null;

                db.SaveChanges();

                return "ok";
            }
        }

        public class OverDueBook: Book
        {
            public string ReaderFirst;
            public string ReaderMiddle;
            public string ReaderLast;
            public DateTime DueDate;
        }

        [HttpGet]
        [Route("api/books/overdue/{libraryID}")]
        public List<OverDueBook> GetOverDueBooks(int libraryID)
        {
            var overDueIfCheckedOutBefore = DateTime.UtcNow.AddDays(-7);

            using (var db = new favlEntities())
            {
                var list = db.Books.Where(b => b.LibraryID == libraryID && b.CheckedOutDate != null &&
                                    b.CheckedOutDate < overDueIfCheckedOutBefore).Select(book => new OverDueBook
                {
                    Id = book.Id,
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode,
                    ReaderFirst = book.Reader.FirstName,
                    ReaderMiddle = book.Reader.MiddleName,
                    ReaderLast = book.Reader.LastName,
                    CheckedOutDate = book.CheckedOutDate
                }).ToList();

                foreach (var item in list)
                {
                    if (item.CheckedOutDate.HasValue)
                        item.DueDate = item.CheckedOutDate.Value.AddDays(7);
                }

                return list;
            }
        }


        [HttpGet]
        [Route("api/isbndb/{barcode}")]
        public BookInfo GetBookInfoFromISBNDB(string barcode)
        {
            using (var wc = new WebClient())
            {
                var json = wc.DownloadString("http://isbndb.com/api/v2/json/RIZ5L70Q/book/" + barcode);

                var isbnDbBook = JsonConvert.DeserializeObject<IsbnDbBook>(json);

                if (!string.IsNullOrEmpty(isbnDbBook.error))
                    return new BookInfo { error = isbnDbBook.error };

                if (isbnDbBook.data == null || isbnDbBook.data.Length == 0)
                    return new BookInfo { error = "ISBNDB API succeeded but no data returned" };

                var book = new BookInfo
                {
                    authorLast = string.Empty,
                    authorMiddle = string.Empty,
                    authorFirst = string.Empty,
                    title = isbnDbBook.data[0].title.TrimEnd('.'),
                    isbn13 = isbnDbBook.data[0].isbn13
                };

                if (isbnDbBook.data[0].author_data.Length == 0)
                    return book;

                var authorName = isbnDbBook.data[0].author_data[0].name.Trim();

                //  convert single string author name into our three parts
                //  name may be "last, first mi." or "first last"
                if (authorName.Contains(","))
                {
                    var halves = authorName.Split(',');
                    book.authorLast = halves[0].Trim();

                    if (halves.Length > 1)
                    {
                        var firstMiddleParts = halves[1].Trim().Split(' ');
                        book.authorFirst = firstMiddleParts[0];

                        if (firstMiddleParts.Length > 1)
                            book.authorMiddle = string.Join(" ", firstMiddleParts.Skip(1).Select(s => s.Trim()));
                    }
                }
                else
                {
                    var parts = authorName.Split(' ');

                    if (parts.Length == 1)
                        book.authorLast = parts[0].Trim();
                    else
                    {
                        book.authorFirst = parts[0].Trim();

                        if (parts.Length > 2)
                            book.authorMiddle = string.Join(" ", parts.Skip(1).Take(parts.Length - 2).Select(s => s.Trim()));

                        book.authorLast = parts[parts.Length - 1].Trim();
                    }
                }

                return book;
            }
        }

        public class IsbnDbAuthorData
        {
            public string name;
        }

        public class IsbnDbData
        {
            public IsbnDbAuthorData[] author_data;
            public string isbn13;
            public string title;
        }

        public class IsbnDbBook
        {
            public string error;
            public IsbnDbData[] data;
            public string index_searched;
        }

        public class BookInfo
        {
            public string authorFirst;
            public string authorLast;
            public string authorMiddle;
            public string isbn13;
            public string title;
            public string error;
        }

        public class SignInArgs
        {
            public string password;
            public string username;
        }
    }
}