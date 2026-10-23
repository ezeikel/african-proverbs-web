import type OpenAI from "openai";

// gpt-6-luna replaced gpt-3.5-turbo-instruct (legacy Completions API) on
// 23 October 2026: cheap tier, $0.10/$0.50 per million tokens. It is a
// reasoning model on Chat Completions: no temperature, and reasoning tokens
// count toward max_completion_tokens, so the cap leaves room for low-effort
// reasoning plus a short explanation (the old cap was 120 output tokens).
export const INSIGHT_MODEL = "gpt-6-luna";
export const INSIGHT_MAX_COMPLETION_TOKENS = 1_000;

/**
 * Asks for the meaning of one proverb. Returns null unless the model finished
 * normally, because the caller stores the answer on the proverb row for good
 * and a truncated explanation must never be the one that is kept.
 */
export const requestInsight = async (
  client: OpenAI,
  proverbText: string,
): Promise<string | null> => {
  const response = await client.chat.completions.create({
    model: INSIGHT_MODEL,
    reasoning_effort: "low",
    max_completion_tokens: INSIGHT_MAX_COMPLETION_TOKENS,
    messages: [
      {
        role: "user",
        content: `You are given the following African proverb: "${proverbText}". What is the meaning of this proverb?`,
      },
    ],
  });
  const choice = response.choices[0];
  if (choice?.finish_reason !== "stop") return null;
  return choice.message.content?.trim() || null;
};
