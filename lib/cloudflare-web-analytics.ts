import type {
  HTMLRewriter as WorkersHTMLRewriter,
  Request as WorkersRequest,
  Response as WorkersResponse,
} from '@cloudflare/workers-types';

/** Add the public beacon while workerd streams an HTML response. */
export function injectWebAnalytics(
  request: Pick<WorkersRequest, 'method' | 'headers'>,
  response: WorkersResponse,
  token?: string,
): WorkersResponse {
  if (
    !token?.trim() ||
    request.method !== 'GET' ||
    request.headers.has('range') ||
    response.headers.has('content-range') ||
    (response.status >= 300 && response.status < 400) ||
    !response.headers.get('content-type')?.startsWith('text/html')
  )
    return response;

  const beacon = JSON.stringify({ token })
    .replaceAll('&', '&amp;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  const script = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${beacon}'></script>`;
  // The global exists in Workers, without installing a runtime implementation.
  const { HTMLRewriter } = globalThis as unknown as {
    HTMLRewriter: typeof WorkersHTMLRewriter;
  };
  let seen = false;
  return new HTMLRewriter()
    .on('script[src*="static.cloudflareinsights.com"]', {
      element() {
        seen = true;
      },
    })
    .on('body', {
      element(body) {
        body.onEndTag((end) => {
          if (!seen) {
            end.before(script, { html: true });
            seen = true;
          }
        });
      },
    })
    .transform(response);
}
