import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for nginx deployment
  output: 'export',

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei'],
  },

  // Turbopack configuration to silence warnings
  turbopack: {},
};

export default nextConfig;
