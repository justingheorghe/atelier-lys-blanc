import Link from "next/link";
import { Header } from "@/components/Header";

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main className="app-shell narrow">
        <section className="confirmation">
          <p className="eyebrow">Comanda plasata</p>
          <h1>Multumim pentru alegere</h1>
          <p>
            Comanda {params.order ?? "LYS"} a fost inregistrata. Un consultant
            Lys Blanc va confirma disponibilitatea si livrarea.
          </p>
          <Link className="primary-link" href="/shop">Revino la catalog</Link>
        </section>
      </main>
    </>
  );
}
