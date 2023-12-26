import type { TenantType } from "@/types/type";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TenantHeader } from "@/features/tenants/components/tenantHeader";

export default function TenantCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantType>();

  const router = useRouter();

  const onSubmit = async (val: TenantType) => {
    const res = await fetch("/api/tenants/createTenant", {
      method: "POST",
      body: JSON.stringify({
        tenant_name: val.tenant_name,
      }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  return (
    <>
      <TenantHeader />
      <div className="max-w-[50rem] mx-auto p-[4.5rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white">
          <div className="grid grid-cols-3 gap-[1.5rem]">
            <label className="grid justify-end items-center text-[1rem]">
              組織名
            </label>
            <div className="grid justify-start items-center col-span-2">
              <input
                {...register("tenant_name", {
                  required: "※入力は必須です",
                })}
                className="h-[2.5rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
                type="text"
                id="tenant_name"
              />
              <div className="text-red-500">
                {errors.tenant_name && errors.tenant_name.message}
              </div>
            </div>
          </div>
          <div className="grid justify-center items-center mt-[3rem]">
            <button
              type="submit"
              className="bg-[#153F8D] text-white rounded-none focus:outline-none"
            >
              追加する
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
