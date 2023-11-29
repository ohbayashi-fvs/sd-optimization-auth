import type { EditTenant } from "@/types/tenant/tenant";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTenant>();

  const [tenantName, setTenant] = useState();

  const router = useRouter();

  // const { data: tenantData, isLoading } = useQuery({
  //   queryKey: ["getTenant"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/tenants/getTenant", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         id: router.query.id,
  //       }),
  //     });

  //     if (res.status === 200) {
  //       const resData = await res.json();
  //       return await resData.tenant[0].tenant_name;
  //     }
  //     res.status === 401 && router.push("/auth/authLoginPage");
  //   },
  // });

  useEffect(() => {
    const getTenantData = async () => {
      const res = await fetch("/api/tenants/getTenant", {
        method: "POST",
        body: JSON.stringify({
          id: router.query.id,
        }),
      });

      if (res.status === 200) {
        const resData = await res.json();
        setTenant(resData.tenant[0].tenant_name);
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    };

    getTenantData();
  }, [router]);

  const onClickDeleteButton = async () => {
    const res = await fetch("/api/tenants/deleteTenant", {
      method: "POST",
      body: JSON.stringify({ id: router.query.id }),
    });
    res.status === 200 && router.push("/tenants");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  const onSubmit = async (val: EditTenant) => {
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

  return (
    <div className="max-w-[50rem] mx-auto p-[5rem]">
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
              defaultValue={tenantName ? tenantName : ""}
            />
            <div className="text-red-500">
              {errors.tenant_name && errors.tenant_name.message}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-[5rem]">
          <div className="grid justify-center">
            <button
              type="button"
              onClick={() => {
                router.push("/tenants");
              }}
              className="mx-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
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
              className="mx-[1rem] bg-[#FFB800] text-white rounded-none focus:outline-none"
            >
              削除する
            </button>
            <button
              type="submit"
              className="mx-[1rem] bg-[#153F8D] text-white rounded-none focus:outline-none"
            >
              保存する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
