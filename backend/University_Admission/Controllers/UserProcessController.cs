using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.ProcessEntities;
using University_Admission.Domain.Enum;
using University_Admission.DTO;
using University_Admission.Interfaces;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserProcessController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public UserProcessController(
            ApplicationDbContext db,
            IMapper mapper,
            ICurrentUserService currentUserService
        )
        {
            _db = db;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<Response<UserProcessViewModel>>> GetUserProcess(
            [FromQuery] int Id
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == Id && up.DeletedAt == null)
                    .Include(up => up.University)
                    .Include(up => up.UniversityProgram)
                    .Include(up => up.Requirements)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {Id} does not exist"
                    );
                }
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process)
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<Response<List<UserProcessViewModel>>>> GetAll(
            [FromQuery] ActionStatus? Status
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up =>
                        up.DeletedAt == null && (Status == null || up.Status == Status)
                    )
                    .Include(up => up.University)
                    .Include(up => up.UniversityProgram)
                    .Include(up => up.User)
                    .ToListAsync();
                if (process == null)
                {
                    return Response<List<UserProcessViewModel>>.FailureResponse(
                        "No Processes exist"
                    );
                }
                return Response<List<UserProcessViewModel>>.SuccessResponse(
                    _mapper.Map<List<UserProcessViewModel>>(process)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UserProcessViewModel>>.FailureResponse(ex);
            }
        }

        [HttpGet("GetByUserId")]
        public async Task<ActionResult<Response<List<UserProcessViewModel>>>> GetByUserId()
        {
            try
            {
                var userId = _currentUserService.UserId;
                var process = await _db
                    .UserProgramProcesses.Where(up => up.UserId == userId && up.DeletedAt == null)
                    .Include(up => up.University)
                    .Include(up => up.UniversityProgram)
                    .ToListAsync();
                if (process == null)
                {
                    return Response<List<UserProcessViewModel>>.FailureResponse(
                        "No Processes exist"
                    );
                }
                return Response<List<UserProcessViewModel>>.SuccessResponse(
                    _mapper.Map<List<UserProcessViewModel>>(process)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UserProcessViewModel>>.FailureResponse(ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Response<UserProcessViewModel>>> Create(
            [FromBody] UserProcessDto request
        )
        {
            try
            {
                var process = _mapper.Map<UserProgramProcess>(request);
                process.SetUser(_currentUserService.UserId);
                _db.UserProgramProcesses.Add(process);
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Created"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Response<UserProcessViewModel>>> Update(
            [FromQuery] int Id,
            [FromBody] UserProcessDto request
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == Id && up.DeletedAt == null)
                    .Include(up => up.University)
                    .Include(up => up.UniversityProgram)
                    .Include(up => up.Requirements)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {Id} does not exist"
                    );
                }
                process.MarkUpdated();

                // requirements with id null are newly added ones so create accordingly
                var newReqs = request.Requirements?.Where(r => r.Id == null);
                if (newReqs != null)
                {
                    foreach (var newReq in newReqs)
                    {
                        process.Requirements.Add(_mapper.Map<UserProgramRequirement>(newReq));
                    }
                }

                // requirements present in both process from db and request are updated ones so update accordingly
                var reqIdsFromRequest = request
                    .Requirements?.Where(r => r.Id != null)
                    .Select(r => r.Id ?? 0)
                    .ToList();
                if (reqIdsFromRequest != null)
                {
                    foreach (var reqId in reqIdsFromRequest)
                    {
                        var updatePR = process.Requirements.Single(r => r.Id == reqId);
                        var updatePRReq = request.Requirements?.Single(r => r.Id == reqId)!;
                        updatePR.Update(updatePRReq.Value);
                    }
                }

                // requirements present in process in db but absent in request are deleted ones so delete accordingly
                var existingReqIds = process.Requirements.Select(r => r.Id).ToList();
                var deletedReqIds = Enumerable.Except<int>(existingReqIds, reqIdsFromRequest ?? []);
                foreach (var reqId in deletedReqIds)
                {
                    var reqToDelete = process.Requirements.Single(p => p.Id == reqId);
                    process.Requirements.Remove(reqToDelete);
                }
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Updated"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpDelete]
        public async Task<ActionResult<Response<UserProcessViewModel>>> Delete([FromQuery] int Id)
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == Id && up.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {Id} does not exist"
                    );
                }
                process.Delete();
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Deleted"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpPost("SubmitProcess")]
        public async Task<ActionResult<Response<UserProcessViewModel>>> SubmitProcess(
            [FromQuery] int Id
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == Id && up.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {Id} does not exist"
                    );
                }
                process.Submit();
                process.MarkUpdated();
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Submitted"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpPost("ApproveProcess")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<UserProcessViewModel>>> ApproveProcess(
            [FromBody] UserProcessActionDto request
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == request.Id && up.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {request.Id} does not exist"
                    );
                }
                process.Approve(_currentUserService.UserId, request.Remarks);
                process.MarkUpdated();
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Approved"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }

        [HttpPost("RejectProcess")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<UserProcessViewModel>>> RejectProcess(
            [FromBody] UserProcessActionDto request
        )
        {
            try
            {
                var process = await _db
                    .UserProgramProcesses.Where(up => up.Id == request.Id && up.DeletedAt == null)
                    .SingleOrDefaultAsync();
                if (process == null)
                {
                    return Response<UserProcessViewModel>.FailureResponse(
                        $"Process with ID {request.Id} does not exist"
                    );
                }
                process.Reject(_currentUserService.UserId, request.Remarks);
                process.MarkUpdated();
                await _db.SaveChangesAsync();
                return Response<UserProcessViewModel>.SuccessResponse(
                    _mapper.Map<UserProcessViewModel>(process),
                    "Successfully Rejected"
                );
            }
            catch (Exception ex)
            {
                return Response<UserProcessViewModel>.FailureResponse(ex);
            }
        }
    }
}
