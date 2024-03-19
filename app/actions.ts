"use server";

import prisma from "@/lib/prisma";
import { Category, Region, Country, Tribe } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProverb = async (
  userId: string | undefined,
  formData: FormData,
) => {
  // TODO: check if there is a user before allowing them to create a proverb
  // retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("You must be logged in to create a proverb.");
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
