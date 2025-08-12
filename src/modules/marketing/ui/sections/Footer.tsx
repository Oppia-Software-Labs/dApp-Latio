import Link from "next/link";

export function Footer() {
  const links = [
    { title: "Características", href: "#features" },
    { title: "Precios", href: "#pricing" },
    { title: "FAQ", href: "#faq" },
    { title: "Testimonios", href: "#testimonials" },
  ];
  return (
    <footer className="mt-28 border-t">
      <div className="container py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="latio-gradient bg-clip-text text-transparent text-xl font-semibold">Latio</span>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Latio. Todos los derechos reservados.</p>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.title}><Link href={l.href} className="hover:text-foreground">{l.title}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
