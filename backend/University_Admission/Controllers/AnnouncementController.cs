using AutoMapper;
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
    [Authorize]
    [Route("api/[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public AnnouncementController(
            ApplicationDbContext context,
            ICurrentUserService currentUserService,
            IMapper mapper
        )
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Response<List<AnnouncementViewModel>>>> GetAll()
        {
            try
            {
                var announcement = await _context
                    .Announcements.Where(a => a.DeletedAt == null)
                    .ToListAsync();
                if (announcement == null)
                {
                    return Response<List<AnnouncementViewModel>>.FailureResponse(
                        "No announcements exist"
                    );
                }
                return Response<List<AnnouncementViewModel>>.SuccessResponse(
                    _mapper.Map<List<AnnouncementViewModel>>(announcement)
                );
            }
            catch (Exception ex)
            {
                return Response<List<AnnouncementViewModel>>.FailureResponse(ex);
            }
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<Response<AnnouncementViewModel>>> Get([FromQuery] int Id)
        {
            try
            {
                var announcement = await _context
                    .Announcements.Where(a => a.Id == Id && a.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (announcement == null)
                {
                    return Response<AnnouncementViewModel>.FailureResponse(
                        $"Announcement with Id {Id} does not exist"
                    );
                }
                return Response<AnnouncementViewModel>.SuccessResponse(
                    _mapper.Map<AnnouncementViewModel>(announcement)
                );
            }
            catch (Exception ex)
            {
                return Response<AnnouncementViewModel>.FailureResponse(ex);
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<AnnouncementViewModel>>> Create(
            [FromBody] AnnouncementDto request
        )
        {
            try
            {
                Announcement announcement = _mapper.Map<Announcement>(request);
                announcement.AddEntryBy(_currentUserService.UserId);
                _context.Announcements.Add(announcement);
                await _context.SaveChangesAsync();
                var res = _mapper.Map<AnnouncementViewModel>(announcement);
                return Response<AnnouncementViewModel>.SuccessResponse(res, "Successfully Created");
            }
            catch (Exception ex)
            {
                return Response<AnnouncementViewModel>.FailureResponse(ex);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Response<AnnouncementViewModel>>> Update(
            [FromQuery] int Id,
            [FromBody] AnnouncementDto request
        )
        {
            try
            {
                var announcement = await _context
                    .Announcements.Where(a => a.Id == Id && a.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (announcement == null)
                {
                    return Response<AnnouncementViewModel>.FailureResponse(
                        $"Announcement with Id {Id} does not exist"
                    );
                }
                announcement.Update(request.Title, request.Description);
                announcement.MarkUpdated();
                await _context.SaveChangesAsync();
                return Response<AnnouncementViewModel>.SuccessResponse(
                    _mapper.Map<AnnouncementViewModel>(announcement),
                    "Successfully Updated"
                );
            }
            catch (Exception ex)
            {
                return Response<AnnouncementViewModel>.FailureResponse(ex);
            }
        }

        [HttpDelete]
        public async Task<ActionResult<Response<AnnouncementViewModel>>> Delete([FromQuery] int Id)
        {
            try
            {
                var announcement = await _context
                    .Announcements.Where(a => a.Id == Id && a.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (announcement == null)
                {
                    return Response<AnnouncementViewModel>.FailureResponse(
                        $"Announcement with Id {Id} does not exist"
                    );
                }
                announcement.Delete();
                await _context.SaveChangesAsync();
                return Response<AnnouncementViewModel>.SuccessResponse(
                    _mapper.Map<AnnouncementViewModel>(announcement),
                    "Successfully Deleted"
                );
            }
            catch (Exception ex)
            {
                return Response<AnnouncementViewModel>.FailureResponse(ex);
            }
        }
    }
}
