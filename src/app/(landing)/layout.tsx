import { LandingNavbar } from "@/components/layout/LandingNavbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
