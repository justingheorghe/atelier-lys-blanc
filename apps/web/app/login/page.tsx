import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Atelier Lys Blanc">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85"
          alt="Atelier elegant cu rochii"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
        />
        <div>
          <p>Atelier Lys Blanc</p>
          <h2>Eleganta, selectie si checkout rapid.</h2>
        </div>
      </section>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
