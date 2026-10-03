import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Native Next.js runs on Node/Vercel. Vinext uses the default D1 store.
  webpack(config, { webpack }) {
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(
      /^@\/db\/enquiry-store$/,
      path.resolve(process.cwd(), "db/enquiry-store.postgres.ts"),
    ));
    return config;
  },
  turbopack: {
    resolveAlias: { "@/db/enquiry-store": "./db/enquiry-store.postgres.ts" },
  },
};

export default nextConfig;
