"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Wallet } from "lucide-react";

export function LandingNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
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

          {/* Connect button */}
          <Link href="/login">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
              <Wallet className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
