/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loan_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL;

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "principal_amount" DOUBLE PRECISION NOT NULL,
    "interest_rate" DOUBLE PRECISION NOT NULL,
    "term_in_months" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_day" INTEGER NOT NULL,
    "remaining_debt" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
