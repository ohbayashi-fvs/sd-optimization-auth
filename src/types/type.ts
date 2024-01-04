import { Database as supabaseDatabase } from "./supabase";
import { Database as publicDataBase } from "./public";

type authTables = supabaseDatabase["auth"]["Tables"];
export type UserType = authTables["users"]["Row"];

type publicTenantTables = publicDataBase["public"]["Tables"];
export type TenantType = publicTenantTables["tenants"]["Row"];

type publicProfilesTables = publicDataBase["public"]["Tables"];
export type ProfilesType = publicProfilesTables["profiles"]["Row"];
