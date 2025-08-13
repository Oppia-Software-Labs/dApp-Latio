"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { 
  Sun, 
  Moon, 
  Wallet, 
  Send, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
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
              <UserMenu />
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
            {isAuthenticated && (
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
                <UserMenu variant="mobile" />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
