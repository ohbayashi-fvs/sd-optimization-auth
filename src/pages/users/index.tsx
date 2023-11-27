import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserList } from "@/features/users/components/userList";
import { UsersHeader } from "@/features/users/components/usersHeader";

export default function UserHomePage() {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const getUsersData = async () => {
      const res = await fetch("/api/users/getUsers", { method: "POST" });
      const usersData = await res.json();

      setUsers(usersData.users);

      res.status === 401 && router.push("/login");
    };
    getUsersData();
  }, [router, router.isReady]);

  return (
    <>
      <UsersHeader />
      <UserList users={users} />
    </>
  );
}
