export default function HomePage() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3">
          <h1 className="ml-[2rem] text-[1.5rem] font-normal">ホーム</h1>
        </div>
      </div>
      <div className="mx-[1.5rem] border-solid border-[0.1rem] border-[#B9C3CF]"></div>

      <div className="px-[20rem] pt-[6rem]">
        <div className="flex items-center">
          <span className="text-[1.5rem]">ユーザー</span>
          <a
            href={"/users"}
            className="ml-[3.5rem] text-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
          >
            登録一覧
          </a>
        </div>
        <div className="flex items-center mt-[3rem]">
          <span className="text-[1.5rem]">テナント</span>
          <a
            href={"/tenants"}
            className="ml-[3.5rem] text-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
          >
            登録一覧
          </a>
        </div>
      </div>
    </>
  );
}
