using System.ComponentModel.DataAnnotations;

namespace University_Admission.Domain.Entities.CommonEntities
{
    public class Document
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

#pragma warning disable CS8618
        public Document() { }
#pragma warning restore CS8618

        public Document(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
