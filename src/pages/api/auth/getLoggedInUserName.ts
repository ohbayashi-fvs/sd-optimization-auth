import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClient";
import checkLogin from "./session";

export default async function getLoggedInUserName(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { isLogin, user } = await checkLogin(req, res);
  if (!isLogin) return res.status(401).json({ error: "ログインエラー" });
  res.status(200).json(user?.app_metadata.user_name);
}
