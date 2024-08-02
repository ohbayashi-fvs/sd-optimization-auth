import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClinet";


export default async function getLoggedInUserName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createClient({req,
      res,
    }
  );
  const {
    data: { user},
  } = await supabaseServerClient.auth.getUser();

  if (user) {
    res.status(200).json(user.user_metadata.user_name);
  } else {
    res.status(401).json({});
  }
}
