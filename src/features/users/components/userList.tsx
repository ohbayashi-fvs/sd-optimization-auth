import type { UserType } from "@/types/user/crud";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  users: UserType[];
};

export const UserList: FC<Props> = ({ users }) => {
  const route = useRouter();

  let deletedOnly = true;

  const onClickEditButton = async (id: string) => {
    route.push(`/users/userEditPage/${id}`);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    deletedOnly = ev.target.checked;
    console.log(ev.target.checked);
  };

  if (!users) {
    return <></>;
  }

  return (
    <>
      <div className="max-w-[53rem] mx-auto my-[4.5rem]">
        <div className="flex justify-end items-end gap-[0.5rem]">
          <span className="border-none text-main underline underline-offset-[3px] !outline-none selection:border-none">
            {deletedOnly ? "有効な製品のみ表示" : "無効な製品のみ表示"}
          </span>
          <label className="relative flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultValue="check"
              className="peer sr-only"
              onChange={handleChange}
            />
            <div className="h-[1.4rem] w-[2.8rem] rounded-full bg-gray-200 after:absolute after:left-[0.1rem] after:top-[0.05rem] after:h-[1.3rem] after:w-[1.3rem] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-main peer-checked:after:translate-x-full peer-checked:after:border-white" />
          </label>
        </div>
        <table className="px-[1rem] mt-[1rem] border-collapse">
          <thead className="bg-[#FAFAFA]">
            <tr className="flex h-[3.5rem] border-solid border-[0.1rem] border-black border-opacity-[6%] border-t-0 border-x-0">
              <th className="flex items-center min-w-[15rem] pl-[1rem] text-start text-[1rem] font-medium">
                ユーザー名
              </th>
              <th className="flex items-center mr-[1rem] min-w-[15rem] text-start text-[1rem] font-medium before:content-[''] before:inline-block before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-y-0 before:border-r-0 before:border-black before:border-opacity-[6%] before: before:h-[1.4rem]">
                ユーザーアドレス
              </th>
              <th className="flex items-center mr-[1rem] min-w-[15rem] text-start text-[1rem] font-medium before:content-[''] before:inline-block before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-y-0 before:border-r-0 before:border-black before:border-opacity-[6%] before: before:h-[1.4rem]">
                最終ログイン
              </th>
              <th className="flex items-center mr-[1rem] min-w-[5rem] text-start text-[1rem] font-medium before:content-[''] before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-y-0 before:border-r-0 before:border-black before:border-opacity-[6%] before: before:h-[1.4rem] before:inline-block">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user: UserType) =>
                !user.deleted_at && (
                  <tr
                    key={user.id}
                    className="flex items-center border-[#FAFAFA] border-[0.15rem] border-t-0 border-x-0 border-solid h-[3.5rem]"
                  >
                    <td className="min-w-[15rem] pl-[1rem]">
                      {user.app_metadata.user_name}
                    </td>
                    <td className="min-w-[15rem] pl-[1rem]">{user.email}</td>
                    <td className="min-w-[15rem] pl-[1rem]">
                      {user.last_sign_in_at
                        ? `${new Date(user.last_sign_in_at).toLocaleDateString(
                            "ja-JP"
                          )}`
                        : "-"}
                    </td>
                    <td className="min-w-[5rem] ml-[0.5rem] pt-[0.25rem]">
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
                          className="w-[1.25rem] m-[0.2rem]"
                        />
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};
