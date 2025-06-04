using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<ActionResult<Response<AnnouncementViewModel>>> Create(
            [FromBody] AnnouncementDto request
        )
        {
            await Task.Delay(0);
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
    }
}
