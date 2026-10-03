CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`source_page` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`company` text NOT NULL,
	`details` text NOT NULL,
	`payload_hash` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
