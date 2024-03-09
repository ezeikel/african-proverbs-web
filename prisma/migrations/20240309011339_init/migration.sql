-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ASHANTI', 'ZULU', 'MASAI', 'HAUSA');

-- CreateEnum
CREATE TYPE "Tribe" AS ENUM ('NORTH_AFRICA', 'EAST_AFRICA', 'WEST_AFRICA', 'SOUTH_AFRICA');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WISDOM', 'LIFE', 'LOVE', 'SUCCESS');

-- CreateTable
CREATE TABLE "Proverb" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "region" "Region",
    "tribe" "Tribe",
    "category" "Category",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proverb_pkey" PRIMARY KEY ("id")
);
