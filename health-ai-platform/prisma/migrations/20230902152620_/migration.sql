/*
  Warnings:

  - You are about to alter the column `height` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `weight` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `height` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL;
