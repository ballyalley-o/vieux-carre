-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failedSignInAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastFailedAttempt" TIMESTAMP(3);
