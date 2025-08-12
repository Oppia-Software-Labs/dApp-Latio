"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Sun, Moon, Wallet } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, disconnect } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/latio_isologo.svg"
            alt="Latio"
            className="h-8 w-auto"
          />
          <span className="latio-gradient bg-clip-text text-transparent text-xl font-semibold">
            Latio
          </span>
        </Link>

        <nav className="flex items-center space-x-6 ml-6">
          <Link
            href="/stellar-addresses"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Stellar Addresses
          </Link>
        </nav>

        <div className="flex items-center space-x-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            aria-label="toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
          </Button>
          {isAuthenticated ? (
            <Button variant="outline" onClick={disconnect}>
              <Wallet className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Link href="/login">
              <Button>
                <Wallet className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
