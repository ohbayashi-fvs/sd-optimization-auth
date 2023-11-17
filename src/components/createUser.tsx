import { Create } from "@/types/user/User";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const CreateUser = () => {
  // const { session, signup } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Create>();

  const router = useRouter();

  const onSubmit = async (val: Create) => {
    console.log(val);

    await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify({
        name: val.app_metadata.user_name,
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
          <div className="pl-[3.5rem]">
            <input
              {...register("app_metadata.user_name", {
                required: "※入力は必須です",
              })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="text"
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
          <div className="pl-[2.5rem]">
            <input
              {...register("email", { required: "※入力は必須です" })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="text"
              name="email"
            />
            <div className="text-red-500">
              {errors.email && errors.email.message}
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <label className="mb-[2rem] text-[1.1rem]">パスワード</label>
          <div className="pl-[4.5rem]">
            <input
              {...register("password", { required: "※入力は必須です" })}
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="password"
              name="password"
            />
            <div className="text-red-500">
              {errors.password && errors.password.message}
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <label className="mb-[2rem] text-[1.1rem]">パスワード（確認）</label>
          <div>
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
              className="h-[2.5rem] rounded-sm border-[1.5px] border-main text-[1.2rem] min-w-[30rem]"
              type="password"
            />
            <div className="text-red-500">
              {errors.passwordConf && errors.passwordConf.message}
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
  );
};
