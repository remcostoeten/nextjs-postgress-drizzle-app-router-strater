ALTER TABLE "task" ADD COLUMN "weight" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN IF EXISTS "notifications";