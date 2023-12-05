import type { NextApiRequest, NextApiResponse } from "next";
import type { UserType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient<UserType[]>(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );

  const { data: usersData } = await supabaseServerClient.auth.admin.listUsers();

  const { data: profilesData } = await supabaseServerClient
    .from("profiles")
    .select("*,tenants(tenant_name)");

  const joinedData = profilesData?.map((profile) => {
    const user = usersData.users.find((user) => {
      user.id === profile.user_id;
      console.log(user);
    });
    const date =
      user?.last_sign_in_at && new Date(user?.last_sign_in_at as string);

    return {
      id: profile.id,
      user_name: profile.user_name,
      email: user?.email,
      tenant_name: profile.tenants.tenant_name,
      last_sign_in_at: date ? date.toLocaleString() : "-",
    };
  });

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ users: joinedData });
  } else {
    res.status(401).json({});
  }
}
