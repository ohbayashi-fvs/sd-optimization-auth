## Getting Started

Supabaseはsd-optimizationリポジトリにあるので、
ローカル開発の場合、そちらを起動しておいてください。

```bash
npm install
npm run dev
# then
```

## deploy

gloudのパスが通っていることを確認してください。
パスが通っていない場合、ここらへんを参考に通しておいてください。
https://cloud.google.com/sdk/docs/install-sdk?hl=ja

Google Cloud認証
npm run dc:auth

Dockerビルド
npm run dc:build

DockerをArtifact Registryにpush ※費用のため、Artifact Registryに500MB以上ファイルを入れないように注意
npm run dc:push

Artifact Registryのイメージを元にCloud Runでdeploy
Cloud Runにて、my-imageを選択、「新しいリビジョンの編集とデプロイ」をクリック
コンテナイメージのURLから新しいArtifact Registryを選択する。
「デプロイ」ボタンをクリックする。
