"use client";
import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/useRegister";

export function RegisterScreen() {
  const { register, isLoading, error } = useRegister();
  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center">Register with Passkey</h1>
        <Button onClick={() => register("My Wallet")} disabled={isLoading} className="w-full">
          {isLoading ? "Creating wallet..." : "Register Wallet"}
        </Button>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
