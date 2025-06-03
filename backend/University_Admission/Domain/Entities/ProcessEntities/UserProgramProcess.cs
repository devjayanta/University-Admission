using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.Domain.Entities.ProcessEntities
{
    public class UserProgramProcess
    {
        [Key]
        public int Id { get; private set; }
        public int UserId { get; private set; }

        [ForeignKey("UserId")]
        public virtual User User { get; private set; }
        public int UniversityId { get; private set; }

        [ForeignKey("UniversityId")]
        public virtual University University { get; private set; }
        public int UniversityProgramId { get; private set; }

        [ForeignKey("UniversityProgramId")]
        public virtual UniversityProgram UniversityProgram { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime LastUpdated { get; private set; }
        public virtual ICollection<UserProgramRequirement> Requirements { get; private set; } = [];

#pragma warning disable CS8618
        public UserProgramProcess() { }
#pragma warning restore CS8618
    }
}
