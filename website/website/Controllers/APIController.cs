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
        [Route("api/user/signin")]
        public Reader SignIn([FromBody] SignInArgs args)
        {
            using (var db = new favlEntities())
            {
                var signer = db.Librarians.FirstOrDefault(l => l.Username == args.username);

                if (signer == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                if (!PW.Verify(args.password, signer.PasswordHash, signer.PasswordSalt))
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);

                return new Reader
                {
                    Id = signer.Id,
                    FirstName = signer.FirstName,
                    LastName = signer.LastName,
                    Barcode = signer.Barcode,
                };
            }
        }

        [HttpGet]
        [Route("api/user/signin/{barcode}")]
        public Librarian SignIn(string barcode)
        {
            using (var db = new favlEntities())
            {
                var signer = db.Librarians.FirstOrDefault(l => l.Barcode == barcode);

                if (signer == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return new Librarian {
                    Id = signer.Id,
                    FirstName = signer.FirstName,
                    LastName = signer.LastName
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
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode
                }).ToList();
            }
        }

        [HttpGet]
        [Route("api/books/checkout/{bookID}/{readerID}")]
        public Book CheckOutBook(int bookID, int readerID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);

                if (book == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                book.CheckedOutTo = readerID;

                db.SaveChanges();

                return new Book
                {
                    Title = book.Title,
                    AuthorFirst = book.AuthorFirst,
                    AuthorMiddle = book.AuthorMiddle,
                    AuthorLast = book.AuthorLast,
                    Barcode = book.Barcode
                };
            }
        }

        public class SignInArgs
        {
            public string password;
            public string username;
        }
    }
}