using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AtelierLysBlanc.Api.Options;
using Microsoft.IdentityModel.Tokens;

namespace AtelierLysBlanc.Api.Services;

public sealed class JwtService(AuthOptions options)
{
    private readonly SymmetricSecurityKey _key = new(Encoding.UTF8.GetBytes(options.JwtSecret));

    public DateTimeOffset ExpiresAt => DateTimeOffset.UtcNow.AddHours(8);

    public string CreateToken()
    {
        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, "lys-blanc-client"),
            new Claim(ClaimTypes.Role, "atelier-client"),
            new Claim("shop", "Atelier Lys Blanc")
        };

        var token = new JwtSecurityToken(
            issuer: options.Issuer,
            audience: options.Audience,
            claims: claims,
            expires: ExpiresAt.UtcDateTime,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool IsValid(string? token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return false;
        }

        try
        {
            new JwtSecurityTokenHandler().ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = options.Issuer,
                ValidateAudience = true,
                ValidAudience = options.Audience,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(1)
            }, out _);

            return true;
        }
        catch
        {
            return false;
        }
    }
}
