using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.BaseEntities;

namespace University_Admission.Domain.Entities.UserEntities
{
    public class Notification : DatedEntity
    {
        public int Id { get; private set; }

        [StringLength(250)]
        public string Title { get; private set; }

        [StringLength(5000)]
        public string Description { get; private set; }
        public bool IsRead { get; private set; } = false;
        public int UserId { get; private set; }

        [ForeignKey("UserId")]
        public virtual User User { get; private set; }

#pragma warning disable CS8618
        public Notification() { }
#pragma warning restore CS8618

        public void Read()
        {
            IsRead = true;
        }
    }
}
