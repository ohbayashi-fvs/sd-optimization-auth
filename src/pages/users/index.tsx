import { useRouter } from "next/router";
import { UserList } from "@/features/users/components/userList";
import { UserHeader } from "@/features/users/components/userHeader";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

export default function UserHomePage() {
  const router = useRouter();

  // get users_data
  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const res = await fetch("/api/users/getUsers", { method: "POST" });
      if (res.status === 200) {
        const resData = await res.json();
        return await resData.users;
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    },
  });

  const columnName: ColumnsType<Record<string, any>> = [
    {
      key: "user_name",
      title: "ユーザー名",
      dataIndex: "user_name",
    },
    { key: "email", title: "ユーザーアドレス", dataIndex: "email" },
    {
      key: "organization",
      title: "組織",
      dataIndex: "tenant_name",
    },
    {
      key: "last_sign_in_at",
      title: "最終ログイン",
      dataIndex: "last_sign_in_at",
    },
    {
      key: "edit_button",
      title: "操作",
      dataIndex: "id",
      render: (dataIndex: string) => (
        <button
          type="button"
          onClick={async () => {
            await router.push(`/users/userEditPage/${dataIndex}`);
          }}
          className="m-0 p-0 hover:bg-[#B9C3CF]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/edit_icon@2x.png"
            alt="編集アイコン"
            className="w-[1.25rem] m-[0.2rem]"
          />
        </button>
      ),
    },
  ];

  return (
    <>
      <UserHeader />
      <UserList columnName={columnName} users={users} />
    </>
  );
}
