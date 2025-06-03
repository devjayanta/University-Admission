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

        public AnnouncementController(
            ApplicationDbContext context,
            ICurrentUserService currentUserService
        )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        [HttpPost]
        public async Task<ActionResult<AnnouncementViewModel>> Create(
            [FromBody] AnnouncementDto request
        )
        {
            Announcement announcement = new Announcement(
                _currentUserService.UserId,
                request.Title,
                request.Description
            );
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            var res = new AnnouncementViewModel(
                announcement.Id,
                announcement.EntryBy.Id,
                announcement.EntryBy.FirstName,
                announcement.CreatedAt,
                announcement.Title,
                announcement.Description
            );
            return Ok(res);
        }
    }
}
