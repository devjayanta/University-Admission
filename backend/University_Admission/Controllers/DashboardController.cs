using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Enum;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public DashboardController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet("GetDashboardCounts")]
        public async Task<ActionResult<Response<DashboardCountsViewModel>>> GetDashboardCounts()
        {
            try
            {
                int uniCount = await _db.Universities.CountAsync(u => u.DeletedAt == null);
                int prgCount = await _db.UniversityPrograms.CountAsync(up => up.DeletedAt == null);
                var appCounts = await _db
                    .UserProgramProcesses.Where(upp => upp.DeletedAt == null)
                    .GroupBy(upp => upp.Status)
                    .Select(g => new { St = g.Key, Count = g.Count() })
                    .ToListAsync();
                int appCount = appCounts.Sum(ac => ac.Count);
                int? subCount = appCounts
                    .SingleOrDefault(ac => ac.St == ActionStatus.Submitted)
                    ?.Count;
                int? aprCount = appCounts
                    .SingleOrDefault(ac => ac.St == ActionStatus.Approved)
                    ?.Count;
                int? rejCount = appCounts
                    .SingleOrDefault(ac => ac.St == ActionStatus.Rejected)
                    ?.Count;
                return Response<DashboardCountsViewModel>.SuccessResponse(
                    new DashboardCountsViewModel(
                        uniCount,
                        prgCount,
                        appCount,
                        subCount ?? 0,
                        aprCount ?? 0,
                        rejCount ?? 0
                    )
                );
            }
            catch (Exception ex)
            {
                return Response<DashboardCountsViewModel>.FailureResponse(ex);
            }
        }
    }
}
