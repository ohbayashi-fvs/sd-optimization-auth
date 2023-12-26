import type { NextApiRequest, NextApiResponse } from "next";
import type { TenantType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
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
  const { data } = await supabaseServerClient
    .from("tenants")
    .select("*")
    .eq("id", tenant.id);

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({ tenant: data });
  } else {
    res.status(401).json({});
  }
};
