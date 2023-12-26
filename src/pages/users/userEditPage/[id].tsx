import type { UserType } from "@/types/type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function UserEditPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserType>();

  const router = useRouter();

  const userId = router.query.id;

  const { data: user } = useQuery({
    queryKey: [userId],
    queryFn: async () => {
      const res = await fetch("/api/users/getUser", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
        }),
      });

      if (res.status === 200) {
        const resData = await res.json();
        return await resData.users.user;
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    },
  });

  const onClickDeleteButton = async () => {
    const res = await fetch("/api/users/deleteUser", {
      method: "POST",
      body: JSON.stringify({ id: router.query.id }),
    });
    res.status === 200 && router.push("/users");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  const onSubmit = async (val: UserType) => {
    const res = await fetch("/api/users/editUser", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.id,
        user_name: val.app_metadata.user_name,
        email: val.email,
        password: val.password,
      }),
    });
    res.status === 200 && router.push("/users");
    res.status === 401 && router.push("/auth/authLoginPage");
  };

  return (
    <div className="max-w-[50rem] mx-auto p-[5rem]">
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
              className="h-[2.5rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
              type="text"
              defaultValue={user ? user.app_metadata.user_name : ""}
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
              {...register("email", {
                required: "※入力は必須です",
              })}
              className="h-[2.5rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
              type="email"
              autoComplete="email"
              defaultValue={user ? user.email : ""}
            />
            <div className="text-red-500">
              {errors.email && errors.email.message}
            </div>
          </div>

          <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
            新しいパスワード
          </label>
          <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
            <input
              {...register("password", {
                required: "※入力は必須です",
                validate: (value: string) => {
                  return value.length >= 8 || "8文字以上で作成してください";
                },
              })}
              className="h-[2.5rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
              type="password"
              autoComplete="new-password"
            />
            <div className="text-red-500">
              {errors.password && errors.password.message}
            </div>
          </div>

          <label className="grid justify-end items-center pt-[1.5rem] text-[1rem]">
            新しいパスワード（確認）
          </label>
          <div className="grid justify-start items-center col-span-2 pt-[1.5rem]">
            <input
              {...register("passwordConf", {
                required: "※入力は必須です",
                validate: (value) => {
                  if (value !== getValues("password")) {
                    return "パスワードが一致しません";
                  }
                },
              })}
              className="h-[2.5rem] rounded-sm border-[0.1rem] border-main text-[1.2rem] min-w-[20rem]"
              type="password"
              autoComplete="new-password"
            />
            <div className="text-red-500">
              {errors.passwordConf && errors.passwordConf.message}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-[5rem]">
          <div className="grid justify-center">
            <button
              type="button"
              onClick={() => {
                router.push("/users");
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
