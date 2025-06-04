using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.ViewModel
{
    public class AnnouncementViewModel
    {
        public int Id { get; set; }
        public int EntryById { get; set; }
        public string EntryByName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public AnnouncementViewModel()
        {
            EntryByName = string.Empty;
            Title = string.Empty;
            Description = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Announcement, AnnouncementViewModel>()
                    .ForMember(dst => dst.EntryById, opt => opt.MapFrom(src => src.EntryById))
                    .ForMember(
                        dst => dst.EntryByName,
                        opt => opt.MapFrom(src => src.EntryBy.FullName)
                    );
            }
        }
    }
}
