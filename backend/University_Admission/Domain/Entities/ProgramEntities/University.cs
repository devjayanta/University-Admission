using System.ComponentModel.DataAnnotations;
using University_Admission.Domain.Entities.CommonEntities;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class University
    {
        public int Id { get; private set; }

        [StringLength(250)]
        public string Name { get; private set; }
        public int CountryId { get; private set; }
        public Country Country { get; private set; }

        [StringLength(500)]
        public string AddressLine1 { get; private set; }

        [StringLength(500)]
        public string? AddressLine2 { get; private set; }

        [StringLength(100)]
        public string? WebSite { get; private set; }
        public virtual ICollection<UniversityProgram> UniversityPrograms { get; set; } = [];

#pragma warning disable CS8618
        public University() { }
#pragma warning restore CS8618

        public University(
            string name,
            int countryId,
            string addressLine1,
            string addressLine2,
            string website
        )
        {
            Name = name;
            CountryId = countryId;
            Country = default!;
            AddressLine1 = addressLine1;
            AddressLine2 = addressLine2;
            WebSite = website;
        }
    }
}
