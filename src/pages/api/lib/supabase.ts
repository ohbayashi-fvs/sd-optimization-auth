import { createClient } from "@supabase/supabase-js";

export const supabaseAccessUrl = process.env.NEXT_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || "";
export const supabaseServiceRoleKey =
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "";

// export const supabasePublicAccessUrl =
//   process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// export const supabasePublicAnonKey =
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// export const supabasePublicServiceRoleKey =
//   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdmin = createClient(
  supabaseAccessUrl,
  supabaseServiceRoleKey
);

// export const supabasePublicAdmin = createClient<Database>(
//   supabasePublicAccessUrl,
//   supabasePublicServiceRoleKey
// );

export const supabaseClient = createClient(supabaseAccessUrl, supabaseAnonKey);

// export const supabasePublicClient = createClient<Database>(
//   supabasePublicAccessUrl,
//   supabasePublicAnonKey
// );
