namespace University_Admission.ViewModel
{
    public class AnnouncementViewModel
    {
        public int Id { get; set; }
        public int EntryById { get; set; }
        public string EntryByName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public AnnouncementViewModel(
            int id,
            int entryById,
            string entryByName,
            DateTime createdAt,
            string title,
            string description
        )
        {
            Id = id;
            EntryById = entryById;
            EntryByName = entryByName;
            CreatedAt = createdAt;
            Title = title;
            Description = description;
        }
    }
}
