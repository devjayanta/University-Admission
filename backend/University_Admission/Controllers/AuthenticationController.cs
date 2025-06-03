using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using University_Admission.Models;
using University_Admission.Services;

namespace University_Admission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtService jwt;
        public AuthenticationController(JwtService _jwt)
        {
            jwt = _jwt;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginPayload loginPayload)
        {
            var token = jwt.GenerateJwtToken(loginPayload.Username);
            return Ok(new { token });
        }
    }
}
