using System.ComponentModel.DataAnnotations;
using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;

namespace University_Admission.DTO
{
    public class UniversityProgramDto
    {
        public int UniversityId { get; set; }

        [Required]
        public string Name { get; set; }
        public string? Level { get; set; }
        public decimal? Fee { get; set; }
        public string? Currency { get; set; }
        public string? Language { get; set; }
        public string? Duration { get; set; }
        public List<ProgramRequirementDto>? ProgramRequirements { get; set; }

        public UniversityProgramDto()
        {
            Name = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UniversityProgramDto, UniversityProgram>();
            }
        }
    }
}
