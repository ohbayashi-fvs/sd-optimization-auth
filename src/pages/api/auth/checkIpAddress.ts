import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClient";

export default async function checkIpAddress(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<{ isCorrect: boolean; ipAddress?: string }> {
  const supabaseServerClient = createClient({
    req,
    res,
  });

  // DBから登録しているIPアドレス一覧の取得
  const { data: dbIpAddresses } = await supabaseServerClient
    .schema("private")
    .from("ip_address")
    .select("*");
  // クライアントのIPアドレス取得
  const ip = req.headers["x-forwarded-for"] as string;
  if (process.env.NODE_ENV === "development" && ip === "::1")
    return { isCorrect: true };
  const split = ip.split(",");
  if (split.length > 1) return { isCorrect: false, ipAddress: ip };
  const pattern = /::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
  const match = ip.match(pattern);

  if (!match) return { isCorrect: false, ipAddress: ip };
  const clientIp = match && match[1];
  const checkIpAddress = dbIpAddresses?.find((ipAddress) => {
    if (ipAddress.addresses === clientIp) {
      return true;
    }
  });

  return { isCorrect: !!checkIpAddress, ipAddress: ip };
}
