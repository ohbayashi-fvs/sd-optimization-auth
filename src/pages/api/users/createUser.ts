import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../auth/createClinet";
import checkLogin from "../auth/session";
import checkIpAddress from "../auth/checkIpAddress";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Session Confirmation
  const session = await checkLogin(req, res);
  const result = await checkIpAddress(req,res)
  if(!result.isCorrect) return res.status(401).json({ipAddress: result.ipAddress})
  if (session) {
    const supabaseServerClient = createClient(
      {
        req,
        res,
      },
    );
    const user = await JSON.parse(req.body);

    const data = await supabaseServerClient.auth.admin.createUser({
      email: user.email,
      email_confirm: true,
      password: user.password,
      user_metadata: {
        tenant_id: user.tenant_id,
        user_name: user.user_name,
      },
    });

    data.error?.status === 422 && res.status(422).json({});
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
