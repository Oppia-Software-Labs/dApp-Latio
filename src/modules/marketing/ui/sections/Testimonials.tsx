function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0,2).join("");
  return (
    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">{initials}</div>
  );
}

const quotes = [
  { name: "Camila R.", text: "Pagué tours en CR con mi moneda, el cambio fue buenísimo." },
  { name: "Luis M.", text: "Como comercio acepto USD/EUR sin dolores de cabeza." },
  { name: "Ana P.", text: "La app me avisó de un mejor tipo de cambio antes de comprar." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-16 xs:py-20">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">Lo que dice la gente</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3 max-w-screen-lg mx-auto">
        {quotes.map((q) => (
          <div key={q.name} className="rounded-xl border bg-background p-6">
            <div className="flex items-center gap-3">
              <Avatar name={q.name} />
              <div className="font-medium">{q.name}</div>
            </div>
            <p className="mt-4 text-sm text-foreground/80">&ldquo;{q.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
