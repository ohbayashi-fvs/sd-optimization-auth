import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from './createClient'

export default async function checkIpAddress(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<{ isCorrect: boolean; ipAddress?: string }> {
  const supabaseServerClient = createClient({
    req,
    res,
  })

  // DBから登録しているIPアドレス一覧の取得
  const { data: dbIpAddresses } = await supabaseServerClient
    .schema('private')
    .from('ip_address')
    .select('*')
  // クライアントのIPアドレス取得
  const ip = req.headers['x-forwarded-for'] as string
  if (process.env.NODE_ENV === 'development' && ip === '::1')
    return { isCorrect: true }
  const { data: isCorrect } = await supabaseServerClient.rpc('is_correct_ip')

  return { isCorrect: isCorrect ?? false, ipAddress: ip }
}
