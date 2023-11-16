import type { Database } from "../types";

const supabaseUrl = process.env.NEXT_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "";

// export const supabaseClient = createClient<Database>(
//   supabaseUrl,
//   supabaseAnonKey
// );

// export const supabaseAdmin = createClient<Database>(
//   supabaseUrl,
//   supabaseServiceRoleKey
// );
