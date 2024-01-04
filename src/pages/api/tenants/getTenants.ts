import type { NextApiRequest, NextApiResponse } from "next";
import type { TenantType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function getTenantTypes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient<TenantType[]>(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );
  const { data } = await supabaseServerClient
    .from("tenants")
    .select()
    .order("created_at");

  // console.log(data);

  // session確認
  const session = await checkLogin(req, res);

  if (session && data) {
    res.status(200).json({ tenants: data });
  } else {
    res.status(401).json({});
  }
}
