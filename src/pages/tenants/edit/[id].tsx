import type { EditTenant } from "@/types/tenant/tenant";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function EditUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTenant>();

  const router = useRouter();

  const { data: tenantData } = useQuery({
    queryKey: ["getTenant"],
    queryFn: async () => {
      const res = await fetch("/api/tenants/getTenant", {
        method: "POST",
        body: JSON.stringify({
          id: router.query.id,
        }),
      });

      if (res.status === 200) {
        const resData = await res.json();
        return await resData.tenant[0].tenant_name;
      }
      res.status === 401 && router.push("/login");
    },
  });

  const onSubmit = async (val: EditTenant) => {
    const res = await fetch("/api/tenants/editTenant", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.id,
        tenant_name: val.tenant_name,
      }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/login");
  };

  return (
    <div className="min-w-[30rem] py-[5rem] mb-[2rem] flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
        <div className="flex justify-start">
          <label className="mb-[2rem] mr-[1rem] text-[1.1rem]">
            テナント名
          </label>
          <div className="pl-[6.8rem]">
            <input
              {...register("tenant_name", {
                required: "※入力は必須です",
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="text"
              defaultValue={tenantData ? tenantData : ""}
            />
            <div className="text-red-500">
              {errors.tenant_name && errors.tenant_name.message}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              router.push("/tenants");
            }}
            className="text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
          >
            一覧に戻る
          </button>
          <button
            type="submit"
            className="bg-[#153F8D] text-white rounded-none focus:outline-none"
          >
            保存する
          </button>
        </div>
      </form>
    </div>
  );
}
