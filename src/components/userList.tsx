import { User } from "@/types/user/User";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";

type Props = {
  users: User[];
};

export const UserList: FC<Props> = ({ users }) => {
  const route = useRouter();

  const onClickEditButton = async (id: string) => {
    route.push(`/edit/${id}`);
  };

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
          {users.map((user: User) => (
            <tr
              key={user.id}
              className="border-gray-100 border-t-0 border-x-0 border-solid h-[55px]"
            >
              <td className="pl-[16px]">{`${user.app_metadata.user_name}`}</td>
              <td className="pl-[16px]">{`${user.email}`}</td>
              <td className="pl-[16px]">{`${new Date(
                user.last_sign_in_at
              ).toLocaleDateString("ja-JP")}`}</td>
              <td className="pl-[16px] pt-[16px]">
                <button
                  type="button"
                  onClick={async () => {
                    await onClickEditButton(user.id);
                    // user.refetch();
                  }}
                >
                  <Image
                    src={"/images/edit_icon@2x.png"}
                    width={27}
                    height={27}
                    alt="編集アイコン"
                  ></Image>
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
