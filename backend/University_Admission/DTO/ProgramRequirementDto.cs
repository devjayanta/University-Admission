using System.ComponentModel.DataAnnotations;
using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.DTO
{
    public class ProgramRequirementDto
    {
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public bool IsMandatory { get; set; }
        public RequirementType Type { get; set; }

        public ProgramRequirementDto()
        {
            Name = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<ProgramRequirementDto, ProgramRequirement>();
            }
        }
    }
}
