import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../auth/createClient";
import checkLogin from "../auth/session";
import checkIpAddress from "../auth/checkIpAddress";

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Session Confirmation
  const {isLogin}= await checkLogin(req, res);
  const result = await checkIpAddress(req,res)
  if(!result.isCorrect) return res.status(401).json({ipAddress: result.ipAddress})
  if (!isLogin) {
    return   res.status(401).json({message: 'not login'});
  }
    const supabaseServerClient = createClient(
      {
        req,
        res,
      },
    );

    // get auth.users
    const { data: usersData } =
      await supabaseServerClient.auth.admin.listUsers();
    // get public.profile
    const { data: profilesData } = await supabaseServerClient
      .from("profiles")
      .select("id, user_name, tenants (tenant_name)");

    // Data Coalescing and Refining
    const joinedData = profilesData?.map((profile) => {
      const user = usersData.users.find((user) => {
        if (user.id === profile.id) {
          return user;
        }
      });

      if (user) {
        const date =
          user.last_sign_in_at && new Date(user.last_sign_in_at as string);

        return {
          id: profile.id,
          user_name: profile.user_name,
          email: user.email,
          tenant_name: (profile?.tenants as any)?.tenant_name ?? '',
          last_sign_in_at: date ? date.toLocaleString() : "-",
        };
      }
    });

    // filtered data
    const filteredData = joinedData?.filter((data) => {
      return data !== undefined && data;
    });

    res.status(200).json({ users: filteredData && filteredData });

}
