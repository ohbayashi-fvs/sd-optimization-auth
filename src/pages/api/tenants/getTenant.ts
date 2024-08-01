import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../auth/createClinet";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createClient(
    {
      req,
      res,
    },
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
