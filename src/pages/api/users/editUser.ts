import type { NextApiRequest, NextApiResponse } from "next";
import type { UserEditType } from "@/types/user/crud";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<UserEditType>(
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
    await supabaseServerClient.auth.admin.updateUserById(user.id, {
      app_metadata: { user_name: user.user_name },
      email: user.email,
      password: user.password,
    });

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};