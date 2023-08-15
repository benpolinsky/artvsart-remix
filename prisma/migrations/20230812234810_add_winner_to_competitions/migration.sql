-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "homeArtId" TEXT NOT NULL,
    "awayArtId" TEXT NOT NULL,
    "winnerId" TEXT,
    CONSTRAINT "Competition_homeArtId_fkey" FOREIGN KEY ("homeArtId") REFERENCES "Art" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competition_awayArtId_fkey" FOREIGN KEY ("awayArtId") REFERENCES "Art" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competition_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Art" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("awayArtId", "createdAt", "homeArtId", "id", "updatedAt") SELECT "awayArtId", "createdAt", "homeArtId", "id", "updatedAt" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
