import type { UserType } from "@/types/user/crud";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  users: UserType[];
};

export const UserList: FC<Props> = ({ users }) => {
  const route = useRouter();

  const onClickEditButton = async (id: string) => {
    route.push(`/users/userEditPage/${id}`);
  };

  if (!users) {
    return <>Loading</>;
  }

  return (
    <>
      <table className="mx-auto my-[100px] px-[10px] border-collapse">
        <thead className="bg-[#FAFAFA]">
          <tr className="h-[3.5rem] border-solid border-[0.1rem] border-black border-opacity-[6%] border-t-0 border-x-0">
            <th className="min-w-[15rem] pl-[1rem] text-start text-[1rem] font-medium">
              ユーザー名
            </th>
            <th className="min-w-[15rem] text-start text-[1rem] font-medium before:content-[''] before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-black before:border-opacity-[6%] before:h-[1rem]">
              ユーザーアドレス
            </th>
            <th className="min-w-[15rem] text-start text-[1rem] font-medium before:content-[''] before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-black before:border-opacity-[6%] before:h-[1rem]">
              最終ログイン
            </th>
            <th className="min-w-[5rem] text-start text-[1rem] font-medium before:content-[''] before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-black before:border-opacity-[6%] before:h-[1rem]">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserType) => (
            <tr
              key={user.id}
              className="border-[#FAFAFA] border-[0.15rem] border-t-0 border-x-0 border-solid h-[3.5rem]"
            >
              <td className="pl-[1rem]">{`${user.app_metadata.user_name}`}</td>
              <td className="pl-[1rem]">{`${user.email}`}</td>
              <td className="pl-[1rem]">
                {user.last_sign_in_at
                  ? `${new Date(user.last_sign_in_at).toLocaleDateString(
                      "ja-JP"
                    )}`
                  : "-"}
              </td>
              <td className="pt-[0.25rem]">
                <button
                  type="button"
                  onClick={async () => {
                    await onClickEditButton(user.id);
                  }}
                  className="m-0 p-0 ml-[1rem] hover:bg-[#B9C3CF]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/edit_icon@2x.png"
                    alt="編集アイコン"
                    className="w-[1.7rem] m-[0.2rem]"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};
