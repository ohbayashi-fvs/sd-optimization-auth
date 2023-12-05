import { Database as authDatabase } from "./supabase";
type authTables = authDatabase["auth"]["Tables"];
export type UserType = authTables["users"]["Row"];

import { Database as publicTenantDataBase } from "./public";
type publicTenantTables = publicTenantDataBase["public"]["Tables"];
export type TenantType = publicTenantTables["tenants"]["Row"];

import { Database as publicProfilesDataBase } from "./public";
type publicProfilesTables = publicProfilesDataBase["public"]["Tables"];
export type ProfilesType = publicProfilesTables["profiles"]["Row"];
