import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  return (
    <>
      <header className="flex h-[54px] w-full items-center justify-between bg-header">
        <div className="flex items-center gap-10">
          <Link href="/" className="h-[23px]">
            <Image
              src="/images/shingou_icon@2x.png"
              width={131}
              height={23}
              alt="信号電材様のアイコン"
              className="pl-[12px]"
            />
          </Link>
        </div>
        <Link
          href={""}
          onClick={async (e) => {
            e.preventDefault();
            await fetch("/api/auth/logout", {
              method: "POST",
            }).then((res) => router.push("/login"));
          }}
          className="text-white pr-[1rem] bg-header no-underline"
        >
          ログアウト
        </Link>
      </header>
    </>
  );
};
