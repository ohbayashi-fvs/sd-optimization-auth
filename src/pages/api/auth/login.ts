import type { NextApiRequest, NextApiResponse } from "next";
import type { Login } from "@/types/auth";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "./session";
import checkIpAddress from "./checkIpAddress";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
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

  // ログイン
  const loginData = JSON.parse(req.body);
  await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  // クライアントのIPアドレスが登録されているものかチェックする
  // const checkedIpAddress = await checkIpAddress(req, res);

  // 登録済IPアドレスの中にクライアントのIPアドレスが無ければログアウトする
  // if (!checkedIpAddress) {
  //   await supabaseServerClient.auth.signOut();
  // }

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
