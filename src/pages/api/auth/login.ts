import type { NextApiRequest, NextApiResponse } from "next";
import type { Login } from "@/types/user/Auth";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "./session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Login>(
    {
      req,
      res,
    },
    {
      supabaseUrl: supabaseAccessUrl,
      supabaseKey: supabaseServiceRoleKey,
    }
  );
  const loginData = JSON.parse(req.body);
  await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
