import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

export const TenantsHeader = () => {
  const router = useRouter();

  const { isLoading, data: userName } = useQuery({
    queryKey: ["getLoggedInUserName"],
    queryFn: async () => {
      const res = await fetch("/api/auth/getLoggedInUserName", {
        method: "POST",
      });

      if (res.status === 200) {
        return await res.json();
      } else {
        router.push("/login");
      }
    },
  });

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3">
          <h1 className="ml-[2rem] text-[1.5rem] font-normal">
            信号電材テナント管理
          </h1>
        </div>
        <div className="flex w-1/3 justify-center text-[1.2rem]">
          <span className="px-[20px]">
            <Link href={"/tenants"}>一覧表示</Link>
          </span>
          <span className="px-[20px]">
            <Link href={"/tenants/createTenant"}>新規作成</Link>
          </span>
        </div>
        <div className="w-1/3">ログイン中のユーザー：{userName}</div>
      </div>
      <hr />
    </>
  );
};
