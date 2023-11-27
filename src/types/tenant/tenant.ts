export type Tenant = {
  id: string;
  tenant_name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateTenant = {
  tenant_name: string;
};

export type EditTenant = {
  tenant_name: string;
};
