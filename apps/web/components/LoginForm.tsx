"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Sparkles } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Parola nu este corecta.");
      return;
    }

    router.push(searchParams.get("next") ?? "/shop");
    router.refresh();
  }

  return (
    <form className="login-panel" onSubmit={submit}>
      <div className="login-icon">
        <Sparkles size={24} aria-hidden="true" />
      </div>
      <h1>Atelier Lys Blanc</h1>
      <p>Acces securizat pentru catalog, cos si checkout.</p>
      <label htmlFor="password">Parola atelierului</label>
      <div className="password-field">
        <LockKeyhole size={18} aria-hidden="true" />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Introdu parola"
          required
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Se verifica..." : "Intra in magazin"}
      </button>
    </form>
  );
}
