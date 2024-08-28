import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from './createClient'

export default async function checkIpAddress(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<{ isCorrect: boolean; ipAddress1?: string }> {
  const supabaseServerClient = createClient({
    req,
    res,
  })

  // クライアントのIPアドレス取得
  const ip = req.headers['x-forwarded-for'] as string
  if (process.env.NODE_ENV === 'development' && ip === '::1')
    return { isCorrect: true, ipAddress1: ip }
  const { data: isCorrect } = await supabaseServerClient.rpc(
    'is_correct_ip_nextjs',
    { ip_address: ip },
  )

  return { isCorrect: isCorrect ?? false, ipAddress1: ip }
}
