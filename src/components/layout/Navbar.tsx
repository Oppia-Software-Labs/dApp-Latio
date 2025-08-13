"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { 
  Sun, 
  Moon, 
  Wallet, 
  LayoutDashboard, 
  Send, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, disconnect } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <img
            src="/latio_isologo.svg"
            alt="Latio"
            className="h-8 w-auto"
          />
          <span className="latio-gradient bg-clip-text text-transparent text-xl font-semibold">
            Latio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
          </Button>

          {/* User actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button variant="outline" size="sm" onClick={disconnect}>
                <Wallet className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm">
                <Wallet className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </nav>
            
            {isAuthenticated && (
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={disconnect}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
