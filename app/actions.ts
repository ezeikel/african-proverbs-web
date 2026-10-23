"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import {
  Category,
  Region,
  Country,
  Tribe,
} from "@/lib/generated/prisma/browser";
import { requestInsight } from "@/lib/insight";
import prisma from "@/lib/prisma";

// Created on first use: a missing key must not break every page at import.
let openaiClient: OpenAI | undefined;
const getOpenAI = () => {
  openaiClient ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openaiClient;
};

export const contributeProverb = async (
  userId: string | undefined,
  formData: FormData,
) => {
  // retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("You must be logged in to contribute a proverb.");
  }

  const rawFormData = {
    text: (formData.get("text") as string) || "",
    region: (formData.get("region") as Region) || undefined,
    country: (formData.get("country") as Country) || undefined,
    tribe: (formData.get("tribe") as Tribe) || undefined,
    category: (formData.get("category") as Category) || undefined,
  };

  const proverb = await prisma.proverb.create({
    data: rawFormData,
  });

  // update cache
  revalidatePath("/proverbs");

  return proverb;
};

export const getProverbs = async () => prisma.proverb.findMany();

export const getProverb = async (id: string) => {
  const proverb = await prisma.proverb.findUnique({
    where: {
      id,
    },
  });

  return proverb;
};

export const getProverbOfTheDay = async () => {
  // TODO: change this to be the latest entry from the proverb of the day table

  const proverb = await prisma.proverb.findFirst();

  return proverb;
};

/**
 * Explains a proverb from our own table. Takes an id, never free text, so the
 * action cannot be used as an open OpenAI proxy. The result is stored on the
 * proverb row: a proverb's meaning never changes, so each proverb pays for at
 * most one completion.
 */
export const getInsight = async (proverbId: string) => {
  // Server actions are public endpoints: reject anything that is not an id.
  if (
    typeof proverbId !== "string" ||
    proverbId.length === 0 ||
    proverbId.length > 128
  ) {
    throw new Error("Proverb not found.");
  }

  const proverb = await prisma.proverb.findUnique({
    where: { id: proverbId },
    select: { id: true, text: true, insight: true },
  });

  if (!proverb) {
    throw new Error("Proverb not found.");
  }

  if (proverb.insight) {
    return proverb.insight;
  }

  const insight = (await requestInsight(getOpenAI(), proverb.text)) ?? "";

  if (insight) {
    // Only fill an empty slot, so a concurrent first click cannot overwrite.
    await prisma.proverb.updateMany({
      where: { id: proverb.id, insight: null },
      data: { insight },
    });
  }

  return insight;
};
