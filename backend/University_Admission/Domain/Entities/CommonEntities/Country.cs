using System.ComponentModel.DataAnnotations;

namespace University_Admission.Domain.Entities.CommonEntities
{
    public class Country
    {
        [Key]
        public int Id { get; private set; }

        [StringLength(50)]
        public string Name { get; private set; }

        [StringLength(3)]
        public string Code { get; private set; }

        [StringLength(30)]
        public string DialCode { get; private set; }

#pragma warning disable CS8618
        public Country() { }
#pragma warning restore CS8618

        public Country(int id, string name, string code, string dialCode)
        {
            Id = id;
            Name = name;
            Code = code;
            DialCode = dialCode;
        }
    }
}
