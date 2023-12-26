import type { NextApiRequest, NextApiResponse } from "next";
import type { TenantType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<TenantType>(
      {
        req,
        res,
      },
      {
        supabaseUrl: supabaseAccessUrl,
        supabaseKey: supabaseServiceRoleKey,
      }
    );
    const tenant = JSON.parse(req.body);
    await supabaseServerClient
      .from("tenants")
      .update({ tenant_name: tenant.tenant_name })
      .eq("id", tenant.id);

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
