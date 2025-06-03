namespace University_Admission.Models
{
    public class University
    {
        public string UniversityId { get; set; }
        public string UniversityName { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }

        public List<Program> Programs { get; set; }

    }
}
