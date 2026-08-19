import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Only the explicit Instant Navigation test build exposes this hook.
    exposeTestingApiInProductionBuild:
      process.env.NEXT_INSTANT_NAV_TEST === "1",
  },
};

export default nextConfig;
