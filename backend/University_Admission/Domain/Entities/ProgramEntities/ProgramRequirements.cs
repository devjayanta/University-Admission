using System.ComponentModel.DataAnnotations;
using University_Admission.Domain.Enum;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class ProgramRequirements
    {
        [Key]
        public int Id { get; set; }
        public int UniversityProgramId { get; set; }
        public virtual UniversityProgram UniversityProgram { get; set; }
        public string Name { get; set; }
        public bool IsMandatory { get; set; }
        public RequirementType Type { get; set; }

#pragma warning disable CS8618
        public ProgramRequirements() { }
#pragma warning restore CS8618

        public ProgramRequirements(
            int universityProgramId,
            string name,
            bool isMandatory,
            RequirementType type
        )
        {
            UniversityProgramId = universityProgramId;
            UniversityProgram = default!;
            Name = name;
            IsMandatory = isMandatory;
            Type = type;
        }
    }
}
