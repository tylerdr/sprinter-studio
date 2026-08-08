import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The production testing API is included only in explicit Instant
  // Navigation test builds, never in a normal Vercel build.
  experimental: {
    exposeTestingApiInProductionBuild:
      process.env.NEXT_INSTANT_NAV_TEST === '1',
  },
};

export default nextConfig;
