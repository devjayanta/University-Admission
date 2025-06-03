namespace University_Admission.Domain.Entities.CommonEntities
{
    public class Country
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Code { get; private set; }
        public string DialCode { get; private set; }

#pragma warning disable CS8618
        public Country() { }
#pragma warning restore CS8618

        public Country(string name, string code, string dialCode)
        {
            Name = name;
            Code = code;
            DialCode = dialCode;
        }
    }
}
