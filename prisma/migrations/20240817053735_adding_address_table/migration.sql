/*
  Warnings:

  - You are about to drop the column `address` on the `AccountInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "street" TEXT,
    "zipcode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_email_key" ON "Address"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_email_fkey" FOREIGN KEY ("email") REFERENCES "AccountInfo"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
