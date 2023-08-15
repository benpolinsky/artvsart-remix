/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");
