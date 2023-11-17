// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Create } from "@/types/user/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Create>(
    {
      req,
      res,
    },
    {
      supabaseUrl: process.env.NEXT_SUPABASE_URL || "",
      supabaseKey: process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "",
    }
  );
  console.log(req.body);
  console.log(req.method);

  const { data, error } = await supabaseServerClient.auth.admin.createUser({
    user_metadata: { name: req.body.name },
    email: req.body.email,
    password: req.body.password,
  });
  console.log(error?.message);

  res.status(200).json({ data: data });
};
