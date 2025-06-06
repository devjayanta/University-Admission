namespace University_Admission.Interfaces
{
    public interface IHashService
    {
        string GetHash(string text);
        bool VerifyHash(string text, string hash);
    }
}
