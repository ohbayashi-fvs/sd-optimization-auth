import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import checkLogin from "./auth/checkLogin";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "./lib/supabase";
import { User } from "@/types/user/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<User[]>(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );
  const { data } = await supabaseServerClient.auth.admin.listUsers();

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ users: data.users });
  } else {
    res.status(401).json({});
  }
};
