import type { NextApiRequest, NextApiResponse } from "next";
import type { Login } from "@/types/auth";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "./session";
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

  // DBから登録しているIPアドレス一覧の取得
  const { data: dbIpAddresses, error: dbError } = await supabaseServerClient
    .from("ip_address")
    .select("addresses");

  // クライアントのIPアドレス取得
  const clientIpAddress = await fetch("https://ipinfo.io?callback").then(
    (res) => res.json().then((json) => json.ip)
  );

  // クライアントが登録されているIPアドレスを使用しているかチェックする
  const checkIpAddress = dbIpAddresses?.find((ipAddress) => {
    if (ipAddress.addresses === clientIpAddress) {
      return true;
    }
  });

  // IPアドレス制限にひっかからなければ、ログイン処理を通す
  if (checkIpAddress) {
    const loginData = JSON.parse(req.body);
    await supabaseServerClient.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
  }

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
