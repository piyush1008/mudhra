/*
  Warnings:

  - You are about to drop the column `userId` on the `AccountInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `AccountInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountInfo" DROP CONSTRAINT "AccountInfo_userId_fkey";

-- DropIndex
DROP INDEX "AccountInfo_userId_key";

-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo_email_key" ON "AccountInfo"("email");

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD CONSTRAINT "AccountInfo_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
