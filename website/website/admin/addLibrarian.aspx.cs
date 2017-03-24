using System;
using System.Security.Cryptography;

namespace website.admin
{
    public partial class addLibrarian : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                return;

            if (Request.Form["Password"] != Request.Form["Password2"])
            {
                passwordError.Visible = true;
                return;
            }

            passwordError.Visible = false;

            using (var db = new favlEntities())
            {
                string hash, salt;
                PW.Encrypt(Request.Form["Password"], out hash, out salt);

                var librarian = new Librarians
                {
                    FirstName = Request.Form["FirstName"],
                    LastName = Request.Form["LastName"],
                    Username = Request.Form["Username"],
                    IsAdmin = false,
                    PasswordHash = hash,
                    PasswordSalt = salt
                };

                db.Librarians.Add(librarian);
                db.SaveChanges();
            }

            Response.Redirect("librarians.aspx");
        }

    }

    public class PW
    {
        //	encryption and validation routines based on information available on the Web including https://crackstation.net/hashing-security.htm#aspsourcecode
        private const int SALT_SIZE = 24;
        private const int HASH_SIZE = 24;
        private const int ENCRYPTION_ITERATIONS = 377;

        public static void Encrypt(string userPassword, out string pw, out string salt)
        {
            //	get some salt
            var saltBytes = new byte[SALT_SIZE];
            new RNGCryptoServiceProvider().GetBytes(saltBytes);

            //	hash the password using the salt
            var encrypter = new Rfc2898DeriveBytes(userPassword, saltBytes) { IterationCount = ENCRYPTION_ITERATIONS };
            var hashBytes = encrypter.GetBytes(HASH_SIZE);

            //	return base-64 strings of each pw and salt
            pw = Convert.ToBase64String(hashBytes);
            salt = Convert.ToBase64String(saltBytes);
        }

        public static bool Verify(string userPassword, string pw, string salt)
        {
            //	hash the incoming password using the provided base64 salt
            var encrypter = new Rfc2898DeriveBytes(userPassword, Convert.FromBase64String(salt)) { IterationCount = ENCRYPTION_ITERATIONS };
            var hashBytes = encrypter.GetBytes(HASH_SIZE);

            //  return the result of comparing the base64 encrypted hash to the incoming base64 pw
            return (pw == Convert.ToBase64String(hashBytes));
        }
    }
}