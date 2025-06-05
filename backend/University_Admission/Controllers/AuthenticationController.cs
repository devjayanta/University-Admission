using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using University_Admission.DTO;
using University_Admission.Interfaces;
using University_Admission.Services;

namespace University_Admission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtService jwt;
        private readonly IAuthenticationRepository authenticationRepository;
        public AuthenticationController(JwtService _jwt, IAuthenticationRepository _authenticationRepository)
        {
            jwt = _jwt;
            authenticationRepository = _authenticationRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await authenticationRepository.UserExists(dto.Username))
                return BadRequest("Username is already taken !!");

            var user = await authenticationRepository.Register(dto);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await authenticationRepository.Login(dto);
            if (user == null)
                return Unauthorized("Invalid credentials !!");

            var token = jwt.GenerateJwtToken(dto.Username);
            return Ok(new { token });
        }
    }
}
