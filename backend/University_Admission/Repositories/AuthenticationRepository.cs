using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using University_Admission.Data;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.Domain.Enum;
using University_Admission.DTO;
using University_Admission.Interfaces;

namespace University_Admission.Repositories
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly ApplicationDbContext _context;
        public AuthenticationRepository(ApplicationDbContext appcontext)
        {
            _context = appcontext;
        }

        public async Task<bool> UserExists(string username) =>
        await _context.Users.AnyAsync(u => u.UserName == username.ToLower());

        public async Task<User> Register(RegisterDto dto)
        {
            try
            {
                var user = new User(dto.Username, dto.FirstName, dto.MiddleName, dto.LastName, dto.PassportNo, dto.NationalityId, dto.Gender, dto.Email, Role.Student);
                var hashpassword = HashPassword(dto.Password);
                user.UpdatePassword(hashpassword);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User?> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == dto.Username.ToLower());
            if (user == null) return null;

            bool isPasswordValid = VerifyPassword(dto.Password, user.PasswordHash);
            if (isPasswordValid)
                return user;

            return null;
        }

        private string HashPassword(string password)
        {
            using var hmac = new HMACSHA512();
            var salt = Convert.ToBase64String(hmac.Key);
            var hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
            return $"{salt}:{hash}";
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            var parts = passwordHash.Split(':');
            if (parts.Length != 2) return false;

            var saltBytes = Convert.FromBase64String(parts[0]);
            var expectedHash = parts[1];

            using var hmac = new HMACSHA512(saltBytes);
            var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));

            return computedHash == expectedHash;
        }

    }
}
