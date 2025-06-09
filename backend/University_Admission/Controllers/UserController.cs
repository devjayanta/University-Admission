using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.DTO;
using University_Admission.Interfaces;
using University_Admission.Services;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IFileStorageService _fileStorageService;

        public UserController(
            ApplicationDbContext db,
            IMapper mapper,
            ICurrentUserService currentUserService,
            IFileStorageService fileStorageService
        )
        {
            _db = db;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _fileStorageService = fileStorageService;
        }

        [HttpGet("GetAllUserDocuments")]
        public async Task<ActionResult<Response<List<UserDocumentViewModel>>>> GetAllUserDocuments()
        {
            try
            {
                var document = await _db
                    .UserDocuments.Where(ud => ud.UserId == _currentUserService.UserId)
                    .Include(ud => ud.Document)
                    .ToListAsync();
                if (document == null)
                {
                    return Response<List<UserDocumentViewModel>>.FailureResponse(
                        "No documents uploaded yet"
                    );
                }
                return Response<List<UserDocumentViewModel>>.SuccessResponse(
                    _mapper.Map<List<UserDocumentViewModel>>(document)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UserDocumentViewModel>>.FailureResponse(ex);
            }
        }

        [HttpPost("CreateUserDocument")]
        public async Task<ActionResult<Response<UserDocumentViewModel>>> CreateUserDocument(
            [FromBody] UserDocumentDto request
        )
        {
            try
            {
                
                var document = _mapper.Map<UserDocument>(request);
                document.AddUser(_currentUserService.UserId);
                _db.UserDocuments.Add(document);
                await _db.SaveChangesAsync();
                return Response<UserDocumentViewModel>.SuccessResponse(
                    _mapper.Map<UserDocumentViewModel>(document)
                );
            }
            catch (Exception ex)
            {
                return Response<UserDocumentViewModel>.FailureResponse(ex);
            }
        }

        [HttpPut("UpdateUserDocument")]
        public async Task<ActionResult<Response<UserDocumentViewModel>>> UpdateUserDocument(
            [FromQuery] int Id,
            [FromBody] UserDocumentDto request
        )
        {
            try
            {
                var document = await _db
                    .UserDocuments.Where(ud => ud.Id == Id)
                    .SingleOrDefaultAsync();
                if (document == null)
                {
                    return Response<UserDocumentViewModel>.FailureResponse(
                        $"No document with id {Id} uploaded yet"
                    );
                }
                document.Update(request.Value);
                await _db.SaveChangesAsync();
                return Response<UserDocumentViewModel>.SuccessResponse(
                    _mapper.Map<UserDocumentViewModel>(document)
                );
            }
            catch (Exception ex)
            {
                return Response<UserDocumentViewModel>.FailureResponse(ex);
            }
        }

        [HttpDelete("DeleteUserDocument")]
        public async Task<ActionResult<Response<UserDocumentViewModel>>> DeleteUserDocument(
            [FromQuery] int Id
        )
        {
            try
            {
                var document = await _db
                    .UserDocuments.Where(ud => ud.Id == Id)
                    .SingleOrDefaultAsync();
                if (document == null)
                {
                    return Response<UserDocumentViewModel>.FailureResponse(
                        $"No document with id {Id} uploaded yet"
                    );
                }
                await _fileStorageService.DeleteFile(document.Value);
                _db.UserDocuments.Remove(document);
                await _db.SaveChangesAsync();
                return Response<UserDocumentViewModel>.SuccessResponse(
                    _mapper.Map<UserDocumentViewModel>(document)
                );
            }
            catch (Exception ex)
            {
                return Response<UserDocumentViewModel>.FailureResponse(ex);
            }
        }
    }
}
