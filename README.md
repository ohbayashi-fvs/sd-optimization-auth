This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


```bash
npm install
npm run dev
# then
cd supabase
npm install
npm run start
```

## Learn More
このプロジェクトはモノレポでフロントエンドがルート配下にあり、
バックエンド(Supabase)がsupabaseフォルダ配下にあります。
supabaseフォルダの中のsupabase CLIライブラリが古いとうまく動かないことが多いので注意しましょう。


## deploy
git push, margeにてフロント側のstaging環境が自動で更新します。
バックエンド側はSupabase CLIを叩いて変更するようになっています。