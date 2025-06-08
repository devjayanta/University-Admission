using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class ProgramRequirement : DatedEntity
    {
        [Key]
        public int Id { get; private set; }
        public int UniversityProgramId { get; private set; }

        [ForeignKey("UniversityProgramId")]
        public virtual UniversityProgram UniversityProgram { get; private set; }
        public string Name { get; private set; }
        public bool IsMandatory { get; private set; }
        public RequirementType Type { get; private set; }

        [StringLength(2000)]
        public string? Value { get; private set; }

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

        public void Update(string name, bool isMandatory, RequirementType type, string? value)
        {
            Name = name;
            IsMandatory = isMandatory;
            Type = type;
            Value = value;
        }
    }
}
