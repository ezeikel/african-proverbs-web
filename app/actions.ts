"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import { Category, Region, Country, Tribe } from "@prisma/client";
import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export const getProverbs = () => prisma.proverb.findMany();

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

export const getInsight = async (proverb: string) => {
  const insight = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `You are given the following African proverb: "${proverb}". What is the meaning of this proverb?`,
    max_tokens: 120,
    temperature: 0.7, // creativity
  });

  return insight.choices[0].text.trim();
};
