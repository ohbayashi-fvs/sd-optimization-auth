import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../auth/createClient'
import checkLogin from '../auth/session'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // session確認
  const { isLogin } = await checkLogin(req, res)

  if (isLogin) {
    const supabaseServerClient = createClient({
      req,
      res,
    })
    const user = await JSON.parse(req.body)

    const data = await supabaseServerClient.auth.admin.updateUserById(user.id, {
      email: user.email,
      email_confirm: true,
      password: user.password,
      user_metadata: {
        tenant_id: user.tenant_id,
        user_name: user.user_name,
      },
    })
    console.log(data.error)
    if (data.error) return res.status(401).json({ message: data.error.message })
    res.status(200).json({})
  } else {
    res.status(401).json({})
  }
}
