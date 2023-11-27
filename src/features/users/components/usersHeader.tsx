import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UsersHeader = () => {
  const [loggedInUserName, setLoggedInUserName] = useState("-");

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/getLoggedInUserName", {
        method: "POST",
      });

      if (res.status === 200) {
        const loggedInUserName = await res.json();
        setLoggedInUserName(loggedInUserName);
      } else {
        router.push("/login");
      }
    };
    checkSession();
  }, [router, router.isReady]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3">
          <h1 className="ml-[2rem] text-[1.5rem] font-normal">
            信号電材ユーザー管理
          </h1>
        </div>
        <div className="flex w-1/3 justify-center text-[1.2rem]">
          <span className="px-[20px]">
            <Link href={"/users"}>一覧表示</Link>
          </span>
          <span className="px-[20px]">
            <Link href={"/users/createUser"}>新規作成</Link>
          </span>
        </div>
        <div className="w-1/3">ログイン中のユーザー：{loggedInUserName}</div>
      </div>
      <hr />
    </>
  );
};
