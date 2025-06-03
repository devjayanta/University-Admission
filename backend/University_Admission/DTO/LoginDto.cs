using System.ComponentModel.DataAnnotations;

namespace University_Admission.DTO
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public LoginDto(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}
