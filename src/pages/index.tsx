import { Inter } from "next/font/google";
import Head from "next/head";
import { UserList } from "@/components/userList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>信号電材ユーザー管理アプリ</title>
      </Head>
      <div className="text-[1rem] leading-[3rem]">
        <div className="flex justify-center">
          <span className="px-[20px]">信号電材ユーザー一覧</span>
          <span className="px-[20px]">一覧表示</span>
          <span className="px-[20px]">新規作成</span>
        </div>
        <hr />
        <UserList />
      </div>
    </>
  );
}
