import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClinet";
import checkLogin from "./session";
import checkIpAddress from "./checkIpAddress";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createClient({
      req,
      res,
    },
  );

  // ログイン
  const loginData = JSON.parse(req.body);

  await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  //クライアントのIPアドレスが登録されているものかチェックする
  const result = await checkIpAddress(req,res)
  if(!result.isCorrect) {
    await supabaseServerClient.auth.signOut()
    return res.status(401).json({ipAddress: result.ipAddress})
  }

  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}


