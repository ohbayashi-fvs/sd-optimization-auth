## Getting Started

Supabaseはsd-optimizationリポジトリにあるので、
ローカル開発の場合、そちらを起動しておいてください。

```bash
npm install
npm run dev
# then
```

## deploy

もしかしから、Rancher Desktopだとbuildできないかも？ Dockerデスクトップ推奨

deployが今のところけっこう面倒です。
gloudのパスが通っていることを確認してください。
パスが通っていない場合、ここらへんを参考に通しておいてください。
https://cloud.google.com/sdk/docs/install-sdk?hl=ja

Google Cloud認証
npm run dc:auth

Dockerビルド
npm run dc:build

DockerをArtifact Registryにpush
npm run dc:push

Cloud Runにログインする
ログイン情報は下記参照
https://docs.google.com/spreadsheets/d/10vAlZDzO6g5P8AMAND6HtvOlMYNTwKrUgmnmd2scHXM/edit?gid=0#gid=0https://docs.google.com/spreadsheets/d/10vAlZDzO6g5P8AMAND6HtvOlMYNTwKrUgmnmd2scHXM/edit?gid=0#gid=0

Artifact Registryを開く
sd20240827をクリック、my-imageの内訳を確認 ※費用のため、Artifact Registryに500MB以上ファイルを入れないように注意

Cloud Runを開く
my-imageを選択、「新しいリビジョンの編集とデプロイ」をクリック
コンテナイメージのURLをクリック。asia-northeast〜をクリック
新しいArtifact Registryを選択する
「デプロイ」ボタンをクリックす。
