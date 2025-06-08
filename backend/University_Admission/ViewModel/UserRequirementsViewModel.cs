using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.ViewModel
{
    public class UserRequirementsViewModel
    {
        public int Id { get; set; }
        public int? UserProgramProcessId { get; set; }
        public int? ProgramRequirementId { get; set; }
        public string? ProgramRequirementName { get; set; }
        public string? Value { get; set; }

        public UserRequirementsViewModel() { }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProgramRequirement, UserRequirementsViewModel>()
                    .ForMember(
                        dst => dst.ProgramRequirementName,
                        opt => opt.MapFrom(src => src.ProgramRequirement.Name)
                    );
            }
        }
    }
}
