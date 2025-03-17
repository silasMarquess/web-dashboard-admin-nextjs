import type { NextConfig } from "next";

// next.config.ts
const allowedDevOrigins = ["http://localhost:3000", "http://192.168.0.5:3000"];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: allowedDevOrigins.join(", "), // Combina as origens permitidas para o ambiente de dev
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-Custom-Header, Content-Type,authorization, authorization_admin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
