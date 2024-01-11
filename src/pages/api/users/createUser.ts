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
    const user = await JSON.parse(req.body);

    const data = await supabaseServerClient.auth.admin.createUser({
      email: user.email,
      email_confirm: true,
      password: user.password,
      user_metadata: {
        tenant_id: user.tenant_id,
        user_name: user.user_name,
      },
    });

    data.error?.status === 422 && res.status(422).json({});
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
