import type { Database } from "../types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "";

const supabasePublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabasePublicServiceRoleKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";

// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export const supabasePublicAdmin = createClient<Database>(
  supabasePublicUrl,
  supabasePublicServiceRoleKey
);

// export const supabaseClient = createClient<Database>(
//   supabaseUrl,
//   supabaseAnonKey
// );

export const supabasePublicClient = createClient<Database>(
  supabasePublicUrl,
  supabasePublicAnonKey
);

// supabaseClient.auth.onAuthStateChange((event, session) => {});
// const session = supabaseClient.auth.getSession();

// console.log(session);
