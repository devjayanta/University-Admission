using University_Admission.Interfaces;

namespace University_Admission.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId
        {
            get
            {
                var userId =
                    _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false
                        ? _httpContextAccessor
                            .HttpContext?.User?.Claims.Single(c => c.Type == "userId")
                            .Value ?? string.Empty
                        : string.Empty;
                return string.IsNullOrEmpty(userId) ? 0 : int.Parse(userId);
            }
        }
    }
}
