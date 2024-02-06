import { NextApiRequest, NextApiResponse } from "next";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function checkIpAddress(
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

  // DBから登録しているIPアドレス一覧の取得
  const { data: dbIpAddresses } = await supabaseServerClient
    .from("ip_address")
    .select("addresses");

  // クライアントのIPアドレス取得
  const ip = req.headers["x-forwarded-for"] as string;

  // 正規表現を使いクライアントのIPアドレスを整形する
  const pattern = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
  const match = ip?.match(pattern);
  const clientIp = match && match[1];

  // クライアントが登録されているIPアドレスを使用しているかチェックする
  const checkIpAddress = dbIpAddresses?.find((ipAddress) => {
    if (ipAddress.addresses === clientIp) {
      return true;
    }
  });

  return checkIpAddress;
}
