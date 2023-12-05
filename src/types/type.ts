import { Database as authDatabase } from "./supabase";
type authTables = authDatabase["auth"]["Tables"];
export type UserType = authTables["users"]["Row"];

import { Database as publicDataBase } from "./public";
type publicTables = publicDataBase["public"]["Tables"];
export type TenantType = publicTables["tenants"]["Row"];
