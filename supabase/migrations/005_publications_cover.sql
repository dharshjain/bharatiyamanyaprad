-- ============================================================
-- Bharatiya Manyaprad — Publication Cover Image Migration
-- Adds optional cover_url and cover_name to publications table
-- ============================================================

ALTER TABLE publications
  ADD COLUMN IF NOT EXISTS cover_url  text,
  ADD COLUMN IF NOT EXISTS cover_name text;
