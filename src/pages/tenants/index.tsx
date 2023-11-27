import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TenantsHeader } from "@/features/tenants/components/tenantsHeader";
import { TenantList } from "@/features/tenants/components/tenantList";
import { useQuery } from "@tanstack/react-query";

export default function TenantHomePage() {
  const router = useRouter();

  const { isLoading, data: tenants } = useQuery({
    queryKey: ["getTenants"],
    queryFn: async () => {
      const res = await fetch("/api/tenants/getTenants", { method: "POST" });

      if (res.status === 200) {
        const data = await res.json();
        return await data.tenants;
      } else {
        router.push("/login");
      }
    },
  });

  return (
    <>
      <TenantsHeader />
      <TenantList tenants={tenants} />
    </>
  );
}
