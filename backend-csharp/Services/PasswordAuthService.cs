using AtelierLysBlanc.Api.Options;

namespace AtelierLysBlanc.Api.Services;

public sealed class PasswordAuthService(AuthOptions options)
{
    public bool IsValid(string? password)
    {
        return !string.IsNullOrWhiteSpace(password) &&
               string.Equals(password, options.Password, StringComparison.Ordinal);
    }
}
