import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types";
import { User } from "@/types/user/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<User>(
    {
      req,
      res,
    },
    {
      supabaseUrl: process.env.NEXT_SUPABASE_URL || "",
      supabaseKey: process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "",
    }
  );

  const user = JSON.parse(req.body);

  const { data, error } = await supabaseServerClient.auth.admin.getUserById(
    user.id
  );

  res.status(200).json({ users: data ? data : error?.message });
};
