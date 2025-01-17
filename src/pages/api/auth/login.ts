import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from './createClient'
import checkLogin from './session'
import checkIpAddress from './checkIpAddress'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createClient({
    req,
    res,
  })

  // ログイン
  const loginData = JSON.parse(req.body)

  const loginResult = await supabaseServerClient.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  })
  if (!loginResult.data?.user)
    return res.status(401).json({ message: loginResult.error?.message })
  if (!loginResult.data?.user?.user_metadata?.is_account_kanrisha) {
    supabaseServerClient.auth.signOut()
    return res
      .status(401)
      .json({ message: 'このユーザーのログインは許可されていません。' })
  }
  //クライアントのIPアドレスが登録されているものかチェックする
  const result = await checkIpAddress(req, res)
  if (!result.isCorrect) {
    await supabaseServerClient.auth.signOut()
    return res.status(401).json({ ipAddress1: result.ipAddress1 })
  }

  return res.status(200).json({})
}
