import assert from "node:assert/strict";
import { test } from "node:test";
import OpenAI from "openai";
import { INSIGHT_MODEL, requestInsight } from "./insight.ts";

// No network: a stub fetch captures the Chat Completions body the SDK builds.
const clientReturning = (finishReason: string, content: string) => {
  const bodies: Array<Record<string, unknown>> = [];
  const client = new OpenAI({
    apiKey: "test-key",
    fetch: async (_url, init) => {
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(
        JSON.stringify({
          id: "chatcmpl-test",
          object: "chat.completion",
          created: 0,
          model: INSIGHT_MODEL,
          choices: [
            {
              index: 0,
              finish_reason: finishReason,
              message: { role: "assistant", content, refusal: null },
            },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    },
  });
  return { client, bodies };
};

test("asks gpt-6-luna on Chat Completions at low effort, no temperature", async () => {
  const { client, bodies } = clientReturning("stop", " Patience pays. ");
  assert.equal(await requestInsight(client, "Slowly, slowly"), "Patience pays.");
  assert.equal(bodies[0].model, "gpt-6-luna");
  assert.equal(bodies[0].reasoning_effort, "low");
  assert.equal(bodies[0].max_completion_tokens, 1_000);
  assert.equal(bodies[0].max_tokens, undefined);
  assert.equal(bodies[0].temperature, undefined);
  assert.match(JSON.stringify(bodies[0].messages), /Slowly, slowly/);
});

test("returns null for a truncated answer so it is never stored", async () => {
  const { client } = clientReturning("length", "Patience is");
  assert.equal(await requestInsight(client, "Slowly, slowly"), null);
});
