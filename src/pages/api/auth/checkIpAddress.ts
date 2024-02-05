import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";

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

  // チェックの結果とクライアントのIPアドレスを返す
  res.status(200).json({
    isIpMatchesAddress: checkIpAddress ? checkIpAddress.addresses : null,
    clientIpAddress: clientIpAddress,
  });
}
