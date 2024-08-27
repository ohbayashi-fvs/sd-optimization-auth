import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../auth/createClient";
import checkLogin from "../auth/session";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const { isLogin } = await checkLogin(req, res);

  if (isLogin) {
    const supabaseServerClient = createClient({
      req,
      res,
    });
    const user = JSON.parse(req.body);
    await supabaseServerClient.auth.admin.deleteUser(user.id);

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
};
