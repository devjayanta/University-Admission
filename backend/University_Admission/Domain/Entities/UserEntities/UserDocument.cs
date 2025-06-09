using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.CommonEntities;

namespace University_Admission.Domain.Entities.UserEntities
{
    public class UserDocument
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int DocumentId { get; set; }

        [ForeignKey("DocumentId")]
        public virtual Document Document { get; set; }

        [StringLength(250)]
        public string Value { get; set; }

#pragma warning disable CS8618
        public UserDocument() { }
#pragma warning restore CS8618

        public void Update(string value)
        {
            Value = value;
        }

        public void AddUser(int userId)
        {
            UserId = userId;
        }
    }
}
