using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.DTO
{
    public class UserProcessDto
    {
        public int UniversityProgramId { get; set; }
        public List<UserRequirementsDto>? Requirements { get; set; }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProcessDto, UserProgramProcess>();
            }
        }
    }
}
