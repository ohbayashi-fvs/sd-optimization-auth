import type { UserType } from "@/types/type";
import { UserHeader } from "@/features/users/components/userHeader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Spin } from "antd";

export default function UserCreatePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserType>();

  const router = useRouter();

  const [isUsedEmail, setIsUsedEmail] = useState<string>("");

  // get tenants
  const { data: tenants, isLoading } = useQuery({
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

  // create user
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
    res.status === 422 &&
      setIsUsedEmail("送信したメールアドレスは使用されています");
  };

  return (
    <>
      <UserHeader />
      {isLoading ? (
        <div className="flex justify-center mt-[8rem]">データ取得中...</div>
      ) : (
        <div className="max-w-[100rem] mx-auto p-[2rem]">

          <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white">
          <div className="grid grid-cols-3 gap-[1rem] ml-[15rem] mr-[8rem]">
            <h1 className="text-xl text-right">アカウント作成</h1>
            <div className="col-span-2">

            </div>

              <label className="grid justify-end items-center text-[1rem]">
                ユーザー名
              </label>
              <div className="grid justify-start items-center">
                <input
                  {...register("app_metadata.user_name", {
                    required: "※入力は必須です",
                  })}
                  className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15rem] pl-[0.3rem]"
                  type="text"
                  id="user_name"
                />
              </div>
              <div className="text-red-500 grid justify-start items-center">
                {errors.app_metadata?.user_name &&
                  errors.app_metadata?.user_name.message}
              </div>

              <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
                メールアドレス
              </label>
              <div className="grid justify-start items-center pt-[1.5rem]">
                <input
                  {...register("email", {
                    required: "※入力は必須です",
                    onChange: () => {
                      setIsUsedEmail("");
                    },
                  })}
                  className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15rem] pl-[0.3rem]"
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="email"
                />
              </div>
              <div className="text-red-500 grid justify-start items-center pt-[1.5rem]">
                {errors.email && isUsedEmail === ""
                  ? errors.email.message
                  : isUsedEmail && isUsedEmail}
              </div>

              <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
                所属
              </label>
              <div className="grid justify-start items-center pt-[1.5rem]">
                <select
                  {...register("app_metadata.tenant_id", {
                    required: "※入力は必須です",
                  })}
                  className="h-[2.3rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15.6rem] pl-[0.1rem]"
                >
                  {tenants &&
                    tenants.map((tenant: any) => (
                      <option id="tenant_id" key={tenant.id} value={tenant.id}>
                        {tenant.tenant_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="text-red-500 grid justify-start items-center pt-[1.5rem]">
                {errors.app_metadata?.tenant_id &&
                  errors.app_metadata?.tenant_id.message}
              </div>

              <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
                パスワード
              </label>
              <div className="grid justify-start items-center pt-[1.5rem]">
                <input
                  {...register("password", {
                    required: "※入力は必須です",
                    validate: (value) => {
                      return value.length >= 8 || "8文字以上で作成してください";
                    },
                  })}
                  className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15rem] pl-[0.3rem]"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                />
              </div>
              <div className="text-red-500 grid justify-start items-center pt-[1.5rem]">
                {errors.password && errors.password.message}
              </div>

              <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
                パスワード（確認）
              </label>
              <div className="grid justify-start items-center pt-[1.5rem]">
                <input
                  {...register("passwordConf", {
                    required: "※入力は必須です",
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "パスワードが一致しません"
                      );
                    },
                  })}
                  className="h-[2rem] rounded-sm border-[0.1rem] border-main text-[1rem] min-w-[15rem] pl-[0.3rem]"
                  type="password"
                  autoComplete="new-password"
                  id="passwordConf"
                />
              </div>
              <div className="text-red-500 grid justify-start items-center pt-[1.5rem]">
                {errors.passwordConf && errors.passwordConf.message}
              </div>
            </div>
            <div className="flex justify-center items-center mt-[3.5rem]">
              <button
                type="submit"
                className="mx-[0.8rem] bg-[#153F8D] text-white rounded-none focus:outline-none"
              >
                追加する
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
