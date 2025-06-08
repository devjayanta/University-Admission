using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.ViewModel
{
    public class UserProcessViewModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public int? UniversityId { get; set; }
        public string? UniversityName { get; set; }
        public int? UniversityProgramId { get; set; }
        public string? UniversityProgramName { get; set; }
        public List<UserRequirementsViewModel>? Requirements { get; set; }

        public UserProcessViewModel() { }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProgramProcess, UserProcessViewModel>()
                    .ForMember(dst => dst.UserName, opt => opt.MapFrom(src => src.User.UserName))
                    .ForMember(
                        dst => dst.UniversityName,
                        opt => opt.MapFrom(src => src.University.Name)
                    )
                    .ForMember(
                        dst => dst.UniversityProgramName,
                        opt => opt.MapFrom(src => src.UniversityProgram.Name)
                    );
            }
        }
    }
}
