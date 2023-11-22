import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/types/user/User";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "./lib/supabase";
import checkLogin from "./auth/checkLogin";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<User>(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );

  const user = JSON.parse(req.body);

  const { data, error } = await supabaseServerClient.auth.admin.getUserById(
    user.id
  );

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ users: data });
  } else {
    res.status(401).json({});
  }
};
