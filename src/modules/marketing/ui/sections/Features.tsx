import { ArrowLeftRight, QrCode, ShieldCheck, Sparkles, Timer, Wallet } from "lucide-react";

const items = [
  { icon: Timer,    title: "Liquidación en segundos", desc: "Pagos casi instantáneos gracias a Stellar." },
  { icon: ArrowLeftRight, title: "FX en tiempo real", desc: "Mejores rutas en el DEX con baja fricción." },
  { icon: Wallet,  title: "Passkey login", desc: "Sin contraseñas. Autenticación segura con Passkey Kit." },
  { icon: QrCode,  title: "QR para comercios", desc: "Acepta pagos internacionales sin POS ni bancos caros." },
  { icon: ShieldCheck, title: "Transparencia on‑chain", desc: "Historial verificable y comisiones claras." },
  { icon: Sparkles, title: "IA de viaje", desc: "Presupuestos, recomendaciones y alertas contextuales." },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-16 xs:py-20">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">Todo lo que necesitas</h2>
      <div className="mt-10 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-background border rounded-xl p-6">
            <div className="mb-3 h-10 w-10 flex items-center justify-center rounded-full bg-muted">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-foreground/80 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
