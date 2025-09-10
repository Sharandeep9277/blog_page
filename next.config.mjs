/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    minimumCacheTTL: 31536000, // 1 year caching for images
    formats: ["image/avif", "image/webp"], // Serve modern formats
    dangerouslyAllowSVG: false, // Security best-practice
  },

  experimental: {
    optimizeCss: true, // Reduce render-blocking CSS
    optimizePackageImports: ["react", "react-dom"], // Smaller client bundles
    scrollRestoration: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Strip dead code for smaller bundles
    styledComponents: true, // Only if you use styled-components
  },

  // Speed up LCP by preloading fonts and images
  headers: async () => {
    return [
      {
        source: "/:all*(woff2|woff|ttf|otf|eot|png|jpg|jpeg|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Drop moment.js locales to cut ~100kb
      config.resolve.alias['moment'] = 'moment/moment.js';
    }
    return config;
  },
};

export default nextConfig;
