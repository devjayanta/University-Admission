using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;
using University_Admission.Domain.Entities.CommonEntities;
using University_Admission.Domain.Entities.ProcessEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.Domain.Entities.UserEntities
{
    public class User : DatedEntity
    {
        [Key]
        public int Id { get; private set; }

        [Required]
        [StringLength(50, ErrorMessage = "Too Long")]
        public string UserName { get; private set; }

        [StringLength(50, ErrorMessage = "Too Long")]
        public string FirstName { get; private set; }

        [StringLength(50, ErrorMessage = "Too Long")]
        public string? MiddleName { get; private set; }

        [StringLength(50, ErrorMessage = "Too Long")]
        public string LastName { get; private set; }

        [StringLength(50)]
        public string PassportNo { get; private set; }
        public int NationalityId { get; private set; }

        [ForeignKey("NationalityId")]
        public virtual Country Nationality { get; private set; }
        public Gender Gender { get; private set; }

        [Required]
        [EmailAddress]
        public string Email { get; private set; }
        public Role Role { get; private set; }

        [StringLength(500)]
        public string PasswordHash { get; private set; }
        public virtual ICollection<Announcement> Announcements { get; private set; } = [];
        public virtual ICollection<Notification> Notifications { get; private set; } = [];
        public virtual ICollection<UserProgramProcess> Processes { get; private set; } = [];

        [NotMapped]
        public string FullName =>
            FirstName + " " + (string.IsNullOrEmpty(MiddleName) ? "" : MiddleName + " ") + LastName;

#pragma warning disable CS8618
        public User() { }
#pragma warning restore CS8618

        public User(
            string userName,
            string firstName,
            string? middleName,
            string lastName,
            string passportNo,
            int nationalityId,
            Gender gender,
            string email,
            Role role
        )
        {
            UserName = userName;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            PassportNo = passportNo;
            NationalityId = nationalityId;
            Nationality = default!;
            Gender = gender;
            Email = email;
            Role = role;
            PasswordHash = string.Empty;
        }

        public void UpdatePassword(string password)
        {
            PasswordHash = password;
        }

        public void AddNotification(Notification notification)
        {
            Notifications.Add(notification);
        }
    }
}
