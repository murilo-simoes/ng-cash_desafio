/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Accounts_userId_transationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_userId_key" ON "Accounts"("userId");
