"use server";

import prisma from "@/lib/prisma";
import { Category, Region, Role, Tribe } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProverb = async (
  userId: string | undefined,
  formData: FormData,
) => {
  // retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // check if the user exists and if their role is ADMIN
  if (!user || user.role !== Role.ADMIN) {
    // If the user does not exist or is not an ADMIN, return an error response
    return console.error("Unauthorized: Only admins can create proverbs.");
  }

  const rawFormData = {
    text: (formData.get("text") as string) || "",
    region: (formData.get("region") as Region) || undefined,
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

export const getProverbs = async () => {
  const proverbs = await prisma.proverb.findMany();

  return proverbs;
};

export const getProverb = async (id: string) => {
  const proverb = await prisma.proverb.findFirst({
    where: {
      id,
    },
  });

  return proverb;
};
