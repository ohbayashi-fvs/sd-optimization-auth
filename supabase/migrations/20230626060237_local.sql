CREATE TABLE "tenants" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "tenant_name" text NOT NULL
);

CREATE TABLE "ip_address" (
  "addresses" text PRIMARY KEY
);
