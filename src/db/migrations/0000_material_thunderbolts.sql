CREATE TABLE `plans` (
	`id` text PRIMARY KEY NOT NULL,
	`trip_id` text NOT NULL,
	`date` text NOT NULL,
	`time` text,
	`place` text NOT NULL,
	`note` text,
	`cost` integer,
	`order` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`status` text NOT NULL,
	`budget` integer,
	`memo` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
