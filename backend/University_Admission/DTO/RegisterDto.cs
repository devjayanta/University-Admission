using System.ComponentModel.DataAnnotations;
using University_Admission.Domain.Enum;

namespace University_Admission.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string FirstName { get; set; }
      
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        public string Password { get; set; }
        [Required]
        public string PassportNo { get; set; }
        [Required]
        public int NationalityId { get; set; }
        public Gender Gender { get; private set; }

        public string Email { get; set; }

        public RegisterDto(string username, string firstname, string middlename, string lastname, string password, string passportno, int nationalityId, Gender gender, string email)
        {
            Username = username;
            FirstName = firstname;
            MiddleName = middlename;
            LastName = lastname;
            Password = password;
            PassportNo = passportno;
            NationalityId = nationalityId;
            Gender = gender;
            Email = email;
        }
    }
}
