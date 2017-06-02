using System;
using System.Security.Cryptography;

namespace website.admin
{
    public class PW
    {
        //	encryption and validation routines based on information available on the Web including https://crackstation.net/hashing-security.htm#aspsourcecode
        private const int SALT_SIZE = 24;

        private const int HASH_SIZE = 24;
        private const int ENCRYPTION_ITERATIONS = 377;

        public const int GOD_USER_ID = 43653;

        public static void Encrypt(string userPassword, out string pw, out string salt)
        {
            //	get some salt
            var saltBytes = new byte[SALT_SIZE];
            new RNGCryptoServiceProvider().GetBytes(saltBytes);

            //	hash the password using the salt
            var encrypter = new Rfc2898DeriveBytes(userPassword, saltBytes) {IterationCount = ENCRYPTION_ITERATIONS};
            var hashBytes = encrypter.GetBytes(HASH_SIZE);

            //	return base-64 strings of each pw and salt
            pw = Convert.ToBase64String(hashBytes);
            salt = Convert.ToBase64String(saltBytes);
        }

        public static bool Verify(string userPassword, string pw, string salt)
        {
            //	hash the incoming password using the provided base64 salt
            var encrypter =
                new Rfc2898DeriveBytes(userPassword, Convert.FromBase64String(salt))
                {
                    IterationCount = ENCRYPTION_ITERATIONS
                };
            var hashBytes = encrypter.GetBytes(HASH_SIZE);

            //  return the result of comparing the base64 encrypted hash to the incoming base64 pw
            return pw == Convert.ToBase64String(hashBytes);
        }

        public static string AdminCookie(int id)
        {
            var x = new Random().Next(117, 9839);
            return $"{id*x}|{x}";
        }

        public static bool VerifyAdminCookie(string adminCookie)
        {
            try
            {
                var parts = adminCookie.Split('|');

                var adminId = int.Parse(parts[0]) / int.Parse(parts[1]);

                if (adminId == GOD_USER_ID)
                {
                    return true;
                }

                using (var db = new favlEntities())
                {
                    return db.Admins.Find(adminId) != null;
                }
            }
            catch
            {
                return false;
            }
        }

        public static website.Admin GetAdminFromCookie(string adminCookie)
        {
            var parts = adminCookie.Split('|');

            var adminId = int.Parse(parts[0]) / int.Parse(parts[1]);

            if (adminId == GOD_USER_ID)
            {
                return new website.Admin()
                {
                    FirstName = "Super",
                    LastName = "User",
                    Username = "Admin"
                };
            }

            using (var db = new favlEntities())
            {
                return db.Admins.Find(adminId);
            }

        }

        public static bool AdminIsGod(string adminCookie)
        {
            try
            {
                var parts = adminCookie.Split('|');
                var adminId = int.Parse(parts[0]) / int.Parse(parts[1]);

                return adminId == GOD_USER_ID;
            }
            catch
            {
                return false;
            }
        }
    }
}