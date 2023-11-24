import Head from "next/head";
import { UserList } from "@/components/userList";
import { CreateUser } from "@/components/createUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [isView, setIsView] = useState(0);
  const [title, setTitle] = useState("信号電材ユーザー一覧");
  const [users, setUsers] = useState([]);
  const [isSession, setSession] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("-");

  const router = useRouter();
  useEffect(() => {
    const getUsersData = async () => {
      const res = await fetch("/api/getUsers", { method: "POST" });
      const usersData = await res.json();

      setUsers(usersData.users);

      if (res.status === 200) {
        const res = await fetch("/api/auth/getLoggedInUserName", {
          method: "POST",
        });
        const loggedInUserName = await res.json();
        setLoggedInUserName(loggedInUserName);

        setSession(true);
      } else {
        router.push("/login");
      }
    };
    getUsersData();
  }, [router, router.isReady]);

  const ListView = () => {
    setTitle("信号電材ユーザー一覧");
    setIsView(0);
  };

  const CreateView = () => {
    setTitle("信号電材ユーザー作成");
    setIsView(1);
  };

  return (
    <div>
      <>
        <Head>
          <title>信号電材ユーザー管理アプリ</title>
        </Head>
        <div className="text-[1rem] leading-[3rem]">
          <div className="flex w-full items-center justify-between">
            <div className="w-1/3">
              <h1 className="ml-[2rem] text-[1.5rem] font-normal">{title}</h1>
            </div>
            <div className="flex w-1/3 justify-center text-[1.2rem]">
              <span className="px-[20px]">
                <button onClick={ListView}>一覧表示</button>
              </span>
              <span className="px-[20px]">
                <button onClick={CreateView}>新規作成</button>
              </span>
            </div>
            <div className="w-1/3">
              ログイン中のユーザー：{loggedInUserName}
            </div>
          </div>
          <hr />
          {/* 一覧表示 or 新規作成 */}
          {isSession ? (
            <>
              {isView === 0 ? (
                <>
                  <UserList users={users} />
                </>
              ) : (
                <>
                  <CreateUser />
                </>
              )}
            </>
          ) : (
            <>...Loading</>
          )}
        </div>
      </>
    </div>
  );
}
