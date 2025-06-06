using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.DTO
{
    public class UserRequirementsDto
    {
        public int? Id { get; set; }
        public int ProgramRequirementId { get; set; }
        public string Value { get; set; }

        public UserRequirementsDto()
        {
            Value = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserRequirementsDto, UserProgramRequirement>();
            }
        }
    }
}
