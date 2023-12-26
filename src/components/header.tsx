import { useRouter } from "next/router";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  return (
    <>
      <header className="flex h-[54px] w-full items-center justify-between bg-header">
        <div className="flex items-center gap-10">
          <Link href="/" className="h-[23px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/shingou_logo@2x.png"
              alt="信号電材様のアイコン"
              className="w-[8rem] h-[1.5rem] pl-[1rem]"
            />
          </Link>
        </div>
        <Link
          href={""}
          onClick={async (e) => {
            e.preventDefault();
            await fetch("/api/auth/logout", {
              method: "POST",
            }).then(() => router.push("/auth/authLoginPage"));
          }}
          className="text-white pr-[1rem] bg-header no-underline"
        >
          ログアウト
        </Link>
      </header>
    </>
  );
};
