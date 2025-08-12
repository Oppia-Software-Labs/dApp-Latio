import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["passkey-kit", "passkey-kit-sdk", "sac-sdk"],
};

export default nextConfig;
