namespace University_Admission.DTO
{
    public class FileUploadDto
    {
        public IFormFile File { get; set; }

        public FileUploadDto()
        {
            File = default!;
        }
    }
}
