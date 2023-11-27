import type { CreateTenant } from "@/types/tenant/tenant";
import { UsersHeader } from "@/features/users/components/usersHeader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function CreateTenant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTenant>();

  const router = useRouter();

  const onSubmit = async (val: CreateTenant) => {
    const res = await fetch("/api/tenants/createTenant", {
      method: "POST",
      body: JSON.stringify({
        tenant_name: val.tenant_name,
      }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/login");
  };

  return (
    <>
      <UsersHeader />
      <div className="min-w-[30rem] py-[5rem] mb-[2rem] flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
          <div className="flex justify-start">
            <label className="mb-[2rem] mr-[1rem] text-[1.1rem]">
              テナント名
            </label>
            <div className="pl-[3.5rem]">
              <input
                {...register("tenant_name", {
                  required: "※入力は必須です",
                })}
                className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
                type="text"
                id="tenant_name"
              />
              <div className="text-red-500">
                {errors.tenant_name && errors.tenant_name.message}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              追加する
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
