using AutoMapper;
using University_Admission.Domain.Entities.CommonEntities;

namespace University_Admission.ViewModel
{
    public class CountryViewModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string DialCode { get; set; }

        public CountryViewModel()
        {
            Name = string.Empty;
            Code = string.Empty;
            DialCode = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Country, CountryViewModel>();
            }
        }
    }
}
