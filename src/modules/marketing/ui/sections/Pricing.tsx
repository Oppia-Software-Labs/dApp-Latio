import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Traveler",
    price: "$0",
    tagline: "Para empezar",
    features: ["Wallet Passkey", "2 redes soportadas", "Soporte básico"],
    cta: { label: "Crear gratis", href: "/register" },
    featured: false,
  },
  {
    name: "Pro Traveler",
    price: "$4.99",
    tagline: "Viajes frecuentes",
    features: ["Mejores rutas DEX", "Límites más altos", "Alertas de FX en tiempo real"],
    cta: { label: "Probar Pro", href: "/register" },
    featured: true,
  },
  {
    name: "Merchant",
    price: "$9.99",
    tagline: "Cobros internacionales",
    features: ["QR dinámico", "Reportes fiscales", "Enlaces de pago"],
    cta: { label: "Habilitar cobros", href: "/register" },
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-16 xs:py-20">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">Precios simples</h2>
      <p className="mt-3 text-center text-muted-foreground">Paga solo por lo que usas. Sin sorpresas.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {tiers.map((t) => (
          <div key={t.name} className={`rounded-xl border bg-background p-6 ${t.featured ? 'outline outline-2 outline-primary' : ''}`}>
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.tagline}</p>
              </div>
              <div className="text-3xl font-bold">{t.price}<span className="text-base font-normal text-muted-foreground">/mes</span></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {t.features.map((f) => (<li key={f} className="flex items-center gap-2"><span>•</span>{f}</li>))}
            </ul>
            <a href={t.cta.href} className="block mt-6">
              <Button className={`w-full ${t.featured ? 'latio-gradient' : ''}`}>{t.cta.label}</Button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
