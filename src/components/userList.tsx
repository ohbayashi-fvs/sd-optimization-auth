import Image from "next/image";

type user = {
  id: number;
  username: string;
  email: string;
  password: string;
  lastlogin: Date;
};

export const UserList = () => {
  const testUserList: user[] = [
    {
      id: 100,
      username: "test",
      email: "hoge@com",
      password: "hoge1111",
      lastlogin: new Date(),
    },
    {
      id: 200,
      username: "test2",
      email: "hoge2@com",
      password: "hoge2222",
      lastlogin: new Date(),
    },
    {
      id: 300,
      username: "test3",
      email: "hoge3@com",
      password: "hoge3333",
      lastlogin: new Date(),
    },
  ];
  return (
    <>
      <table className="mx-auto my-[100px] px-[10px] border-collapse">
        <thead className="bg-[#FAFAFA]">
          <tr className="border-gray-100 border-t-0 border-x-0 border-solid">
            <th className="min-w-[150px] h-[55px] pl-[16px] text-start text-[14px] font-medium border-gray-100 border-y-0 border-l-0 border-solid">
              ユーザー名
            </th>
            <th className="min-w-[200px] h-[55px] pl-[16px] text-start text-[14px] font-medium">
              ユーザーアドレス
            </th>
            <th className="min-w-[350px] h-[55px] pl-[16px] text-start text-[14px] font-medium">
              最終ログイン
            </th>
            <th className="min-w-[150px] h-[55px] pl-[16px] text-start text-[14px] font-medium">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {testUserList.map((user: user) => (
            <tr
              key={user.id}
              className="border-gray-100 border-t-0 border-x-0 border-solid h-[55px]"
            >
              <td className="pl-[16px]">{`${user.username}`}</td>
              <td className="pl-[16px]">{`${user.email}`}</td>
              <td className="pl-[16px]">{`${user.lastlogin.toLocaleDateString()}`}</td>
              <td className="pl-[16px] pt-[16px]">
                <Image
                  src={"/images/edit_icon@2x.png"}
                  width={27}
                  height={27}
                  alt="編集アイコン"
                ></Image>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};
