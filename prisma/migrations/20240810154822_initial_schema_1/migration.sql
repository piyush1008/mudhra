-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVING', 'CURRENT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "accnt_number" INTEGER NOT NULL,
    "account_holder_Name" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL DEFAULT 'SAVING',

    CONSTRAINT "AccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscationInfo" (
    "id" SERIAL NOT NULL,
    "to_account" INTEGER NOT NULL,
    "accountid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TranscationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo_userId_key" ON "AccountInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo_accnt_number_key" ON "AccountInfo"("accnt_number");

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD CONSTRAINT "AccountInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscationInfo" ADD CONSTRAINT "TranscationInfo_accountid_fkey" FOREIGN KEY ("accountid") REFERENCES "AccountInfo"("accnt_number") ON DELETE RESTRICT ON UPDATE CASCADE;
