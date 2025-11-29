import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_URL
      ? [
          process.env.NEXT_PUBLIC_IMAGE_URL,
          process.env.NEXT_PUBLIC_BASE_IMAGE_URL,
        ]
      : [],
    // TODO: Replace wildcard pattern with specific trusted domains for production
    // For now, using wildcard to support dynamic image sources from the backend API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
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

    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve("./src/styles"),
      "@": path.resolve("./src"),
    };

    return config;
  },
  compiler: {
    styledComponents: false,
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
  ],
};

export default nextConfig;
