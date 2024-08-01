import type { TenantType } from "@/types/type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function EditUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantType>();

  const router = useRouter();

  const tenantId = router.query.id;

  const { data: tenant, isLoading } = useQuery({
    queryKey: [tenantId],
    queryFn: async () => {
      const res = await fetch("/api/tenants/getTenant", {
        method: "POST",
        body: JSON.stringify({
          id: tenantId,
        }),
      });

      if (res.status === 200) {
        const resData = await res.json();
        return await resData.tenant[0].tenant_name;
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    },
  });

  const onClickDeleteButton = async () => {
    const res = await fetch("/api/tenants/deleteTenant", {
      method: "POST",
      body: JSON.stringify({ id: router.query.id }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  const onSubmit = async (val: TenantType) => {
    const res = await fetch("/api/tenants/editTenant", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.id,
        tenant_name: val.tenant_name,
      }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  return isLoading ? (
    <div className="flex justify-center mt-[8rem]">データ取得中...</div>
  ) : (
    <div className="max-w-[100rem] mx-auto p-[4.5rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white">
        <div className="grid grid-cols-3 gap-[1.2rem]">
          <label className="grid justify-end items-center text-[1rem]">
            組織名
          </label>
          <div className="grid justify-start items-center">
            <input
              {...register("tenant_name", {
                required: "※入力は必須です",
              })}
              className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15rem] pl-[0.3rem]"
              type="text"
              defaultValue={tenant ? tenant : ""}
            />
          </div>
          <div className="text-red-500 grid justify-start items-center">
            {errors.tenant_name && errors.tenant_name.message}
          </div>
        </div>
        <div className="flex justify-center items-center mt-[5rem] mr-[0.8rem]">
          <div>
            <button
              type="button"
              onClick={() => {
                router.push("/tenants");
              }}
              className="mx-[0.8rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
            >
              一覧に戻る
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                onClickDeleteButton();
              }}
              className="mx-[0.8rem] bg-[#FFB800] text-white rounded-none focus:outline-none"
            >
              削除する
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="mx-[0.8rem] bg-[#153F8D] text-white rounded-none focus:outline-none"
            >
              保存する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
