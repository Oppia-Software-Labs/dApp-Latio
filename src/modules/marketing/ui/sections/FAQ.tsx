const faqs = [
  { q: "¿Cuánto cuesta Latio?", a: "Tenemos plan gratuito y planes de pago desde $4.99/mes." },
  { q: "¿En qué países opera?", a: "Lanzamos en LATAM, empezando por Costa Rica, México y Colombia." },
  { q: "¿Cómo aseguran mis fondos?", a: "Passkey + Stellar. Sin contraseñas, firmas seguras y transparencia on‑chain." },
  { q: "¿Qué redes soportan?", a: "Stellar y Soroban (smart contracts). Más integraciones próximamente." },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-16 xs:py-20">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">Preguntas frecuentes</h2>
        <div className="mt-10 grid md:grid-cols-2 rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border p-6 -mt-px -ml-px">
              <h3 className="text-lg font-semibold">{q}</h3>
              <p className="mt-2 text-sm text-foreground/80">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
