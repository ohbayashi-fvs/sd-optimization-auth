import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const TenantHeader = () => {
  const router = useRouter();

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

  const tenantPagePath = router.pathname;

  const selectPage =
    "text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none";
  const unSelectPage =
    "bg-[#153F8D] text-white no-underline rounded-none p-[0.5rem] hover:text-white focus:outline-none";

  const setClassName = (flg: string) => {
    if (tenantPagePath === "/tenants") {
      if (flg === "allView") {
        return unSelectPage;
      }
      if (flg === "newCreate") {
        return selectPage;
      }
    }
    if (tenantPagePath === "/tenants/tenantCreatePage") {
      if (flg === "allView") {
        return selectPage;
      }
      if (flg === "newCreate") {
        return unSelectPage;
      }
    }
  };

  return (
    <>
      <div className="flex w-full items-center my-[0.5rem]">
        <div className="w-1/4 text-center">
          <h1 className="text-[1.5rem] font-normal">
            {tenantPagePath === "/tenants" && "組織一覧"}
            {tenantPagePath === "/tenants/tenantCreatePage" && "組織追加"}
          </h1>
        </div>
        <div className="w-1/2 text-center">
          <span className="px-[0.8rem]">
            <a href={"/tenants"} className={setClassName("allView")}>
              一覧表示
            </a>
          </span>
          <span className="px-[0.8rem]">
            <a
              href={"/tenants/tenantCreatePage"}
              className={setClassName("newCreate")}
            >
              新規作成
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
