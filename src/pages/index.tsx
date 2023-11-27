import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="py-[25rem] text-[3rem]">
        <div className="flex justify-center items-center">
          <Link href="/tenants">テナント管理</Link>
        </div>
        <br />
        <div className="flex justify-center items-center">
          <Link href="/users">ユーザー管理</Link>
        </div>
      </div>
    </>
  );
}
