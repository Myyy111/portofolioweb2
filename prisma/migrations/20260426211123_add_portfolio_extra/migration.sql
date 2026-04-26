-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "portfolio_extra_en" TEXT DEFAULT 'Languages: Indonesian (Native), English (Professional)',
ADD COLUMN     "portfolio_extra_id" TEXT DEFAULT 'Bahasa: Indonesia (Native), Inggris (Profesional)',
ALTER COLUMN "footer_copy" SET DEFAULT '© 2026 Helmi. Hak cipta dilindungi.',
ALTER COLUMN "footer_made" SET DEFAULT '© 2026 Helmi. All rights reserved.';
