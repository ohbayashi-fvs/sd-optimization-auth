import type { NextApiRequest, NextApiResponse } from "next";
import type { UserType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Session Confirmation
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

    await supabaseServerClient.auth.admin.createUser({
      email: userData.email,
      email_confirm: true,
      password: userData.password,
      user_metadata: {
        tenant_id: userData.tenant_id,
        user_name: userData.user_name,
      },
    });

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
