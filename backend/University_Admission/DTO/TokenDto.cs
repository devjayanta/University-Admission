using University_Admission.Domain.Enum;

namespace University_Admission.DTO
{
    public class TokenDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }

        public TokenDto(int userId, string userName, string role, string fullName)
        {
            UserId = userId;
            UserName = userName;
            Role = role;
            FullName = fullName;
        }
    }
}
