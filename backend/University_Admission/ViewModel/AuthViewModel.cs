namespace University_Admission.ViewModel
{
    public class AuthViewModel
    {
        public int UserId { get; set; }
        public string? Token { get; set; }

        public AuthViewModel(int userId, string? token)
        {
            UserId = userId;
            Token = token;
        }
    }
}
