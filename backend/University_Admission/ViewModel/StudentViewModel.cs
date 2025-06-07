using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.ViewModel
{
    public class StudentViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string PassportNo { get; set; }
        public CountryViewModel? Nationality { get; set; }
        public Gender Gender { get; set; }
        public string Email { get; set; }
        public List<AnnouncementViewModel>? Announcements { get; set; }

        // public List<NotificationViewModel>? Notifications { get; set; }
        public List<UserProcessViewModel>? Processes { get; set; }

        public StudentViewModel()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            FullName = string.Empty;
            PassportNo = string.Empty;
            Email = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<User, StudentViewModel>();
            }
        }
    }
}
