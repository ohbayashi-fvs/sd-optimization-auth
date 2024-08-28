import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../auth/createClient'
import checkLogin from '../auth/session'

export default async function getTenantTypes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Session Confirmation
  const session = await checkLogin(req, res)
  if (session) {
    const supabaseServerClient = createClient({
      req,
      res,
    })

    const { data } = await supabaseServerClient.rpc('get_tenants')
    res.status(200).json({ tenants: data })
  } else {
    res.status(401).json({})
  }
}
