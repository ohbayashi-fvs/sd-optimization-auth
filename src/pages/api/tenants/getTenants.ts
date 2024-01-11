import type { NextApiRequest, NextApiResponse } from "next";
import type { TenantType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

export default async function getTenantTypes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Session Confirmation
  const session = await checkLogin(req, res);
  if (session) {
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

    // get public.tenants
    const { data } = await supabaseServerClient
      .from("tenants")
      .select()
      .order("created_at");

    res.status(200).json({ tenants: data });
  } else {
    res.status(401).json({});
  }
}
