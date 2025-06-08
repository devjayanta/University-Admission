using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.ViewModel
{
    public class ProgramRequirementViewModel
    {
        public int Id { get; set; }
        public int? UniversityProgramId { get; set; }
        public string? UniversityProgramName { get; set; }
        public string Name { get; set; }
        public bool IsMandatory { get; set; }
        public RequirementType Type { get; set; }

        public ProgramRequirementViewModel()
        {
            Name = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<ProgramRequirement, ProgramRequirementViewModel>()
                    .ForMember(
                        dst => dst.UniversityProgramName,
                        opt => opt.MapFrom(src => src.UniversityProgram.Name)
                    );
            }
        }
    }
}
