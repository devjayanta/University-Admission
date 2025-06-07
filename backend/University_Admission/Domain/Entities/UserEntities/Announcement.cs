using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;

namespace University_Admission.Domain.Entities.UserEntities
{
    public class Announcement : DatedEntity
    {
        [Key]
        public int Id { get; private set; }
        public int EntryById { get; private set; }

        [ForeignKey("EntryById")]
        public virtual User EntryBy { get; private set; }

        [StringLength(250)]
        public string Title { get; private set; }

        [StringLength(5000)]
        public string Description { get; private set; }

#pragma warning disable CS8618
        public Announcement() { }
#pragma warning restore CS8618

        public Announcement(int entryById, string title, string description)
        {
            EntryById = entryById;
            EntryBy = default!;
            Title = title;
            Description = description;
        }

        public void AddEntryBy(int entryById)
        {
            EntryById = entryById;
        }

        public void Update(string title, string description)
        {
            Title = title;
            Description = description;
        }
    }
}
