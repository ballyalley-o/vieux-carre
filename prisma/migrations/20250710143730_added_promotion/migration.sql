-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('banner', 'popup', 'email', 'swiper', 'carousel', 'announcement');

-- CreateTable
CREATE TABLE "Promotion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL DEFAULT 'carousel',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "discountPercentage" DECIMAL(5,2),
    "discountAmount" DECIMAL(12,2),
    "productId" UUID,
    "targetType" TEXT,
    "targetId" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
