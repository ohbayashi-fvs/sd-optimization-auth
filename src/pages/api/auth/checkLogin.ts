import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function checkLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  // console.log(session);
  // res.status(200).json({ status: session });
  return session !== null;
}
