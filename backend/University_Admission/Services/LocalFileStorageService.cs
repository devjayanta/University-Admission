using University_Admission.Interfaces;

namespace University_Admission.Services
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _root;
        private readonly string _upload_folder = "Upload";
        private readonly IHttpContextAccessor _contextAccessor;

        public LocalFileStorageService(IWebHostEnvironment hostEnvironment, IHttpContextAccessor contextAccessor)
        {
            _root = hostEnvironment.WebRootPath;
            _contextAccessor = contextAccessor;
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
                string url = $"{_contextAccessor.HttpContext?.Request.Scheme}://{_contextAccessor.HttpContext?.Request.Host}";
                string outputPath = Path.Combine(url, _upload_folder, fileName).Replace("\\", "/");
                return outputPath;
            }
            catch
            {
                throw;
            }
        }

        public async Task DeleteFile(string fileName)
        {
            try
            {
                await Task.Delay(0);
                string path = Path.Combine(_root, _upload_folder, fileName);
                File.Delete(path);
            }
            catch
            {
                throw;
            }
        }
    }
}
