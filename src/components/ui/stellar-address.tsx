"use client";

interface StellarAddressProps {
  address: string;
  className?: string;
}

// Función para formatear la dirección (mostrar solo primeros y últimos caracteres)
const formatStellarAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function StellarAddress({
  address,
  className = "",
}: StellarAddressProps) {
  return (
    <span className={`font-mono ${className}`}>
      {formatStellarAddress(address)}
    </span>
  );
}
