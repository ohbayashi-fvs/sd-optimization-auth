import type { UserType } from "@/types/type";
import { UserHeader } from "@/features/users/components/userHeader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function UserCreatePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserType>();
  const router = useRouter();

  // get public.tenants
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

  // create auth.user
  const onSubmit = async (val: UserType) => {
    const res = await fetch("/api/users/createUser", {
      method: "POST",
      body: JSON.stringify({
        user_name: val.app_metadata.user_name,
        email: val.email,
        tenant_id: val.app_metadata.tenant_id,
        password: val.password,
      }),
    });
    res.status === 200 && router.push("/users");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  return (
    <>
      <UserHeader />
      <div className="max-w-[50rem] mx-auto p-[4.5rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white">
          <div className="grid grid-cols-3 gap-[1.5rem]">
            <label className="grid justify-end items-center text-[1rem]">
              ユーザー名
            </label>
            <div className="grid justify-start items-center col-span-2">
              <input
                {...register("app_metadata.user_name", {
                  required: "※入力は必須です",
                })}
                className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
                type="text"
                id="user_name"
              />
              <div className="text-red-500">
                {errors.app_metadata?.user_name &&
                  errors.app_metadata?.user_name.message}
              </div>
            </div>

            <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
              メールアドレス
            </label>
            <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
              <input
                {...register("email", { required: "※入力は必須です" })}
                className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
                type="email"
                name="email"
                autoComplete="email"
                id="email"
              />
              <div className="text-red-500">
                {errors.email && errors.email.message}
              </div>
            </div>

            <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
              所属
            </label>
            <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
              <select
                {...register("app_metadata.tenant_id", {
                  required: "※入力は必須です",
                })}
                className="h-[2.3rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20.4rem]"
              >
                {tenants &&
                  tenants.map((tenant: any) => (
                    <option id="tenant_id" key={tenant.id} value={tenant.id}>
                      {tenant.tenant_name}
                    </option>
                  ))}
              </select>
              <div className="text-red-500">
                {errors.app_metadata?.tenant_id &&
                  errors.app_metadata?.tenant_id.message}
              </div>
            </div>

            <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
              パスワード
            </label>
            <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
              <input
                {...register("password", {
                  required: "※入力は必須です",
                  validate: (value: string) => {
                    return value.length >= 8 || "8文字以上で作成してください";
                  },
                })}
                className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
              />
              <div className="text-red-500">
                {errors.password && errors.password.message}
              </div>
            </div>

            <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
              パスワード（確認）
            </label>
            <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
              <input
                {...register("passwordConf", {
                  required: "※入力は必須です",
                  validate: (value) => {
                    return (
                      value === getValues("password") ||
                      "メールアドレスが一致しません"
                    );
                  },
                })}
                className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
                type="password"
                autoComplete="new-password"
                id="passwordConf"
              />
              <div className="text-red-500">
                {errors.passwordConf && errors.passwordConf.message}
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
