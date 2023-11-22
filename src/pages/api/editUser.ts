// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Create, Edit } from "@/types/user/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Edit>(
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

  const { data, error } = await supabaseServerClient.auth.admin.updateUserById(
    user.id,
    {
      app_metadata: { user_name: user.user_name },
      email: user.email,
      password: user.password,
    }
  );

  console.log(data);

  res.status(200).json(user ? user : error?.message);
};
