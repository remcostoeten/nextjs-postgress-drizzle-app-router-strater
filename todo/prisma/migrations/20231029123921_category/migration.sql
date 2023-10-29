-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3),

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
