import { useRouter } from "next/router";
import { TenantHeader } from "@/features/tenants/components/tenantHeader";
import { TenantList } from "@/features/tenants/components/tenantList";
import { useQuery } from "@tanstack/react-query";

export default function TenantHomePage() {
  const router = useRouter();

  const { data: tenants } = useQuery({
    queryKey: ["getTenants"],
    queryFn: async () => {
      const res = await fetch("/api/tenants/getTenants", { method: "POST" });

      if (res.status === 200) {
        const resData = await res.json();
        return await resData.tenants;
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    },
  });

  return (
    <>
      <TenantHeader />
      <TenantList tenants={tenants} />
    </>
  );
}
