import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../auth/createClient'
import checkLogin from '../auth/session'
import checkIpAddress from '../auth/checkIpAddress'
import { message } from 'antd'

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Session Confirmation
  const { isLogin } = await checkLogin(req, res)
  const result = await checkIpAddress(req, res)
  if (!result.isCorrect)
    return res.status(401).json({ ipAddress: result.ipAddress1 })
  if (!isLogin) {
    res.status(401).json({ message: 'ログインしていません' })
  }
  const supabaseServerClient = createClient({
    req,
    res,
  })
  const user = await JSON.parse(req.body)

  const data = await supabaseServerClient.auth.admin.createUser({
    email: user.email,
    email_confirm: true,
    password: user.password,
    user_metadata: {
      tenant_id: user.tenant_id,
      user_name: user.user_name,
    },
  })

  if (data.error) {
    return res.status(422).json({ message: data.error.message })
  }
  res.status(200).json({})
}
