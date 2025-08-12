import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="px-6 my-20">
      <div className="relative overflow-hidden max-w-screen-lg mx-auto rounded-2xl p-10 md:p-14 border bg-background">
        <div className="pointer-events-none absolute inset-0 latio-gradient opacity-10" />
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-semibold">¿Listo para probar Latio?</h3>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">Crea tu wallet con Passkey y comienza a enviar y cobrar en segundos.</p>
          <div className="mt-8">
            <a href="/register"><Button className="latio-gradient">Crear wallet</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
}
