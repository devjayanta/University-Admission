using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class ProgramRequirement : DatedEntity
    {
        [Key]
        public int Id { get; set; }
        public int UniversityProgramId { get; set; }

        [ForeignKey("UniversityProgramId")]
        public virtual UniversityProgram UniversityProgram { get; set; }
        public string Name { get; set; }
        public bool IsMandatory { get; set; }
        public RequirementType Type { get; set; }

#pragma warning disable CS8618
        public ProgramRequirement() { }
#pragma warning restore CS8618

        public ProgramRequirement(
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

        public void Update(string name, bool isMandatory, RequirementType type)
        {
            Name = name;
            IsMandatory = isMandatory;
            Type = type;
        }
    }
}
