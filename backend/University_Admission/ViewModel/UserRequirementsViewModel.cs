using AutoMapper;
using University_Admission.Domain.Entities.ProcessEntities;

namespace University_Admission.ViewModel
{
    public class UserRequirementsViewModel
    {
        public int Id { get; set; }
        public virtual UserProcessViewModel? UserProgramProcess { get; set; }
        public virtual ProgramRequirementViewModel? ProgramRequirement { get; set; }
        public string Value { get; set; }

        public UserRequirementsViewModel()
        {
            Value = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProgramRequirement, UserRequirementsViewModel>();
            }
        }
    }
}
