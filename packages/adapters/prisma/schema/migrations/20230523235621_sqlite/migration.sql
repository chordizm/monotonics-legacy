/*
  Warnings:

  - Added the required column `date` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "datasetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "raw" BLOB NOT NULL,
    "params" TEXT NOT NULL,
    CONSTRAINT "Data_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Data" ("datasetId", "id", "mimeType", "name", "params", "raw") SELECT "datasetId", "id", "mimeType", "name", "params", "raw" FROM "Data";
DROP TABLE "Data";
ALTER TABLE "new_Data" RENAME TO "Data";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
