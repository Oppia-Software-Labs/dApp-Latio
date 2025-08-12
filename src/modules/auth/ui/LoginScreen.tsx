"use client";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useLogin";

export function LoginScreen() {
  const { connect, isLoading, error } = useLogin();
  return (
    <div className="flex items-center justify-center py-12 bg-transparent">
      <div className="max-w-md w-full space-y-6 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center">
          Login with Passkey
        </h1>
        <Button
          onClick={() => connect()}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Connecting..." : "Connect"}
        </Button>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
