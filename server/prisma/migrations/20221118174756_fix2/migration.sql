/*
  Warnings:

  - You are about to drop the column `transationId` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropIndex
DROP INDEX "Transactions_userId_key";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "transationId";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "userId",
ADD COLUMN     "accountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
