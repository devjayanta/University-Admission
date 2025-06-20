﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.DTO;
using University_Admission.Interfaces;
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

        [HttpGet("GetAllUserDocumentsByUserId")]
        [Authorize(Roles = "admin")]
        public async Task<
            ActionResult<Response<List<UserDocumentViewModel>>>
        > GetAllUserDocumentsByUserId([FromQuery] int Id)
        {
            try
            {
                var document = await _db
                    .UserDocuments.Where(ud => ud.UserId == Id)
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

        [HttpGet("GetAllUserDocumentsByUserName")]
        [Authorize(Roles = "admin")]
        public async Task<
            ActionResult<Response<List<UserDocumentViewModel>>>
        > GetAllUserDocumentsByUserName([FromQuery] string UserName)
        {
            try
            {
                var document = await _db
                    .UserDocuments.Where(ud => ud.User.UserName == UserName)
                    .Include(ud => ud.Document)
                    .Include(ud => ud.User)
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

        [HttpGet("GetAllUserNotifications")]
        public async Task<
            ActionResult<Response<List<NotificationViewModel>>>
        > GetAllUserNotifications()
        {
            try
            {
                var notification = await _db
                    .Notification.Where(n => n.UserId == _currentUserService.UserId)
                    .OrderByDescending(n => n.IsRead)
                    .ToListAsync();
                return Response<List<NotificationViewModel>>.SuccessResponse(
                    _mapper.Map<List<NotificationViewModel>>(notification)
                );
            }
            catch (Exception ex)
            {
                return Response<List<NotificationViewModel>>.FailureResponse(ex);
            }
        }

        [HttpGet("ReadUserNotification")]
        public async Task<ActionResult<Response<NotificationViewModel>>> ReadUserNotification(
            [FromQuery] int Id
        )
        {
            try
            {
                var notification = await _db
                    .Notification.Where(n => n.Id == Id && n.UserId == _currentUserService.UserId)
                    .SingleOrDefaultAsync();
                if (notification != null)
                {
                    notification.Read();
                }
                await _db.SaveChangesAsync();
                return Response<NotificationViewModel>.SuccessResponse(
                    _mapper.Map<NotificationViewModel>(notification)
                );
            }
            catch (Exception ex)
            {
                return Response<NotificationViewModel>.FailureResponse(ex);
            }
        }
    }
}
