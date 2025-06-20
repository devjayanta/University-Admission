﻿using AutoMapper;
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
    public class UniversityController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public UniversityController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin,student")]
        public async Task<Response<UniversityViewModel>> GetUniversity([FromQuery] int Id)
        {
            try
            {
                var university = await _db.Universities.SingleOrDefaultAsync(u =>
                    u.Id == Id && u.DeletedAt == null
                );
                if (university == null)
                {
                    return Response<UniversityViewModel>.FailureResponse(
                        $"University with ID {Id} does not exist"
                    );
                }
                return Response<UniversityViewModel>.SuccessResponse(
                    _mapper.Map<UniversityViewModel>(university)
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityViewModel>.FailureResponse(ex);
            }
        }

        [HttpGet("GetAll")]
        [Authorize(Roles = "admin,student")]
        public async Task<Response<List<UniversityViewModel>>> GetUniversities()
        {
            try
            {
                var university = await _db
                    .Universities.Where(u => u.DeletedAt == null).Include(u=>u.Country)
                    .ToListAsync();
                if (university == null)
                {
                    return Response<List<UniversityViewModel>>.FailureResponse(
                        $"No Universities found"
                    );
                }
                return Response<List<UniversityViewModel>>.SuccessResponse(
                    _mapper.Map<List<UniversityViewModel>>(university)
                );
            }
            catch (Exception ex)
            {
                return Response<List<UniversityViewModel>>.FailureResponse(ex);
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<Response<UniversityViewModel>> Create([FromBody] UniversityDto request)
        {
            try
            {
                var university = _mapper.Map<University>(request);
                _db.Universities.Add(university);
                await _db.SaveChangesAsync();
                return Response<UniversityViewModel>.SuccessResponse(
                    _mapper.Map<UniversityViewModel>(university),
                    "Successfully Created"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityViewModel>.FailureResponse(ex);
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<Response<UniversityViewModel>> Update(
            [FromQuery] int Id,
            [FromBody] UniversityDto request
        )
        {
            try
            {
                var university = await _db.Universities.SingleOrDefaultAsync(u =>
                    u.Id == Id && u.DeletedAt == null
                );
                if (university == null)
                {
                    return Response<UniversityViewModel>.FailureResponse(
                        $"University with ID {Id} does not exist"
                    );
                }
                university.Update(
                    request.Name,
                    request.CountryId,
                    request.AddressLine1,
                    request.AddressLine2,
                    request.WebSite
                );
                university.MarkUpdated();
                await _db.SaveChangesAsync();
                return Response<UniversityViewModel>.SuccessResponse(
                    _mapper.Map<UniversityViewModel>(university),
                    "Successfully Updated"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityViewModel>.FailureResponse(ex);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<Response<UniversityViewModel>> Delete([FromQuery] int Id)
        {
            try
            {
                var university = await _db.Universities.SingleOrDefaultAsync(u =>
                    u.Id == Id && u.DeletedAt == null
                );
                if (university == null)
                {
                    return Response<UniversityViewModel>.FailureResponse(
                        $"University with ID {Id} does not exist"
                    );
                }
                university.Delete();
                await _db.SaveChangesAsync();
                return Response<UniversityViewModel>.SuccessResponse(
                    _mapper.Map<UniversityViewModel>(university),
                    "Successfully Deleted"
                );
            }
            catch (Exception ex)
            {
                return Response<UniversityViewModel>.FailureResponse(ex);
            }
        }
    }
}
