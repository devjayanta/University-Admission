using University_Admission.Domain.Entities.CommonEntities;

namespace University_Admission.Data.SeedData
{
    public static class DocumentSeed
    {
        public static Document[] Documents =
        [
            new Document(1, "Transcript"),
            new Document(2, "Statement of Purpose (SOP)"),
            new Document(3, "Passport"),
            new Document(4, "Resume"),
            new Document(5, "Proof of Financial Support"),
            new Document(6, "Residence Certification"),
        ];
    }
}
