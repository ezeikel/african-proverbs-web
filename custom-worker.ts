import type { Response as CfResponse, ExportedHandler } from "@cloudflare/workers-types";
// @ts-ignore OpenNext generates this module during build.
import handler from "./.open-next/worker.js";
import { injectWebAnalytics } from "./lib/cloudflare-web-analytics";

export default {
  async fetch(request, env, ctx) {
    // www is canonical, as it was on Vercel.
    const url = new URL(request.url);
    if (url.hostname === "africanproverbs.fyi") {
      url.protocol = "https:";
      url.hostname = "www.africanproverbs.fyi";
      url.port = "";
      return Response.redirect(url.toString(), 308) as unknown as CfResponse;
    }
    return injectWebAnalytics(
      request,
      await handler.fetch(request, env, ctx),
      env.CF_WEB_ANALYTICS_TOKEN,
    );
  },
} satisfies ExportedHandler<{ CF_WEB_ANALYTICS_TOKEN?: string }>;
