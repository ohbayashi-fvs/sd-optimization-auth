export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-between h-[5rem] w-full">
        <div className="w-1/4 text-center">
          <h1 className="text-[1.5rem] font-normal">ホーム</h1>
        </div>
        <div></div>
      </div>
      <div className="mx-[1.5rem] border-solid border-[0.1rem] border-t-0 border-[#B9C3CF]"></div>

      <table className="px-[20rem] pt-[6rem] mx-auto">
        <tbody>
          <tr>
            <td className="text-end text-[1.5rem] pr-[1.5rem] py-[1rem]">
              ユーザー
            </td>
            <td className="px-[1rem]">
              <a
                href={"/users"}
                className="text-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
              >
                登録一覧
              </a>
            </td>

          </tr>
          <tr>
            <td className="text-end text-[1.5rem] pr-[1.5rem] py-[1rem]">
              組織
            </td>
            <td className="px-[1rem]">
              <a
                href={"/tenants"}
                className="text-[1rem] text-[#153F8D] underline underline-offset-[0.2rem] decoration-[#153F8D] border-none hover:text-[#008E92] hover:decoration-[#008E92] focus:outline-none"
              >
                登録一覧
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
