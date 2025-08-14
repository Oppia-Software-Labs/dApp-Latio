"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeComponent({ value, size = 200, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }).catch((err) => {
        console.error("Error generating QR code:", err);
      });
    }
  }, [value, size]);

  if (!value) {
    return (
      <div 
        className={`bg-white rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
          <p className="text-xs text-gray-500">No address available</p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`bg-white rounded-lg ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
