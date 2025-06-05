namespace University_Admission.ViewModel
{
    public class Response<T>
        where T : class
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public static Response<T> SuccessResponse(T data, string? msg = null)
        {
            return new()
            {
                Success = true,
                Message = msg,
                Data = data,
            };
        }

        public static Response<T> SuccessResponse(string msg)
        {
            return new() { Success = true, Message = msg };
        }

        public static Response<T> FailureResponse(string errorMsg)
        {
            return new() { Success = false, Message = errorMsg };
        }

        public static Response<T> FailureResponse(Exception ex)
        {
            return new()
            {
                Success = false,
                Message = ex.InnerException != null ? ex.InnerException.Message : ex.Message,
            };
        }
    }
}
