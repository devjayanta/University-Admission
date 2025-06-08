using AutoMapper;
using University_Admission.Domain.Entities.CommonEntities;

namespace University_Admission.ViewModel
{
    public class DocumentViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DocumentViewModel()
        {
            Name = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Document, DocumentViewModel>();
            }
        }
    }
}
