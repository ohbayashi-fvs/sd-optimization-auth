import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "./createClinet";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function checkLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createClient(
    {
      req,
      res,
    }
  );
  const {
    data,
  } = await supabaseServerClient.auth.getUser();

  return  data!== null;
}
