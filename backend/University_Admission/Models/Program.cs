namespace University_Admission.Models
{
    public class Program
    {
        public string ProgramId { get; set; }
        public string UniversityId { get; set; }
        public string ProgramName { get; set; }
        public string Level { get; set; }
        public string Fees { get; set; }
        public string Language { get; set; }
        public string Status { get; set; }
        public University University { get; set; }
        public List<AdmissionRequirement> admissionRequirements { get; set; }

    }
}
