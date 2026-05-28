using System.Text.Json.Serialization;
using AtelierLysBlanc.Api.Models;
using AtelierLysBlanc.Api.Options;
using AtelierLysBlanc.Api.Services;

var builder = WebApplication.CreateBuilder(args);

var configuredPassword =
    Environment.GetEnvironmentVariable("APP_PASSWORD") ??
    builder.Configuration["Auth:Password"] ??
    "lysblanc2026";

var configuredSecret =
    Environment.GetEnvironmentVariable("JWT_SECRET") ??
    builder.Configuration["Auth:JwtSecret"] ??
    "development-only-secret-change-before-production-deploy";

var authOptions = new AuthOptions
{
    Password = configuredPassword,
    JwtSecret = configuredSecret
};

builder.Services.AddSingleton(authOptions);
builder.Services.AddSingleton<PasswordAuthService>();
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<CatalogService>();
builder.Services.AddSingleton<OrderService>();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("Frontend");

app.Use(async (context, next) =>
{
    if (context.Request.Headers.Authorization.ToString().StartsWith("Bearer "))
    {
        context.Items["JwtToken"] = context.Request.Headers.Authorization.ToString()["Bearer ".Length..];
    }

    await next();
});

app.MapPost("/api/auth/login", (LoginRequest request, PasswordAuthService auth, JwtService jwt) =>
{
    if (!auth.IsValid(request.Password))
    {
        return Results.Unauthorized();
    }

    return Results.Ok(new LoginResponse(jwt.CreateToken(), jwt.ExpiresAt));
});

app.MapGet("/api/products", (CatalogService catalog) =>
{
    return Results.Ok(new { products = catalog.GetAll() });
});

app.MapPost("/api/orders", (HttpContext context, CheckoutRequest request, JwtService jwt, OrderService orders) =>
{
    var token = context.Items["JwtToken"] as string;

    if (!jwt.IsValid(token))
    {
        return Results.Unauthorized();
    }

    var result = orders.Place(request);

    return result.Success
        ? Results.Created($"/api/orders/{result.Order!.OrderId}", result.Order)
        : Results.BadRequest(new { message = result.Error });
});

app.Run();
