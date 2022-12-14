/*
  Warnings:

  - You are about to drop the column `accountId` on the `Transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "accountId";
