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
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (session) {
    res.status(200).json(session?.user.user_metadata.user_name);
  } else {
    res.status(401).json({});
  }
}
