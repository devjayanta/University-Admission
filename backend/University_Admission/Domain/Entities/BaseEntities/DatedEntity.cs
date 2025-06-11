namespace University_Admission.Domain.Entities.BaseEntities
{
    public class DatedEntity
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastUpdated { get; set; }
        public DateTime? DeletedAt { get; set; }

        public void Delete()
        {
            DeletedAt = DateTime.UtcNow;
        }

        public void MarkUpdated()
        {
            LastUpdated = DateTime.UtcNow;
        }
    }
}
