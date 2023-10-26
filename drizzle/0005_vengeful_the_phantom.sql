ALTER TABLE "task" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "isCompleted" DROP NOT NULL;