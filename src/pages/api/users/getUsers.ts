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
  // console.log(req);

  const { data } = await supabaseServerClient.auth.admin.listUsers();

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ users: data.users });
  } else {
    res.status(401).json({});
  }
}
