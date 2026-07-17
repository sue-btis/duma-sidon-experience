import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.223"],
  output: "export",
  trailingSlash: true,
};

export default createNextIntlPlugin()(nextConfig);
