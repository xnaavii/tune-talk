ALTER TABLE "album" RENAME COLUMN "spotify_url" TO "apple_music_url";--> statement-breakpoint
-- Spotify albums can't be looked up on Apple Music, so drop them (and their reviews).
DELETE FROM "album" WHERE "id" !~ '^[0-9]+$';
