import type { NextApiRequest, NextApiResponse } from "next";
import type { ProfilesType, UserType } from "@/types/type";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAccessUrl, supabaseServiceRoleKey } from "../lib/supabase";
import checkLogin from "../auth/session";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // session確認
  const session = await checkLogin(req, res);

  if (session) {
    const supabaseServerClient = createPagesServerClient<UserType>(
      {
        req,
        res,
      },
      {
        supabaseUrl: supabaseAccessUrl,
        supabaseKey: supabaseServiceRoleKey,
      }
    );

    // get auth.user
    const user = JSON.parse(req.body);
    const { data: userData } =
      await supabaseServerClient.auth.admin.getUserById(user.id);

    console.log(userData);

    // get public.profile
    const { data: profileData } = await supabaseServerClient
      .from("profiles")
      .select("*,tenants(tenant_name)")
      .eq("id", userData.user?.id);

    // console.log(profileData);

    // Data Coalescing and Refining
    const joinedData = profileData?.map((profile: ProfilesType) => {
      return {
        id: userData.user?.id,
        user_name: profile?.user_name,
        email: userData.user?.email,
        tenant_name: profile?.tenants.tenant_name,
      };
    });

    // console.log(joinedData);

    joinedData && res.status(200).json({ user: joinedData });
  } else {
    res.status(401).json({});
  }
}
