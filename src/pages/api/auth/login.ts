// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Login } from "@/types/user/Auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Login>(
    {
      req,
      res,
    },
    {
      supabaseUrl: process.env.NEXT_SUPABASE_URL || "",
      supabaseKey: process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "",
    }
  );

  const {
    data: { user },
    error,
  } = await supabaseServerClient.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  const { data } = await supabaseServerClient.auth.updateUser({
    data: { last_sign_in_at: new Date() },
  });

  res.status(200).json({
    signIn: user ? user.id : error?.message,
    last_sign_in_at: data ? data.user?.last_sign_in_at : "nothing",
  });
};
