using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University_Admission.DTO;
using University_Admission.Interfaces;
using University_Admission.Utilities;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FileController : ControllerBase
    {
        private readonly IFileStorageService _fileStorageService;

        public FileController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpPost]
        public async Task<ActionResult<Response<string>>> UploadFile(
            [FromBody] FileUploadDto request
        )
        {
            try
            {
                var fileName = await _fileStorageService.SaveFile(request.File);
                return Response<string>.SuccessResponse(fileName, "Successfully Uploaded");
            }
            catch (Exception ex)
            {
                return Response<string>.FailureResponse(ex);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Response<FileContentResult>>> GetFile(
            [FromQuery] string FileName
        )
        {
            try
            {
                var fileRes = await _fileStorageService.GetFile(FileName);
                return File(fileRes, MimeTypes.GetByExtension(Path.GetExtension(FileName)));
            }
            catch (Exception ex)
            {
                return Response<FileContentResult>.FailureResponse(ex);
            }
        }
    }
}
