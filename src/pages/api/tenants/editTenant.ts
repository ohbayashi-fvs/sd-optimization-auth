import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../auth/createClinet";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createClient(
      {
        req,
        res,
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
