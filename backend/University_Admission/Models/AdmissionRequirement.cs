namespace University_Admission.Models
{
    public class AdmissionRequirement
    {
        public string ReuquirementId { get; set; }
        public string ProgramId { get; set; }
        public string ReuquirementName { get; set; }
        public bool IsMandatory { get; set; }
        public string Type { get; set; }

        public Program Program { get; set; }
    }
}
