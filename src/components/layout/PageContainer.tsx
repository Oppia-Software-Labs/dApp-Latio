import { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="container py-8">
      {children}
    </main>
  );
}
