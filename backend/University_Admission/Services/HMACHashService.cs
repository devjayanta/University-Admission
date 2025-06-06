using System.Security.Cryptography;
using System.Text;
using University_Admission.Interfaces;

namespace University_Admission.Services
{
    public class HMACHashService : IHashService
    {
        public string GetHash(string text)
        {
            using var hmac = new HMACSHA512();
            var salt = Convert.ToBase64String(hmac.Key);
            var hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(text)));
            return $"{salt}:{hash}";
        }

        public bool VerifyHash(string text, string hash)
        {
            var parts = hash.Split(':');
            if (parts.Length != 2)
                return false;

            var saltBytes = Convert.FromBase64String(parts[0]);
            var expectedHash = parts[1];

            using var hmac = new HMACSHA512(saltBytes);
            var computedHash = Convert.ToBase64String(
                hmac.ComputeHash(Encoding.UTF8.GetBytes(text))
            );

            return computedHash == expectedHash;
        }
    }
}
