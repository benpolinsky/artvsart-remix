-- CreateTable
CREATE TABLE "Art" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageAltText" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "homeArtId" TEXT NOT NULL,
    "awayArtId" TEXT NOT NULL,
    CONSTRAINT "Competition_homeArtId_fkey" FOREIGN KEY ("homeArtId") REFERENCES "Art" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competition_awayArtId_fkey" FOREIGN KEY ("awayArtId") REFERENCES "Art" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
