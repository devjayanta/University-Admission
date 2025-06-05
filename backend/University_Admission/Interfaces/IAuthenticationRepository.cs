using University_Admission.Domain.Entities.UserEntities;
using University_Admission.DTO;

namespace University_Admission.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<bool> UserExists(string username);
        Task<User> Register(RegisterDto dto);
        Task<User?> Login(LoginDto dto);
    }
}
