using System.ComponentModel.DataAnnotations;

namespace University_Admission.Domain.Entities.ProgramEntities
{
    public class UniversityProgram
    {
        [Key]
        public int Id { get; private set; }
        public int UniversityId { get; private set; }
        public virtual University University { get; private set; }

        [StringLength(250)]
        public string Name { get; private set; }

        [StringLength(50)]
        public string? Level { get; private set; }
        public decimal? Fee { get; private set; }

#pragma warning disable CS8618
        public UniversityProgram() { }
#pragma warning restore CS8618

        public UniversityProgram(int universityId, string name, string? level, decimal? fee)
        {
            UniversityId = universityId;
            University = default!;
            Name = name;
            Level = level;
            Fee = fee;
        }
    }
}
