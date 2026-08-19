-- ============================================================
-- Bharatiya Manyaprad — Supabase Keep Alive Migration
-- RPC helper function for checking and pinging project activity
-- ============================================================

CREATE OR REPLACE FUNCTION public.keep_alive_ping()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT json_build_object(
    'status', 'ok',
    'timestamp', now(),
    'message', 'Supabase project active'
  );
$$;

-- Grant execute permission to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.keep_alive_ping() TO anon, authenticated;
