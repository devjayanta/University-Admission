namespace University_Admission.ViewModel
{
    public class DashboardCountsViewModel
    {
        public int UniversityCount { get; set; }
        public int ProgramCount { get; set; }
        public int ApplicationCount { get; set; }
        public int SubmittedApplicationCount { get; set; }
        public int ApprovedApplicationCount { get; set; }
        public int RejectedApplicationCount { get; set; }

        public DashboardCountsViewModel(
            int universityCount,
            int programCount,
            int applicationCount,
            int submittedApplicationCount,
            int approvedApplicationCount,
            int rejectedApplicationCount
        )
        {
            UniversityCount = universityCount;
            ProgramCount = programCount;
            ApplicationCount = applicationCount;
            SubmittedApplicationCount = submittedApplicationCount;
            ApprovedApplicationCount = approvedApplicationCount;
            RejectedApplicationCount = rejectedApplicationCount;
        }
    }
}
