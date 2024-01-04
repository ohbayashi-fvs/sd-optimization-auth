CREATE TABLE "ip_address" (
  "addresses" text PRIMARY KEY
);

CREATE TABLE "tenants" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "tenant_name" text NOT NULL
);

CREATE TABLE "profiles" (
  "id" uuid PRIMARY KEY,
  "user_name" text,
  -- "user_id" uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  "tenant_id" uuid REFERENCES tenants (id)
);