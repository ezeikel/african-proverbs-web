"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import {
  Category,
  Region,
  Country,
  Tribe,
  Proverb,
} from "@/lib/generated/prisma/browser";
import prisma from "@/lib/prisma";

// Created on first use: a missing key must not break every page at import.
let openaiClient: OpenAI | undefined;
const getOpenAI = () => {
  openaiClient ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openaiClient;
};

// Image URLs are cached in Upstash Redis. Without it, never generate images:
// each uncached render would otherwise be a paid DALL-E call.
const getImageCache = () => {
  const url = process.env.REDIS_REST_API_URL;
  const token = process.env.REDIS_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
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

export const getInsight = async (proverb: string) => {
  const response = await getOpenAI().completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `You are given the following African proverb: "${proverb}". What is the meaning of this proverb?`,
    max_tokens: 120,
    temperature: 0.7, // creativity
  });

  return response.choices[0].text.trim();
};

export const getProverbImageUrl = async (
  proverb: Proverb | null,
): Promise<string> => {
  const defaultImageUrl = "/images/boy-in-striped-shirt.jpg";

  if (!proverb) {
    return defaultImageUrl;
  }

  // https://github.com/vercel/storage/issues/510
  noStore();

  const images = getImageCache();
  if (!images || !process.env.OPENAI_API_KEY) {
    return defaultImageUrl;
  }

  const cacheKey = `proverb-image-url:${proverb.id}`;

  // check if we have a cached image
  const cachedImage = await images.get<string>(cacheKey);

  // if we have a cached image, return it
  if (cachedImage) {
    return cachedImage;
  }

  try {
    // if we don't have a cached image, generate one
    const response = await getOpenAI().images.generate({
      model: "dall-e-3",
      prompt: `You are an abstract artist and you are given the following African proverb: "${proverb.text}". Create an image that represents this proverb.`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data?.[0]?.url;

    if (imageUrl) {
      await images.set(cacheKey, imageUrl, {
        ex: 60 * 60 * 1, // expire in 1 hour
      });

      return imageUrl;
    }

    return defaultImageUrl;
  } catch (error) {
    console.error(error);

    return defaultImageUrl;
  }
};
