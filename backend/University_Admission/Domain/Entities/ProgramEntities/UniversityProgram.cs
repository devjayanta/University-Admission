using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class UniversityProgram : DatedEntity
    {
        [Key]
        public int Id { get; private set; }
        public int UniversityId { get; private set; }

        [ForeignKey("UniversityId")]
        public virtual University University { get; private set; }

        [StringLength(250)]
        public string Name { get; private set; }

        [StringLength(50)]
        public string? Level { get; private set; }
        public decimal? Fee { get; private set; }

        [StringLength(50)]
        public string? Currency { get; private set; }

        [StringLength(100)]
        public string? Language { get; private set; }
        public virtual ICollection<ProgramRequirement> ProgramRequirements { get; private set; } =
            [];

#pragma warning disable CS8618
        public UniversityProgram() { }
#pragma warning restore CS8618

        public void Update(
            string name,
            string? level,
            decimal? fee,
            string? currency,
            string? language
        )
        {
            Name = name;
            Level = level;
            Fee = fee;
            Currency = currency;
            Language = language;
        }
    }
}
