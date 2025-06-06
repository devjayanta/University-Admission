using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.ViewModel
{
    public class UserProcessViewModel
    {
        public int Id { get; set; }
        public UserShortViewModel? User { get; set; }
        public UniversityViewModel? University { get; set; }
        public UniversityProgramViewModel? UniversityProgram { get; set; }
        public List<UserRequirementsViewModel>? Requirements { get; set; }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProgramProcess, UserProcessViewModel>();
            }
        }
    }
}
