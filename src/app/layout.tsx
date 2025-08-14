import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AccountSessionProvider } from "@/components/AccountSessionProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Latio",
  description: "Next-gen Stellar cross-border payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <AccountSessionProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={4000}
            />
          </AccountSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
