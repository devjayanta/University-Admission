namespace University_Admission.Domain.Entities.BaseEntities
{
    public class DatedEntity
    {
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime? LastUpdated { get; private set; }
        public DateTime? DeletedAt { get; private set; }

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
