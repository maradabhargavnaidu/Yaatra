-- CreateEnum
CREATE TYPE "category" AS ENUM ('Historical', 'Temple', 'Beach', 'Waterfalls', 'Wildlife', 'Season');

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" "category" NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "maps_link" VARCHAR(255),
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "places_slug_key" ON "places"("slug");
