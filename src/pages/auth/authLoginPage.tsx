import type { Login } from "@/types/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/getLoggedInUserName", {
        method: "POST",
      });
      res.status === 200 && router.push("/");
    };
    checkSession();
  }, [router, router.isReady]);

  const onSubmit = async (val: Login) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: val.email, password: val.password }),
    });

    if (res.status === 200) {
      router.push("/");
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
            autoComplete="email"
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
            autoComplete="password"
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