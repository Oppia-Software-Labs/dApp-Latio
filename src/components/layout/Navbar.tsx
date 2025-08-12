"use client";
import Link from "next/link";
import { LayoutDashboard, Wallet, Map, Lightbulb, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isConnected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function Navbar({ isConnected, onConnect, onDisconnect }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/dashboard" className="font-semibold tracking-tight">
          <span className="latio-gradient bg-clip-text text-transparent text-xl">Latio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2"><LayoutDashboard size={16}/> Dashboard</Link>
          <Link href="/wallet" className="text-muted-foreground hover:text-foreground flex items-center gap-2"><Wallet size={16}/> Wallet</Link>
          <Link href="/travel" className="text-muted-foreground hover:text-foreground flex items-center gap-2"><Map size={16}/> Travel</Link>
          <Link href="/recommendations" className="text-muted-foreground hover:text-foreground flex items-center gap-2"><Lightbulb size={16}/> AI</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
          </Button>
          {isConnected ? (
            <Button variant="outline" onClick={onDisconnect}>Disconnect</Button>
          ) : (
            <Button className="latio-gradient" onClick={onConnect}>Connect</Button>
          )}
        </div>
      </div>
    </header>
  );
}
