import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>信号電材ユーザー管理アプリ</title>
      </Head>
      <div className="text-[1rem] leading-[3rem]">
        <h1>信号電材ユーザー一覧</h1>
        {/* <Link href={"/login"}>ログインはこちら</Link>
        <br />
        <Link href={"/signup"}>アカウント登録はこちら</Link> */}
      </div>
    </>
  );
}
