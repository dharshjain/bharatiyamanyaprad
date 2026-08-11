-- ============================================================
-- Bharatiya Manyaprad — Subscriptions Registry Migration
-- ============================================================

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  address      text NOT NULL,
  country      text NOT NULL,
  mobile       text NOT NULL,
  type         text NOT NULL,
  period       text NOT NULL,
  payment      text NOT NULL,
  bank         text,
  amount       text,
  date         text,
  receipt_url  text,
  receipt_name text,
  status       text NOT NULL DEFAULT 'Pending',
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow all operations for simplistic dashboard integration (matching default model)
CREATE POLICY "allow_all_subscriptions" ON subscriptions FOR ALL USING (true);

-- Create subscriptions storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('subscriptions', 'subscriptions', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for subscriptions storage bucket
CREATE POLICY "public_read_subscriptions_storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'subscriptions');

CREATE POLICY "public_insert_subscriptions_storage"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'subscriptions');

CREATE POLICY "admin_all_subscriptions_storage"
  ON storage.objects FOR ALL USING (bucket_id = 'subscriptions');
