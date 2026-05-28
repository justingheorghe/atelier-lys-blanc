namespace AtelierLysBlanc.Api.Options;

public sealed class AuthOptions
{
    public required string Password { get; init; }
    public required string JwtSecret { get; init; }
    public string Issuer { get; init; } = "AtelierLysBlanc";
    public string Audience { get; init; } = "AtelierLysBlancClients";
}
