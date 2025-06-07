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
    public class StudentController
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public StudentController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Response<List<StudentViewModel>>>> GetAllStudents()
        {
            try
            {
                var students = await _db
                    .Users.Where(u => u.Role == Role.Student && u.DeletedAt == null)
                    .ToListAsync();
                if (students == null)
                {
                    return Response<List<StudentViewModel>>.FailureResponse("No students exist");
                }
                return Response<List<StudentViewModel>>.SuccessResponse(
                    _mapper.Map<List<StudentViewModel>>(students)
                );
            }
            catch (Exception ex)
            {
                return Response<List<StudentViewModel>>.FailureResponse(ex);
            }
        }

        [HttpGet("GetStudentById")]
        public async Task<ActionResult<Response<StudentViewModel>>> GetStudentById(
            [FromQuery] int Id
        )
        {
            try
            {
                var student = await _db
                    .Users.Where(u => u.Id == Id && u.Role == Role.Student && u.DeletedAt == null)
                    .Include(u => u.Processes)
                    .ThenInclude(p => p.University)
                    .Include(u => u.Processes)
                    .ThenInclude(p => p.UniversityProgram)
                    .Include(u => u.Processes)
                    .ThenInclude(p => p.Requirements)
                    .SingleOrDefaultAsync();
                if (student == null)
                {
                    return Response<StudentViewModel>.FailureResponse(
                        $"Student with Id {Id} does not exist"
                    );
                }
                return Response<StudentViewModel>.SuccessResponse(
                    _mapper.Map<StudentViewModel>(student)
                );
            }
            catch (Exception ex)
            {
                return Response<StudentViewModel>.FailureResponse(ex);
            }
        }
    }
}
