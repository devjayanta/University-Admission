using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.ViewModel
{
    public class UserShortViewModel
    {
        public int Id { get; private set; }
        public string UserName { get; private set; }

        public UserShortViewModel()
        {
            UserName = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<User, UserShortViewModel>();
            }
        }
    }
}
