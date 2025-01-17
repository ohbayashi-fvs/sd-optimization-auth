import type { NextApiRequest, NextApiResponse } from 'next'
import type { ProfilesType } from '@/types/type'
import { createClient } from '../auth/createClient'
import checkLogin from '../auth/session'

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // session確認
  const { isLogin } = await checkLogin(req, res)

  if (!isLogin) {
    return res.status(401).json({})
  }
  const supabaseServerClient = createClient({
    req,
    res,
  })

  // get auth.user
  const user = JSON.parse(req.body)
  const { data: userData } = await supabaseServerClient.auth.admin.getUserById(
    user.id,
  )
  if (!userData.user?.id) return res.status(200).json({ user: [] })
  const { data: profileData } = await supabaseServerClient
    .rpc('get_profiles')
    .eq('id', userData.user?.id)

  // Data Coalescing and Refining
  const joinedData = profileData?.map((profile: ProfilesType) => {
    return {
      id: userData.user?.id,
      user_name: profile?.user_name,
      email: userData.user?.email,
      tenant_name: (profile as any)?.tenant_name,
      tenant_id: profile?.tenant_id,
    }
  })
  joinedData && res.status(200).json({ user: joinedData })
}
