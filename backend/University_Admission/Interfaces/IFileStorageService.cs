namespace University_Admission.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> SaveFile(IFormFile file);
        Task<byte[]> GetFile(string fileName);
    }
}
