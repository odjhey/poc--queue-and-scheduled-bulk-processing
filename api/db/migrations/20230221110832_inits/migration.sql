-- CreateTable
CREATE TABLE "SomeTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner" TEXT NOT NULL,
    "processingKey" TEXT NOT NULL,
    "lastProcessedAt" DATETIME
);
