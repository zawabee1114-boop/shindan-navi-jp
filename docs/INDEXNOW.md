# IndexNow API 実装ガイド

最終更新: 2026-05-23

## IndexNow とは

IndexNow は Microsoft Bing・Yandex が共同運営する即時インデックス通知 API。
1回のリクエストで参加している全検索エンジン（現在 Bing / Yandex）に同時通知できる。

- 公式仕様: https://www.indexnow.org/documentation
- Google Search Console は別途 Sitemap 送信で対応（Google は IndexNow 非参加）

### GSC との違い

| 方式 | 通知先 | 反映速度 | 備考 |
|---|---|---|---|
| IndexNow | Bing / Yandex | 即時（分〜時間単位） | push 型・即クロール促進 |
| GSC Sitemap | Google | 数日〜数週間 | pull 型・クロール待ち |

両方使うことで検索エンジン横断の即時インデックス化を実現する。

## キー情報

| 項目 | 値 |
|---|---|
| IndexNow キー | `ax4413ovu3r17ew1oef7v8i55mz9htca` |
| キーファイル URL | `https://shindan-navi.jp/ax4413ovu3r17ew1oef7v8i55mz9htca.txt` |
| キーファイル（ローカル） | `public/ax4413ovu3r17ew1oef7v8i55mz9htca.txt` |

### キー管理ルール

- キーは公開可能（IndexNow の仕様上、キーそのものは秘密ではない）
- GitHub へのコミット OK
- 変更する場合は `public/{OLD_KEY}.txt` を削除し、新キーで作り直す
- GitHub Actions の `indexnow.yml` 内の `INDEXNOW_KEY` 値も更新する

## ファイル構成

```
shindan-navi-jp/
├── public/
│   └── ax4413ovu3r17ew1oef7v8i55mz9htca.txt   ← キー検証ファイル
├── scripts/
│   └── indexnow-ping.mjs                        ← 送信スクリプト
└── .github/
    └── workflows/
        └── indexnow.yml                          ← GitHub Actions 自動実行
```

## 手動 ping 方法

### 本番送信（ビルド後）

```bash
# 1. まずビルドを実行
npm run build

# 2. IndexNow に送信
npm run indexnow
```

### ドライラン（送信せず URL 一覧だけ確認）

```bash
npm run build
npm run indexnow:dry
# または
DRY_RUN=1 node scripts/indexnow-ping.mjs
```

## 自動実行（GitHub Actions）

`.github/workflows/indexnow.yml` により、`main` ブランチへの push 時に自動実行される。

フロー:
1. `npm ci` → 依存インストール
2. `npm run build` → Astro ビルド（サイトマップ生成）
3. `sleep 60` → Cloudflare Pages のデプロイ完了待機
4. `node scripts/indexnow-ping.mjs` → IndexNow API 送信

Cloudflare Pages の自動デプロイと並行して動く。
キーファイルの公開確認に 60 秒の待機を挟んでいる（Cloudflare 側のビルドが先に完了するため）。

## トラブルシューティング

### HTTP 403 が返る

原因: キーファイルが公開されていない（Cloudflare デプロイ未完了）

対処:
1. `https://shindan-navi.jp/ax4413ovu3r17ew1oef7v8i55mz9htca.txt` をブラウザで開く
2. キーの文字列が表示されることを確認
3. 表示されなければ Cloudflare Pages のデプロイログを確認

### HTTP 422 が返る

原因: urlList 内に `shindan-navi.jp` 以外のホストの URL が混入している

対処: スクリプトのログで URL 一覧を確認し、異常な URL を調査する

### HTTP 429 が返る

原因: 1日に複数回同じ URL を送信した

対処: 同一 URL は 1日1回まで。翌日再送信する。

### dist/ が見つからない

原因: `npm run build` を実行せずにスクリプトを実行した

対処: 必ず `npm run build` の後に `npm run indexnow` を実行する

## 過剰送信の注意

IndexNow の仕様上、同一 URL を1日に複数回送信すると逆効果になる可能性がある。

- ビルドのたびに自動送信（postbuild）は使用しない（開発中の複数ビルドで過剰送信になる）
- GitHub Actions は `main` push のみに限定（これが適切な頻度）
- 手動 ping は本当に必要な場合のみ（大量ページ追加・URL 変更時など）
