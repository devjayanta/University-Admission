using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.ViewModel
{
    public class NotificationViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsRead { get; set; } = false;

        public NotificationViewModel()
        {
            Title = string.Empty;
            Description = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Notification, NotificationViewModel>();
            }
        }
    }
}
