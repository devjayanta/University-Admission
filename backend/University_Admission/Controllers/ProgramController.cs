using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.DTO;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProgramController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ProgramController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin,student")]
        public async Task<ActionResult<Response<UniversityProgramViewModel>>> GetProgram(
            [FromQuery] int Id
        )
        {
            try
            {
                var program = await _db
                    .UniversityPrograms.Where(up => up.Id == Id && up.DeletedAt == null)
                    .Include(up => up.University)
                    .Include(up => up.ProgramRequirements.Where(pr => pr.DeletedAt == null))
                    .SingleOrDefaultAsync();
                if (program == null)
                {
                    return Response<UniversityProgramViewModel>.FailureResponse(
                        $"Program with ID {Id} does not exist"
                    );
                }
                return Response<UniversityProgramViewModel>.SuccessResponse(
                    _mapper.Map<UniversityProgramViewModel>(program)
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityProgramViewModel>.FailureResponse(ex);
            }
        }

        [HttpGet("GetAll")]
        [Authorize(Roles = "admin,student")]
        public async Task<ActionResult<Response<List<UniversityProgramViewModel>>>> GetPrograms(
            [FromQuery] string? status
        )
        {
            try
            {
                var query = _db.UniversityPrograms.AsQueryable();
                if (!string.IsNullOrEmpty(status) && status == "closed")
                {
                    query = query.Where(up => up.DeletedAt != null).AsQueryable();
                }
                else
                {
                    query = query.Where(up => up.DeletedAt == null).AsQueryable();
                }
                var program = await query
                    .Include(up => up.University)
                    .Include(up => up.ProgramRequirements.Where(pr => pr.DeletedAt == null))
                    .ToListAsync();
                if (program == null)
                {
                    return Response<List<UniversityProgramViewModel>>.FailureResponse(
                        $"No Programs found"
                    );
                }
                return Response<List<UniversityProgramViewModel>>.SuccessResponse(
                    _mapper.Map<List<UniversityProgramViewModel>>(program)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UniversityProgramViewModel>>.FailureResponse(ex);
            }
        }

        [HttpGet("GetByUniversityId")]
        [Authorize(Roles = "admin,student")]
        public async Task<
            ActionResult<Response<List<UniversityProgramViewModel>>>
        > GetByUniversityId([FromQuery] int UniversityId)
        {
            try
            {
                var program = await _db
                    .UniversityPrograms.Where(up =>
                        up.UniversityId == UniversityId && up.DeletedAt == null
                    )
                    .Include(up => up.University)
                    .Include(up => up.ProgramRequirements)
                    .ToListAsync();
                if (program == null)
                {
                    return Response<List<UniversityProgramViewModel>>.FailureResponse(
                        $"No Programs found"
                    );
                }
                return Response<List<UniversityProgramViewModel>>.SuccessResponse(
                    _mapper.Map<List<UniversityProgramViewModel>>(program)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UniversityProgramViewModel>>.FailureResponse(ex);
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<UniversityProgramViewModel>>> Create(
            [FromBody] UniversityProgramDto request
        )
        {
            try
            {
                var program = _mapper.Map<UniversityProgram>(request);
                _db.UniversityPrograms.Add(program);
                await _db.SaveChangesAsync();
                return Response<UniversityProgramViewModel>.SuccessResponse(
                    _mapper.Map<UniversityProgramViewModel>(program),
                    "Successfully Created"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityProgramViewModel>.FailureResponse(ex);
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<UniversityProgramViewModel>>> Update(
            [FromQuery] int Id,
            [FromBody] UniversityProgramDto request
        )
        {
            try
            {
                var program = await _db
                    .UniversityPrograms.Where(up => up.Id == Id && up.DeletedAt == null)
                    .Include(up => up.ProgramRequirements.Where(pr => pr.DeletedAt == null))
                    .SingleOrDefaultAsync();
                if (program == null)
                {
                    return Response<UniversityProgramViewModel>.FailureResponse(
                        $"Program with ID {Id} does not exist"
                    );
                }

                // update program
                program.Update(
                    request.Name,
                    request.Level,
                    request.Fee,
                    request.Currency,
                    request.Language,
                    request.Duration
                );
                program.MarkUpdated();

                // requirements with id null are newly added ones so create accordingly
                var newReqs = request.ProgramRequirements?.Where(pr => pr.Id == null);
                if (newReqs != null)
                {
                    foreach (var newReq in newReqs)
                    {
                        program.ProgramRequirements.Add(_mapper.Map<ProgramRequirement>(newReq));
                    }
                }

                // requirements present in both program from db and request are updated ones so update accordingly
                var reqIdsFromRequest = request
                    .ProgramRequirements?.Where(pr => pr.Id != null)
                    .Select(pr => pr.Id ?? 0)
                    .ToList();
                if (reqIdsFromRequest != null)
                {
                    foreach (var reqId in reqIdsFromRequest)
                    {
                        var updatePR = program.ProgramRequirements.Single(pr => pr.Id == reqId);
                        var updatePRReq = request.ProgramRequirements?.Single(pr =>
                            pr.Id == reqId
                        )!;
                        updatePR.Update(
                            updatePRReq.Name,
                            updatePRReq.IsMandatory,
                            updatePRReq.Type,
                            updatePRReq.Value
                        );
                    }
                }

                // requirements present in program in db but absent in request are deleted ones so delete accordingly
                var existingReqIds = program.ProgramRequirements.Select(pr => pr.Id).ToList();
                var deletedReqIds = Enumerable.Except<int>(existingReqIds, reqIdsFromRequest ?? []);
                foreach (var reqId in deletedReqIds)
                {
                    var reqToDelete = program.ProgramRequirements.Single(p => p.Id == reqId);
                    reqToDelete.Delete();
                }
                await _db.SaveChangesAsync();
                return Response<UniversityProgramViewModel>.SuccessResponse(
                    _mapper.Map<UniversityProgramViewModel>(program),
                    "Successfully Updated"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityProgramViewModel>.FailureResponse(ex);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<UniversityProgramViewModel>>> Delete(
            [FromQuery] int Id
        )
        {
            try
            {
                var program = await _db
                    .UniversityPrograms.Where(up => up.Id == Id && up.DeletedAt == null)
                    .Include(up => up.ProgramRequirements)
                    .SingleOrDefaultAsync();
                if (program == null)
                {
                    return Response<UniversityProgramViewModel>.FailureResponse(
                        $"Program with ID {Id} does not exist"
                    );
                }
                foreach (var pr in program.ProgramRequirements)
                {
                    pr.Delete();
                }
                program.Delete();
                await _db.SaveChangesAsync();
                return Response<UniversityProgramViewModel>.SuccessResponse(
                    _mapper.Map<UniversityProgramViewModel>(program),
                    "Successfully Deleted"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityProgramViewModel>.FailureResponse(ex);
            }
        }
    }
}
