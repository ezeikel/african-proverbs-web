import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { withPlausibleProxy } from "next-plausible";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No Next image optimizer on Workers; images are served as-is.
    unoptimized: true,
  },
};

export default async function config(phase) {
  // D1 binding for `next dev`; builds never touch the database.
  if (phase === PHASE_DEVELOPMENT_SERVER) await initOpenNextCloudflareForDev();
  return withPlausibleProxy()(nextConfig);
}
