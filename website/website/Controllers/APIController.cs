using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
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
                var reader = db.Readers.FirstOrDefault(r => r.Id == userID);

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
                }).ToList();
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
                }).ToList();
            }
        }

        [HttpPost]
        [Route("api/reader/add")]
        public Reader AddReader([FromBody] Reader reader)
        {
            using (var db = new favlEntities())
            {
                if (string.IsNullOrEmpty(reader.Barcode))
                    reader.Barcode = null;

                var addedReader = db.Readers.Add(reader);

                db.SaveChanges();

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

        [HttpDelete]
        [Route("api/reader/{userID}")]
        public void DeleteReader(int userID)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.FirstOrDefault(r => r.Id == userID);

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
                }).ToList();

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

                return new Library {
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
                }).ToList();
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
                }).ToList();
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


        [HttpGet]
        [Route("api/books/checkout/{bookID}/{readerID}")]
        public string CheckOutBook(int bookID, int readerID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);

                if (book == null)
                    return "Book not found";

                book.CheckedOutTo = readerID;

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



        public class SignInArgs
        {
            public string password;
            public string username;
        }
    }
}