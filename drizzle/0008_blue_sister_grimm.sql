ALTER TABLE "task" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "weights" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN IF EXISTS "notifications";