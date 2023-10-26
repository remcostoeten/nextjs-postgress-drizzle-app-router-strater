ALTER TABLE "task" ADD COLUMN "notifications" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN IF EXISTS "weights";