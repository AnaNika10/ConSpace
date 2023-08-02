namespace User.API.Controllers.Exceptions;

[Serializable]
public class MissingClaimException : Exception
{
    public MissingClaimException()
    {
    }

    public MissingClaimException(string message) : base(message)
    {
    }

    public MissingClaimException(string message, Exception innerException) : base(message, innerException)
    {
    }
}