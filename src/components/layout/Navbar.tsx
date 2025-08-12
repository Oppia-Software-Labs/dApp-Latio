"use client";
import Link from "next/link";
import { LayoutDashboard, Wallet, Map, Lightbulb, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, disconnect } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/dashboard" className="font-semibold tracking-tight flex items-center gap-2">
          <img src="/latio_isologo.svg" alt="Latio" className="h-8 w-8 drop-shadow-sm hover:drop-shadow-md transition-all duration-300" />
          <span className="latio-gradient bg-clip-text text-transparent text-xl">Latio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <LayoutDashboard size={16}/>
            Dashboard
          </Link>
          <Link href="/wallet" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Wallet size={16}/>
            Wallet
          </Link>
          <Link href="/travel" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Map size={16}/>
            Travel
          </Link>
          <Link href="/recommendations" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Lightbulb size={16}/>
            AI
          </Link>
        </nav>
        <div className="flex items-center gap-2">
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
              Desconectar
            </Button>
          ) : (
            <Link href="/login">
              <Button className="latio-gradient">
                Conectar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
