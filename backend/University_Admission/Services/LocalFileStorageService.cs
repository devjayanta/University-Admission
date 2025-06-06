using University_Admission.Interfaces;

namespace University_Admission.Services
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _root;
        private readonly string _upload_folder = "Upload";

        public LocalFileStorageService(IWebHostEnvironment hostEnvironment)
        {
            _root = hostEnvironment.ContentRootPath;
        }

        public async Task<byte[]> GetFile(string fileName)
        {
            try
            {
                string path = Path.Combine(_root, _upload_folder, fileName);
                return await File.ReadAllBytesAsync(path);
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> SaveFile(IFormFile file)
        {
            try
            {
                string filePath = Path.Combine(_root, _upload_folder);
                _ = Directory.CreateDirectory(filePath);
                string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                using (var stream = File.Create(Path.Combine(filePath, fileName)))
                {
                    await file.CopyToAsync(stream);
                }
                return fileName;
            }
            catch
            {
                throw;
            }
        }
    }
}
