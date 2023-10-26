ALTER TABLE "task" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "isCompleted" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "weights" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN IF EXISTS "weight";