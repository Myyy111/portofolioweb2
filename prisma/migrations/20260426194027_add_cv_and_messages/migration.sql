-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "desc_en" TEXT DEFAULT 'I''m always open to new opportunities and collaborations. Whether you have a project, a question, or just want to say hi — my inbox is always open.',
ADD COLUMN     "desc_id" TEXT DEFAULT 'Saya selalu terbuka untuk peluang dan kolaborasi baru. Apapun yang ingin Anda diskusikan, jangan ragu untuk menghubungi saya.',
ADD COLUMN     "title_en" TEXT DEFAULT 'Let''s Talk',
ADD COLUMN     "title_id" TEXT DEFAULT 'Mari Bicara';

-- AlterTable
ALTER TABLE "Hero" ADD COLUMN     "cv_url" TEXT;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
