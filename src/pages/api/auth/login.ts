// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Database>(
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
  } = await supabaseServerClient.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  console.log("sing in!");

  res.status(200).json({ id: user?.id ?? "id表示" });
};
