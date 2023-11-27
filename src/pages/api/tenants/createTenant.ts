import type { NextApiRequest, NextApiResponse } from "next";
import type { Create } from "@/types/user/user";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";
import { CreateTenant } from "@/types/tenant/tenant";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<CreateTenant>(
      {
        req,
        res,
      },
      {
        supabaseUrl: supabaseAccessUrl,
        supabaseKey: supabaseServiceRoleKey,
      }
    );
    const Data = JSON.parse(req.body);
    await supabaseServerClient
      .from("tenants")
      .insert({ tenant_name: Data.tenant_name });

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
