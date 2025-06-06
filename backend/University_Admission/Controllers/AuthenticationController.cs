using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.Domain.Enum;
using University_Admission.DTO;
using University_Admission.Interfaces;
using University_Admission.Services;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtService _jwt;
        private readonly ApplicationDbContext _db;
        private readonly IHashService _hashService;

        public AuthenticationController(
            JwtService jwt,
            ApplicationDbContext db,
            IHashService hashService
        )
        {
            _jwt = jwt;
            _db = db;
            _hashService = hashService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Response<AuthViewModel>>> Register(RegisterDto dto)
        {
            try
            {
                if (await _db.Users.AnyAsync(u => u.UserName.ToLower() == dto.Username.ToLower()))
                {
                    return Response<AuthViewModel>.FailureResponse("Username Already Taken");
                }
                var user = new User(
                    dto.Username,
                    dto.FirstName,
                    dto.MiddleName,
                    dto.LastName,
                    dto.PassportNo,
                    dto.NationalityId,
                    dto.Gender,
                    dto.Email,
                    Role.Student
                );
                var hashpassword = _hashService.GetHash(dto.Password);
                user.UpdatePassword(hashpassword);
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
                return Response<AuthViewModel>.SuccessResponse(new AuthViewModel(user.Id, null));
            }
            catch (Exception ex)
            {
                return Response<AuthViewModel>.FailureResponse(ex);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<Response<AuthViewModel>>> Login(LoginDto dto)
        {
            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(u => u.UserName == dto.Username);
                if (user == null || !_hashService.VerifyHash(dto.Password, user.PasswordHash))
                {
                    return Response<AuthViewModel>.FailureResponse(
                        "Username or Password is Incorrect"
                    );
                }
                var token = _jwt.GenerateJwtToken(dto.Username, user.Id, user.Role.ToString().ToLower());
                return Response<AuthViewModel>.SuccessResponse(new AuthViewModel(user.Id, token));
            }
            catch (Exception ex)
            {
                return Response<AuthViewModel>.FailureResponse(ex);
            }
        }

        [HttpGet("createAdminUser")]
        public async Task<Response<AuthViewModel>> CreateAdminUser()
        {
            try
            {
                if (await _db.Users.AnyAsync(u => u.UserName.ToLower() == "admin"))
                {
                    return Response<AuthViewModel>.FailureResponse("Username Already Taken");
                }
                var user = new User(
                    "admin",
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    147,
                    Gender.Male,
                    string.Empty,
                    Role.Admin
                );
                var hashpassword = _hashService.GetHash("admin1234");
                user.UpdatePassword(hashpassword);
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
                return Response<AuthViewModel>.SuccessResponse(new AuthViewModel(user.Id, null));
            }
            catch (Exception ex)
            {
                return Response<AuthViewModel>.FailureResponse(ex);
            }
        }
    }
}
