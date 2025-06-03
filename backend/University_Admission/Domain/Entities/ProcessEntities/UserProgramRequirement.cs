using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.ProgramEntities;

namespace University_Admission.Domain.Entities.ProcessEntities
{
    public class UserProgramRequirement
    {
        [Key]
        public int Id { get; private set; }
        public int UserProgramProcessId { get; private set; }

        [ForeignKey("UserProgramProcessId")]
        public virtual UserProgramProcess UserProgramProcess { get; private set; }
        public int ProgramRequirementId { get; private set; }

        [ForeignKey("ProgramRequirementId")]
        public virtual ProgramRequirement ProgramRequirement { get; private set; }
        public string Value { get; private set; }

#pragma warning disable CS8618
        public UserProgramRequirement() { }
#pragma warning restore CS8618
    }
}
