using System.ComponentModel.DataAnnotations;

namespace University_Admission.Domain.Entities.UserEntities
{
    public class Announcement
    {
        [Key]
        public int Id { get; private set; }
        public int EntryById { get; private set; }
        public virtual User EntryBy { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

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
    }
}
