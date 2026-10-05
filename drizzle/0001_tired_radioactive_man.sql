ALTER TABLE `enquiries` ADD `payload_hash` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `delivery_status` text DEFAULT 'legacy' NOT NULL;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `email_payload` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `resend_id` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `delivery_attempted_at` integer;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `delivery_updated_at` integer;--> statement-breakpoint
CREATE INDEX `idx_enquiries_payload_created` ON `enquiries` (`payload_hash`,`created_at`);