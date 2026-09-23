ALTER TABLE "promotion_targets" DROP CONSTRAINT "promotion_targets_target_type_check";--> statement-breakpoint
ALTER TABLE "promotion_targets" DROP CONSTRAINT "promotion_targets_placement_check";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand_name" varchar(255);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "mrp_price" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "short_description" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "badges" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "promotions" ADD COLUMN "badge_text" varchar(100);