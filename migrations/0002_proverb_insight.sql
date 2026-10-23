-- Cache the generated "Get Insight" text per proverb, so each proverb pays for
-- at most one OpenAI completion instead of one per click.
ALTER TABLE "proverbs" ADD COLUMN "insight" TEXT;
