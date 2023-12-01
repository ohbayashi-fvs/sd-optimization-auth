import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const UserHeader = () => {
  const router = useRouter();

  const userPagePath = router.pathname;

  const { data: loggedInUserName } = useQuery({
    queryKey: ["getLoggedInUserName"],
    queryFn: async () => {
      const res = await fetch("/api/auth/getLoggedInUserName", {
        method: "POST",
      });

      if (res.status === 200) {
        return await res.json();
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    },
  });

  const selectPage =
    "text-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none";
  const unSelectPage =
    "bg-[#153F8D] px-[1rem] text-[1rem] text-white no-underline rounded-sm p-[0.5rem] hover:text-white focus:outline-none";

  const setClassName = (selectButton: string) => {
    if (userPagePath === "/users") {
      if (selectButton === "allView") {
        return unSelectPage;
      }
      if (selectButton === "newCreate") {
        return selectPage;
      }
    }
    if (userPagePath === "/users/userCreatePage") {
      if (selectButton === "allView") {
        return selectPage;
      }
      if (selectButton === "newCreate") {
        return unSelectPage;
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between h-[5rem] w-full">
        <div className="w-1/4 text-center">
          <h1 className="text-[1.5rem] font-normal">
            {userPagePath === "/users" && "ユーザー一覧"}
            {userPagePath === "/users/userCreatePage" && "ユーザー追加"}
          </h1>
        </div>
        <div className="w-1/2 text-center">
          <span className="px-[0.8rem]">
            <a href={"/users"} className={setClassName("allView")}>
              一覧表示
            </a>
          </span>
          <span className="px-[0.8rem]">
            <a
              href={"/users/userCreatePage"}
              className={setClassName("newCreate")}
            >
              新規追加
            </a>
          </span>
        </div>
        <div className="w-1/4 text-start">
          ログイン中のユーザー：{loggedInUserName}
        </div>
      </div>
      <div className="mx-[1.5rem] border-solid border-[0.1rem] border-[#B9C3CF] border-t-0"></div>
    </>
  );
};
