# Atelier Lys Blanc

Monorepo pentru proiectul de atestat „Atelier Lys Blanc”, un magazin online demo pentru rochii elegante.

## Structura

- `apps/web` - aplicatia live Next.js 15, React si TypeScript, pregatita pentru Vercel.
- `backend-csharp` - backend ASP.NET Core echivalent pentru prezentarea partii C#.

## Rulare frontend

```bash
npm install
cp .env.example .env
npm run dev --workspace apps/web
```

Aplicatia foloseste o parola unica din `APP_PASSWORD` si emite JWT in cookie HttpOnly.

## Deploy Vercel

Importa repository-ul in Vercel si seteaza variabilele:

- `APP_PASSWORD`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_NAME`

Build command: `npm run build --workspace apps/web`.

## Backend C#

Backend-ul C# reproduce endpoint-urile principale ale aplicatiei web:

- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/orders`

Pentru rulare este necesar .NET SDK 8 sau mai nou:

```bash
cd backend-csharp
dotnet run
```
