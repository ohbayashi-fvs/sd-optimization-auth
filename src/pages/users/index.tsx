import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserList } from "@/features/users/components/userList";
import { UserHeader } from "@/features/users/components/userHeader";

export default function UserHomePage() {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const getUsersData = async () => {
      const res = await fetch("/api/users/getUsers", { method: "POST" });

      if (res.status === 200) {
        const resData = await res.json();
        setUsers(resData.users);
      }
      res.status === 401 && router.push("/auth/authLoginPage");
    };
    getUsersData();
  }, [router, router.isReady]);

  return (
    <>
      <UserHeader />
      <UserList users={users} />
    </>
  );
}
