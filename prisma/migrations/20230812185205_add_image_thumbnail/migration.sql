-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Art" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL,
    "imageThumbnailUrl" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "imageAltText" TEXT NOT NULL
);
INSERT INTO "new_Art" ("createdAt", "creationDate", "creator", "description", "id", "imageAltText", "imageUrl", "title", "updatedAt") SELECT "createdAt", "creationDate", "creator", "description", "id", "imageAltText", "imageUrl", "title", "updatedAt" FROM "Art";
DROP TABLE "Art";
ALTER TABLE "new_Art" RENAME TO "Art";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
