/*
  Warnings:

  - A unique constraint covering the columns `[processingKey]` on the table `SomeTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SomeTransaction_processingKey_key" ON "SomeTransaction"("processingKey");
