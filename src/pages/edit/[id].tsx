import { Edit, User } from "@/types/user/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditUser() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Edit>();

  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetch("/api/getUser", {
        method: "POST",
        body: JSON.stringify({
          id: router.query.id,
        }),
      }).then((data) => data.json());

      setUser(data.users.user);
    };

    getUserData();
  }, [router.isReady, router.query.id]);

  const onSubmit = async (val: Edit) => {
    await fetch("/api/editUser", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.id,
        user_name: val.app_metadata.user_name,
        email: val.email,
        password: val.password,
      }),
    }).then(() => router.push("/"));
  };

  return (
    <div className="min-w-[30rem] py-[5rem] mb-[2rem] flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
        <div className="flex justify-start">
          <label className="mb-[2rem] mr-[1rem] text-[1.1rem]">
            ユーザー名
          </label>
          <div className="pl-[6.8rem]">
            <input
              {...register("app_metadata.user_name", {
                required: "※入力は必須です",
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="text"
              defaultValue={user ? user.app_metadata.user_name : ""}
            />
            <div className="text-red-500">
              {errors.app_metadata?.user_name &&
                errors.app_metadata?.user_name.message}
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <label className="mb-[2rem] text-[1.1rem] min-w-[5rem]">
            メールアドレス
          </label>
          <div className="pl-[5.7rem]">
            <input
              {...register("email", {
                required: "※入力は必須です",
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="email"
              autoComplete="email"
              defaultValue={user ? user.email : ""}
            />
            <div className="text-red-500">
              {errors.email && errors.email.message}
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <label className="mb-[2rem] text-[1.1rem]">新しいパスワード</label>
          <div className="pl-[4.5rem]">
            <input
              {...register("password", {
                required: "※入力は必須です",
                validate: (value: string) => {
                  return value.length >= 8 || "8文字以上で作成してください";
                },
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="password"
              autoComplete="new-password"
            />
            <div className="text-red-500">
              {errors.password && errors.password.message}
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <label className="mb-[2rem] text-[1.1rem]">
            新しいパスワード（確認）
          </label>
          <div>
            <input
              {...register("passwordConf", {
                required: "※入力は必須です",
                validate: (value) => {
                  if (value !== getValues("password")) {
                    return "メールアドレスが一致しません";
                  }
                },
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="password"
              autoComplete="new-password"
            />
            <div className="text-red-500">
              {errors.passwordConf && errors.passwordConf.message}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              router.push("/");
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            一覧に戻る
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            保存する
          </button>
        </div>
      </form>
    </div>
  );
}
