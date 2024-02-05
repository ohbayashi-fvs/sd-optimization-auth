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

  // ログイン
  const loginData = JSON.parse(req.body);
  await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  // DBから登録しているIPアドレス一覧の取得
  const { data: dbIpAddresses, error: dbError } = await supabaseServerClient
    .from("ip_address")
    .select("addresses");

  // IPアドレス取得
  const clientIpAddress = await fetch(
    "https://ipinfo.io?callback=callback"
  ).then((res) => res.json().then((json) => json.ip));

  // クライアントのIPアドレス取得(new)
  const ip = req.headers["x-forwarded-for"];

  // クライアントが登録されているIPアドレスを使用しているかチェックする
  const checkIpAddress = dbIpAddresses?.find((ipAddress) => {
    console.log(ipAddress.addresses, ip);
    if (ipAddress.addresses === ip) {
      return true;
    }
  });

  // console.log(checkIpAddress, ip);

  // IPアドレスが登録されてなければ、ログアウトする
  if (!checkIpAddress) {
    await supabaseServerClient.auth.signOut();
  }

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
