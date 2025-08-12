import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <span className="i">✨</span> Next‑gen LATAM cross‑border payments on Stellar
        </div>
        <h1 className="mt-6 text-4xl xs:text-5xl sm:text-6xl font-bold tracking-tight !leading-[1.15]">
          <span className="latio-gradient bg-clip-text text-transparent">Fast, secure, borderless</span> payments
        </h1>
        <p className="mt-4 xs:text-lg text-muted-foreground">
          Latio hace que viajar y cobrar en LATAM sea simple: FX en tiempo real, comisiones bajas y liquidación instantánea con Stellar.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="latio-gradient w-full sm:w-auto rounded-full text-base">Crear mi wallet</Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-full text-base">Ver demo</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
