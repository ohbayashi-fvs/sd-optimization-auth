import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createClient({
    req,
    res,
  });
  await supabaseServerClient.auth.signOut();

  res.status(200).json({});
};
