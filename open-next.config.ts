import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR or tag revalidation worth caching: pages read D1 per request.
export default defineCloudflareConfig({});
