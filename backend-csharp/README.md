# Atelier Lys Blanc API C#

Backend ASP.NET Core echivalent cu API-ul Next.js folosit pentru deploy.

## Rulare

Este necesar .NET SDK 8+.

```bash
dotnet restore
dotnet run
```

Variabile optionale:

```bash
APP_PASSWORD=parola-demo
JWT_SECRET=secret-lung-pentru-jwt
```

## Endpoint-uri

- `POST /api/auth/login` cu `{ "password": "..." }`
- `GET /api/products`
- `POST /api/orders` cu header `Authorization: Bearer <token>`
