using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;

namespace University_Admission.ViewModel
{
    public class UniversityProgramViewModel
    {
        public int Id { get; set; }
        public int? UniversityId { get; set; }
        public string? UniversityName { get; set; }
        public string Name { get; set; }
        public string? Level { get; set; }
        public decimal? Fee { get; set; }
        public List<ProgramRequirementViewModel>? ProgramRequirements { get; set; }

        public UniversityProgramViewModel()
        {
            Name = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UniversityProgram, UniversityProgramViewModel>();
            }
        }
    }
}
