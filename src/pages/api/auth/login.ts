// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Login } from "@/types/user/Auth";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "./checkLogin";

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

  const { data } = await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  // console.log(data);

  // session確認
  const session = await checkLogin(req, res);

  // console.log(session);

  if (session) {
    res.status(200).json({ data: data });
  } else {
    res.status(401).json({});
  }
};
