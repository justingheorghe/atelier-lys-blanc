namespace AtelierLysBlanc.Api.Models;

public sealed record LoginResponse(string Token, DateTimeOffset ExpiresAt);
