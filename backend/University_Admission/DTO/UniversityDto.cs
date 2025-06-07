using System.ComponentModel.DataAnnotations;
using AutoMapper;
using University_Admission.Domain.Entities.ProgramEntities;

namespace University_Admission.DTO
{
    public class UniversityDto
    {
        [Required]
        public string Name { get; private set; }
        public int CountryId { get; private set; }

        [Required]
        public string AddressLine1 { get; private set; }
        public string? AddressLine2 { get; private set; }
        [Url]
        public string? WebSite { get; private set; }

        public UniversityDto(
            string name,
            int countryId,
            string addressLine1,
            string? addressLine2,
            string? website
        )
        {
            Name = name;
            CountryId = countryId;
            AddressLine1 = addressLine1;
            AddressLine2 = addressLine2;
            WebSite = website;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UniversityDto, University>();
            }
        }
    }
}
