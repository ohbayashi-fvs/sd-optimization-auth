import type { NextApiRequest, NextApiResponse } from "next";
import type { UserCreateType } from "@/types/user/crud";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<UserCreateType>(
      {
        req,
        res,
      },
      {
        supabaseUrl: supabaseAccessUrl,
        supabaseKey: supabaseServiceRoleKey,
      }
    );
    const userData = JSON.parse(req.body);
    await supabaseServerClient.auth.admin.createUser({
      app_metadata: { user_name: userData.user_name },
      email: userData.email,
      email_confirm: true,
      password: userData.password,
    });

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
