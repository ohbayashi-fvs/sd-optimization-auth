import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UserHeader = () => {
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

  const pagePath = router.pathname;
  const selectPage =
    "text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none";
  const unSelectPage =
    "bg-[#153F8D] text-white no-underline rounded-none p-[0.5rem] hover:text-white focus:outline-none";

  const setClassName = (flg: string) => {
    if (pagePath === "/users") {
      if (flg === "allView") {
        return unSelectPage;
      }
      if (flg === "newCreate") {
        return selectPage;
      }
    }
    if (pagePath === "/users/userCreatePage") {
      if (flg === "allView") {
        return selectPage;
      }
      if (flg === "newCreate") {
        return unSelectPage;
      }
    }
  };

  const userPagePath = router.pathname;

  console.log(userPagePath);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3">
          <h1 className="ml-[2rem] text-[1.5rem] font-normal">
            {userPagePath === "/users" && "ユーザー一覧"}
            {userPagePath === "/users/userCreatePage" && "ユーザー新規作成"}
          </h1>
        </div>
        <div className="w-1/3 text-center text-[1.2rem]">
          <span className="px-[20px]">
            <a href={"/users"} className={setClassName("allView")}>
              一覧表示
            </a>
          </span>
          <span className="px-[20px]">
            <a
              href={"/users/userCreatePage"}
              className={setClassName("newCreate")}
            >
              新規作成
            </a>
          </span>
        </div>
        <div className="w-1/3 text-right pr-[2rem]">
          ログイン中のユーザー：{loggedInUserName}
        </div>
      </div>
      <div className="mx-[1.5rem] border-solid border-[0.1rem] border-[#B9C3CF]"></div>
    </>
  );
};
