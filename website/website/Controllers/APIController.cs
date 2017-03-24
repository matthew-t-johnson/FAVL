using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using website.admin;

namespace website.Controllers
{
    public class APIController : ApiController
    {
        public class AddUserArgs
        {
            public string firstName;
            public string lastName;
            public string barcode;
            public int ID;
        }

        public class SignInArgs
        {
            public string username;
            public string password;
        }


        [HttpGet]
        [Route("api/user/{userID}")]
        public AddUserArgs GetUser(int userID)
        {
            using (var db = new favlEntities())
            {
                var reader = db.Readers.FirstOrDefault(r => r.Id == userID);

                if (reader == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return new AddUserArgs
                {
                    firstName = reader.FirstName,
                    lastName = reader.LastName,
                    barcode = reader.Barcode,
                    ID = reader.Id
                };
            }
        }

        [HttpPost]
        [Route("api/user/add")]
        public int AddUser([FromBody] AddUserArgs args)
        {
            using (var db = new favlEntities())
            {
                var addedReader = db.Readers.Add(new Readers {
                    FirstName = args.firstName,
                    LastName = args.lastName,
                    Barcode = args.barcode
                });

                db.SaveChanges();

                return addedReader.Id;
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
        public Readers AddReader([FromBody] Readers reader)
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
        public IEnumerable<Books> GetBooks()
        {
            using (var db = new favlEntities())
            {
                return db.Books.ToList();
            }
        }

        [HttpGet]
        [Route("api/books/{libraryID}")]
        public IEnumerable<Books> GetLibraryBooks(int libraryID)
        {
            using (var db = new favlEntities())
            {
                return db.Books.Where(b => b.LibraryID == libraryID).ToList();
            }
        }


        [HttpGet]
        [Route("api/books/checkout/{bookID}/{readerID}")]
        public Books CheckOutBook(int bookID, int readerID)
        {
            using (var db = new favlEntities())
            {
                var book = db.Books.Find(bookID);

                if (book == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                book.CheckedOutTo = readerID;

                db.SaveChanges();

                return book;
            }
        }
    }
}
