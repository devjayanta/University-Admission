using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;

namespace University_Admission.ViewModel
{
    public class UniversityViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CountryViewModel? Country { get; set; }
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? WebSite { get; set; }
        public List<UniversityProgramViewModel>? UniversityPrograms { get; set; }

        public UniversityViewModel()
        {
            Name = string.Empty;
            AddressLine1 = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<University, UniversityViewModel>();
            }
        }
    }
}
