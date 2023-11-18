import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";

export const supabaseAccessUrl = process.env.NEXT_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || "";
export const supabaseServiceRoleKey =
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdmin = createClient<Database>(
  supabaseAccessUrl,
  supabaseServiceRoleKey
);
