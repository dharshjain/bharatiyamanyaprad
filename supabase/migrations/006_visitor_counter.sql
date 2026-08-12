-- ============================================================
-- Bharatiya Manyaprad — Visitor Counter Migration
-- Tracks total unique website visitors initialized at 30,251
-- ============================================================

CREATE TABLE IF NOT EXISTS site_stats (
  id text PRIMARY KEY DEFAULT 'main',
  visitor_count bigint NOT NULL DEFAULT 30251,
  updated_at timestamptz DEFAULT now()
);

-- Seed initial row with baseline count 30251
INSERT INTO site_stats (id, visitor_count)
VALUES ('main', 30251)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read and update policies
CREATE POLICY "public_select_site_stats"
  ON site_stats FOR SELECT USING (true);

CREATE POLICY "public_update_site_stats"
  ON site_stats FOR UPDATE USING (true);

CREATE POLICY "public_insert_site_stats"
  ON site_stats FOR INSERT WITH CHECK (true);
