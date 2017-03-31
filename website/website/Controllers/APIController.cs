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
        public Reader GetUser(int userID)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.FirstOrDefault(r => r.Id == userID);

                if (reader == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                return reader;
            }
        }

        [HttpGet]
        [Route("api/libraries")]
        public IEnumerable<Library> GetLibraries()
        {
            using (var db = new favlEntities())
            {
                return db.Libraries.ToList();
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
        [Route("api/user/signin")]
        public int SignIn([FromBody] SignInArgs args)
        {
            using (var db = new favlEntities())
            {
                var signer = db.Librarians.FirstOrDefault(l => l.Username == args.username);

                if (signer == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                if (!PW.Verify(args.password, signer.PasswordHash, signer.PasswordSalt))
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);

                return signer.Id;
            }
        }

        [HttpPost]
        [Route("api/reader/add")]
        public Reader AddReader([FromBody] Reader reader)
        {
            using (var db = new favlEntities())
            {
                var addedReader = db.Readers.Add(reader);

                db.SaveChanges();

                return addedReader;
            }
        }

        [HttpGet]
        [Route("api/books")]
        public IEnumerable<Book> GetBooks()
        {
            using (var db = new favlEntities())
            {
                return db.Books.ToList();
            }
        }

        [HttpGet]
        [Route("api/books/{libraryID}")]
        public IEnumerable<Book> GetLibraryBooks(int libraryID)
        {
            using (var db = new favlEntities())
            {
                return db.Books.Where(b => b.LibraryID == libraryID).ToList();
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

                return book;
            }
        }

        public class SignInArgs
        {
            public string password;
            public string username;
        }
    }
}