-- ============================================================
-- Bharatiya Manyaprad — Enhanced Publications Migration
-- Adds detailed article-level fields to the publications table
-- ============================================================

ALTER TABLE publications
  ADD COLUMN IF NOT EXISTS journal_name text NOT NULL DEFAULT 'Bharatiya Manyaprad',
  ADD COLUMN IF NOT EXISTS issue_no     text,
  ADD COLUMN IF NOT EXISTS pages        text,
  ADD COLUMN IF NOT EXISTS author       text;
