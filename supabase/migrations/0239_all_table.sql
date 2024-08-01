DO $$
DECLARE
  sql TEXT := '';
  table_name TEXT;
BEGIN
  FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
      sql := sql || 'ALTER TABLE ' || table_name ||
             ' ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' ||
             ' ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;';
  END LOOP;
  EXECUTE sql;

END;
$$;