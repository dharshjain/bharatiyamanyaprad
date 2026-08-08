-- ============================================================
-- Bharatiya Manyaprad — Admin Panel Migration
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── 1. Admin Credentials ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_credentials (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username  text UNIQUE NOT NULL,
  password  text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Seed: username = admin, password = admin
INSERT INTO admin_credentials (username, password)
VALUES ('admin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- ── 2. Editorial Board Members ────────────────────────────────
CREATE TABLE IF NOT EXISTS editorial_board_members (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role        text NOT NULL,
  name        text NOT NULL,
  designation text,
  description text,
  email       text,
  sort_order  int  DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

INSERT INTO editorial_board_members (role, name, designation, description, email, sort_order) VALUES
(
  'editor_in_chief',
  'Dr Neerja A Gupta',
  'Editor in Chief and Publisher',
  'Principal, Bharatiya Vidya Bhavan''s Sheth R. A. College of Arts and Commerce, Director, Diasora Studies Center / Study Abroad Program, Gujarat University, Ahmedabad, Gujarat, India. International Academic Council Chair, GOPIO, New York, USA.',
  'drneerjaarun@yahoo.com',
  1
),
(
  'executive_editor',
  'Dr. Sanjeev Kumar Sharma',
  'Executive Editor',
  'Vice Chancellor & Mahatma Gandhi Central University, Bihar. General Secretary & Treasurer, Indian Political Science Association.',
  'vc@mgcub.ac.in',
  2
),
(
  'advisory',
  'Justice Kamleshwar Nath Gupta',
  'Advisory Board Member',
  'Chairman, TII, India. Up-Lokayukta (Karnataka), Vice Chairman – C.A.T (Allahabad), Judge – High Court (Lucknow & Allahabad).',
  'justicekn@gmail.com',
  3
),
(
  'advisory',
  'Dr Kavita Sharma',
  'Advisory Board Member',
  'Director, Indian International Center, New Delhi.',
  'kavitaateducation@yahoo.com',
  4
),
(
  'advisory',
  'Dr. Jagat Motwani',
  'Advisory Board Member',
  'Former International Academic Council Chief, GOPIO, New York, USA.',
  'jagatmotwani@gmail.com',
  5
);

-- ── 3. Editorial Board Document ("Click here to read more") ──
CREATE TABLE IF NOT EXISTS editorial_board_document (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url   text,
  file_name  text,
  updated_at timestamptz DEFAULT now()
);

-- Placeholder row (admin will upload a file later)
INSERT INTO editorial_board_document (id, file_url, file_name)
VALUES (gen_random_uuid(), null, null);

-- ── 4. News & Events ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news_events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content    text NOT NULL,
  sort_order int  DEFAULT 0,
  is_active  boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

INSERT INTO news_events (content, sort_order) VALUES
(
  'Bhartiya Manyaprad has also been included by International E-library www.libgenesis.org and volumes have been uploaded on the website.',
  1
),
(
  'Bhartiya Manyaprad comes under the aegis of Bhartiya Vidya Bhawan and Gujarat University, Ahmedabad (Gujarat).',
  2
),
(
  'Bhartiya Manyaprad receives financial assistance from Indian Council of Historical Research (ICHR).',
  3
);

-- ── 5. Publications ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS publications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  volume     text NOT NULL,
  period     text NOT NULL,
  year       int  NOT NULL,
  pdf_url    text,
  pdf_name   text,
  sort_order int  DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

INSERT INTO publications (title, volume, period, year, sort_order) VALUES
('Bharatiya Manyaprad Vol XI May 2024',               'Vol. XI',    'May 2024',         2024, 1),
('Bharatiya Manyaprad Vol IX May 2022',               'Vol. IX',    'May 2022',         2022, 2),
('Bharatiya Manyaprad Vol VIII July 2020',            'Vol. VIII',  'July 2020',        2020, 3),
('Bharatiya Manyaprad Vol VII April-May 2019',        'Vol. VII',   'April-May 2019',   2019, 4),
('Bharatiya Manyaprad Vol VI April-May 2018',         'Vol. VI',    'April-May 2018',   2018, 5),
('Bharatiya Manyaprad Vol IV July 2017',              'Vol. IV',    'July 2017',        2017, 6),
('Bharatiya Manyaprad Vol IV 2016',                   'Vol. IV',    '2016',             2016, 7),
('Bharatiya Manyaprad 2015',                          'Annual',     '2015',             2015, 8),
('Bharatiya Manyaprad 2014',                          'Annual',     '2014',             2014, 9),
('Bharatiya Manyaprad 2013',                          'Annual',     '2013',             2013, 10),
('International Journal of Indian Studies June 2013', 'Inaugural',  'June 2013',        2013, 11);

-- ── 6. Storage buckets for PDFs ───────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('publications', 'publications', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('editorial-documents', 'editorial-documents', true)
ON CONFLICT (id) DO NOTHING;

-- ── 7. Row-Level Security ─────────────────────────────────────
ALTER TABLE admin_credentials        ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_board_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_board_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events              ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications             ENABLE ROW LEVEL SECURITY;

-- Public SELECT on content tables
CREATE POLICY "public_select_editorial_members"
  ON editorial_board_members FOR SELECT USING (true);

CREATE POLICY "public_select_editorial_document"
  ON editorial_board_document FOR SELECT USING (true);

CREATE POLICY "public_select_news_events"
  ON news_events FOR SELECT USING (is_active = true);

CREATE POLICY "public_select_publications"
  ON publications FOR SELECT USING (true);

-- Admin credential: allow SELECT for login + UPDATE for password change
CREATE POLICY "admin_select_credentials"
  ON admin_credentials FOR SELECT USING (true);

CREATE POLICY "admin_update_credentials"
  ON admin_credentials FOR UPDATE USING (true);

-- Full write access to content tables (admin uses publishable key)
CREATE POLICY "admin_all_editorial_members"
  ON editorial_board_members FOR ALL USING (true);

CREATE POLICY "admin_all_editorial_document"
  ON editorial_board_document FOR ALL USING (true);

CREATE POLICY "admin_all_news_events"
  ON news_events FOR ALL USING (true);

CREATE POLICY "admin_all_publications"
  ON publications FOR ALL USING (true);

-- Storage policies — publications bucket
CREATE POLICY "public_read_publications_storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'publications');

CREATE POLICY "admin_insert_publications_storage"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'publications');

CREATE POLICY "admin_update_publications_storage"
  ON storage.objects FOR UPDATE USING (bucket_id = 'publications');

CREATE POLICY "admin_delete_publications_storage"
  ON storage.objects FOR DELETE USING (bucket_id = 'publications');

-- Storage policies — editorial-documents bucket
CREATE POLICY "public_read_editorial_docs_storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'editorial-documents');

CREATE POLICY "admin_insert_editorial_docs_storage"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'editorial-documents');

CREATE POLICY "admin_update_editorial_docs_storage"
  ON storage.objects FOR UPDATE USING (bucket_id = 'editorial-documents');

CREATE POLICY "admin_delete_editorial_docs_storage"
  ON storage.objects FOR DELETE USING (bucket_id = 'editorial-documents');
