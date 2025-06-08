using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.DTO
{
    public class UserDocumentDto
    {
        public int DocumentId { get; set; }
        public string Value { get; set; }

        public UserDocumentDto()
        {
            Value = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserDocumentDto, UserDocument>();
            }
        }
    }
}
