using System.ComponentModel.DataAnnotations;

namespace University_Admission.Models
{
    public class User
    {
        [Required]
        public string UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? Nationality { get; set; }
        public string? PassportNo { get; set; }
        public string? CreateedAt { get; set; }
    }
}
