'use server';

import prisma from "@/lib/prisma";
import { Category, Region, Tribe } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProverb = async (
formData: FormData
) => {
    const rawFormData = {
      text: formData.get('text') as string || '', 
      region: formData.get('region') as Region || undefined,
      tribe: formData.get('tribe') as Tribe || undefined,
      category: formData.get('category') as Category || undefined,
    }

  const proverb = await prisma.proverb.create({
    data: rawFormData,
  });

  // update cache
  revalidatePath('/proverbs');

  return proverb;
};

export const getProverbs = async () => {
  const proverbs = await prisma.proverb.findMany();

  return proverbs;
}

export const getProverb = async (id: number) => {
  const proverb = await prisma.proverb.findFirst({
    where: {
      id,
    }
  });

  return proverb;
}