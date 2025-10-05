import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    // Thêm alias cho đường dẫn
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve("./src/styles"),
      "@": path.resolve("./src"),
    };

    return config;
  },
};

export default nextConfig;
