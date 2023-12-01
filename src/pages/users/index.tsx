import { useRouter } from "next/router";
import { UserList } from "@/features/users/components/userList";
import { UserHeader } from "@/features/users/components/userHeader";
import { ColumnsType } from "@/types/user/columns";
import { useQuery } from "@tanstack/react-query";

export default function UserHomePage() {
  const router = useRouter();

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

  const columnName: ColumnsType[] = [
    { title: "ユーザー名" },
    { title: "ユーザーアドレス" },
    { title: "最終ログイン" },
  ];

  return (
    <>
      <UserHeader />
      <UserList columnName={columnName} users={users} />
    </>
  );
}
