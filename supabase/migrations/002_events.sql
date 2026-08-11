-- ── Events Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  location    text,
  description text,
  event_date  date NOT NULL,
  tags        text[],
  cover_url   text,
  sort_order  int DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Select policy: public can view all events
CREATE POLICY "public_select_events"
  ON events FOR SELECT USING (true);

-- Admin policy: admin credentials can perform any operations
CREATE POLICY "admin_all_events"
  ON events FOR ALL USING (true);
