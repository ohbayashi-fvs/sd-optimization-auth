import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/types/user/User";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "./lib/supabase";
import checkLogin from "./auth/session";

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
  const { data } = await supabaseServerClient.auth.admin.getUserById(user.id);

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ users: data });
  } else {
    res.status(401).json({});
  }
};
