import type { NextApiRequest, NextApiResponse } from "next";
import type { UserType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<UserType>(
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
    console.log(userData.tenant_id);

    const error = await supabaseServerClient.auth.admin.createUser({
      app_metadata: {
        tenant_id: userData.tenant_id,
        user_name: userData.user_name,
      },
      email: userData.email,
      email_confirm: true,
      // password: userData.password,
    });

    console.log(error.data);

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
