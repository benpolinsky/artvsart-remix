/*
  Warnings:

  - You are about to drop the column `salt` on the `Administrator` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Administrator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL
);
INSERT INTO "new_Administrator" ("email", "hashedPassword", "id") SELECT "email", "hashedPassword", "id" FROM "Administrator";
DROP TABLE "Administrator";
ALTER TABLE "new_Administrator" RENAME TO "Administrator";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
