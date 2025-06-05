using System.ComponentModel.DataAnnotations;
using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.DTO
{
    public class AnnouncementDto
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }

        public AnnouncementDto()
        {
            Title = string.Empty;
            Description = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Announcement, AnnouncementDto>().ReverseMap();
            }
        }
    }
}
