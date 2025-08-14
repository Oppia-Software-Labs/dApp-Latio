import { Navbar } from "@/components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-10">
      <Navbar />
      <main className="border-l-[1px] border-r-[1px] bg-background/95">
        {children}
      </main>
    </div>
  );
}
