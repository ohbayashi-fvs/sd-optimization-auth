import { useRouter } from "next/router";
import { useAuth } from "../components/auth/AuthProvider";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/types/Auth";

export default function Login() {
  const { session, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  if (session) {
    router.push("/");
  }
  const onSubmit = async (val: LoginForm) => {
    if (login) {
      await login({ email: val.email, password: val.password }).then(() =>
        router.push("/")
      );
    }
  };

  return (
    <div>
      <section className="m-[30vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[20rem] flex-col gap-2 text-[1.2rem]"
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            メールアドレス
          </label>
          <input
            {...register("email", { required: true })}
            name="email"
            type="email"
            className="h-[1.5rem] rounded border-solid border-main p-2 text-[1.2rem]"
          />
          {errors.email && errors.email.message}
          <label className="block text-gray-700 text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            {...register("password", { required: true })}
            name="password"
            type="password"
            className="h-[1.5rem] rounded border-solid border-main p-2 text-[1.2rem]"
          />
          {errors.password && errors.password.message}
          <button
            type="submit"
            className="mx-auto mt-8 w-40 rounded bg-main text-white"
          >
            ログイン
          </button>
        </form>
      </section>
    </div>
  );
}
